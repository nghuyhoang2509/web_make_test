import React, { useEffect } from 'react'
import { Table } from 'react-bootstrap'
import { connect } from "react-redux"
import { getResponseRequest } from '../../actions/test'
import Moment from "react-moment"

const Response = ({ responseAnswers, getResponseRequest, testId }) => {
    useEffect(() => {
        getResponseRequest({ testId })
        return () => {
        }//eslint-disable-next-line
    },[])
    return (
        <div className="response">
            <h3 className="response-title">{responseAnswers.length} phản hồi</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Time</th>
                        <th>Username</th>
                        <th>Mark</th>
                        <th>TimePractice</th>
                    </tr>
                </thead>
                <tbody>
                    {responseAnswers.map((answer,indexAnswer) => 
                        <tr key={indexAnswer}>
                            <td>{indexAnswer}</td>
                            <td><Moment format="HH:mm:ss DD-MM-YYYY">{answer.date}</Moment></td>
                            <td>{answer.info.username}</td>
                            <td>{answer.mark}</td>
                            <td>{`${Math.round(answer.timePractice / 60000)} phút ${Math.round((answer.timePractice % 60000)/1000)} giây`}</td>
                        </tr>
                        )}
                </tbody>
            </Table>
        </div>
    )
}

function mapStateToProps(state){
    return {
        responseAnswers: state.test.responseAnswer,
        testId: state.test.exam._id
    }
}

export default connect(mapStateToProps,{ getResponseRequest })(Response)
