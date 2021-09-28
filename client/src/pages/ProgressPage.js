import React from 'react'
import { connect } from 'react-redux'
import { ProgressBar } from 'react-bootstrap'

const ProgressPage = ({ progress }) => {
    return (
        <>
            {progress 
            ?
                    <div style={{ 
                        position: "fixed", 
                        top: 0, 
                        bottom: 0, 
                        right: 0, 
                        left: 0, 
                        backgroundColor:"white",
                        height: "100vh", 
                        width: "100vw", 
                        zIndex: "10000",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center" }}>
                        <div style={{ height: "50px", width: "80%" }}>
                            <h3>Vui lòng đợi quá trình đang diễn ra</h3>
                        <ProgressBar animated now={progress}/>

                        </div>
                    </div >
                    : <></>}
        </>
    )
}

function mapStateToProps(state) {
    return {
        progress: state.site.progress
    }
}


export default connect(mapStateToProps)(ProgressPage)
