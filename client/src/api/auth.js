import instance from "./index";

export function createUser(data){
    return instance.post('auth/signup', data)
}

export function login(data){
    return instance.post('auth/login', data)
}

export function verifyAuth(){
    return instance.post('auth',null,{
        headers: {
            accessToken: localStorage.getItem("access-token"), 
            refreshToken: localStorage.getItem("refresh-token") 
        }
    })
}

