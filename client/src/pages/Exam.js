import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from "react-router-dom"
import { connect } from "react-redux";

import { getTestRequest, answerRequest } from '../actions/test';
import { Button, Form, Container } from "react-bootstrap"
import Loading from "../components/Loading";
import UserResponse from '../pagesprivate/test/UserResponse';
import Countdown from "react-countdown"
import Login from "./Login"
import { toastMsgRequest } from '../actions/site';


const elem = document.documentElement
const Exam = (props) => {
    const [timeEnd, setTimeEnd] = useState(null)
    const [start, setStart] = useState(false)
    const [startTime, setStartTime] = useState(null)
    const { id } = useParams()
    elem.onfullscreenchange = (e) => {
        if (document.fullscreen) {
            props.toastMsgRequest({ msg: "Nếu bạn thoát khỏi chế độ toàn màn hình thì hệ thống sẽ tự động nộp bài", status: "warning" })
        } else {
            sendAnswer()
        }
    }

    const goFullScreen = () => {
        if (elem.requestFullscreen) {
            elem.requestFullscreen({ navigationUI: "hide" });
        } else if (elem.webkitRequestFullscreen) {
            /* Safari */
            elem.webkitRequestFullscreen({ navigationUI: "hide" });
        } else if (elem.msRequestFullscreen) {
            /* IE11 */
            elem.msRequestFullscreen({ navigationUI: "hide" });
        }
    };
    const closeScreen = async () => {
        if (!document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            /* IE11 */
            document.msExitFullscreen();
        }
    };
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
        if (e) {
            e.preventDefault()
        }
        if (answer.length !== props.exam.questions.length) {
            alert('bạn không được bỏ trống trường nào')
        } else {
            closeScreen()
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
    function sendAnswer(obj) {
        if (obj) {
            props.answerRequest({ answer: obj.answer, testId: id, info: props.user, startTime: obj.startTime, finishTime: Date.now() })
        } else {
            props.answerRequest({ answer, testId: id, info: props.user, startTime, finishTime: Date.now() })
        }
        localStorage.removeItem(id)
        setStart(false)
        setAnswer([])
    }
    var [answer, setAnswer] = useState([])
    function shuffleArray(array) {
        if (props.exam.settings.randomExam) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }
        return array
    }
    function changeAnswer(value, index) {
        answer[index] = value
        const temp = {
            startTime,
            info: props.user,
            answer
        }
        localStorage.setItem(id, JSON.stringify(temp))
    }
    function startHandle() {
        if (localStorage.getItem(id)) {
            props.toastMsgRequest({ msg: "Bạn phải nộp bài thi bị gián đoạn mới được tiếp tục", status: "error" })
        }
        setStart(true);
        goFullScreen()
    }
    return (
        <>
            {props.isLogined
                ?
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
                                                <div className="exam-header">
                                                    <h3 className="exam-title">{props.exam.title.toUpperCase()}</h3>
                                                    <p>{props.exam.description}</p>
                                                </div>
                                                <Form className="mt-4 exam-questions" onSubmit={(e) => submitForm(e)}>
                                                    {props.exam.questions.length
                                                        ?
                                                        <>
                                                            {shuffleArray(props.exam.questions?.map((question, indexQuestion) =>
                                                                <Form.Group className="exam-question" key={indexQuestion} onChange={(e) => changeAnswer(e.target.value, indexQuestion)}>
                                                                    <Form.Label style={{ width: "100%" }} className="exam-question-title">
                                                                        <span className="content-question-item d-block" dangerouslySetInnerHTML={{ __html: question.title }} ></span>
                                                                    </Form.Label>
                                                                    {shuffleArray(question.options?.map((option, index) =>
                                                                        <div className="d-flex align-items-center exam-question-group" key={index}>
                                                                            <Form.Check className="exam-option me-2" value={`${index}`} type={question.type} name={indexQuestion} id={`${indexQuestion}.${index}`}></Form.Check>
                                                                            <Form.Label className="flex-1 mb-0 exam-option-label" htmlFor={`${indexQuestion}.${index}`} ><span className="content-question-item" dangerouslySetInnerHTML={{ __html: option }}></span></Form.Label>
                                                                        </div>))}
                                                                </Form.Group>))}
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
                            <div className="my-4 d-flex justify-content-start">
                                <Button className="d-block" variant="success" onClick={() => startHandle()}>Bắt đầu</Button>
                                {localStorage.getItem(id)
                                    ?
                                    <Button className="d-block" variant="info" onClick={() => sendAnswer(JSON.parse(localStorage.getItem(id)))}>Nộp bài thi bị gián đoạn</Button>
                                    : <></>}
                                <Button className="d-block" variant="primary">
                                    <Link to="/" className="text-white">Trang Chủ</Link>
                                </Button>

                            </div>
                            <p className="m-0 d-block text-danger text-500" >
                                Trong lúc làm nếu bạn thoát khỏi chế độ toàn màn hình thì đề thi sẽ tự nộp.
                            </p>
                            <p className="mb-4 d-block text-danger text-500" >
                                Nếu đang làm bài bạn gặp sự cố mất điện hoặc mất mạng thì đề thi sẽ tự lưu lại số câu bạn đã hoàn thành và bạn phải truy cập vào liên kết đề thi để tiến hành nộp.
                            </p>
                            <UserResponse userId={props.user.id} testId={id} />

                        </>}
                </Container>
                : <Login />
            }
        </>
    )
}

function mapStateToProps(state) {
    return {
        exam: state.test.exam,
        loading: state.test.loading,
        user: state.login.info,
        responseAnswers: state.test.responseAnswer,
    }
}

export default connect(mapStateToProps, { getTestRequest, answerRequest, toastMsgRequest })(Exam)