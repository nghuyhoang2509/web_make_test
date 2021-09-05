import React from 'react'
import { Spinner } from "react-bootstrap"
const Loading = () => {
    return (
        <div className="vh-100 vw-100 d-flex align-items-center justify-content-center">
            <h3 className="mr-2">Loading</h3>
            <Spinner role="status" animation="border" variant="primary"/>
        </div>
    )
}

export default Loading
