import React from 'react'
import { Link } from 'react-router-dom'


const home = () => {
    return (
        <>
            <div className="jumbotron jumbotron-fluid vh-100 vw-100 slider">
                <div className="container">
                    <h1 className="display-4">Chào mừng bạn đến với chúng tôi</h1>
                    <p className="lead">Website hỗ trợ các công cụ tạo đề thi dễ dàng và nhanh chóng</p>
                    <hr className="my-4" />
                    <p>Bấm vào đây để bắt đầu tạo nhanh đề thi</p>
                    <p className="lead">
                        <Link to="tools" className="btn btn-primary btn-lg" role="button">Tạo ngay</Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default home
