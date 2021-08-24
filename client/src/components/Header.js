import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from "react-redux"
import { logout } from "../actions/login"

import CanvasHeader from "./CanvasHeader"

const Header = (props) => {
    return (
        <>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Link to="/" className="text-decoration-none">
                        <Navbar.Brand>
                            TFO
                        </Navbar.Brand>
                    </Link>
                    <Nav className="flex-1 d-none d-md-flex">
                        <Link to="/tools" className="text-decoration-none nav-link me-auto">
                            Công cụ
                        </Link>
                        {props.infoUser ?
                            <>
                                <Link to="/profile" className="text-decoration-none nav-link d-flex align-items-center border-right-white">
                                    <span className="material-icons">person</span>
                                    {props.infoUser.username}
                                </Link>
                                <div className="text-decoration-none nav-link d-flex align-items-center cursor-pointer" onClick={() => props.logout()}>
                                    Đăng xuất
                                </div>
                            </> : <>
                                <Link to="/login" className="text-decoration-none nav-link border-right-white">
                                    Đăng nhập
                                </Link>
                                <Link to="/signup" className="text-decoration-none nav-link">
                                    Đăng ký
                                </Link>
                            </>}
                    </Nav>
                    <CanvasHeader {...props}/>
                </Container>
            </Navbar>
        </>
    )
}

export default connect(null, { logout })(Header)
