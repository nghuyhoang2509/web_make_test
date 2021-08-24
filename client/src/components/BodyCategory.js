import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { loadTestRequest, deleteTestRequest } from '../actions/test';
import { Card, Button, Modal } from 'react-bootstrap';
import { Link } from "react-router-dom"
import Loading from "./Loading"

const BodyCategory = (props) => {
    const [idTest, setIdTest] = useState("")
    const [show, setShow] = useState(false);
    function handleShow(id) {
        setShow(true)
        setIdTest(id)
    }
    function handleClose() {
        setShow(false)
        setIdTest("")
    }
    const [loadMore, setLoadMore] = useState(true)
    useEffect(() => {
        if (loadMore) {
            props.loadTestRequest()
            setLoadMore(false)
        }
    }, [loadMore, props])
    useEffect(() => {
        if (!props.pauseLoadTest) {
            window.addEventListener('scroll', loadTest)
        }
        return () => {
            window.removeEventListener('scroll', loadTest)
        }

    }, [props.pauseLoadTest])
    function loadTest(e) {
        const root = document.querySelector('#root')
        if (e.path[1].innerHeight + e.path[1].scrollY >= root.clientHeight - 200) {
            setLoadMore(true)
        }
    }
    function deleteTest() {
        props.deleteTestRequest(idTest)
        handleClose()
    }
    return (
        <>
            <div className="row mt-100px list-test-card">
                {props.testLoaded.length
                    ?
                    <>
                        {props.testLoaded.map((test) =>
                            <div className="col d-flex justify-content-center my-4" key={test._id}>
                                <Card style={{ width: '18rem' }} className="test-card" >
                                    <Card.Body>
                                        <Card.Title className="title">{test.title}</Card.Title>
                                        <Card.Text className="description">
                                            {test.description}
                                        </Card.Text>
                                        <Link to={"exam/" + test._id}>
                                            <Button variant="primary" size="lg" className="w-100">Mở</Button>
                                        </Link>
                                    </Card.Body>
                                    <span className="material-icons-outlined btn-delete" onClick={() => handleShow(test._id)}>
                                        delete
                                    </span>
                                </Card>
                            </div>)}
                    </>
                    : <h4>Bạn chưa có tài liệu nào</h4>
                }
                {props.loadingTest ? <Loading /> : <></>}
            </div>
            <Modal
                show={show}
                onHide={() => handleClose()}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Xóa dữ liệu</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc chắn muốn xóa
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleClose()}>
                        Hủy
                    </Button>
                    <Button variant="danger" onClick={() => deleteTest()}>Xác Nhận</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

function mapStateToProps(state) {
    return {
        testLoaded: state.test.testLoaded,
        loadingTest: state.test.loadingTest,
        pauseLoadTest: state.test.pauseLoadTest
    }
}

export default connect(mapStateToProps, { loadTestRequest, deleteTestRequest })(BodyCategory)
