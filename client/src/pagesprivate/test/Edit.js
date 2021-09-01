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
} from '../../actions/test';
import { Form, Tabs, Tab } from "react-bootstrap"
import Loading from "../../components/Loading";
import Setting from "./Setting"
import Response from "./Response"
import Moment from "react-moment"


const Edit = (props) => {
    const [key, setKey] = useState('edit')
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
        }// eslint-disable-next-line
    }, [])
    return (
        <>
            {props.loading ? <Loading />
                :
                <>
                    {props.user.id === props.exam?.userId
                        ?
                        <>
                            {props.exam ?
                                <>
                                    <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
                                        <Tab eventKey="edit" title="Đề thi" tabClassName="text-600">
                                            <div className="exam select-none">
                                                <div style={{ borderTop: "5px solid black", padding: "5px", borderRadius: "10px", boxShadow: "0 0 2px 1px rgba(0,0,0,0.3)" }} onBlur={() => props.updateTestRequest()}>
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
                                                                            <Form.Check className="exam-option me-2" value={`${indexQuestion}.${index}`} type={question.type} name={indexQuestion} id={index} defaultChecked={props.exam.answers[indexQuestion] === `${indexQuestion}.${index}` ? true : false} />
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
                                            <div className="fixed-bottom test-tools">
                                                <div className="test-tools-btn" onClick={() => props.createQuestion()}>
                                                    <span className="material-icons-outlined">add_box</span>
                                                    <span className="d-none d-md-block">Thêm câu hỏi</span>
                                                </div>
                                                <div className="test-tools-btn" onClick={() => { alert(`${window.location.host}/exam/${id}`) }}>
                                                    <span className="material-icons-outlined">link</span>
                                                    <span className="d-none d-md-block">Lấy liên kết đề</span>
                                                </div>
                                            </div>
                                        </Tab>
                                        <Tab eventKey="responseAnswer" title="Phản hồi" tabClassName="text-600">
                                            <Response />
                                        </Tab>
                                        <Tab eventKey="setting" title="Cài đặt" tabClassName="text-600">
                                            <Setting/>
                                        </Tab>
                                    </Tabs>

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
    })(Edit)
