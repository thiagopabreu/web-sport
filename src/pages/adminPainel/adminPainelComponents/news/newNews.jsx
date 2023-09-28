import { Editor } from "draft-js"
import { useEffect, useState } from "react"
import { Button, Col, Dropdown, Form, FormControl, FormGroup, Row, Spinner } from "react-bootstrap"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import FroalaEditorComponent from 'react-froala-wysiwyg';
import FroalaEditor from "react-froala-wysiwyg";
import FroalaEditorImg from "react-froala-wysiwyg/FroalaEditorImg";
import JoditEditor from "jodit-react";
import { CategoriesService, NewsService, PhotoService, RelationPhotoService } from "../../../../services/services";
import { Drop } from "@phosphor-icons/react";
import { AiOutlineArrowLeft } from "react-icons/ai";

export const RegisterNews = (props) => {
    const [editor, setEditor] = useState('')
    const [ model, setModel] = useState('')
    const [title, setTitle] = useState('')
    const [subTitle, setSubTitle] = useState('')
    const [data, setData] = useState("")
    const [file, setFile] = useState("")
    const [categories, setCategories] = useState([])
    const [categorySelect, setCategorySelect] = useState({nome: 'Categorias'})
    const [clicked, setClicked] = useState(false)

    useEffect(() => {
        fetchCategoriesData()
    }, [])

    const fetchCategoriesData = async () => {
        const response = await CategoriesService.getCategories()
        console.log(response)
        setCategories(response)
    }
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    }
    const registerNews = async (e) => {
            setClicked(true)
            if(file != '') {
                const response = await NewsService.registerNews({
                    "titulo": title,
                    "sub_conteudo": subTitle,
                    "id_categoria_fk": categorySelect.id,
                    "conteudo": editor
                })
                console.log(response)
                if(response != undefined) {
                    const responsePhoto = await PhotoService.registerPhoto(file)
                    console.log(responsePhoto)
                    if(responsePhoto.error) {
                        alert('Imagem não cadastrada')
                        return
                    } else {
                        const responseRelation = await RelationPhotoService.registerRelation(response.id, responsePhoto.foto.id)
                        console.log(responseRelation)
                        window.location.reload();
                    }
                } else {
                    console.log('entrei aqui')
                    alert('Preencha os campos')
                }


                

        } else {
            alert('Preencha os campos')
        }
        
        
    }
    console.log(file)
    return(
        <Col xs={10} className=" d-flex flex-row px-5" style={{marginTop: '3rem'}} >
            <Col style={{maxWidth: '7%'}}>
                <Button onClick={(e) => props.setAddNews(false)} style={{background: '#091B36', border: 'none'}}><AiOutlineArrowLeft /></Button>
            </Col>
            <Col style={{flex: 2}}>
                <Form>
                    <Form.Group controlId="title">
                        <Form.Label>Titulo</Form.Label>
                        <FormControl 
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} />

                        
                    </Form.Group>
                    <Form.Group controlId="sub">
                        <Form.Label>Sub-titulo</Form.Label>
                        <FormControl 
                        type="text"
                        value={subTitle}
                        onChange={(e) => setSubTitle(e.target.value)} />

                        
                    </Form.Group>
                    <JoditEditor className="mt-5" value={editor} onChange={newContent => setEditor(newContent)}  />
                </Form>
            </Col>
            <Col className="px-5" style={{flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
                <Form>

                    <FormGroup controlId="imagem">
                        <Form.Label>Imagem</Form.Label>
                        <FormControl 
                        type="file"
                        onChange={handleFileChange}
                        ></FormControl>
                    </FormGroup>

                    <Dropdown className="mt-4">
                        <Dropdown.Toggle style={{background: '#091B36', border: 'none'}}>
                            {categorySelect.nome}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {categories.map((item) => (
                                <Dropdown.Item onClick={(e) => {
                                    setCategorySelect(item)
                                }}>
                                    {item.nome}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Button disabled={clicked} className="mt-4" onClick={(e) => registerNews(e)} style={{background: '#091B36', border: 'none'}}>{clicked ? <Spinner animation="border" role="status"><span className="visually-hidden"></span></Spinner> : 'Publicar'}</Button>
                </Form>
            </Col>
            
        </Col>
    )

}