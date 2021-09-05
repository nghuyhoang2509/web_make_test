import React, { useState } from 'react';
import { Row, Col, Tab, Nav, Form, Button } from "react-bootstrap";
import { changeSetting, updateTestRequest } from '../../actions/test';
import { connect } from "react-redux"
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars"


const formSetting = {
    backgroundColor: "white",
    border: "1px solid rgba(0,0,0,0.1)",
    fontWeight: "500",
    padding: "20px",
    margin: "20px"
}

const itemSetting = {
    marginTop: "10px",
    marginBottom: "10px"
}

const buttonSave = {
    float: "right"
}

const dateTimePicker = {
    width: "200px",
    margin: "20px"
}

const Setting = ({ settings, changeSetting, updateTestRequest }) => {
    const [autoMark, setAutoMark] = useState(settings.autoMark)
    const [display, setDisplay] = useState(settings.display)
    const [timeLimit, setTimeLimit] = useState(settings.displayLimit)
    return (
        <>
            <Tab.Container id="left-tabs-example" defaultActiveKey="settingGeneral" >
                <Row className="py-4">
                    <Col sm={3} className="" >
                        <Nav variant="pills" className="flex-column" style={{ border: "1px solid rgba(0,0,0,0.1)", borderRadius: "3px" }}>
                            <Nav.Item>
                                <Nav.Link eventKey="settingGeneral" className="nav-test-setting">Cài đặt chung</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="resAnswer" className="nav-test-setting">Phản hồi</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="timeAnswer" className="nav-test-setting">Thời gian</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9} style={{ backgroundColor: "#f7fcfc" }}>
                        <Tab.Content className="mt-4 mt-md-0">
                            <Tab.Pane eventKey="settingGeneral">
                                <h4>Cài đặt chung</h4>
                                <i></i>
                                <Form style={formSetting}>
                                    <Form.Group>
                                        <Form.Label>Hiển thị</Form.Label>
                                        <Form.Select defaultValue={settings.display} onChange={(e) => {
                                            changeSetting({
                                                key: "display",
                                                value: e.target.value
                                            })
                                            setDisplay(e.target.value)
                                        }}>
                                            <option value="public">Công khai</option>
                                            <option value="private">Riêng tư</option>
                                            <option value="time">Cài đặt thời gian</option>
                                        </Form.Select>
                                        <Form.Group style={dateTimePicker} className={display === "time" ? "d-block" : "d-none"}>
                                            <DateTimePickerComponent strictMode={true} min={new Date()} value={timeLimit[0]} onChange={(e) => {
                                                changeSetting({
                                                    key: "displayLimit",
                                                    value: [e.target.value, timeLimit[1]]
                                                })
                                                setTimeLimit([e.target.value, timeLimit[1]])
                                            }} format="dd/MM/yyyy hh:mm" step="15" placeholder="Từ"></DateTimePickerComponent>
                                            <DateTimePickerComponent strictMode={true} min={new Date(timeLimit[0])} value={timeLimit[1]} onChange={(e) => {
                                                changeSetting({
                                                    key: "displayLimit",
                                                    value: [timeLimit[0], e.target.value]
                                                })
                                                setTimeLimit([timeLimit[0], e.target.value])
                                            }} format="dd/MM/yyyy hh:mm" step="15" placeholder="Đến"></DateTimePickerComponent>
                                        </Form.Group>
                                    </Form.Group>
                                </Form>
                                <Form style={formSetting}>
                                    <Form.Group>
                                        <Form.Check type="checkbox" style={itemSetting} label="Xáo trộn thứ tự câu hỏi và câu trả lời" defaultChecked={settings.randomExam} onChange={(e) => {
                                            changeSetting({
                                                key: "randomExam",
                                                value: e.target.checked
                                            })
                                        }} />
                                    </Form.Group>
                                </Form>
                                <Button style={buttonSave} onClick={() => updateTestRequest()}>Lưu lại</Button>
                            </Tab.Pane>
                            <Tab.Pane eventKey="resAnswer">
                                <h4>Phản hồi</h4>
                                <i>Thiết lập khi phản hồi đề</i>
                                <Form style={formSetting}>
                                    <Form.Check type="checkbox" style={itemSetting} id="autoMark" label="Chấm điểm tự động" defaultChecked={settings.autoMark} onChange={(e) => {
                                        changeSetting({
                                            key: "autoMark",
                                            value: e.target.checked
                                        })
                                        setAutoMark(e.target.checked)
                                    }} />
                                    <Form.Label className="my-2">Thang điểm</Form.Label>
                                    <Form.Select defaultValue={settings.ladderMark} disabled={!autoMark} onChange={(e) => changeSetting({
                                        key: "ladderMark",
                                        value: Number(e.target.value)
                                    })}>
                                        <option value="1">
                                            1
                                        </option>
                                        <option value="2">
                                            2
                                        </option>
                                        <option value="3">
                                            3
                                        </option>
                                        <option value="4">
                                            4
                                        </option>
                                        <option value="5">
                                            5
                                        </option>
                                        <option value="6">
                                            6
                                        </option>
                                        <option value="7">
                                            7
                                        </option>
                                        <option value="8">
                                            8
                                        </option>
                                        <option value="9">
                                            9
                                        </option>
                                        <option value="10">
                                            10
                                        </option>
                                    </Form.Select>
                                    <Form.Check type="checkbox" style={itemSetting} label="Hiển thị điểm khi phản hồi" disabled={!autoMark}
                                        defaultChecked={settings.displayResMark} onChange={(e) => changeSetting({
                                            key: "displayResMark",
                                            value: e.target.checked
                                        })} />
                                    <Form.Check type="checkbox" style={itemSetting} label="Giới hạn số lần phản hồi" defaultChecked={settings.limitResponse} onChange={(e) =>
                                        changeSetting({
                                            key: "limitResponse",
                                            value: e.target.checked
                                        })} />
                                </Form>
                                <Button style={buttonSave} onClick={() => {
                                    updateTestRequest()
                                }}>Lưu lại</Button>
                            </Tab.Pane>
                            <Tab.Pane eventKey="timeAnswer">
                                <h4>Thời gian</h4>
                                <i>Thiết lập thời gian</i>
                                <Form style={formSetting}>
                                    <Form.Label className="mb-0">Thời gian làm</Form.Label>
                                    <Form.Control
                                        style={{ width: "50px", height: "30px", padding: "5px", margin: "0 5px", display: "inline-block", textAlign: "center" }}
                                        defaultValue={settings.limitTime}
                                        onBlur={(e) => {
                                            const value = Number(e.target.value)
                                            if (value < 1000 && !isNaN(value) && value >= 0) {
                                                changeSetting({
                                                    key: "limitTime",
                                                    value
                                                })
                                            } else {
                                                alert('nhập thời gian giới hạn đúng định dạng số nguyên dương nhỏ hơn 1000')
                                            }
                                        }
                                        }></Form.Control>
                                    <Form.Label className="mb-0">phút</Form.Label>
                                    <Form.Text className="d-block">Nếu bạn không muốn giới hạn thời gian thì hãy nhập số 0 vào</Form.Text>
                                </Form>
                                <Button style={buttonSave} onClick={() => updateTestRequest()}>Lưu lại</Button>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </>
    )
}

function mapStateToProps(state) {
    return {
        settings: state.test.exam.settings
    }
}

export default connect(mapStateToProps, { changeSetting, updateTestRequest })(Setting)
