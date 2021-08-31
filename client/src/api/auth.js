import instance from "./index";

export function createUser(data) {
    return instance.post('auth/signup', data, {
        withCredentials: true
    })
}

export function login(data) {
    return instance.post('auth/login', data, {
        withCredentials: true
    })
}

export function verifyAuth() {
    return instance.get('auth', {
        withCredentials: true
    })
}

export function logout() {
    return instance.get('auth/logout', {
        withCredentials: true
    })
}

