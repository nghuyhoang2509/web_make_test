import React, { useState } from 'react'
import { updateExam } from '../actions/test'
import { connect } from "react-redux"

const Editor = (props) => {
    const [mode, setMode] = useState(false)

    const [value, setValue] = useState(props.value)
  
    return (
        <> {mode
            ? <>
                {props.type === "textarea"
                    ?
                    <textarea autoFocus value={value} onChange={(e) => setValue(e.target.value)} style={{ width: "100%", overflow: 'revert' }} onBlur={() => {
                        setMode(false);
                        props.updateExam({[props.placeholder]: value})
                    }}>
                    </textarea>
                    :
                    <input type="text" value={value} onChange={(e) => setValue(e.target.value)} >
                    </input>
                }
            </> :

            <span onDoubleClick={() => setMode(true)}>{value ? value.toUpperCase() : "Đây là " + props.placeholder}</span>}
        </>
    )
}

export default connect(null,{ updateExam })(Editor)
