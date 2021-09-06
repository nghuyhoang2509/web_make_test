const Test = require("../../model/Test")
const User = require("../../model/User")
const Answer = require("../../model/Answer")
/* const redisDB = require("../../config/redisDB") */
var resPolling = {}
class TestController {

    //[POST] /admin/test/category/
    //private
    async category(req, res, next) {
        try {
            const user = req.body.info
            const test = await Test.find({ userId: user.id }).sort({ updatedAt: -1 })
            if (test.length === 0) {
                return res.json({ success: true, message: "không có dữ liệu", data: [] })
            }
            return res.json({ success: true, message: "lấy data thành công", data: test })
        } catch (error) {
            return res.json({ success: false, message: error })
        }
    }
    //[POST] /admin/test/create
    async create(req, res, next) {
        try {
            const test = req.body.test
            const id = req.body.id
            var testNew = await Test.create({
                ...test,
                userId: id,
            })
            const answers = await Answer.create({
                testId: testNew._id,
                userId: id
            })
            testNew.answersId = answers._id
            answers.testId = testNew._id
            testNew = await testNew.save()
            await answers.save()
            return res.json({ success: true, message: "tạo dữ liệu thành công", data: testNew })

        }
        catch (error) {
            return res.json({ success: false, message: error })
        }
    }

    //[PATCH] /admin/test/update
    //private
    async update(req, res, next) {
        try {
            const test = req.body.test
            const testUpdate = await Test.findByIdAndUpdate(test._id, test, { new: true })
            if (!testUpdate) {
                return res.json({ success: false, message: error })
            }
            return res.json({ success: true, message: "cập nhật dữ liệu thành công", data: testUpdate })
        } catch (error) {
            console.log(error)
            return res.json({ success: false, message: error })
        }
    }

    //[POST] /admin/test/get,
    // private
    async test(req, res, next) {
        try {
            const { id, edit, userId } = req.body.data
            var data = await Test.findById(id)
            if (!data) {
                return res.json({ success: false, message: "Đề thi không tồn tại" })
            }
            if (edit && userId === data.userId) {
                return res.json({ success: true, message: "lấy dữ liệu thành công", data })
            }
            if (data.settings.display === "public") {
                data.answers = []
                return res.json({ success: true, message: "lấy dữ liệu thành công", data })
            }
            if (userId === data.userId) {
                return res.json({ success: true, message: "lấy dữ liệu thành công", data })
            }
            if (data.settings.display === "time") {
                const displayLimit = [new Date(data.settings.displayLimit[0]), new Date(data.settings.displayLimit[1])]
                if (displayLimit[0].getTime() <= Date.now() && displayLimit[1].getTime() >= Date.now()) {
                    return res.json({ success: true, message: "lấy dữ liệu thành công", data })
                }
            }
            return res.json({ success: false, message: "đề thi đang ở chế độ riêng tư" })
        } catch (error) {
            console.log(error)
            return res.json({ success: false, message: "Đề thi không tồn tại" })
        }
    }

    async response(req, res, next) {
        try {
            const { testId, userId, polling } = req.body.data
            var answer = await Answer.findOne({ testId })
            var response = []
            if (answer) {
                if (userId) {
                    answer.answers.forEach((item) => {
                        if (item.info.id === userId) {
                            response.push(item)
                        }
                    })
                } else {
                    response = answer.answers
                }
            }
            if (polling) {
                /* redisDB.setex(testId, JSON.parser(res)) */
                if (resPolling[testId]) {
                    resPolling[testId].json({ success: true, message: "khong có dữ liệu mới", data: [] })
                    resPolling[testId] = null
                }
                return resPolling[testId] = res
            }
            return res.json({ success: true, message: "lấy dữ liệu thành công", data: response })
        } catch (error) {
            console.log(error)
            return res.json({ success: false, message: error })
        }
    }


    //[POST] /admin/test/stoppolling
    async stopPolling(req, res, next) {
        try {
            const { testId } = req.body.data
            resPolling[testId].json({ success: true, message: "khong có dữ liệu mới", data: [] })
            resPolling[testId] = null
            return res.json({ success: true, message: "khong có dữ liệu mới", data: null })
        } catch (error) {

        }
    }


    //[DELETE] /admin/test/delete
    //private
    async delete(req, res, next) {
        try {
            const id = req.body.id
            await Test.deleteOne({ _id: id })
            await Answer.deleteOne({ testId: id })
            return res.json({ success: true, message: "xóa dữ liệu thành công" })
        } catch (error) {
            return res.json({ success: false, message: error })
        }
    }
    //[PATCH] /admin/test/answer 
    async answer(req, res, next) {
        try {
            var response
            const { info, answer, testId, startTime, finishTime } = req.body
            const data = await Answer.findOne({ testId }).populate('testId', ['settings', 'answers'])
            data.answers.unshift({
                info,
                answer,
                date: new Date().toISOString(),
                mark: null,
                timePractice: finishTime - startTime
            })
            const { answers } = data.testId
            const answerFromClient = data.answers[0].answer
            const { autoMark, displayResMark, ladderMark, displayLimit, display } = data.testId.settings
            if (autoMark) {
                let answerTrue = 0
                for (let i = 0; i < answerFromClient.length; i++) {
                    if (answerFromClient[i] === answers[i]) {
                        answerTrue++
                    }
                }
                var mark = ladderMark / answerFromClient.length * answerTrue
                if (isNaN(mark)) {
                    mark = 0
                }
                data.answers[0].mark = mark.toFixed(2)
                if (!displayResMark) {
                    data.answers[0] = null
                }
            }
            if (display === "public") {
                await data.save()
                if (resPolling[testId]) {
                    resPolling[testId].json({ success: true, message: "Nộp thành công", data: [data.answers[0]] })
                    resPolling[testId] = null
                }
                return res.json({ success: true, message: "Nộp thành công", data: data.answers[0] })
            }
            if (display === "time") {
                const displayLimitNew = [new Date(displayLimit[0]), new Date(displayLimit[1])]
                if (displayLimitNew[0].getTime() <= Date.now() && displayLimitNew[1].getTime() >= Date.now()) {
                    await data.save()
                    if (resPolling[testId]) {
                        resPolling[testId].json({ success: true, message: "Nộp thành công", data: [data.answers[0]] })
                        resPolling[testId] = null
                    }
                    return res.json({ success: true, message: "Nộp thành công", data: data.answers[0] })
                } else {
                    return res.json({ success: false, message: "Thời hạn nộp bài đã hết" })
                }
            }
            return res.json({ success: false, message: "Đề thi đã khóa" })
        } catch (error) {
            console.log(error)
            return res.json({ success: false, message: error })
        }
    }

}

module.exports = new TestController