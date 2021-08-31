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
        case "LogoutRequest":{
            return{
                ...state,
                loginLoading: true
            }
        }
        case "LogoutSuccess":{
            return{
                ...state,
                loginLoading: false,
                isLogined: false,
                info: null
            }
        }
        case "LogoutFail":{
            alert('có lỗi')
            return{
                ...state,
                loginLoading: false
            }
        }
        default:
            return state
    }
}

export default loginReducer