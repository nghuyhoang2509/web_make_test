export function createUserRequest(payload){
        return {
            type: "CreateUserRequest",
            payload,
        }
    }

export function createUserSuccess(payload){
        return {
            type: "CreateUserSuccess",
            payload,
        }
}

export function createUserFail(error){
    return { 
        type: "CreateUserFail",
        error: error
    }
}
