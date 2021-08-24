import { takeLatest, takeEvery } from "@redux-saga/core/effects";
import { signup, login, verifyAuth } from "./auth";
import { createTest, loadTest, deleteTest, getTest, updateTest, reloadTest, answerTest } from "./test";

function* mySaga(){
    yield takeLatest("CreateUserRequest",signup)
    yield takeLatest("LoginRequest",login)
    yield takeLatest("VerifyAuthRequest",verifyAuth)
    yield takeLatest("CreateTestRequest",createTest)
    yield takeEvery("LoadTestRequest",loadTest)
    yield takeEvery("DeleteTestRequest",deleteTest)
    yield takeLatest("GetTestRequest",getTest)
    yield takeLatest("UpdateTestRequest",updateTest)
    yield takeEvery("ReloadTestRequest",reloadTest)
    yield takeLatest("AnswerRequest",answerTest)
}

export default mySaga