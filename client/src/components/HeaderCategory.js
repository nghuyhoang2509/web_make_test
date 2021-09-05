import React, { useState } from 'react';
import { connect } from "react-redux";
import { createTestRequest } from '../actions/test';
import { Form, Button, Modal } from 'react-bootstrap';
const HeaderCategory = (props) => {
    const [test, setTest] = useState({
        title: "",
        description: ""
    })
    const [show, setShow] = useState(false)
    const handleClose = () => {
        setShow(false)
        setTest({
            title: "",
            description: ""
        })
    }
    function submitTest(){
        if (!test.title){
            alert("Vui lòng không bỏ trống tiêu đề")
        }else{
            handleClose()
            props.createTestRequest(test)
            setTest({
                title: "",
                description: ""
            })
        }
    }
    const handleShow = () => setShow(true)
    return (
        <>
            <div className="row d-flex" style={{ backgroundColor: "white", }}>
                <Button variant="outline-info" className="col d-flex align-items-center justify-content-center" onClick={handleShow}>
                    <img alt="error" src={`${window.location.origin}/icon/icons8-create-48.png`}/>
                </Button>
                <Button variant="outline-info" className="col d-flex align-items-center justify-content-center" onClick={handleShow}>
                    <img alt="error" src={`${window.location.origin}/icon/icons8-microsoft-word-2019-48.png`}/>
                </Button>
            </div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Tạo Đề</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Tiêu đề</Form.Label>
                            <Form.Control type="text" value={test.title} onChange={(e) => setTest({
                                ...test,
                                title: e.target.value
                            })} placeholder="nhập tên tiêu đề (bắt buộc)" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Mô tả</Form.Label>
                            <Form.Control type="text" value={test.description} onChange={(e) => setTest({
                                ...test,
                                description: e.target.value
                            })} placeholder="nhập mô tả (không bắt buộc)" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} className="m-0">
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={() => submitTest()}>Tạo</Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}


export default connect(null, { createTestRequest })(HeaderCategory)
