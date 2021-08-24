import React from 'react'
import { Link } from 'react-router-dom'

const Tools = () => {
    console.log('tools')
    return (
        <>
            <div className="container">
                <div className="row my-200px">
                    <div className="col-md-6 col-xs-12 col-lg-3 d-flex justify-content-center">
                        <Link to="/admin/test/category">
                        <div className="tools-card">
                            <span className="material-icons-outlined font-size-xxlarge mb-4 text-warning">quiz</span>
                            <h5 className="text-dark">Đề Thi</h5>
                        </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Tools
