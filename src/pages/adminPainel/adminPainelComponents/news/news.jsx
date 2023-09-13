import { useEffect, useState } from "react"
import { Button, Col, Dropdown, Form, FormControl, FormGroup, Image, InputGroup, Modal, Row } from "react-bootstrap"
import { CategoriesService, NewsService, PhotoService, RelationPhotoService } from "../../../../services/services"
import {FaSearch} from 'react-icons/fa'
import {GrEdit} from "react-icons/gr";
import {FiTrash2} from 'react-icons/fi'
import { useLocation, useNavigate } from "react-router-dom";
import { RegisterNews } from "./newNews";
import JoditEditor from "jodit-react";
import { Users } from "@phosphor-icons/react";
export const News = (props) => {
    const api = process.env.REACT_APP_API_BASE_URL;
    const [news, setNews] = useState([])
    const [addNews, setAddNews] = useState(false)
    const [paths, setPaths] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [trigger, setTrigger] = useState(false)
    const [triggerEmpty, setTriggetEmpity] = useState(false)
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate()
    const itemsPerPage = 4
    const [indexOfLastItem, setIndexOfLastItem] = useState(currentPage * itemsPerPage)
    const [indexOfFirstItem, setIndexOfFirstItem] = useState(indexOfLastItem - itemsPerPage)
    const [currentItens, setCurrentItens] = useState([])
    // const indexOfLastItem = currentPage * itemsPerPage;
    // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // const currentItens = news.slice(indexOfFirstItem, indexOfLastItem)
    useEffect(() => {
      fetchData()
    }, [triggerEmpty])

    const fetchData = async () => {
      const response = await NewsService.getNews()
  
      response.news.reverse()
      let photos = []
      setNews(response.news)
      console.log(response.news)
      const filteredNews = response.news.filter((item) => {
        // Convertemos o título da notícia e o termo de pesquisa para letras minúsculas para tornar a pesquisa sem distinção entre maiúsculas e minúsculas
        const lowerCaseTitle = item.titulo.toLowerCase();
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        console.log(item)
        // Verificamos se o título da notícia contém o termo de pesquisa
        return lowerCaseTitle.includes(lowerCaseSearchTerm);
      });
      // Atualize o estado de searchResults com os resultados da pesquisa
      console.log(filteredNews)
      setSearchResults(filteredNews);
      setCurrentItens(filteredNews)
      setTrigger(!trigger)
    }

    const paginate = (pageNumber) => {
      setCurrentPage(pageNumber)
      setTrigger(!trigger) 
    }
    const handleAdicionar = () => {
      setAddNews(true)
    }
    const handleSearchTermChange = (event) => {
      setSearchTerm(event.target.value);
    };

    const handleSearch = async (e) => {
      e.preventDefault()
      setTriggetEmpity(!triggerEmpty)

    };
    return (

            (addNews) ? <RegisterNews setAddNews={setAddNews} /> 
            
            : 
          <Row className="d-flex flex-row mt-5 mx-5 px-5" style={{justifyContent: 'space-between'}}>
              <Col style={{display: 'flex'}}>
                  <Button onClick={handleAdicionar} className="w-50 p-0 m-0 " style={{background: '#091B36'}}>
                      Adicionar +
                  </Button>
              </Col>
              <SearchBar
        searchTerm={searchTerm}
        onSearchTermChange={handleSearchTermChange}
        onSearch={handleSearch}
      />

              <div className="d-flex flex-column mt-5">
                  {currentItens.map((item, index) => (
                      <CardContet item={item} trigger={trigger}/>
                  ))}
              </div >

              <nav aria-label="Page navigation example" className="mt-5">
                  <ul class="pagination justify-content-center">
                  {Array.from({ length: Math.ceil(news.length / itemsPerPage) }).map((_, index) => (
                      <li key={index} active={index + 1 === currentPage} onClick={() => paginate(index + 1)} >
                      <a  class="page-link px-3" style={{background:(index + 1 === currentPage) ? '#091B36' : '#E2E8F0' ,color: (index + 1 === currentPage) ?  '#E2E8F0': '#091B36' , borderRadius: '2rem', fontSize: 16, fontWeight: 500 }}>{index + 1}</a>
                      </li>
                  ))}
                  </ul>
              </nav>
            </Row>

    )
} 

