import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from "react-router-dom"
import { connect } from "react-redux";

import { getTestRequest, answerRequest } from '../../actions/test';
import { Button, Form } from "react-bootstrap"
import Loading from "../../components/Loading";


const Exam = (props) => {
    const { id } = useParams()
    useEffect(() => {
        if (!props.loading) {
            props.getTestRequest({
                id,
                userId: props.user.id
            })
        }
        return () => {
        }// eslint-disable-next-line
    }, [])
    function submitForm(e){
        e.preventDefault()
        props.answerRequest({ answer, testId: id, info: props.user })
    }
    var [ answer ] = useState([])
    return (
        <>
            {props.loading ? <Loading /> :
                <>
                    {props.exam ?
                        <>
                            {props.user.id === props.exam.userId ? <Link to={"/admin/test/edit/" + id}><Button className="mb-4">Vào chế độ chỉnh sửa</Button></Link> : <></>}
                            <div className="exam select-none">
                                <h3>{props.exam.title.toUpperCase()}</h3>
                                <p>{props.exam.description}</p>
                                <Form className="mt-4 exam-questions" onSubmit={(e)=> submitForm(e)}>
                                    {props.exam.questions.length
                                        ?
                                        <>
                                            {props.exam.questions?.map((question, indexQuestion) =>
                                                <Form.Group className="exam-question" key={question.id} name={question.id} onBlur={(e)=>answer[indexQuestion]={
                                                    questionId: question.id,
                                                    answer: e.target.value
                                                }}>
                                                    <Form.Label className="exam-question-title"> {question.title}</Form.Label>
                                                    {question.options?.map((option, index) =>
                                                        <div className="d-flex align-items-center" key={`g${question.id}.${index}`}>
                                                            <Form.Check className="exam-option me-2" value={index} type={question.type} name={question.id} key={index} id={`${question.id}.${index}`}></Form.Check>
                                                            <Form.Label className="flex-1 mb-0 exam-option-label" htmlFor={`${question.id}.${index}`} key={`n${index}`}>{option}</Form.Label>
                                                        </div>)}
                                                </Form.Group>)}
                                                <Button type="submit">Gửi bài</Button>
                                        </>
                                        : <>Chưa tạo câu hỏi nào</>
                                    }
                                </Form>
                            </div>
                        </> : <>Không tồn tại vui lòng kiểm tra đường dẫn</>}
                </>}
        </>
    )
}

function mapStateToProps(state) {
    return {
        exam: state.test.exam,
        loading: state.test.loading,
        user: state.login.info
    }
}

export default connect(mapStateToProps, { getTestRequest, answerRequest })(Exam)
