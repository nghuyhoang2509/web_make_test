import React, { useEffect } from 'react'
import { Table } from "react-bootstrap"
import { getResponseRequest } from '../../actions/test'
import { connect } from "react-redux"
import Moment from "react-moment"
import moment from 'moment'


const UserResponse = ({ responseAnswers, userId, testId, getResponseRequest }) => {
    useEffect(() => {
        if (!responseAnswers.length)
        getResponseRequest({ testId, userId })
        return () => {
        }// eslint-disable-next-line
    }, [])
    return (
        <div className="response">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Time</th>
                        <th>Mark</th>
                        <th>TimePractice</th>
                    </tr>
                </thead>
                <tbody>
                    {responseAnswers.map((answer, index) =>
                        <tr key={index}>
                            <td>{index}</td>
                            <td><Moment format="HH:mm:ss DD-MM-YYYY">{answer.date}</Moment></td>
                            <td>{answer.mark}</td>
                            <td>{moment.utc(answer.timePractice).format("HH:mm:ss")}</td>
                        </tr>)}
                </tbody>
            </Table>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        responseAnswers: state.test.responseAnswer
    }
}

export default connect(mapStateToProps, { getResponseRequest })(UserResponse)
