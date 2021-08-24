const mongoose = require('mongoose')
const TestSchema = new mongoose.Schema({
    title: { type: String, required: true },
    userId: { type: String, required: true},
    description: { type: String },
    questions: { type: Array },
    answers: { type: Array }
},{ timestamps: true })

module.exports = mongoose.model('Test', TestSchema)

