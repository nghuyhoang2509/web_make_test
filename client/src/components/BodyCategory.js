import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { loadTestRequest, deleteTestRequest } from '../actions/test';
import { Card, Button, Modal } from 'react-bootstrap';
import { Link } from "react-router-dom"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"

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
    
    useEffect(() => {
        //if (props.testLoaded === null) {
            props.loadTestRequest()
       // }
        return () => {
        }// eslint-disable-next-line
    }, [])
    function deleteTest() {
        props.deleteTestRequest(idTest)
        handleClose()
    }
    return (
        <>
            <div className="row mt-1 list-test-card" style={{ overflowY: "scroll", flex: "1" }}>
                {props.loadingTest ?
                    <SkeletonTheme color="#ffffff" highlightColor="#e2e5ea">
                        <Skeleton count={4} height={"50%"} width={"50%"} className="mr-4"></Skeleton>
                    </SkeletonTheme>
                    :
                    <>
                        {props.testLoaded
                            ?
                            <>
                                 {props.testLoaded.map((test) =>
                                    <div className="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center my-4" key={test._id}>
                                        <Card style={{ width: '18rem' }} className="test-card" >
                                            <Card.Body>
                                                <Card.Title className="title">{test.title}</Card.Title>
                                                <Card.Text className="description">
                                                    {test.description}
                                                </Card.Text>
                                                <Link to={"edit/" + test._id}>
                                                    <Button variant="primary" style={{ width: "100%" }} className="m-0">
                                                        Mở
                                                    </Button>
                                                </Link>
                                            </Card.Body>
                                            <img alt="xóa" src={`https://firebasestorage.googleapis.com/v0/b/testmaker-4bf4e.appspot.com/o/icons%2Ftrash_48px.png?alt=media&token=e5594c61-b8c7-43df-b2cf-90ac10505824`} className="btn-delete" onClick={() => handleShow(test._id)}>
                                            </img>
                                        </Card>
                                    </div>)}
                            </>
                            : <></>
                        }
                        {props.testLoaded?.length === 0 ?
                            <div className="d-flex justify-content-center align-items-center" style={{ flexDirection: "column" }}>
                                <img alt="trống" src={"https://firebasestorage.googleapis.com/v0/b/testmaker-4bf4e.appspot.com/o/icons%2Ficons8-empty-box-64.png?alt=media&token=605e145a-f95f-48f4-a382-814723d2cbc8"} />
                                <h4 className="mt-4">Bạn chưa tạo đề nào</h4>
                            </div> : <></>}
                    </>}
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
