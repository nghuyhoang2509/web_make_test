const Test = require("../../model/Test")
const User = require("../../model/User")
const Answer = require("../../model/Answer")

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
            const testNew = await Test.create({
                ...test,
                userId: id,
                questions: [],
                answers: []
            })
            await Answer.create({
                answers: [],
                testId: testNew._id,
                userId: id
            })
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
            const testOld = await Test.findById(test._id)
            if (!testOld) {
                return res.status(403).json({ success: false, message: error })
            }
            testOld.title = test.title
            testOld.description = test.description
            testOld.questions = test.questions
            testOld.answers = test.answers
            const testUpdated = await testOld.save()
            return res.json({ success: true, message: "cập nhật dữ liệu thành công", data: testUpdated })
        } catch (error) {
            console.log(error)
            return res.status(403).json({ success: false, message: error })
        }
    }

    //[POST] /admin/test/get,
    // private
    async test(req, res, next) {
        try {
            const id = req.body.data.id
            var data = await Test.findById(id)
            if (data.userId !== req.body.data.userId) {
                data.answers = []
                var answers = []
            }else{
                var answer = await Answer.findOne({ testId: data._id })
            }  
            return res.json({ success: true, message: "lấy dữ liệu thành công", data, reponseAnswers: answer.answers })
        } catch (error) {
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
            const { info, answer, testId } = req.body
            const data = await Answer.findOne({ testId })
            data.answers.unshift({
                info,
                answer,
                date: Date.now()
            })
            await data.save()
            return res.json({ success: true, message: "Nộp thành công" })
        } catch (error) {
            return res.status(403).json({ success: false, message: error })
        }
    }

}

module.exports = new TestController