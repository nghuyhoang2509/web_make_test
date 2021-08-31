const Test = require("../../model/Test")
const User = require("../../model/User")
const Answer = require("../../model/Answer")
const moment = require("moment")
class TestController {

    //[POST] /admin/test/category/
    //private
    async category(req, res, next) {
        try {
            const page = req.body.page
            const user = req.body.info
            var limitPage = page.limitPage
            var skipPage = page.skipPage
            if (page === "all") {
                skipPage = 0
                limitPage = 0
            }
            const test = await Test.find({ userId: user.id }).skip(skipPage).limit(limitPage).sort({ updatedAt: -1 })
            if (test.length === 0) {
                return res.status(403).json({ success: false, message: "không có dữ liệu" })
            }
            return res.json({ success: true, message: "lấy data thành công", data: test })
        } catch (error) {
            return res.status(403).json({ success: false, message: error })
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
            return res.status(402).json({ success: false, message: error })
        }
    }

    //[PATCH] /admin/test/update
    //private
    async update(req, res, next) {
        try {
            const test = req.body.test
            const testUpdate = await Test.findByIdAndUpdate(test._id, test, { new: true })
            if (!testUpdate) {
                return res.status(403).json({ success: false, message: error })
            }
            return res.json({ success: true, message: "cập nhật dữ liệu thành công", data: testUpdate })
        } catch (error) {
            console.log(error)
            return res.status(403).json({ success: false, message: error })
        }
    }

    //[POST] /admin/test/get,
    // private
    async test(req, res, next) {
        try {
            const { id, edit, userId } = req.body.data
            var data = await Test.findById(id)
            if (data) {
                if (edit && userId === data.userId) {

                } else {
                    data.answers = []
                }
                return res.json({ success: true, message: "lấy dữ liệu thành công", data })
            } else {
                return res.status(403).json({ success: false, message: "" })
            }

        } catch (error) {
            console.log(error)
            return res.status(403).json({ success: false, message: error })
        }
    }

    async response(req, res, next) {
        try {
            const { testId, userId } = req.body.data
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
            return res.json({ success: true, message: "lấy dữ liệu thành công", data: response })
        } catch (error) {
            console.log(error)
            return res.status(403).json({ success: false, message: error })
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
            return res.status(403).json({ success: false, message: error })
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
            const { autoMark, displayResMark, ladderMark } = data.testId.settings
            if (autoMark) {
                answerFromClient.sort()
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
                await data.save()
                if (!displayResMark) {
                    data.answers[0] = null
                }
            }
            return res.json({ success: true, message: "Nộp thành công", data: data.answers[0] })
        } catch (error) {
            console.log(error)
            return res.status(403).json({ success: false, message: error })
        }
    }

}

module.exports = new TestController