import React from 'react';
import { Col, Form } from "react-bootstrap"

import { Link } from "react-router-dom"


const header = {
    backgroundColor: "white",
    padding: "20px",
    display: "flex",
    alignItems: "center"
}

const Header = (props) => {
    return (
        <>
            <div style={header} className="d-none d-md-flex">
                <Col xs={9} md={6} className="d-none d-md-block">
                    <Form className="d-flex">
                        <Form.Control type="search" placeholder="Nhập để tìm kiếm" className="mr-2" aria-label="Search" style={{ backgroundColor: "#eee" }}>
                        </Form.Control>
                    </Form>
                </Col>
                <Col className="d-flex justify-content-end">
                    <Link to="/profile" className="d-none d-md-flex" style={{ display: "flex", color: "black", alignItems: "center" }}>
                        <img src="icon/icons8-customer-48.png" alt="error" style={{ height: "30px", width: "30px"}}/> 
                        <h5 className="mb-0">{props.infoUser.username}</h5>
                    </Link>
                </Col>
            </div>
        </>
    )
}

export default Header
