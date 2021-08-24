import React from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import Login from '../pages/Login'

const PrivateRouter = (props) => {
    return (
        <>
            <Route path={props.path}> 
                {props.loginState.isLogined
                ?
                <>
                    {props.components}
                </>
                : <Login/>}
            </Route>


        </>
    )
}

function mapStateToProps(state){
    return {
        loginState: state.login
    }
}

export default connect(mapStateToProps)(PrivateRouter)
