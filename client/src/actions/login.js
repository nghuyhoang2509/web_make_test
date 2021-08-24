export function loginRequest(payload){
    return {
        type: "LoginRequest",
        payload,
    }
}

export function loginSuccess(payload){
    return {
        type: "LoginSuccess",
        payload,
    }
}

export function loginFail(error){
return { 
    type: "LoginFail",
    error: error
}
}

export function verifyAuthRequest(){
    return {
        type: "VerifyAuthRequest",
    }
}

export function verifyAuthSuccess(payload){
    return {
        type: "VerifyAuthSuccess",
        payload
    }
}

export function verifyAuthFail(error){
    return {
        type: "VerifyAuthFail",
        payload: error
    }
}

export function logout(){
    return {
        type: "Logout"
    }
}