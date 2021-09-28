import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { didToastMsg } from "../actions/site"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"


const notify = (msg, status) => toast[status](msg)

const ToastMsg = ({ didToastMsg, toastMsg }) => {
    useEffect(() => {
        if (toastMsg){
            if (!toast.msg){
                toast.msg = "Có lỗi xãy ra vui lòng thử lại"
            }
            notify(toastMsg.msg, toastMsg.status)
        }
        return () => {
            didToastMsg()
        }// eslint-disable-next-line
    }, [toastMsg])
    
    return (
        <>
            <ToastContainer autoClose={5000} draggable={true} pauseOnHover={false} />
        </>
    )
}

function mapStateToProps(state) {
    return {
        toastMsg: state.site.toastMsg
    }
}

export default connect(mapStateToProps, { didToastMsg })(ToastMsg)
