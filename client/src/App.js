import "material-icons/iconfont/material-icons.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { useEffect } from "react"
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import Loading from "./components/Loading";
import Home from './pages/Home';
import Header from './components/Header';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Test from "./pagesprivate/test/Test";
import Exam from "./pagesprivate/test/Exam"


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
          <Router>
            <Switch>
              <Route path="/login" exact>
                {props.loginState.isLogined ? <Redirect to="/"></Redirect> : <Login />}
              </Route>
              <Route path="/signup" exact>
                {props.loginState.isLogined ? <Redirect to="/"></Redirect> : <Signup />}
              </Route>
              <Route path="/exam/:id">
                <Exam></Exam>
              </Route>
              <Route path="/admin/test">
              <Header infoUser={props.loginState.info} />
                <Test />
              </Route>
              <Route path="**">
              <Header infoUser={props.loginState.info} />
                <Home />
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
