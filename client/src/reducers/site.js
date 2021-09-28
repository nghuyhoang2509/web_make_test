const defaultReducer = {
    toastMsg: null,
    openNavBody: false,
    openNavBodyMd: true,
    progress: null
}

const siteReducer = (state = defaultReducer, action) => {
    switch (action.type) {
        case "DidToastMsg": {
            return {
                ...state,
                toastMsg: null
            }
        }
        case "ToastMsgRequest": {
            return {
                ...state,
                toastMsg: action.payload
            }
        }
        case "OpenNavBody" : {
            return {
                ...state,
                openNavBody: true
            }
        }

        case "CloseNavBody" : {
            return {
                ...state,
                openNavBody: false
            }
        }
        case "OpenNavBodyMd" : {
            return {
                ...state,
                openNavBodyMd: true
            }
        }

        case "CloseNavBodyMd" : {
            return {
                ...state,
                openNavBodyMd: false
            }
        }
        case "OpenPageProgress" : {
            return {
                ...state,
                progress: 1
            }
        }

        case "UpdatePageProgress" : {
            return {
                ...state,
                progress: action.payload.progressValue
            }
        }
        case "DonePageProgress" : {
            return {
                ...state,
                progress: null
            }
        }
        default:
            return state
    }
}

export default siteReducer