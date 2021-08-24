import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap';

const Create = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <div class="container">
                <div className="row my-200px">
                    <div className="col d-flex justify-content-center" onClick={handleShow}>
                        <div className="tools-card">
                            <span className="material-icons-outlined font-size-xxlarge mb-4 text-primary">cloud_upload</span>
                            <h5 className="text-dark">Tạo đề từ file word</h5>
                        </div>
                    </div>
                    <div className="col d-flex justify-content-center">
                        <div className="tools-card">
                            <span className="material-icons-outlined font-size-xxlarge mb-4 text-primary">note_alt</span>
                            <h5 className="text-dark">Tạo đề thủ công</h5>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Tạo Đề Từ File Word</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Chuẩn bị ra mắt
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary">Tạo đề ngay</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Create
