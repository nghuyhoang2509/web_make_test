import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { connect } from "react-redux";

import {
    getTestRequest,
    createQuestion,
    updateExam,
    createOption,
    updateQuestion,
    updateTestRequest,
    updateOption,
    updateAnswer,
    deleteOption,
    deleteQuestion,
    movePositionQuestion,
    stopPollingResponse
} from '../actions/test';
import { toastMsgRequest } from '../actions/site';
import { Form, Tab, Dropdown, Nav, Modal, Col, Row } from "react-bootstrap"
import Setting from "../pagesprivate/test/Setting"
import Response from "../pagesprivate/test/Response"
import Moment from "react-moment"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import { CopyToClipboard } from 'react-copy-to-clipboard';


const Edit = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [questionMove, setQuestionMove] = useState(null)
    const { id } = useParams()
    useEffect(() => {
        if (!props.loading) {
            props.getTestRequest({
                id,
                userId: props.user.id,
                edit: true
            })
        }
        return () => {
            props.updateTestRequest()
            props.stopPollingResponse({ testId: id })
        }// eslint-disable-next-line
    }, [])
    return (
        <>
            {props.loading ?
                <SkeletonTheme color="#ffffff" highlightColor="#e2e5ea">
                    <Skeleton count={4} height={"200%"} width={"200%"}></Skeleton>
                </SkeletonTheme>
                :
                <>
                    {props.user.id === props.exam?.userId
                        ?
                        <>
                            {props.exam ?
                                <>
                                    <Tab.Container defaultActiveKey="edit">
                                        <Nav variant="tabs" >
                                            <Nav.Item>
                                                <Nav.Link eventKey="edit" className="text-600">Đề thi</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="responseAnswer" className="text-600">Phản hồi</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="setting" className="text-600">Cài đặt</Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                        <Tab.Content style={{ flex: "1", overflowY: "scroll", position: "relative" }}>
                                            <Tab.Pane eventKey="edit" >
                                                <div className="exam select-none">
                                                    <div className="exam-header" onBlur={() => props.updateTestRequest()}>
                                                        <i><Moment format="hh:mm:ss DD/MM/YYYY">{props.exam.createdAt}</Moment></i>
                                                        <h3 suppressContentEditableWarning="true" className="exam-title" contentEditable="true" onBlur={(e) => props.updateExam({ title: e.target.innerText })}>{props.exam.title.toUpperCase()}</h3>
                                                        <p suppressContentEditableWarning="true" className="exam-description" onBlur={(e) => props.updateExam({ description: e.target.innerText })} contentEditable="true">{props.exam.description ? props.exam.description : <>Chưa có mô tả</>}</p>
                                                    </div>
                                                    <Form className="mt-4 exam-questions">
                                                        {props.exam.questions.length > 0
                                                            ?
                                                            <>
                                                                {props.exam.questions.map((question, indexQuestion) =>
                                                                    <Form.Group className="exam-question" key={indexQuestion} onChange={(e) => {

                                                                        props.updateAnswer({
                                                                            indexQuestion,
                                                                            value: e.target.value
                                                                        })
                                                                        props.updateTestRequest()
                                                                    }

                                                                    }>
                                                                        <Form.Label suppressContentEditableWarning="true" className="exam-question-title" contentEditable="true" onBlur={(e) => {
                                                                            const value = e.target.innerText
                                                                            props.updateQuestion({
                                                                                indexQuestion,
                                                                                value
                                                                            })
                                                                        }}> {question.title}</Form.Label>
                                                                        {question.options.map((option, index) =>
                                                                            <div className="d-flex align-items-center exam-question-group" key={index}>
                                                                                <Form.Check className="exam-option me-2 mt-0" value={`${index}`} type={question.type} name={indexQuestion} defaultChecked={props.exam.answers[indexQuestion] === `${index}` ? true : false} />
                                                                                <Form.Label suppressContentEditableWarning="true" contentEditable="true" className="flex-1 mb-0 exam-option-label"
                                                                                    onBlur={(e) => {
                                                                                        props.updateOption({
                                                                                            index,
                                                                                            indexQuestion,
                                                                                            value: e.target.innerText
                                                                                        })
                                                                                        props.updateTestRequest()
                                                                                    }}>{option}</Form.Label>
                                                                                <span className="material-icons-outlined exam-option-delete" onClick={() => {
                                                                                    props.deleteOption({
                                                                                        indexQuestion,
                                                                                        index
                                                                                    })
                                                                                    props.updateTestRequest()
                                                                                }}>clear</span>
                                                                            </div>)}
                                                                        <span className="mt-1 material-icons exam-add-option" onClick={() => props.createOption({ indexQuestion })}>control_point</span>
                                                                        <div className="exam-question-tool">
                                                                            <span className="material-icons exam-question-tool-item" onClick={() => {
                                                                                props.deleteQuestion({ indexQuestion })
                                                                                props.updateTestRequest()
                                                                            }}>delete_outlined</span>
                                                                        </div>

                                                                    </Form.Group>)}
                                                            </>
                                                            : <>Chưa tạo câu hỏi nào</>
                                                        }
                                                    </Form>
                                                </div>
                                                <div className="test-tools">
                                                    <div className="test-tools-btn" onClick={() => props.createQuestion()}>
                                                        <img alt="error" style={{ height: "30px" }} src={`${window.location.origin}/icon/icons8-add-48.png`} />
                                                        <span className="d-none d-md-block" style={{ fontWeight: "500", opacity: "0.8" }}>Thêm câu hỏi</span>
                                                    </div>
                                                    <div className="test-tools-btn" onClick={handleShow}>
                                                        <img alt="error" style={{ height: "30px" }} src={`${window.location.origin}/icon/icons8-link-48.png`} />
                                                        <span className="d-none d-md-block" style={{ fontWeight: "500", opacity: "0.8" }}>Lấy liên kết đề</span>
                                                    </div>
                                                    <Dropdown className="test-tools-btn" autoClose="outside">
                                                        <Dropdown.Toggle childBsPrefix bsPrefix="test-tools-btn-move test-tools-btn">
                                                            <img alt="error" style={{ height: "30px" }} src={`${window.location.origin}/icon/icons8-move-48.png`} />
                                                            <span className="d-none d-md-block" style={{ fontWeight: "500", opacity: "0.8" }}>Di chuyển</span>
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu>
                                                            <Dropdown.Header className="d-flex" style={{ justifyContent: "space-between", cursor: "text" }} >
                                                                <span style={{ color: "black" }}>
                                                                    {questionMove || questionMove === 0 ? "Di chuyển tới câu" : "Chọn câu cần di chuyển"}
                                                                </span>
                                                                {questionMove || questionMove === 0
                                                                    ?
                                                                    <span style={{ cursor: "pointer" }} onClick={() => setQuestionMove(null)}>
                                                                        Hoàn tác
                                                                    </span>
                                                                    : <></>}
                                                            </Dropdown.Header>
                                                            <Dropdown.Divider />
                                                            {props.exam.questions.map((question, indexQuestion) =>
                                                                <Dropdown.Item key={indexQuestion}
                                                                    active={indexQuestion === questionMove ? true : false}
                                                                    onClick={() => {
                                                                        if (questionMove !== null) {
                                                                            props.movePositionQuestion({ indexQuestionFrom: questionMove, indexQuestionTo: indexQuestion })
                                                                            props.updateTestRequest()
                                                                            setQuestionMove(null)
                                                                        }
                                                                        else {
                                                                            setQuestionMove(indexQuestion)
                                                                        }
                                                                    }}
                                                                >
                                                                    {question.title}
                                                                </Dropdown.Item>
                                                            )}
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </div>
                                                <Modal
                                                    show={show}
                                                    onHide={handleClose}
                                                    backdrop="static"
                                                    keyboard={false}
                                                    dialogClassName="modal-link"
                                                >
                                                    <Modal.Header closeButton>
                                                        <Modal.Title style={{ fontWeight: "600", opacity: "0.9" }}>Liên kết</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <div>
                                                            <div style={{ fontWeight: "600", opacity: "0.8" }}>Liên kết làm bài</div>
                                                            <Row style={{ margin: "10px", display: "flex", alignItems: "center" }}>
                                                                <Col xs={10} style={{ overflowX: "hidden", padding: "8px", textOverflow: "ellipsis", backgroundColor: "#f3f4f6" }}>
                                                                    <input type="text" readOnly style={{ fontWeight: "500", width: "100%", outline: "none", border: "none", backgroundColor: "#f3f4f6" }} value={`${window.location.origin}/exam/${id}`} />
                                                                </Col>
                                                                <Col>
                                                                    <CopyToClipboard onCopy={() => props.toastMsgRequest({ msg: "Đã sao chép", status: "success" })} text={`${window.location.origin}/exam/${id}`}>
                                                                        <span style={{ fontWeight: "500", boxShadow: "0px 1px 0px 0.5px rgba(0,0,0,0.4)", padding: "5px", borderRadius: "5px", cursor: "pointer" }}>Copy</span>
                                                                    </CopyToClipboard>
                                                                </Col>
                                                            </Row>
                                                            <div style={{ fontWeight: "600", opacity: "0.8" }}>Id đề</div>
                                                            <Row style={{ margin: "10px", display: "flex", alignItems: "center" }}>
                                                                <Col xs={10} style={{ overflowX: "hidden", padding: "8px", textOverflow: "ellipsis", backgroundColor: "#f3f4f6" }}>
                                                                    <input type="text" readOnly style={{ fontWeight: "500", width: "100%", outline: "none", border: "none", backgroundColor: "#f3f4f6" }} value={`${id}`} />
                                                                </Col>
                                                                <Col>
                                                                    <CopyToClipboard onCopy={() => props.toastMsgRequest({ msg: "Đã sao chép", status: "success" })} text={`${id}`}>
                                                                        <span style={{ fontWeight: "500", boxShadow: "0px 1px 0px 0.5px rgba(0,0,0,0.4)", padding: "5px", borderRadius: "5px", cursor: "pointer" }}>Copy</span>
                                                                    </CopyToClipboard>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </Modal.Body>

                                                </Modal>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="responseAnswer">
                                                <Response />
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="setting">
                                                <Setting />
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </Tab.Container>
                                </> : <>Không tồn tại vui lòng kiểm tra đường dẫn</>}
                        </>
                        :
                        <>
                            Không tồn tại vui lòng kiểm tra đường dẫn
                        </>}
                </>}
        </>
    )
}

function mapStateToProps(state) {
    return {
        exam: state.test.exam,
        loading: state.test.loading,
        user: state.login.info,
    }
}

export default connect(mapStateToProps,
    {
        getTestRequest,
        createQuestion,
        updateExam,
        createOption,
        updateQuestion,
        updateTestRequest,
        updateOption,
        updateAnswer,
        deleteOption,
        deleteQuestion,
        movePositionQuestion,
        stopPollingResponse,
        toastMsgRequest
    })(Edit)
