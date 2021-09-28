import React, { useRef } from 'react'
import ReactQuill from 'react-quill';
import { connect } from 'react-redux';
import { updateQuestion, updateOption } from '../actions/test';

const EditorContent = ({ updateQuestion, updateOption, dataValue, indexQuestion, index }) => {
    const quillRef = useRef()
    const modules = {
        toolbar: {
            container: [
                [{ 'header': [1, 2, false] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                ['image', 'video']
            ],
            handlers: {
                image: () => {
                    const input = document.createElement('input')
                    const quillEditor = quillRef.current.getEditor()
                    input.setAttribute('type', 'file')
                    input.setAttribute('accept', 'image/*')
                    input.click()
                    input.onchange = async () => {
                        const file = input.files[0]
                        const range = quillEditor.getSelection(true)
                        console.log(range)
                        var reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = function () {
                        };
                        /* console.log(range) */
                        // this part the image is inserted
                        // by 'image' option below, you just have to put src(link) of img here. 
                        /* this.quillEditor.insertEmbed(range.index, 'image', link) */
                    }
                }
            }
        }
    }
    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'image', 'video'
    ]

    return (
        <>
            <ReactQuill
                ref={ref => quillRef = ref}
                theme="snow"
                value={dataValue}
                modules={
                    modules
                }
                formats={formats}
                onChange={(content) => {
                    if (index) {
                        updateOption({
                            indexQuestion,
                            index,
                            value: content
                        })
                    } else {
                        updateQuestion({
                            indexQuestion,
                            value: content
                        })
                    }
                }
                }
            />
        </>
    )
}

export default connect(null, { updateQuestion, updateOption })(EditorContent)
