import { useEffect, useState } from "react"
import { Button, Card, Col, Dropdown, Form, FormControl, FormGroup, Image, InputGroup, Modal, Row } from "react-bootstrap"
import { CategoriesService, EventService, NewsService, PhotoService, RelationPhotoEventService, RelationPhotoService } from "../../../../services/services"
import {FaSearch} from 'react-icons/fa'
import {GrEdit} from "react-icons/gr";
import {FiTrash2} from 'react-icons/fi'
import { useLocation, useNavigate } from "react-router-dom";
import JoditEditor from "jodit-react";
import { Users } from "@phosphor-icons/react";
import { RegisterEvent } from "./newEvent";
export const Events = () => {
    const api = process.env.REACT_APP_API_BASE_URL;
    const [events, setEvents] = useState([])
    const [addEvent, setAddEvent] = useState(false)
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
      const response = await EventService.getEvents();
      console.log(response)
      response.reverse()
      let photos = []
      console.log(response.news)
      const filteredNews = response.filter((item) => {
        // Convertemos o título da notícia e o termo de pesquisa para letras minúsculas para tornar a pesquisa sem distinção entre maiúsculas e minúsculas
        const lowerCaseTitle = item.nome_evento.toLowerCase();
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
      setAddEvent(true)
    }
    const handleSearchTermChange = (event) => {
      setSearchTerm(event.target.value);
    };

    const handleSearch = async (e) => {
      e.preventDefault()
      setTriggetEmpity(!triggerEmpty)

    };
    console.log(currentItens)
    return (

            (addEvent) ? <RegisterEvent setAddEvent={setAddEvent} /> 
            
            : 
          <Row  className="d-flex flex-row mt-5 mx-5 px-5" style={{justifyContent: 'space-between'}}>
              <Col xs={12} sm={6} md={4} lg={3} style={{display: 'flex'}}>
                  <Button onClick={handleAdicionar} className="w-50 p-0 m-0 " style={{background: '#091B36'}}>
                      Adicionar +
                  </Button>
              </Col>
              <SearchBar
        searchTerm={searchTerm}
        onSearchTermChange={handleSearchTermChange}
        onSearch={handleSearch}
      />  
              <Row className="">
              {currentItens.map((item, index) => (
                      <Col key={item.id} md={3} className="mt-5">
                        <CardContet item={item} trigger={trigger} index={index} />
                      </Col>
                ))}
              </Row>

              <nav aria-label="Page navigation example" className="mt-5">
                  <ul class="pagination justify-content-center">
                  {Array.from({ length: Math.ceil(events.length / itemsPerPage) }).map((_, index) => (
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
  const {item, index} = props
  const api = process.env.REACT_APP_API_BASE_URL
  const timeStamp = Date.now()
  const [showUpdate, setShowUpdate] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState(item.nome_evento)
  const [subTitle, setSubTitle] = useState(item.descricao)
  const [categorySelect, setCategorySelect] = useState({nome: 'Categorias'})
  const [editor, setEditor] = useState(item.conteudo)
  const [path, setPath] = useState('')
  const [formatedDate, setFormatedDate] = useState('')
  const [date, setDate] = useState(item.data_evento)
  const [file, setFile] = useState('')
  const [local, setLocal] = useState(item.local)
  const navigate = useNavigate()
  useEffect(() => {
      fetchData()
      console.log(props.selectedCategories)
  }, [props.searchItem]);
  const months = [
      "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
      "Jul", "Ago", "Set", "Out", "Nov", "Dez"
    ];
  const fetchData = async () => {
      // const response = await NewsService.getNews();
      // console.log(response.event)
      // const categories = await CategoriesService.getCategories();
      // console.log(categories)
      const response = await EventService.getEvents()
      response.reverse();
      console.log(response)
      let newEvent = [];
      

          const dateOriginal = item.data_evento
          const dateHourObject = new Date(dateOriginal)
          const hour = dateHourObject.getHours() + 3
          let minutes = dateHourObject.getMinutes();
          if(minutes < 9 && minutes > -1) minutes = "0" + minutes
          console.log(`${hour}:${minutes}`)
          const day = dateHourObject.getUTCDate();
          const month = dateHourObject.getUTCMonth() + 1; 
          const formatedMonth = month.toString().padStart(2, '0');
          const year = dateHourObject.getUTCFullYear();
          
          const formatedDate = `${day}/${formatedMonth}/${year} às ${hour}:${minutes}`
          console.log(formatedDate)
          setFormatedDate(formatedDate)
          console.log(item.data_evento)

      setEvents(response)
      console.log(item.id)
      const relation = await RelationPhotoEventService.getRelation(item.id)
      console.log(relation)
      console.log(relation.relationPhoto.id_foto_fk)
      const a = relation.relationPhoto.id_foto_fk
      setPath(a)
        // newwEvent.push({
        //   id: event.id,
        //   nome_evento: event.nome_evento,
        //   descricao: event.descricao,
        //   data_evento: event.data_evento,
        //   id_categoria_fk: 3,
        //   local: event.local,
        //   path: relation.relationPhoto.id_foto_fk
        // })
          // const relationResponse = await RelationPhotoService.getRelation(event.id);
          // const responsePhoto = await PhotoService.getPhoto(relationResponse.relationPhoto.id_foto_fk);
          //const isMatchingSearch = props.searchItem === '' || event.nome_evento.toLowerCase().includes(props.searchItem.toLowerCase());
      
          
          // if(isMatchingSearch ) {
          //     newEvent.push({
          //         id: event.id,
          //         data_evento: event.data_evento,
          //         nome_evento: event.nome_evento,
          //         descricao: event.descricao,
          //         id_categoria_fk: event.id_categoria_fk
          //     });
          // }

          // console.log(newEvent)
      //setEvents(newEvent);
  }
  const clickEdit = (event) => {
    setShowUpdate(true)
  }

  const clickDelete = () => {
    setShowDelete(true)
  }
  const exitModal = (e) => {
    setShowDelete(false)
  }
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
}
const onUpdate = async (e) => {
  const updateData = {
    "nome_evento": title,
    "descricao": subTitle,
    "id_categoria_fk": 3,
    "local": local, 
    "data_evento": date
}
  const eventUpdate = await EventService.updateEvent(item.id, updateData)
  console.log(eventUpdate)
  if(file === '') {
    setShowUpdate(false)
    
  } else {
    const relation = await RelationPhotoEventService.getRelation(item.id)
    const responsePhoto = await PhotoService.updatePhoto(Number(relation.relationPhoto.id_foto_fk), file)
    setShowUpdate(false)
    
  }
  window.location.reload(true)
}

const deleteEvent = async (e) => {
  e.preventDefault()
  const response = await EventService.deleteEvent(item.id)
  const relation = await RelationPhotoEventService.getRelation(item.id)
  const responsePhoto = await PhotoService.deletePhoto(Number(relation.relationPhoto.id_foto_fk))
  const responseRelation = await RelationPhotoEventService.deleteRelation(item.id)


  window.location.reload(true)
}

const handleDate = (e) => {
  setDate(e.target.value)
}

  return (
    <Col className="d-flex flex-column" style={{ border: 'none', minWidth: 300, justifyContent: 'space-around'}}>
      <Card className="d-flex flex-column" style={{border: 'none', minWidth: 300, justifyContent: 'space-around', background: '#E2E8F082', borderTopLeftRadius: 20, borderTopRightRadius: 20, borderEndStartRadius: 0, borderEndEndRadius: 0}}>
                  <Card.Img variant="top" src={`${api}photo/getPhoto/${path}`} style={{ // Definindo a altura máxima
                      width: 'auto',
                      maxHeight: '180px'
                  }}/>
                  <div className="mx-4 mb-3">
                    <Card.Body className="p-0">
                        <p className="card-date p-0 m-0 mt-3" style={{fontWeight: 600, color: '#D60007', fontSize: 14}}>{formatedDate}</p>
                        <Card.Title style={{color: '#091B36', fontWeight: 600, fontSize: 18, marginTop: 10}}>{item.nome_evento}</Card.Title>
                        <Card.Text style={{color: '#213249', fontWeight: 400, fontSize: 14, marginTop: 10,  minHeight: 100}}>{item.descricao}</Card.Text>
                        <Card.Text style={{color: '#828282', fontWeight: 400, fontSize: 14, marginBottom: 30}}>{item.local}</Card.Text>
                    </Card.Body>
                    <div className="d-flex justify-content-around align-items-end" >
                      <GrEdit onClick={clickEdit} className="p-2" style={{borderRadius: '0.3rem', fontSize: 40, background: '#091B361A', fontColor: '#091B36', cursor: 'pointer'}}/>
                      <FiTrash2 onClick={clickDelete} className="p-2" style={{borderRadius: '0.3rem', fontSize: 40, background: '#D6000729', color: '#D60007', cursor: 'pointer'}}/>
                    </div>
                  </div>
              </Card>
            <>
              <Modal show={showUpdate} onHide={setShowUpdate}>
                <Modal.Header closeButton>
                  <Modal.Title>Update</Modal.Title>
                </Modal.Header>
                <Modal.Footer className="justify-content-center">
                  <Form>
                      <Form.Group controlId="title">
                          <Form.Label>Nome do evento</Form.Label>
                          <FormControl 
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder={item.titulo} />

                          
                      </Form.Group>
                      <Form.Group controlId="sub">
                          <Form.Label>Descrição</Form.Label>
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

                    <Form.Group controlId="local">
                          <Form.Label>Local</Form.Label>
                          <FormControl 
                          type="text"
                          value={local}
                          onChange={(e) => setLocal(e.target.value)}
                          placeholder={item.local} />
                    </Form.Group>
                    

                    <Form.Group controlId="datePicker">
                        <Form.Label>Dia e hora</Form.Label>
                        <Form.Control
                        type="datetime-local"
                        value={date}
                        onChange={handleDate}
                        />
                    </Form.Group>

                    
                      </Form.Group>

                      
                  </Form>
                  
                </Modal.Footer>
                <Button className="mx-4 my-4" variant="success" onClick={onUpdate}>Atualizar</Button>
              </Modal>
              
              <Modal show={showDelete} onHide={setShowDelete}>
                <Modal.Header closeButton>
                  <Modal.Title>Deletar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Você realmente deseja deletar essa noticia?
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={deleteEvent} variant="success">Sim</Button>
                  <Button onClick={exitModal} variant="danger">Não</Button>
                </Modal.Footer>
              </Modal>
            </>
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
  