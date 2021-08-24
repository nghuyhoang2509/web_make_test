const mongoose = require('mongoose')


const AnswerSchema = new mongoose.Schema({
    answers: { type: Array, required: true },
    testId: { type: String, required: true}
},{ timestamps: true })

module.exports = mongoose.model('Answer', AnswerSchema)