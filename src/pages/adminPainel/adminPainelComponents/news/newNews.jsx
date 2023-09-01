import { Editor } from "draft-js"
import { useEffect, useState } from "react"
import { Col, Row } from "react-bootstrap"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import FroalaEditorComponent from 'react-froala-wysiwyg';
import FroalaEditor from "react-froala-wysiwyg";
import FroalaEditorImg from "react-froala-wysiwyg/FroalaEditorImg";

export const RegisterNews = () => {
    const [editor, setEditor] = useState('')
    const [ model, setModel] = useState('')
    
    useEffect(() => {
        console.log(editor)
    }, [editor])
    return(
        <Col xs={10} className=" d-flex flex-column px-5" style={{marginTop: '3rem'}} >
            <ReactQuill theme="snow" value={editor} onChange={setEditor} />

            <div id="editor">
            <FroalaEditorComponent
  tag='textarea'
  config={{
    placeholderText: 'Edit Your Content Here!',
    charCounterCount: false
  }}
  model={editor}
  onModelChange={setEditor}
/>
            </div>
        </Col>
    )

}