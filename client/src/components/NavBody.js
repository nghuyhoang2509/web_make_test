import React, { useState } from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom';
import { connect } from "react-redux"
import { logoutRequest } from "../actions/login"
import { closeNavBody, openNavBodyMd, closeNavBodyMd, toastMsgRequest } from '../actions/site';
import { Col, Modal, Button } from "react-bootstrap"


const navigation = {
    top: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "white"
}

const overLay = {
    position: "fixed",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
    zIndex: "1031",
    backgroundColor: "rgba(0,0,0,0.2)"
}

const NavBody = (props) => {
    const history = useHistory()
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [examId, setExamId] = useState("")
    return (
        <>
            {props.navBody ? <div style={overLay} onClick={() => props.closeNavBody()}></div> : <></>}
            <Col md={3} className={`nav-body ${props.navBody ? "show" : null} ${!props.navBodyMd ? "close" : "open"}`}>
                <img alt="đóng" onClick={() => props.closeNavBodyMd()} className={`btn-show-navbodymd ${!props.navBodyMd ? "close" : "open"}`} src={"https://firebasestorage.googleapis.com/v0/b/testmaker-4bf4e.appspot.com/o/icons%2Ficons8-show-left-side-panel-48.png?alt=media&token=24fad188-ed22-48fe-99bc-f066e68b1560"} />
                <img alt="mở" onClick={() => props.openNavBodyMd()} className={`btn-show-navbodymd ${props.navBodyMd ? "close" : "open"}`} src={"https://firebasestorage.googleapis.com/v0/b/testmaker-4bf4e.appspot.com/o/icons%2Ficons8-show-right-side-panel-48.png?alt=media&token=45c4ca3c-de7b-4277-bb77-9bcd6b39fe1e"} />
                <div className={`h-100`}>
                    <Link to="/" >
                        {/* <img src="%PUBLIC_URL%/image/logoWeb.png"></img> */}
                        <h2 style={{ fontWeight: "700", marginBottom: "0", marginLeft: "10px" }}>TestMaker</h2>
                    </Link>
                    <div style={navigation}>
                        <div style={{ backgroundColor: "#f3f4f6" }}>
                            <div className="my-2" style={{ backgroundColor: "white", padding: "10px" }}>
                                <h6 style={{ fontWeight: "600", opacity: "0.6", fontSize: "14px" }}>Menu</h6>
                                <Link to="/" className="d-flex link-navbody" style={{ alignItems: "center", padding: "5px 0", color: "black" }}>
                                    <img alt="lổi ảnh" src={"https://firebasestorage.googleapis.com/v0/b/testmaker-4bf4e.appspot.com/o/icons%2Ficons8-empty-box-48.png?alt=media&token=52bddf71-8a73-4769-91be-c69ef492a7aa"} style={{ height: "30px", marginLeft: "20px", marginRight: "15px" }} />
                                    <p className="mb-0" style={{ fontWeight: "600", opacity: "0.7" }} >Kho đề thi</p>
                                </Link>
                                <div onClick={handleShow} className="d-flex link-navbody cursor-pointer" style={{ alignItems: "center", padding: "5px 0", color: "black" }}>
                                    <img alt="lổi ảnh" src={`https://firebasestorage.googleapis.com/v0/b/testmaker-4bf4e.appspot.com/o/icons%2Ficons8-document-48.png?alt=media&token=96a5baa4-9633-492e-9733-4639ef5255e3`} style={{ height: "30px", marginLeft: "20px", marginRight: "15px" }} />
                                    <p className="mb-0" style={{ fontWeight: "600", opacity: "0.7" }} >Thi</p>
                                </div>
                                <Link to="/help" className="d-flex link-navbody" style={{ alignItems: "center", padding: "5px 0", color: "black" }}>
                                    <img alt="lổi ảnh" src={"https://firebasestorage.googleapis.com/v0/b/testmaker-4bf4e.appspot.com/o/icons%2Ficons8-help-48.png?alt=media&token=10ea3f49-beab-4e94-99ed-e9edef15f939"} style={{ height: "30px", marginLeft: "20px", marginRight: "15px" }} />
                                    <p className="mb-0" style={{ fontWeight: "600", opacity: "0.7" }} >Hướng dẫn</p>
                                </Link>
                            </div>
                            <div className="my-2" style={{ backgroundColor: "white", padding: "10px" }}>
                                <h6 style={{ fontWeight: "600", opacity: "0.6", fontSize: "14px" }}>Tài khoản</h6>
                                <Link to="/profile" className="d-flex link-navbody" style={{ alignItems: "center", padding: "5px 0", color: "black" }}>
                                    <img alt="lổi ảnh" src={`https://firebasestorage.googleapis.com/v0/b/testmaker-4bf4e.appspot.com/o/icons%2Ficons8-person-48.png?alt=media&token=859fc38b-7e1e-4567-bd9e-81ee39a9282d`} style={{ height: "30px", marginLeft: "20px", marginRight: "15px" }} />
                                    <p className="mb-0" style={{ fontWeight: "600", opacity: "0.7" }} >Cá nhân</p>
                                </Link>
                                <div onClick={() => props.logoutRequest()} className="d-flex link-navbody cursor-pointer" style={{ alignItems: "center", padding: "5px 0", color: "black" }}>
                                    <img alt="lổi ảnh" src={`https://firebasestorage.googleapis.com/v0/b/testmaker-4bf4e.appspot.com/o/icons%2Ficons8-shutdown-48.png?alt=media&token=e0acdc40-c66e-4817-b45a-3f7f83f36f9f`} style={{ height: "30px", marginLeft: "20px", marginRight: "15px" }} />
                                    <p className="mb-0" style={{ fontWeight: "600", opacity: "0.7" }} >Đăng xuất</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Col>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Thi</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <h5>Nhập id đề</h5>
                        <input value={examId} onChange={(e)=> setExamId(e.target.value)} placeholder="vui lòng nhập" style={{ width: "80%", margin: "10px", padding: "10px" }}></input>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={()=> examId ? history.push(`/exam/${examId}`): props.toastMsgRequest({ msg: "Vui lòng không bỏ trống", status: "error" })}>
                        Thi
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

function mapStateToProps(state) {
    return {
        navBody: state.site.openNavBody,
        navBodyMd: state.site.openNavBodyMd,
    }
}

export default withRouter(connect(mapStateToProps, { logoutRequest, closeNavBody, openNavBodyMd, closeNavBodyMd, toastMsgRequest })(NavBody))
