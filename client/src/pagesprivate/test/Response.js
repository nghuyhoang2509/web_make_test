import React, { useEffect, useState, useRef } from 'react'
import { MDBDataTableV5 } from "mdbreact"
import { connect } from "react-redux"
import { getResponseRequest } from '../../actions/test'
import moment from 'moment'
import socketIO from 'socket.io-client'
import { host } from '../../config/var'

const Response = ({ responseAnswers, getResponseRequest, testId, testByUserId }) => {
    const [dataTable, setDataTable] = useState({
        columns: [
            {
                label: "Thời gian",
                field: "time",
                sort: "asc"
            },
            {
                label: "Tên Đăng Nhập",
                field: "username",
            },
            {
                label: "Điểm",
                field: "mark",
            },
            {
                label: "Thời gian làm",
                field: "timePractice",
            },
        ],
        rows: []
    })
    const socketRef = useRef()
    useEffect(() => {
        getResponseRequest({ testId })
        socketRef.current = socketIO.connect(host)
        socketRef.current.emit("wait-response-test",{ testByUserId })
        socketRef.current.on("have-response", function(){
            getResponseRequest({ testId})
        })
        return () => {
            socketRef.current.disconnect()
        }//eslint-disable-next-line
    }, [])
    useEffect(() => {
        if (responseAnswers.length) {
            setDataTable({
                ...dataTable,
                rows: responseAnswers.map((item) =>
                ({
                    time: moment(item.date).format("HH:mm:ss DD-MM-YYYY"),
                    username: item.info.username,
                    mark: item.mark,
                    timePractice: moment.utc(item.timePractice).format("HH:mm:ss")
                })
                )
            })
        }//eslint-disable-next-line
    }, [responseAnswers])
    return (
        <div className="response">
            <h3 className="response-title">{responseAnswers.length} phản hồi</h3>
            <MDBDataTableV5 hover entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4} data={dataTable} striped searchTop searchBottom={false}></MDBDataTableV5>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        responseAnswers: state.test.responseAnswer,
        testId: state.test.exam._id,
        testByUserId: state.test.exam.userId
    }
}

export default connect(mapStateToProps, { getResponseRequest })(Response)
