import { call, put} from "@redux-saga/core/effects"
import * as apiAuth from "../api/auth"
import { createUserFail, createUserSuccess } from "../actions/signup"
import { loginSuccess, loginFail, verifyAuthSuccess, verifyAuthFail, logoutSuccess, logoutFail } from "../actions/login"
import { toastMsgRequest } from "../actions/site"

export function* signup(action){
    try{
        const response = yield call(apiAuth.createUser, action.payload)
        if (response.data.success === true){
            yield put(createUserSuccess(response.data))
            yield put(toastMsgRequest( { msg: response.data.message, status: "success" } ))
        }else{
            yield put(createUserFail(response.data))
            yield put(toastMsgRequest( { msg: response.data.message, status: "error" } ))
        }
    }catch(error){
        console.log(error)
    }
}

export function* login(action){
    try{
        const response = yield call(apiAuth.login, action.payload)
        
        if (response.data.success === true){
            yield put(loginSuccess(response.data))
        }else{
            yield put(toastMsgRequest( { msg: response.data.message, status: "error" } ))
            yield put(loginFail(response.data))
        }
    }catch(error){
        console.log(error)
    }
}

export function* verifyAuth(){
    try{
        const response = yield call(apiAuth.verifyAuth)
        if (response.data.success === true){
            yield put(verifyAuthSuccess(response.data))
        }else{
            yield put(verifyAuthFail(response.data))
        }
    }catch(error){
        console.log(error)
    }
}

export function* logout(){
    try{
        yield call(apiAuth.logout)
        yield put(logoutSuccess())
    }catch(error){
        yield put(logoutFail())
    }
}
