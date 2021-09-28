import instance from "./index";

export function createUser(data) {
    return instance.post('auth/signup', data, {
    })
}

export function login(data) {
    return instance.post('auth/login', data, {
    })
}

export function verifyAuth() {
    return instance.get('auth', {
    })
}

export function logout() {
    return instance.get('auth/logout', {
    })
}

