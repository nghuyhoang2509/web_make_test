export function didToastMsg(payload){
    return {
        type: "DidToastMsg",
        payload
    }
}
export function toastMsgRequest(payload){
    return {
        type: "ToastMsgRequest",
        payload
    }
}

export function openNavBody(payload){
    return {
        type: "OpenNavBody",
        payload
    }
}

export function closeNavBody(payload){
    return {
        type: "CloseNavBody",
        payload
    }
}

export function openNavBodyMd(payload){
    return {
        type: "OpenNavBodyMd",
        payload
    }
}

export function closeNavBodyMd(payload){
    return {
        type: "CloseNavBodyMd",
        payload
    }
}

export function openPageProgress(payload){
    return {
        type: "OpenPageProgress",
        payload
    }
}

export function updatePageProgress(payload){
    return {
        type: "UpdatePageProgress",
        payload
    }
}

export function donePageProgress(payload){
    return {
        type: "DonePageProgress",
        payload
    }
}

