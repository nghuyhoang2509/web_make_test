import React, { useState, useRef, useEffect } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import { connect } from "react-redux"
import { createUserRequest } from "../actions/signup"
import { toastMsgRequest } from '../actions/site'

const Signup = (props) => {
    var [formUser, setFormUser] = useState({
        username: "",
        password: ""
    })
    var usernameRef = useRef("")
    var passwordRef = useRef("")
    var passwordCofRef = useRef("")
    var [passwordCof, setPasswordCof] = useState("")
    var [errorUsername, setErrorUsername] = useState(null)
    var [errorPassword, setErrorPassword] = useState(null)
    var [errorPasswordCof, setErrorPasswordCof] = useState(null)

    useEffect(() => {
        if (formUser.username.length < 8 || formUser.username.includes(" ") || formUser.username.length > 24) {
            setErrorUsername("Nhập tên tài khoản tối thiểu 8 và tối đa 24 kí tự, không có khoảng trắng.")
        } else {
            setErrorUsername("")
        }
        if (formUser.password.length < 6 || formUser.password.includes(" ") || formUser.password.length > 16) {
            setErrorPassword("Nhập tên tài khoản tối thiểu 8 và tối đa 16 kí tự, không có khoảng trắng.")
        } else {
            setErrorPassword("")
            if (formUser.password !== passwordCof) {
                setErrorPasswordCof("Xác nhận mật khẩu không chính xác")
            } else {
                setErrorPasswordCof("")
            }
        }
        if (passwordCof === formUser.password) {
            setErrorPasswordCof("")
        } else {
            setErrorPasswordCof("Xác nhân mật khẩu không chính xác")
        }
    }, [formUser, passwordCof])

    function changeUsername(e) {
        setFormUser({ ...formUser, username: e.target.value })
    }
    function changePassword(e) {
        setFormUser({ ...formUser, password: e.target.value })
    }
    function changePasswordCof(e) {
        setPasswordCof(e.target.value)
    }
    function submitForm(e) {
        e.preventDefault()
        if (props.signupState.signupLoading === true) {
            props.toastMsgRequest({ msg: "Hãy đợi tài khoản tạo xong", status: "error" })
        } else {
            if (errorUsername === "" && errorPassword === "" && errorPasswordCof === "") {
                props.createUserRequest(formUser)
                setFormUser({
                    username: "",
                    password: ""
                })
                setPasswordCof("")
                setErrorPassword(null)
                setErrorUsername(null)
                setErrorPasswordCof(null)
            } else {
                props.toastMsgRequest({ msg: "Vui lòng nhập thông tn hợp lệ", status: "error" })
            }
        }
    }
    return (
        <>
            <Container className="vh-100 vw-100 d-flex align-items-center">
                <Form className="col-lg-4 col-12 offset-lg-4">
                    <h3 className="mb-4">Đăng Ký</h3>
                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Control ref={usernameRef} type="text" placeholder="Nhập tên tài khoản" value={formUser.username} autoComplete="username" onChange={(e) => changeUsername(e)} />
                        <Form.Text className="text-danger mt-1">
                            {errorUsername}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control ref={passwordRef} type="password" placeholder="Nhập mật khẩu" value={formUser.password} autoComplete="new-password" onChange={(e) => changePassword(e)} />
                        <Form.Text className="text-danger">
                            {errorPassword}
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPasswordCof">
                        <Form.Control ref={passwordCofRef} type="password" placeholder="Nhập lại mật khẩu" value={passwordCof} autoComplete="new-password" onChange={(e) => changePasswordCof(e)} />
                        <Form.Text className="text-danger">
                            {errorPasswordCof}
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit" className="btn-submit" onClick={(e) => submitForm(e)}>
                        Đăng ký
                    </Button>
                    <p className="mt-4">Nếu đã có tài khoản bấm vào đây. <span style={{ color: "#4285f4" }} onClick={(e)=> { e.preventDefault(); props.setType("login")}}>Đăng nhập</span></p>
                    <p className="text-600">{props.signupState.signupStatus}</p>
                </Form>
            </Container>
        </>
    )
}

function mapStateToProps(state) {
    return {
        signupState: state.signup,
        loginState: state.login
    }
}

export default connect(mapStateToProps, { createUserRequest, toastMsgRequest })(Signup)
