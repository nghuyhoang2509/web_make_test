import "@fortawesome/fontawesome-free/css/all.min.css"
import "material-icons/iconfont/material-icons.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "mdbreact/dist/css/mdb.css"
import './App.css';

import { useEffect } from "react"
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import Loading from "./components/Loading";
import Header from './components/Header';
import Login from "./pages/Login";
import Exam from "./pages/Exam"
import ToastMsg from "./components/ToastMsg";
import Category from "./pages/Category";
import { Container, Row, Col } from "react-bootstrap";
import NavBody from "./components/NavBody";
import Edit from "./pages/Edit";
import HeaderMobile from "./components/HeaderMobile"


import { verifyAuthRequest } from "./actions/login";

import 'moment-timezone'



function App(props) {
  useEffect(() => {
    if (!props.loginState.isLogined)
      props.verifyAuthRequest()
    return () => {
    }// eslint-disable-next-line
  }, [])
  return (
    <>
      {props.loginState.loginLoading ? <Loading /> :
        <>
          <ToastMsg />
          <Router>
            <Switch>
              <Route path="/login" exact>
                {props.loginState.isLogined ? <Redirect to="/"></Redirect> : <Login type="login" />}
              </Route>
              <Route path="/signup" exact>
                {props.loginState.isLogined ? <Redirect to="/"></Redirect> : <Login type="signup" />}
              </Route>
              <Route path="/exam/:id">
                <Exam isLogined={props.loginState.isLogined}></Exam>
              </Route>
              <Route path="**">
                {props.loginState.isLogined ?
                  <Container fluid style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
                    <Row className="d-md-none">
                        <HeaderMobile/>
                    </Row>
                    <Row style={{ flex: "1", overflow: "hidden" }}>
                        <NavBody infoUser={props.loginState.info} style={{ height: "100%", width: "100%" }} />
                      <Col style={{height: "100%", display: "flex", flexDirection: "column" }}>
                        <Switch>
                          <Route path="/edit/:id">
                            <Edit />
                          </Route>
                          <Route path="**">
                            <Header infoUser={props.loginState.info} />
                            <Category />
                          </Route>
                        </Switch>
                      </Col>
                    </Row>
                  </Container>
                  : <Redirect to="/login"></Redirect>}
              </Route>
            </Switch>
          </Router>
        </>}
    </>
  )
}

function mapStateToProps(state) {
  return { loginState: state.login }
}


export default connect(mapStateToProps, { verifyAuthRequest })(App);
