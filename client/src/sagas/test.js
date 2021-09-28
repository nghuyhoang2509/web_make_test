import { call, put, select } from "@redux-saga/core/effects"
import * as apiTest from "../api/test"
import {
    createTestSuccess,
    createTestFail,
    loadTestSuccess,
    loadTestFail,
    deleteTestSuccess,
    deleteTestFail,
    getTestSuccess,
    getTestFail,
    updateTestSuccess,
    updateTestFail,
    answerSuccess,
    answerFail,
    getResponseSuccess,
    getResponseFail,  // eslint-disable-next-line
    convertFileToTextSuccess,  // eslint-disable-next-line
    convertFileToTextFail,
    createTestRequest
} from "../actions/test" // eslint-disable-next-line
import { toastMsgRequest, openPageProgress, updatePageProgress, donePageProgress } from "../actions/site"


import socketIO from "socket.io-client"
import { host } from "../config/var"


export function* createTest(action) {
    const id = yield select((state) => state.login.info.id)
    if (!action.payload.question) {
        action.payload.question = []
    }
    const dataReq = {
        test: {
            ...action.payload,
        },
        id
    }
    const { data } = yield call(apiTest.createTest, dataReq)
    if (data.success === false) {
        yield put(createTestFail())
        yield put(toastMsgRequest({ msg: data.message, status: "error" }))
    } else {
        yield put(createTestSuccess(data))
    }
}


export function* loadTest() {
    const info = yield select((state) => state.login.info)
    const page = yield select((state) => state.test.page)
    const data = {
        info,
        page,
    }
    const testLoaded = yield call(apiTest.loadTest, data)
    if (testLoaded.data.success === false) {
        yield put(toastMsgRequest({ msg: null, status: "error" }))
        yield put(loadTestFail())

    } else {
        yield put(loadTestSuccess(testLoaded))
    }
}

export function* deleteTest(action) {
    const { data } = yield call(apiTest.deleteTest, action.payload)
    if (data.success === false) {
        yield put(deleteTestFail())
        yield put(toastMsgRequest({ msg: null, status: "error" }))
    } else {
        yield put(deleteTestSuccess(action.payload))
    }
}

export function* getTest(action) {
    const { data } = yield call(apiTest.getTest, action.payload)
    if (data.success === false) {
        yield put(getTestFail())
        yield put(toastMsgRequest({ msg: data.message, status: "error" }))
    } else {
        yield put(getTestSuccess(data))
    }

}

export function* updateTest(action) {
    const test = yield select((state) => state.test.exam)
    const data = yield call(apiTest.updateTest, { test })
    if (data.data.success === false) {
        yield put(updateTestFail())
        yield put(toastMsgRequest({ msg: null, status: "error" }))

    } else {
        yield put(updateTestSuccess(data))
    }
}

export function* answerTest(action) {
    const socketIOClient = yield socketIO.connect(host)
    const data = yield call(apiTest.answerTest, action.payload)
    if (data.data.success === false) {
        yield put(answerFail())
        yield put(toastMsgRequest({ msg: data.data.message, status: "error" }))
        yield socketIOClient.disconnect()
    } else {
        const userIdForTest = yield select((state) => state.test.exam.userId)
        yield socketIOClient.emit("send-response", { testByUserId: userIdForTest })
        yield put(answerSuccess(data))
        yield put(toastMsgRequest({ msg: data.data.message, status: "success" }))
        yield socketIOClient.disconnect()
    }
}

export function* responseTest(action) {
    const data = yield call(apiTest.responseTest, action.payload)
    if (data.data.success === false) {
        yield put(getResponseFail())
        yield put(toastMsgRequest({ msg: null, status: "error" }))

    } else {
        yield put(getResponseSuccess(data))
    }
}




export function* convertFileToText(action) {
    yield put(openPageProgress())
    const { fileTest, test } = action.payload
    const fileForm = new FormData()
    fileForm.append("file", fileTest.file)
    const { data } = yield call(apiTest.convertFileToText, fileForm)
    if (data.success) {
        yield put(updatePageProgress({ progressValue: 30 }))
        if (fileTest.type === "auto") {
            var questionArray = yield data.text.split(/câu \d+[:.]/i)
            var questions = []
            questionArray.forEach((item) =>{ 
                if (item.match(/\s+/) && item !== "" ){
                    const arraySplit = item.split(/[abcd][.] /i)
                    questions.push({
                        title: arraySplit.shift(),
                        options: arraySplit,
                        type: "radio",
                        image: null,
                        optionsImage: []
                    })
                }   
            })
            yield put(updatePageProgress({ progressValue: 100 }))
            yield put(donePageProgress())
            yield put(createTestRequest({
                ...test,
                questions
            }))
        }
    } else {
        yield put(convertFileToTextFail())
        yield put(donePageProgress())
        yield put(toastMsgRequest({ msg: "Có lỗi xảy ra vui lòng thử lại", status: "error" }))
    }
}