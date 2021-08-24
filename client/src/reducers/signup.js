const defaultReducer = {
    signupLoading: false,
    signupStatus: ""
}

const signupReducer = (state = defaultReducer, action) => {
    switch (action.type) {
        case "CreateUserRequest":{
            return {
                signupLoading: true,
                signupStatus: "Đang tạo tài khoản..."
            }
        }
        case "CreateUserSuccess":{
            return {
                signupLoading: false,
                signupStatus: action.payload.message
            }
        }
        case "CreateUserFail":{
            return {
                signupLoading: false,
                signupStatus: action.error.message
            }
        }
        default:
            return state
    }
}

export default signupReducer