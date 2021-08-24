import React from 'react';
import { Link } from "react-router-dom";

const ScrollTop = (props) => {
    function scrollTop(){
        window.scrollTo(0,0)
    }
    return (
        <Link to={props.url}>
            <div className="arrow-top fixed-bottom cursor-pointer" onClick={()=>{scrollTop()}}>
                 <span className="material-icons-outlined">
                    arrow_upward
                </span>
            </div>
        </Link>
    )
}

export default ScrollTop
