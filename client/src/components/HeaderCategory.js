import React, { useState } from 'react';
import { connect } from "react-redux";
import { createTestRequest, convertFileToTextRequest } from '../actions/test';
import { toastMsgRequest } from "../actions/site"
import { Form, Button, Modal } from 'react-bootstrap';
const HeaderCategory = (props) => {
    const [test, setTest] = useState({
        title: "",
        description: ""
    })
    const [fileTest] = useState({
        type: "auto",
        file: null,
        splitQuestion: null,
        splitAnswer: null
    })
    const [generateTestOption, setGenerateTestOption] = useState(false)
    const [modalContent, setModalContent] = useState(null)
    const [show, setShow] = useState(false)
    const handleClose = () => {
        setShow(false)
        setTest({
            title: "",
            description: ""
        })
        fileTest.type = "auto"
        fileTest.file = null
        fileTest.splitQuestion = null
        fileTest.splitAnswer = null
        setGenerateTestOption(false)
    }
    function submitTest() {
        if (!test.title) {
           return props.toastMsgRequest({ msg: "Không được bỏ trống tiêu đề", status: "error" })
        }
        if (modalContent === "createFile") {
            if (!fileTest.file) {
                return props.toastMsgRequest({ msg: "Bạn vẫn chưa tải file lên hoặc file sai định dạng", status: "error" })
            }
            if (fileTest.type === "custom") {
                if (!fileTest.splitAnswer || !fileTest.splitQuestion) {
                    return props.toastMsgRequest({ msg: "Bạn không được để trống các trường phân biệt", status: "error" })
                }
            }
            props.convertFileToTextRequest({ fileTest, test })
            return handleClose()

        }
        props.createTestRequest(test)
        handleClose()
    }
    const handleShow = (contentType) => {
        setModalContent(contentType)
        setShow(true)
    }
    function readFile(file) {
        if (file) {
            if (file.size > 50000000) {
                return props.toastMsgRequest({ msg: "File không được quá 50mb", status: "warning" })
            }
            if (file.type !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
                return props.toastMsgRequest({ msg: "File không đúng định dạng ", status: "warning" })
            }
            fileTest.file = file
        }
    }
    return (
        <>
            <div className="row d-flex" style={{ backgroundColor: "white", }}>
                <Button variant="outline-info" className="col d-flex align-items-center justify-content-center" onClick={() => handleShow("createHand")}>
                    <img alt="Tạo thủ công" src={`https://firebasestorage.googleapis.com/v0/b/testmaker-4bf4e.appspot.com/o/icons%2Ficons8-create-48.png?alt=media&token=7e634cf6-45e0-4bbb-a661-fb4f95d6e5fb`} />
                </Button>
                <Button variant="outline-info" className="col d-flex align-items-center justify-content-center" onClick={() => handleShow("createFile")}>
                    <img alt="Tạo bằng word" src={`https://firebasestorage.googleapis.com/v0/b/testmaker-4bf4e.appspot.com/o/icons%2Ficons8-microsoft-word-2019-48.png?alt=media&token=7a7a2c37-dd8f-4e9b-b445-f2f8a7db3793`} />
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
                            <Form.Label className="text-600">Tiêu đề</Form.Label>
                            <Form.Control style={{ backgroundColor: "#f3f4f6" }} type="text" value={test.title} onChange={(e) => setTest({
                                ...test,
                                title: e.target.value
                            })} placeholder="nhập tên tiêu đề (bắt buộc)" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label className="text-600">Mô tả</Form.Label>
                            <Form.Control style={{ backgroundColor: "#f3f4f6" }} type="text" value={test.description} onChange={(e) => setTest({
                                ...test,
                                description: e.target.value
                            })} placeholder="nhập mô tả (không bắt buộc)" />
                        </Form.Group>
                        {modalContent === "createFile" ?
                            <>
                                <input type="file" className="mt-4 d-block" onChange={(e) => readFile(e.target.files[0])} />
                                <Form.Text>Tải tệp đề word</Form.Text>
                                <Form.Group className="my-4">
                                    <Form.Label className="text-600 d-flex align-items-center">Chế độ tạo</Form.Label>
                                    <Form.Check onChange={(e) => { setGenerateTestOption(false); fileTest.type = "auto" }} style={{ height: "30px" }} label="Tự động" type="radio" name="optionGenerateTest" defaultChecked />
                                    <Form.Check onChange={(e) => { setGenerateTestOption(true); fileTest.type = "custom" }} style={{ height: "30px" }} label="Nâng cao" type="radio" name="optionGenerateTest" />
                                    <Form.Group className={generateTestOption ? "d-block" : "d-none"}>
                                        <Form.Control className="my-4" defaultValue="" onChange={(e) => fileTest.splitQuestion = e.target.value} style={{ backgroundColor: "#f3f4f6" }} placeholder="Phân biệt giữa các câu hỏi" />
                                        <Form.Control className="my-4" defaultValue="" onChange={(e) => fileTest.splitAnswer = e.target.value} style={{ backgroundColor: "#f3f4f6" }} placeholder="Phân biệt giữa các đáp án" />
                                    </Form.Group>
                                </Form.Group>
                            </>
                            : <></>}
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


export default connect(null, { createTestRequest, toastMsgRequest, convertFileToTextRequest })(HeaderCategory)
