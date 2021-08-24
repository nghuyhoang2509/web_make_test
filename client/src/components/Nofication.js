import React, { useState } from 'react'
import { Row, Col, Toast } from "react-bootstrap"

const Nofication = (props) => {
    const [show, setShow] = useState(false);
    setShow(props.toggle)
    return (
        <Row>
            <Col xs={6}>
                <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide bg={props.type}>
                    <Toast.Header>
                        <img
                            src="holder.js/20x20?text=%20"
                            className="rounded me-2"
                            alt=""
                        />
                        <strong className="me-auto">Thông báo</strong>
                        <small>11 mins ago</small>
                    </Toast.Header>
                    <Toast.Body>{props.content}</Toast.Body>
                </Toast>
            </Col>
        </Row>


    )
}

export default Nofication
