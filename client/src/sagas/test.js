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
    getResponseFail
} from "../actions/test"
import { toastMsgRequest } from "../actions/site"


export function* createTest(action) {
    const id = yield select((state) => state.login.info.id)
    const dataReq = {
        test: {
            ...action.payload,
            question: []
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
    const data = yield call(apiTest.answerTest, action.payload)
    if (data.data.success === false) {
        yield put(answerFail())
        yield put(toastMsgRequest({ msg: data.data.message, status: "error" }))
    } else {
        yield put(answerSuccess(data))
        yield put(toastMsgRequest({ msg: data.data.message, status: "success" }))
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