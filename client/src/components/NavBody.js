import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux"
import { logoutRequest } from "../actions/login"
import { closeNavBody } from '../actions/site';


const navigation = {
    top: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "white"
}

const navBodySm = {
    display: "block",
    position: "fixed",
    top: "0",
    bottom: "0",
    left: "0",
    padding: "0",
    marginTop: "-8px",
    width: "70vw",
    zIndex: "1001"
}

const overLay = {
    position: "fixed",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
    zIndex: "1000",
    backgroundColor: "rgba(0,0,0,0.2)"
}

const NavBody = (props) => {
    return (
        <>
            {props.navBody ? <div style={overLay} onClick={() => props.closeNavBody()}></div> : <></>}
            <div className="d-md-block pt-4 h-100 bg-white nav-body" style={props.navBody ? navBodySm : { display: "none" }}>
                <Link to="/" >
                    {/* <img src="%PUBLIC_URL%/image/logoWeb.png"></img> */}
                    <h2 style={{ fontWeight: "700", marginBottom: "0", marginLeft: "10px" }}>TestMaker</h2>
                </Link>
                <div style={navigation}>
                    <div style={{ backgroundColor: "#f3f4f6" }}>
                        <div className="my-2" style={{ backgroundColor: "white", padding: "10px" }}>
                            <h6 style={{ fontWeight: "600", opacity: "0.6", fontSize: "14px" }}>Menu</h6>
                            <Link to="/" className="d-flex link-navbody" style={{ alignItems: "center", padding: "5px 0", color: "black" }}>
                                <img alt="new" src="icon/icons8-empty-box-48.png" style={{ height: "30px", marginLeft: "20px", marginRight: "15px" }} />
                                <p className="mb-0" style={{ fontWeight: "600", opacity: "0.7" }} >Kho đề thi</p>
                            </Link>
                            <div className="d-flex link-navbody cursor-pointer" style={{ alignItems: "center", padding: "5px 0", color: "black" }}>
                                <img alt="new" src="icon/icons8-document-48.png" style={{ height: "30px", marginLeft: "20px", marginRight: "15px" }} />
                                <p className="mb-0" style={{ fontWeight: "600", opacity: "0.7" }} >Thi</p>
                            </div>
                            <Link to="/help" className="d-flex link-navbody" style={{ alignItems: "center", padding: "5px 0", color: "black" }}>
                                <img alt="new" src="icon/icons8-help-48.png" style={{ height: "30px", marginLeft: "20px", marginRight: "15px" }} />
                                <p className="mb-0" style={{ fontWeight: "600", opacity: "0.7" }} >Hướng dẫn</p>
                            </Link>
                        </div>
                        <div className="my-2" style={{ backgroundColor: "white", padding: "10px" }}>
                            <h6 style={{ fontWeight: "600", opacity: "0.6", fontSize: "14px" }}>Tài khoản</h6>
                            <Link to="/profile" className="d-flex link-navbody" style={{ alignItems: "center", padding: "5px 0", color: "black" }}>
                                <img alt="new" src="icon/icons8-person-48.png" style={{ height: "30px", marginLeft: "20px", marginRight: "15px" }} />
                                <p className="mb-0" style={{ fontWeight: "600", opacity: "0.7" }} >Cá nhân</p>
                            </Link>
                            <div onClick={() => props.logoutRequest()} className="d-flex link-navbody cursor-pointer" style={{ alignItems: "center", padding: "5px 0", color: "black" }}>
                                <img alt="new" src="icon/icons8-shutdown-48.png" style={{ height: "30px", marginLeft: "20px", marginRight: "15px" }} />
                                <p className="mb-0" style={{ fontWeight: "600", opacity: "0.7" }} >Đăng xuất</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function mapStateToProps(state) {
    return {
        navBody: state.site.openNavBody
    }
}

export default connect(mapStateToProps, { logoutRequest, closeNavBody })(NavBody)
