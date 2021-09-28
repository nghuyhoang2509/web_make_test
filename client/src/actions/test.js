export function createTestRequest(payload){
    return{
        type: "CreateTestRequest",
        payload
    }
}

export function createTestSuccess(payload){
    return{
        type: "CreateTestSuccess",
        payload
    }
}

export function createTestFail(payload){
    return{
        type: "CreateTestFail",
        payload
    }
}


export function loadTestRequest(){
    return{
        type: "LoadTestRequest"
    }
}


export function loadTestSuccess(payload){
    return{
        type: "LoadTestSuccess",
        payload
    }
}


export function loadTestFail(payload){
    return{
        type: "LoadTestFail",
        payload
    }
}

export function deleteTestRequest(payload){
    return{
        type: "DeleteTestRequest",
        payload
    }
}

export function deleteTestSuccess(payload){
    return{
        type: "DeleteTestSuccess",
        payload
    }
}


export function deleteTestFail(payload){
    return{
        type: "DeleteTestFail",
        payload
    }
}

export function getTestRequest(payload){
    return{
        type: "GetTestRequest",
        payload
    }
}

export function getTestSuccess(payload){
    return{
        type: "GetTestSuccess",
        payload
    }
}

export function getTestFail(payload){
    return{
        type: "GetTestFail",
        payload
    }
}

export function createQuestion(){
    return{
        type: "CreateQuestion"
    }
}

export function createOption(payload){
    return{
        type: "CreateOption",
        payload
    }
}

export function updateExam(payload){
    return{
        type: "UpdateExam",
        payload
    }
}

export function updateQuestion(payload){
    return{
        type: "UpdateQuestion",
        payload
    }
}

export function updateAnswer(payload){
    return{
        type: "UpdateAnswer",
        payload
    }
}

export function updateOption(payload){
    return{
        type: "UpdateOption",
        payload
    }
}

export function updateTestRequest(payload){
    return{
        type: "UpdateTestRequest",
        payload
    }
}


export function updateTestSuccess(payload){
    return{
        type: "UpdateTestSuccess",
        payload,
    }
}

export function updateTestFail(payload){
    return{
        type: "UpdateTestFail",
        payload
    }
}

export function reloadTestRequest(){
    return{
        type: "ReloadTestRequest",
    }
}

export function reloadTestResponse(){
    return{
        type: "ReloadTestResponse",
    }
}

export function deleteOption(payload){
    return{
        type: "DeleteOption",
        payload
    }
}

export function deleteQuestion(payload){
    return{
        type: "DeleteQuestion",
        payload
    }
}

export function answerRequest(payload){
    return{
        type: "AnswerRequest",
        payload
    }
}

export function answerSuccess(payload){
    return{
        type: "AnswerSuccess",
        payload
    }
}

export function answerFail(payload){
    return{
        type: "AnswerFail",
        payload
    }
}

export function changeSetting(payload){
    return{
        type: "ChangeSetting",
        payload
    }
}

export function getResponseRequest(payload){
    return{
        type: "GetResponseRequest",
        payload
    }
}

export function getResponseSuccess(payload){
    return{
        type: "GetResponseSuccess",
        payload
    }
}

export function getResponseFail(payload){
    return{
        type: "GetResponseFail",
        payload
    }
}

export function movePositionQuestion(payload){
    return {
        type: "MovePositionQuestion",
        payload
    }
}

export function convertFileToTextRequest(payload){
    return {
        type: "ConvertFileToTextRequest",
        payload
    }
}

export function convertFileToTextSuccess(payload){
    return {
        type: "ConvertFileToTextSuccess",
        payload
    }
}

export function convertFileToTextFail(payload){
    return {
        type: "ConvertFileToTextFail",
        payload
    }
}

