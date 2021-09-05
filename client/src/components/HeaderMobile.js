import React from 'react'
import { Link } from "react-router-dom"
import { connect } from 'react-redux'
import { openNavBody } from "../actions/site"
import NavBody from './NavBody'

const HeaderMobile = (props) => {
    return (
        <>
        <div style={{ position: "sticky", top: 0, left: 0, right: 0, display: "flex", justifyContent: "space-between", height: "50px", alignItems: "center"}}>
            <Link to="/" >
                {/* <img src="%PUBLIC_URL%/image/logoWeb.png"></img> */}
                <h2 style={{ fontWeight: "700", marginBottom: "0", marginLeft: "10px" }}>TestMaker</h2>
            </Link>
            <img src="icon/icons8-menu-48.png" alt="error" className="d-block d-md-none" style={{ height: "30px" }} onClick={() => props.openNavBody()} />
        </div>
        <NavBody style={{ height: "100%", width: "100%" }} />
        </>
    )
}

export default connect(null, { openNavBody })(HeaderMobile)
