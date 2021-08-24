import React, { useState } from "react";
import { Button, Offcanvas, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom"

const CanvasHeader = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow} className="d-flex d-md-none justify-content-center align-items-center p-0">
                <span className="material-icons-outlined h-100 w-100 font-36px">
                    toc
                </span>
            </Button>

            <Offcanvas show={show} onHide={handleClose} placement="end" >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>{props.infoUser
                        ?
                        <Link to="/profile" className="text-decoration-none d-flex align-items-center text-dark font-size-xlarge" onClick={handleClose}>
                            <span className="material-icons font-size-xxlarge">person</span>
                            {props.infoUser.username}
                        </Link>

                        :
                        <Link to="/" className="text-decoration-none" onClick={handleClose}>
                            <Navbar.Brand>
                                TFO
                            </Navbar.Brand>
                        </Link>}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="border-top-dark">
                    <Link to="/tools" className="text-decoration-none me-auto text-dark font-weight-bold font-size-larger my-16px opacity-6" onClick={handleClose}>
                        Công cụ
                    </Link>
                    {props.infoUser
                        ?
                        <div className="text-decoration-none cursor-pointer font-weight-bold font-size-larger my-16px opacity-6" onClick={() => props.logout()}>
                            Đăng xuất
                        </div>
                        :
                        <>
                            <Link to="/login" className="text-decoration-none font-weight-bold font-size-larger my-16px opacity-6 text-dark d-block" onClick={handleClose}>
                                Đăng nhập
                            </Link>
                            <Link to="/signup" className="text-decoration-none font-weight-bold font-size-larger my-16px opacity-6 text-dark d-block p-0" onClick={handleClose}>
                                Đăng ký
                            </Link>
                        </>
                    }
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default CanvasHeader