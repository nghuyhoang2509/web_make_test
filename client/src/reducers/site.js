const defaultReducer = {
    toastMsg: null,
    openNavBody: false
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
        default:
            return state
    }
}

export default siteReducer