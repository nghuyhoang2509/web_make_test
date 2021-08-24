const defaultReducer = {
    loginLoading: true,
    loginStatus: "",
    isLogined: false,
    info: null,
}

const loginReducer = (state = defaultReducer, action) => {
    switch (action.type) {
        case "LoginRequest":{
            return {
                ...state,
                loginLoading: true,
                loginStatus: "Đang đăng nhập...",
                isLogined: false
            }
        }
        case "LoginSuccess":{
            localStorage.setItem("access-token", action.payload.accessToken)
            localStorage.setItem("refresh-token", action.payload.refreshToken)
            return {
                loginLoading: false,
                loginStatus: "",
                isLogined: true,
                info: action.payload.info,
            }
        }
        case "LoginFail":{
            return {
                ...state,
                loginLoading: false,
                loginStatus: action.error.message,
            }
        }
        case "VerifyAuthRequest":{
            return {
                ...state,
            }
        }
        case "VerifyAuthSuccess":{
            return {
                ...state,
                loginLoading: false,
                isLogined: true,
                info: action.payload.info,
            }
        }
        case "VerifyAuthFail":{
            return {
                ...state,
                loginLoading: false,
            }
        }
        case "Logout":{
            localStorage.removeItem("access-token")
            localStorage.removeItem("refresh-token")
            return{
                ...state,
                isLogined: false,
                info: null,
            }
        }
        default:
            return state
    }
}

export default loginReducer