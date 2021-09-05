import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { connect } from "react-redux";
import { loginRequest } from '../actions/login';
import { toastMsgRequest } from '../actions/site';
import Signup from "./Signup"

const Login = (props) => {
    const [type, setType] = useState(props.type || "login")
    var [formUser, setFormUser] = useState({
        username: "",
        password: ""
    })
    function changeUsername(e) {
        setFormUser({ ...formUser, username: e.target.value })
    }
    function changePassword(e) {
        setFormUser({ ...formUser, password: e.target.value })
    }
    function submitForm(e) {
        e.preventDefault()
        if (formUser.username !== "" && formUser.password !== "") {
            props.loginRequest(formUser)
            setFormUser({
                username: "",
                password: ""
            })
        } else {
            props.toastMsgRequest({ msg: "bạn vui lòng điền đủ các trường", status: "error" })
        }
    }

    return (
        <>
            {type === "login" ?
                <Container className="vh-100 vw-100 d-flex align-items-center">
                    <Form className="col-lg-4 col-12 offset-lg-4">
                        <h3 className="mb-4">Đăng Nhập</h3>
                        <Form.Group className="mb-3" controlId="formBasicUsername">
                            <Form.Control type="text" placeholder="Nhập tên tài khoản" value={formUser.username} autoComplete="username" onChange={(e) => changeUsername(e)} />
                            <Form.Text className="text-danger">
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control type="password" placeholder="Nhập mật khẩu" value={formUser.password} autoComplete="current-password" onChange={(e) => changePassword(e)} />
                            <Form.Text className="text-danger">
                            </Form.Text>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="btn-submit" onClick={(e) => submitForm(e)}>
                            Đăng nhập
                        </Button>
                        <p className="mt-4">Nếu chưa có tài khoản bấm vào đây. <span style={{ color: "#4285f4" }} onClick={(e)=> { e.preventDefault(); setType("signup")}}>Đăng ký</span></p>
                        <p className="text-600">{props.loginState.loginStatus}</p>
                    </Form>
                </Container>
                : <Signup setType={setType}/>
                }
        </>
    )
}

function mapStateToProps(state) {
    return { loginState: state.login }
}

export default connect(mapStateToProps, { loginRequest, toastMsgRequest })(Login)
