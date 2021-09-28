import React, { useEffect, useState, useRef } from 'react';
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
} from '../actions/test';
import { toastMsgRequest } from '../actions/site';
import { Form, Tab, Dropdown, Nav, Modal, Col, Row } from "react-bootstrap"
import Setting from "../pagesprivate/test/Setting"
import Response from "../pagesprivate/test/Response"
import Moment from "react-moment"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"
import { CopyToClipboard } from 'react-copy-to-clipboard';
import EditorContent from '../components/EditorContent';



const Edit = (props) => {
    const elementEdit = useRef(null)
    const [modal, setModal] = useState(false)
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
            elementEdit.current = null
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
                                                        <h3 suppressContentEditableWarning="true" onDoubleClick={(e) => { e.target.contentEditable = true; e.target.focus(); document.execCommand("selectall", null, false);; }} className="exam-title" onBlur={(e) => { props.updateExam({ title: e.target.innerText }); e.target.contentEditable = false }}>{props.exam.title.toUpperCase()}</h3>
                                                        <p suppressContentEditableWarning="true" onDoubleClick={(e) => { e.target.contentEditable = true; e.target.focus(); document.execCommand("selectall", null, false);; }} className="exam-description" onBlur={(e) => { props.updateExam({ description: e.target.innerText }); e.target.contentEditable = false }}>{props.exam.description ? props.exam.description : <>Chưa có mô tả</>}</p>
                                                    </div>
                                                    <Form className="mt-4 exam-questions">
                                                        {props.exam.questions.length > 0
                                                            ?
                                                            <>
                                                                {props.exam.questions.map((question, indexQuestion) =>
                                                                    <div className="exam-question"
                                                                        key={indexQuestion} >
                                                                        <img onClick={(e) => { elementEdit.current = null; e.target.parentElement.classList.remove("edit"); props.updateTestRequest() }} className="edit-mode" style={{ position: "absolute", height: "30px", left: "15px", bottom: "15px" }} alt="save" src="https://img.icons8.com/color/50/000000/checkmark--v1.png" />
                                                                        <Form.Group className="exam-question-wrapper"
                                                                            onClick={(e) => {
                                                                                e.preventDefault()
                                                                                if (!elementEdit.current && elementEdit.current !== 0) {
                                                                                    e.currentTarget.parentElement.classList.add("edit")
                                                                                    elementEdit.current = indexQuestion
                                                                                } else if (elementEdit.current !== indexQuestion) {
                                                                                    props.toastMsgRequest({ msg: "Có thành phần đang được chọn cần kết thúc để chọn thành phần khác", status: "error" })
                                                                                }
                                                                            }}>
                                                                            <Form.Label style={{ width: "100%" }}><>
                                                                                <span className="content-question-item normal-mode" dangerouslySetInnerHTML={{ __html: question.title }}></span>
                                                                                <span className="edit-mode">
                                                                                    <EditorContent indexQuestion={indexQuestion} index={null} dataValue={question.title}/>
                                                                                </span>
                                                                            </>
                                                                            </Form.Label>

                                                                            {question.options.map((option, index) =>
                                                                                <div className="d-flex align-items-center exam-question-group" key={index}>
                                                                                    <Form.Check className="exam-option me-2 mt-0" value={`${index}`} type={question.type} name={indexQuestion} defaultChecked={props.exam.answers[indexQuestion] === `${index}` ? true : false} />
                                                                                    <Form.Label className="mb-0 exam-option-label">
                                                                                        <span className="content-question-item normal-mode" dangerouslySetInnerHTML={{ __html: option }}></span>
                                                                                        <span className="edit-mode">
                                                                                            <EditorContent indexQuestion={indexQuestion} index={index} dataValue={option}/>
                                                                                        </span>
                                                                                    </Form.Label>
                                                                                    <img alt="xóa" src={`https://firebasestorage.googleapis.com/v0/b/testmaker-4bf4e.appspot.com/o/icons%2Ficons8-delete-48.png?alt=media&token=402206e5-c994-48fc-8dfc-8dccc143c6de`} className="exam-option-delete edit-mode" onClick={() => {
                                                                                        props.deleteOption({
                                                                                            indexQuestion,
                                                                                            index
                                                                                        })
                                                                                        props.updateTestRequest()
                                                                                    }}></img>
                                                                                </div>)}
                                                                            <img className="mt-1 exam-add-option edit-mode" alt="thêm" src={`https://firebasestorage.googleapis.com/v0/b/testmaker-4bf4e.appspot.com/o/icons%2Fadd_64px.png?alt=media&token=e3cd1da6-cf92-4a13-aeef-f5076798e3f6`} onClick={() => { props.createOption({ indexQuestion }); }}></img>
                                                                            <div className="exam-question-tool">
                                                                                <img alt="xóa" src={`https://firebasestorage.googleapis.com/v0/b/testmaker-4bf4e.appspot.com/o/icons%2Fremove_100px.png?alt=media&token=1f06aeed-6ecf-4413-9c69-fed0940ff7a9`} className="exam-question-tool-item edit-mode" onClick={() => {
                                                                                    props.deleteQuestion({ indexQuestion })
                                                                                    props.updateTestRequest()
                                                                                }}></img>
                                                                            </div>
                                                                        </Form.Group>
                                                                    </div>)}
                                                            </>
                                                            : <>Chưa tạo câu hỏi nào</>
                                                        }
                                                    </Form>
                                                </div>
                                                <div className="test-tools">
                                                    <div className="test-tools-btn" onClick={() => props.createQuestion()}>
                                                        <img alt="error" style={{ height: "30px" }} src={`https://firebasestorage.googleapis.com/v0/b/testmaker-4bf4e.appspot.com/o/icons%2Ficons8-add-48.png?alt=media&token=cf5cdba6-749f-4c9a-bff0-48382873cbd2`} />
                                                        <span className="d-none d-md-block" style={{ fontWeight: "500", opacity: "0.8" }}>Thêm câu hỏi</span>
                                                    </div>
                                                    <div className="test-tools-btn" onClick={() => { handleShow(); setModal("link") }}>
                                                        <img alt="error" style={{ height: "30px" }} src={`https://firebasestorage.googleapis.com/v0/b/testmaker-4bf4e.appspot.com/o/icons%2Ficons8-link-48.png?alt=media&token=92ddf20b-1c0a-416e-9d7e-3016b8465979`} />
                                                        <span className="d-none d-md-block" style={{ fontWeight: "500", opacity: "0.8" }}>Lấy liên kết đề</span>
                                                    </div>
                                                    <Dropdown className="test-tools-btn" autoClose="outside">
                                                        <Dropdown.Toggle childBsPrefix bsPrefix="test-tools-btn-move test-tools-btn">
                                                            <img alt="error" style={{ height: "30px" }} src={`https://firebasestorage.googleapis.com/v0/b/testmaker-4bf4e.appspot.com/o/icons%2Ficons8-move-48.png?alt=media&token=16c7609c-c546-4295-8129-bc25ac020d6f`} />
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
                                                        <Modal.Title style={{ fontWeight: "600", opacity: "0.9" }}>
                                                            {modal === "link" ? "Liên kết" : "Thêm ảnh"}
                                                        </Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <div>
                                                            {modal === "link"
                                                                ?
                                                                <>
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
                                                                </>
                                                                :
                                                                <>

                                                                </>}
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
        toastMsgRequest,
    })(Edit)
