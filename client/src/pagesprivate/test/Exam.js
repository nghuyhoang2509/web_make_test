import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
/* import { Link } from "react-router-dom" */
import { connect } from "react-redux";

import { getTestRequest, answerRequest } from '../../actions/test';
import { Button, Form, Container } from "react-bootstrap"
import Loading from "../../components/Loading";
import UserResponse from './UserResponse';
import Countdown from "react-countdown"



const Exam = (props) => {
    const [timeEnd, setTimeEnd] = useState(null)
    const [start, setStart] = useState(false)
    const [startTime, setStartTime] = useState(null)
    const { id } = useParams()
    useEffect(() => {
        if (!props.loading && start) {
            setStartTime(Date.now())
            props.getTestRequest({
                id,
                userId: props.user.id
            })
        }
        return () => {
        }// eslint-disable-next-line
    }, [start])
    function submitForm(e) {
        e.preventDefault()
        if (answer.length !== props.exam.questions.length) {
            alert('bạn không được bỏ trống trường nào')
        } else {
            sendAnswer()
        }
    }
    useEffect(() => {
        if (props.exam?.settings?.limitTime) {
            setTimeEnd(props.exam?.settings?.limitTime * 60)
        }
        if (props.exam && start) {
            window.addEventListener("beforeunload", doBeforeUnload)
        }
        return () => {
            window.removeEventListener("beforeunload", doBeforeUnload)
        }// eslint-disable-next-line
    }, [props, start])
    function doBeforeUnload(ev) {
        ev.preventDefault()
        return ev.returnValue = true
    }
    function sendAnswer() {
        props.answerRequest({ answer, testId: id, info: props.user, startTime, finishTime: Date.now() })
        setStart(false)
        setAnswer([])
    }
    var [answer, setAnswer] = useState([])
    return (
        <Container className="py-4">
            {start === true
                ?

                <>
                    {props.loading ? <Loading /> :
                        <>
                            {props.exam && ((props.exam.settings.limitResponse && !props.responseAnswers.length) || (!props.exam.settings.limitResponse)) ?
                                <>
                                    {timeEnd !== null
                                        ?
                                        <h5 className="fixed-bottom text-center">
                                            <Countdown date={Date.now() + timeEnd * 1000} onComplete={() => sendAnswer()} />
                                        </h5>
                                        : <></>}
                                    <div className="exam select-none mb-0">
                                        <div style={{ borderTop: "5px solid black", padding: "5px", borderRadius: "10px", boxShadow: "0 0 2px 1px rgba(0,0,0,0.3)" }}>
                                            <h3 className="exam-title">{props.exam.title.toUpperCase()}</h3>
                                            <p>{props.exam.description}</p>
                                        </div>
                                        <Form className="mt-4 exam-questions" onSubmit={(e) => submitForm(e)}>
                                            {props.exam.questions.length
                                                ?
                                                <>
                                                    {props.exam.questions?.map((question, indexQuestion) =>
                                                        <Form.Group className="exam-question" key={indexQuestion} onChange={(e) => answer[indexQuestion] = e.target.value}>
                                                            <Form.Label className="exam-question-title"> {question.title}</Form.Label>
                                                            {question.options?.map((option, index) =>
                                                                <div className="d-flex align-items-center" key={index}>
                                                                    <Form.Check className="exam-option me-2" value={`${indexQuestion}.${index}`} type={question.type} name={indexQuestion} id={`${indexQuestion}.${index}`}></Form.Check>
                                                                    <Form.Label className="flex-1 mb-0 exam-option-label" htmlFor={`${indexQuestion}.${index}`} >{option}</Form.Label>
                                                                </div>)}
                                                        </Form.Group>)}
                                                    <Button type="submit">Gửi bài</Button>
                                                </>
                                                : <>Chưa tạo câu hỏi nào</>
                                            }
                                        </Form>
                                    </div>
                                </> :
                                <>
                                    Không tồn tại đề thi hoặc đề thi bị giới hạn số lần làm
                                    <Button className="d-block my-4" onClick={() => setStart(false)}>Quay lại</Button>
                                </>}
                        </>}
                </>
                :
                <>
                    <Button className="my-4 d-block" variant="success" onClick={() => setStart(true)}>Bắt đầu</Button>
                    <i className=" my-4 d-block">
                        Trong lúc làm nếu bạn tắt cửa sổ thì đề thi sẽ tự nộp
                    </i>
                    <UserResponse userId={props.user.id} testId={id} />

                </>}
        </Container>
    )
}

function mapStateToProps(state) {
    return {
        exam: state.test.exam,
        loading: state.test.loading,
        user: state.login.info,
        responseAnswers: state.test.responseAnswer
    }
}

export default connect(mapStateToProps, { getTestRequest, answerRequest })(Exam)