import React from 'react'
import { Link } from "react-router-dom"
import { connect } from 'react-redux'
import { openNavBody } from "../actions/site"
import NavBody from './NavBody'

const HeaderMobile = (props) => {
    return (
        <>
        <div style={{ backgroundColor: "white", position: "sticky", top: 0, left: 0, right: 0, display: "flex", justifyContent: "space-between", height: "50px", alignItems: "center"}}>
            <Link to="/" >
                {/* <img src="%PUBLIC_URL%/image/logoWeb.png"></img> */}
                <h2 style={{ fontWeight: "700", marginBottom: "0", marginLeft: "10px" }}>TestMaker</h2>
            </Link>
            <img src={`https://firebasestorage.googleapis.com/v0/b/testmaker-4bf4e.appspot.com/o/icons%2Ficons8-menu-48.png?alt=media&token=d0f6e0de-5cf1-428c-a871-05b67d6076a8`} alt="error" className="d-block d-md-none" style={{ height: "30px" }} onClick={() => props.openNavBody()} />
        </div>
        <NavBody style={{ height: "100%", width: "100%" }} />
        </>
    )
}

export default connect(null, { openNavBody })(HeaderMobile)
