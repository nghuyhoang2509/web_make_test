import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from "react-router-dom"
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
    deleteQuestion
} from '../../actions/test';
import { Form, Tabs, Tab, Table } from "react-bootstrap"
import Loading from "../../components/Loading";


const Edit = (props) => {
    const [key, setKey] = useState('edit')
    const { id } = useParams()
    useEffect(() => {
        if (!props.loading) {
            props.getTestRequest({
                id,
                userId: props.user.id
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
                                        <Tab eventKey="edit" title="Đề thi">
                                            <div className="exam select-none">
                                                <h3 suppressContentEditableWarning="true" className="exam-title" contentEditable="true" onBlur={(e) => props.updateExam({ title: e.target.innerText })}>{props.exam.title.toUpperCase()}</h3>
                                                <i>{props.exam.createdAt}</i>
                                                <p suppressContentEditableWarning="true" className="exam-description" onBlur={(e) => props.updateExam({ description: e.target.innerText })} contentEditable="true">{props.exam.description ? props.exam.description : <>Chưa có mô tả</>}</p>
                                                <Form className="mt-4 exam-questions">
                                                    {props.exam.questions.length > 0
                                                        ?
                                                        <>
                                                            {props.exam.questions.map((question, indexQuestion) =>
                                                                <Form.Group className="exam-question" key={question.id} onBlur={(e) => props.updateAnswer({
                                                                    indexQuestion,
                                                                    value: e.target.value
                                                                })

                                                                }>
                                                                    <Form.Label suppressContentEditableWarning="true" className="exam-question-title" contentEditable="true" onBlur={(e) => {
                                                                        const value = e.target.innerText
                                                                        props.updateQuestion({
                                                                            indexQuestion,
                                                                            value
                                                                        })
                                                                    }}> {question.title}</Form.Label>
                                                                    {question.options.map((option, index) =>
                                                                        <div className="d-flex align-items-center exam-question-group" key={`g${question.id}.${index}`}>
                                                                            {props.exam.answers[indexQuestion] === index.toString()
                                                                                ? <>
                                                                                    <Form.Check className="exam-option me-2" value={index} type={question.type} name={question.id} key={index} id={`${question.id}.${index}`} defaultChecked></Form.Check></>
                                                                                :
                                                                                <>
                                                                                    <Form.Check className="exam-option me-2" value={index} type={question.type} name={question.id} key={index} id={`${question.id}.${index}`}></Form.Check></>
                                                                            }
                                                                            <Form.Label suppressContentEditableWarning="true" contentEditable="true" className="flex-1 mb-0 exam-option-label" key={`n${index}`} onBlur={(e) => props.updateOption({
                                                                                index,
                                                                                indexQuestion,
                                                                                value: e.target.innerText
                                                                            })}>{option}</Form.Label>
                                                                            <span className="material-icons-outlined exam-option-delete" onClick={(e) => props.deleteOption({
                                                                                indexQuestion,
                                                                                index
                                                                            })}>clear</span>
                                                                        </div>)}
                                                                    <span className="mt-1 material-icons exam-add-option" onClick={(e) => props.createOption({ id: question.id })}>control_point</span>
                                                                    <div className="exam-question-tool">
                                                                        <span className="material-icons exam-question-tool-item" onClick={(e) => props.deleteQuestion({ indexQuestion })}>delete_outlined</span>
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
                                                <Link to={"/admin/test/exam/" + id} className="test-tools-btn">
                                                    <span className="material-icons-outlined">library_books</span>
                                                    <span className="d-none d-md-block">Xem đề thi</span>
                                                </Link>
                                                <div className="test-tools-btn" onClick={() => props.updateTestRequest()}>
                                                    <span className="material-icons-outlined">save</span>
                                                    <span className="d-none d-md-block">Lưu đề thi</span>
                                                </div>
                                                <div className="test-tools-btn" onClick={() => {alert(`${window.location.host}/admin/test/exam/${id}`)}}>
                                                    <span className="material-icons-outlined">link</span>
                                                    <span className="d-none d-md-block">Lấy liên kết đề</span>
                                                </div>
                                            </div>
                                        </Tab>
                                        <Tab eventKey="responseAnswers" title="Phản hồi">
                                            <div className="response">
                                                <h3 className="response-title">{props.responseAnswers.length} phản hồi</h3>
                                                <Table striped bordered hover>
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th>Time</th>
                                                            <th>Username</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {props.responseAnswers.map((answer, index) => 
                                                        <tr>
                                                            <td>{index}</td>
                                                            <td>{answer.date}</td>
                                                            <td>{answer.info.username}</td>
                                                        </tr>)}
                                                    </tbody>
                                                </Table>
                                            </div>
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
        responseAnswers: state.test.responseAnswers
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
        deleteQuestion
    })(Edit)