const CardContet = (props) => {
    const {item} = props
    console.log(item)
    const api = process.env.REACT_APP_API_BASE_URL

    const [path, setPath] = useState('')
    const [editor, setEditor] = useState(item.conteudo)
    const [days, setDays] = useState('')
    const [clicked, setClicked] = useState(false)
    const [showUpdate, setShowUpdate] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const [title, setTitle] = useState('')
    const [subTitle, setSubTitle] = useState('')
    const [data, setData] = useState("")
    const [file, setFile] = useState("")
    const [categories, setCategories] = useState([])
    const [categorySelect, setCategorySelect] = useState({nome: 'Categorias'})
    useEffect(() => {
      fetchData()
      const currentDate = new Date();
      const dateFromInput = new Date(item.data_publicacao);
  
      const timeDifference = currentDate - dateFromInput;
      const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      setDays(`${daysAgo} dias atrás`)
    }, [props.trigger])
    
    const fetchData = async () => {
      const relation = await RelationPhotoService.getRelation(item.id)
      const photo = await PhotoService.getPhoto(relation.relationPhoto.id_foto_fk)
      setPath(relation.relationPhoto.id_foto_fk)

      const response = await CategoriesService.getCategories()

      setCategories(response)
    }

    const clickEdit = (event) => {
      setShowUpdate(true)
    }

    const clickDelete = () => {
      setShowDelete(true)
    }

    const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
  }

  const onUpdate = async (e) => {
    console.log(item)
    const updateData = {
      "titulo": title,
      "sub_conteudo": subTitle,
      "id_categoria_fk": categorySelect.id,
      "conteudo": editor,
      "file": file
  }
    if(title === '') {
      updateData.titulo = item.titulo
    }
    if(subTitle === '') {
      updateData.sub_conteudo = item.sub_conteudo
    }
    if(!categorySelect.id) {
      updateData.id_categoria_fk = item.id_categoria_fk
    }
    if(editor === '') {
      updateData.conteudo === item.conteudo
    }
    const relation = await RelationPhotoService.getRelation(item.id)
    const response = await NewsService.updateNews(updateData, item)
    if(updateData.file === '') {
      setShowUpdate(false)
    } else {
      const responsePhoto = await PhotoService.updatePhoto(Number(relation.relationPhoto.id_foto_fk), updateData.file)
      setShowUpdate(false)
      window.location.reload(true)
    }
    
  }
  const deleteNews = async (e) => {
    e.preventDefault()
    const response = await NewsService.deleteNews(item.id)
    const relation = await RelationPhotoService.getRelation(item.id)
    const responsePhoto = await PhotoService.deletePhoto(Number(relation.relationPhoto.id_foto_fk)) // fazer
    const responseRelation = await RelationPhotoService.deleteRelation(item.id) // Fazer
    window.location.reload(true)
  }

  const exitModal = (e) => {
    setShowDelete(false)
  }
    return (
      <Col className="d-flex mt-5" style={{border: 'none', background: '#E2E8F082', borderRadius: '2rem', cursor: 'pointer'}}>
        <Image xs={4} style={{borderRadius: '2rem 0 0 2rem', width: '22%'}} src={`${api}photo/getPhoto/${path}`} />
        <Col xs={5} className="d-flex flex-column mx-5" style={{justifyContent: 'center', alignContent: 'center', alignItems: 'flex-start'}}>
          <p className="p-0 m-0 " style={{fontWeight: 500, fontSize: 20, color: '#213249' }}>{item.titulo}</p>
          <p className="p-0 m-0 pt-2" style={{fontWeight: 400, fontSize: 16, color: '#828282' }}>{days}</p>
        </Col>
        <Col xs={3} className="d-flex w-25" style={{justifyContent: 'space-evenly', alignContent: 'center', alignItems: 'center'}}>
            <>
              <GrEdit onClick={clickEdit} className="p-2" style={{borderRadius: '0.3rem', fontSize: 50, background: '#091B361A', fontColor: '#091B36', cursor: 'pointer'}}/>
              <Modal show={showUpdate} onHide={setShowUpdate}>
                <Modal.Header closeButton>
                  <Modal.Title>Update</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                  <Form>
                      <Form.Group controlId="title">
                          <Form.Label>Titulo</Form.Label>
                          <FormControl 
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder={item.titulo} />

                          
                      </Form.Group>
                      <Form.Group controlId="sub">
                          <Form.Label>Sub-titulo</Form.Label>
                          <FormControl 
                          type="text"
                          value={subTitle}
                          onChange={(e) => setSubTitle(e.target.value)}
                          placeholder={item.sub_conteudo} />

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
                    
                      </Form.Group>
                      <div className="mt-5" style={{overflow: 'auto', maxHeight: 350, maxWidth: 470, margin: 0, padding: 0}}>
                        <JoditEditor  value={editor} onChange={newContent => setEditor(newContent)} />
                      </div>
                      
                  </Form>
                  <Button variant="success" onClick={onUpdate}>Atualizar</Button>
                </Modal.Footer>
              </Modal>
              <FiTrash2 onClick={clickDelete} className="p-2" style={{borderRadius: '0.3rem', fontSize: 50, background: '#D6000729', color: '#D60007', cursor: 'pointer'}}/>
              <Modal show={showDelete} onHide={setShowDelete}>
                <Modal.Header closeButton>
                  <Modal.Title>Deletar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Você realmente deseja deletar essa noticia?
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={deleteNews} variant="success">Sim</Button>
                  <Button onClick={exitModal} variant="danger">Não</Button>
                </Modal.Footer>
              </Modal>
            </>
        </Col>
      </Col>
    )
  }
  
  const SearchBar = ({ searchTerm, onSearchTermChange, onSearch }) => {
    return (
      <Form className="d-flex flex-row w-75 gap-5" onSubmit={e => { onSearch(e) }}>
        <InputGroup className="custom-input w-75">
          <InputGroup.Text
            className="p-4"
            style={{ borderRight: 'none', backgroundColor: '#F2F4F8', border: 'none' }}
          >
            <FaSearch />
          </InputGroup.Text>
          <FormControl
            placeholder="Buscar por notícia"
            type="text"
            className="mr-sm-2 p-3 custom-input"
            style={{ borderLeft: 'none', fontWeight: 500 }}
            value={searchTerm}
            onChange={onSearchTermChange} // Lidar com a mudança no termo de pesquisa
          ></FormControl>
        </InputGroup>
        <Button
          className="p-3 px-4"
          style={{ maxHeight: 60, background: '#091B36', color: 'white', borderRadius: '1.2rem', border: 'none' }}
          variant="outline-success"
          onClick={onSearch} // Lidar com a ação de pesquisa
        >
          Buscar
        </Button>
      </Form>
    );
  };
  