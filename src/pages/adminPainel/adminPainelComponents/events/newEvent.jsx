import { Editor } from "draft-js"
import { useEffect, useState } from "react"
import { Button, Col, Dropdown, Form, FormControl, FormGroup, Row } from "react-bootstrap"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import FroalaEditorComponent from 'react-froala-wysiwyg';
import FroalaEditor from "react-froala-wysiwyg";
import FroalaEditorImg from "react-froala-wysiwyg/FroalaEditorImg";
import JoditEditor from "jodit-react";
import { CategoriesService, EventService, NewsService, PhotoService, RelationPhotoEventService } from "../../../../services/services";
import { Drop } from "@phosphor-icons/react";
import { AiOutlineArrowLeft } from "react-icons/ai";

export const RegisterEvent = (props) => {
    const [editor, setEditor] = useState('')
    const [ model, setModel] = useState('')
    const [title, setTitle] = useState('')
    const [subTitle, setSubTitle] = useState('')
    const [descricao, setDescricao] = useState('')
    const [data, setData] = useState("")
    const [file, setFile] = useState("")
    const [categories, setCategories] = useState([])
    const [categorySelect, setCategorySelect] = useState({nome: 'Categorias'})
    const [date, setDate] = useState('')
    const [local, setLocal] = useState('')
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
    const registerEvent = async (e) => {


        if(title === '' && descricao === '' && local === '' && date === '') {
            alert("Preencha todas as informações necessárias")
        } else if(file === '') {
            alert("Por favor, selecione uma foto")
        } else {
            const object = {
                "nome_evento": title,
                "descricao": descricao,
                "local": local,
                "data_evento": date,
                "id_categoria_fk": 3,
            }
            console.log(object)
            console.log(file)
            const response = await EventService.registerEvent(object)
            console.log(response)
            const responsePhoto = await PhotoService.registerPhoto(file)
            console.log(responsePhoto)
            const relation = await RelationPhotoEventService.registerRelation({"id_event_fk": response.newEvent.id, "id_foto_fk": responsePhoto.foto.id})
        }
        
    }
    const handleDate = (e) => {
        setDate(e.target.value)
    }
    console.log(file)
    return(
        <Col xs={10} className=" d-flex flex-row px-5" style={{marginTop: '3rem'}} >
            <Col style={{maxWidth: '7%'}}>
                <Button onClick={(e) => props.setAddEvent(false)} style={{background: '#091B36', border: 'none'}}><AiOutlineArrowLeft /></Button>
            </Col>
            <Col style={{flex: 2}}>
                <Form>
                    <Form.Group controlId="title">
                        <Form.Label>Nome do evento</Form.Label>
                        <FormControl 
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} />

                        
                    </Form.Group>
                    <Form.Group controlId="descricao">
                        <Form.Label>Descricao</Form.Label>
                        <FormControl 
                        type="text"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)} />

                        
                    </Form.Group>
                    <Form.Group controlId="local">
                        <Form.Label>Local</Form.Label>
                        <FormControl 
                        type="text"
                        value={local}
                        onChange={(e) => setLocal(e.target.value)} />

                        
                    </Form.Group>
                    <Form.Group controlId="datePicker">
                        <Form.Label>Dia e hora</Form.Label>
                        <Form.Control
                        type="datetime-local"
                        value={date}
                        onChange={handleDate}
                        />
                    </Form.Group>
                    <Form>

                        <FormGroup controlId="imagem">
                            <Form.Label>Imagem</Form.Label>
                            <FormControl 
                            accept=".png"
                            required
                            type="file"
                            onChange={handleFileChange}
                            ></FormControl>
                        </FormGroup>

                        {/* <Dropdown className="mt-4">
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
                        </Dropdown> */}
                        <Button className="mt-4" onClick={(e) => registerEvent(e)} style={{background: '#091B36', border: 'none'}}>Publicar</Button>
                    </Form>
                </Form>
            </Col>
            
        </Col>
    )

}