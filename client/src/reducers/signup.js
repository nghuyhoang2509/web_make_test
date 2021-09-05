const defaultReducer = {
    signupLoading: false,
    signupStatus: "",
    signuped: false
}

const signupReducer = (state = defaultReducer, action) => {
    switch (action.type) {
        case "CreateUserRequest":{
            return {
                ...state,
                signupLoading: true,
                signupStatus: "Đang tạo tài khoản..."
            }
        }
        case "CreateUserSuccess":{
            return {
                ...state,
                signupLoading: false,
                signupStatus: action.payload.message,
                signuped: true
            }
        }
        case "CreateUserFail":{
            return {
                ...state,
                signupLoading: false,
                signupStatus: action.error.message
            }
        }
        default:
            return state
    }
}

export default signupReducer