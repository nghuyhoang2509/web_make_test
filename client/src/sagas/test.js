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
    reloadTestResponse,
    answerSuccess,
    answerFail,
    getResponseSuccess,
    getResponseFail
} from "../actions/test"


export function* createTest(action) {
    try {
        const id = yield select((state) => state.login.info.id)
        const data = {
            test: {
                ...action.payload,
                question: []
            },
            id
        }
        const test = yield call(apiTest.createTest, data)
        yield put(createTestSuccess(test.data))
    } catch (error) {
        yield put(createTestFail(error))
    }
}


export function* loadTest() {
    try {
        const info = yield select((state) => state.login.info)
        const page = yield select((state) => state.test.page)
        const data = {
            info,
            page,
        }
        const testLoaded = yield call(apiTest.loadTest, data)
        yield put(loadTestSuccess(testLoaded))
    } catch (error) {
        yield put(loadTestFail(error))
    }
}

export function* deleteTest(action) {
    try {
        yield call(apiTest.deleteTest, action.payload)
        yield put(deleteTestSuccess(action.payload))
    } catch (error) {
        yield put(deleteTestFail(error))
    }
}

export function* getTest(action) {
    try {
        const data = yield call(apiTest.getTest, action.payload)
        yield put(getTestSuccess(data))
    } catch (error) {
        yield put(getTestFail(error))
    }
}

export function* updateTest(action) {
    try {
        const test = yield select((state) => state.test.exam)
        const data = yield call(apiTest.updateTest, { test })
        yield put(updateTestSuccess(data))
    } catch (error) {
        yield put(updateTestFail(error))
    }
}

export function* answerTest(action) {
    try {
        const data = yield call(apiTest.answerTest,action.payload)
        yield put(answerSuccess(data))
    } catch (error) {
        yield put(answerFail(error))
    }
}

export function* reloadTest(action) {
    yield put(reloadTestResponse())
}

export function* responseTest(action) {
    try {
        const data = yield call(apiTest.responseTest,action.payload)
        yield put(getResponseSuccess(data))
    } catch (error) {
        yield put(getResponseFail(error))
    }
}