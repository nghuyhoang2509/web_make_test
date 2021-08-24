import { v4 as uuidv4 } from "uuid"

const defaultReducer = {
    loading: false,
    loadingTest: false,
    testLoaded: [],
    page: {
        limitPage: 9,
        skipPage: 0
    },
    pauseLoadTest: false,
    exam: null
}

const testReducer = (state = defaultReducer, action) => {
    switch (action.type) {
        case "CreateTestRequest": {
            return {
                ...state,
                loading: true
            }
        }
        case "CreateTestSuccess": {
            return {
                ...state,
                loading: false,
                page: {
                    ...state.page,
                    skipPage: state.page.skipPage + 1
                },
                testLoaded: [action.payload.data, ...state.testLoaded]
            }
        }
        case "CreateTestFail": {
            alert("có lỗi xãy ra vui lòng thử lại")
            return {
                ...state,
                loading: false,
            }
        }
        case "LoadTestRequest": {
            return {
                ...state,
                loadingTest: true,
            }
        }
        case "LoadTestSuccess": {
            return {
                ...state,
                loadingTest: false,
                testLoaded: [...state.testLoaded, ...action.payload.data.data],
                page: {
                    limitPage: 6,
                    skipPage: action.payload.data.data.length + state.page.skipPage
                }
            }
        }
        case "LoadTestFail": {
            return {
                ...state,
                loadingTest: false,
                pauseLoadTest: true
            }
        }
        case "DeleteTestRequest": {
            return state
        }
        case "DeleteTestSuccess": {
            const index = state.testLoaded.findIndex((test) => test._id === action.payload)
            return {
                ...state,
                testLoaded: [...state.testLoaded.slice(0, index), ...state.testLoaded.slice(index + 1, state.testLoaded.length)]
            }
        }
        case "DeleteTestFail": {
            alert('có lỗi xảy ra vui lòng thử lại')
            return state
        }
        case "GetTestRequest": {
            return {
                ...state,
                loading: true
            }
        }
        case "GetTestSuccess": {
            return {
                ...state,
                loading: false,
                exam: action.payload.data.data,
                responseAnswers: action.payload.data.reponseAnswers
            }
        }
        case "GetTestFail": {
            return {
                ...state,
                loading: false,
            }
        }
        case "CreateQuestion": {
            state.exam.answers.push(null)
            return {
                ...state,
                exam: {
                    ...state.exam,
                    questions: [...state.exam.questions, {
                        id: uuidv4(),
                        title: "Câu hỏi mới",
                        options: [],
                        type: "radio"
                    }],
                }
            }
        }
        case "CreateOption": {
            const questions = state.exam.questions.map((question) => {
                if (question.id === action.payload.id) {
                    question = {
                        ...question,
                        options: [...question.options, "trống"]
                    }
                }
                return question
            })
            return {
                ...state,
                exam: {
                    ...state.exam,
                    questions: questions
                }
            }
        }
        case "UpdateExam": {
            return {
                ...state,
                exam: {
                    ...state.exam,
                    ...action.payload
                }
            }
        }
        case "UpdateQuestion": {
            state.exam.questions[action.payload.indexQuestion].title = action.payload.value
            return {
                ...state,
            }
        }
        case "UpdateAnswer": {
            state.exam.answers[action.payload.indexQuestion] = action.payload.value
            return {
                ...state,
            }
        }
        case "UpdateOption": {
            state.exam.questions[action.payload.indexQuestion].options[action.payload.index] = action.payload.value
            return {
                ...state,
            }
        }
        case "UpdateTestRequest": {
            return {
                ...state
            }
        }
        case "UpdateTestSuccess": {
            return {
                ...state,
                exam: action.payload.data.data
            }
        }
        case "UpdateTestFail": {
            alert("có lỗi xảy ra vui lòng thử lại")
            return {
                ...state
            }
        }
        case "ReloadTestRequest": {
            return {
                loading: true,
                ...state
            }
        }
        case "ReloadTestResponse": {
            return {
                loading: false,
                ...state
            }
        }
        case "DeleteOption": {
            const { indexQuestion, index } = action.payload
            const questions = state.exam.questions
            questions[indexQuestion].options.splice(index,1)
            return{
                ...state,
                exam: {
                    ...state.exam,
                    questions,
                }
            }
        }
        case "DeleteQuestion": {
            const { indexQuestion } = action.payload
            const questions = state.exam.questions
            questions.splice(indexQuestion,1)
            return {
                ...state,
                exam:{
                    ...state.exam,
                    questions
                }
            }
        }
        case "AnswerRequest": {
            return {
                ...state,
                loading: true
            }
        }
        case "AnswerSuccess": {
            alert("Nộp thành công")
            return {
                ...state,
                loading: false,

            }
        }
        case "AnswerFail": {
            alert("Nộp thất bại")
            return {
                ...state,
                loading: false,
            }
        }
        default:
            return state
    }
}

export default testReducer