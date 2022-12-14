
const defaultReducer = {
    loading: false,
    loadingTest: false,
    testLoaded: null,
    exam: null,
    responseAnswer: [],
}

const testReducer = (state = defaultReducer, action) => {
    switch (action.type) {
        case "CreateTestRequest": {
            return {
                ...state,
                loadingTest: true
            }
        }
        case "CreateTestSuccess": {
            return {
                ...state,
                loadingTest: false,
                testLoaded: [action.payload.data, ...state.testLoaded]
            }
        }
        case "CreateTestFail": {
            return {
                ...state,
                loadingTest: false,
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
                testLoaded: action.payload.data.data,
            }
        }
        case "LoadTestFail": {
            return {
                ...state,
                loadingTest: false,
            }
        }
        case "DeleteTestRequest": {
            return {
                ...state,
                loadingTest: true
            }

        }
        case "DeleteTestSuccess": {
            const index = state.testLoaded.findIndex((test) => test._id === action.payload)
            return {
                ...state,
                testLoaded: [...state.testLoaded.slice(0, index), ...state.testLoaded.slice(index + 1, state.testLoaded.length)],
                loadingTest: false
            }
        }
        case "DeleteTestFail": {
            return {
                state,
                loadingTest: false
            }
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
                exam: action.payload.data,
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
                        title: "C??u h???i m???i",
                        options: [],
                        type: "radio",
                    }],
                }
            }
        }
        case "CreateOption": {
            const { indexQuestion } = action.payload
            const questions = state.exam.questions
            questions[indexQuestion].options.push("tr???ng")
            return {
                ...state,
                exam: {
                    ...state.exam,
                    questions
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
                ...state,
                loading: false,
                exam: {
                    ...state.exam
                }
            }
        }
        case "UpdateTestSuccess": {
            return {
                ...state,
            }
        }
        case "UpdateTestFail": {
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
            questions[indexQuestion].options.splice(index, 1)
            questions[indexQuestion].optionsImage.splice(index,1)
            return {
                ...state,
                exam: {
                    ...state.exam,
                    questions,
                }
            }
        }
        case "DeleteQuestion": {
            const { indexQuestion } = action.payload
            console.log(indexQuestion)
            const questions = state.exam.questions
            questions.splice(indexQuestion, 1)
            state.exam.answers.splice(indexQuestion, 1)
            return {
                ...state,
                exam: {
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
            const responseAnswer = state.responseAnswer.map((item) => item)
            responseAnswer.unshift(action.payload.data.data)
            return {
                ...state,
                loading: false,
                responseAnswer
            }
        }
        case "AnswerFail": {
            return {
                ...state,
                loading: false,
            }
        }
        case "ChangeSetting": {
            const { key, value } = action.payload
            state.exam.settings[key] = value
            return {
                ...state,
            }
        }
        case "GetResponseRequest": {
            return {
                ...state,
            }
        }

        case "GetResponseSuccess": {
            return {
                ...state,
                responseAnswer: [...action.payload.data.data],
            }
        }
        case "GetResponseFail": {
            return {
                ...state,
            }
        }
        case "MovePositionQuestion": {
            const { indexQuestionFrom, indexQuestionTo } = action.payload
            var { questions, answers } = state.exam
            const questionMove = questions.splice(indexQuestionFrom, 1)
            const answerMove = answers.splice(indexQuestionFrom, 1)
            questions.splice(indexQuestionTo + 1, 0, ...questionMove)
            answers.splice(indexQuestionTo + 1, 0, ...answerMove)
            console.log(questions)
            console.log(answers)
            return {
                ...state
            }
        }

        case "ConvertFileToTextRequest": {
            return {
                ...state
            }
        }
        case "ConvertFileToTextSuccess": {
            return {
                ...state
            }
        }
        case "ConvertFileToTextFail": {
            return {
                ...state
            }
        }
        default:
            return state
    }
}

export default testReducer