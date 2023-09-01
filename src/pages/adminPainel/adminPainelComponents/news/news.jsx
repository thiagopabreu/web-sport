import { useEffect, useState } from "react"
import { Button, Col, Form, FormControl, Image, InputGroup, Row } from "react-bootstrap"
import { NewsService, PhotoService, RelationPhotoService } from "../../../../services/services"
import {FaSearch} from 'react-icons/fa'
import {GrEdit} from "react-icons/gr";
import {FiTrash2} from 'react-icons/fi'
import { useNavigate } from "react-router-dom";
import { RegisterNews } from "./newNews";
export const News = () => {
    const api = process.env.REACT_APP_API_BASE_URL;
    const [news, setNews] = useState([])
    const [addNews, setAddNews] = useState(false)
    const [paths, setPaths] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [trigger, setTrigger] = useState(false)
    const navigate = useNavigate()
    const itemsPerPage = 4
    useEffect(() => {
      fetchData()
    }, [])
    const fetchData = async () => {
      const response = await NewsService.getNews()
  
      response.news.reverse()
      let photos = []
      setNews(response.news)
  
    }
    console.log(paths)
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItens = news.slice(indexOfFirstItem, indexOfLastItem)
    const paginate = (pageNumber) => {
      setCurrentPage(pageNumber)
      setTrigger(!trigger) 
    }
    const handleAdicionar = () => {
      setAddNews(true)
    }
    return (

            (addNews) ? <RegisterNews setAddNews={setAddNews} /> 
            
            : 
          <Row className="d-flex flex-row mt-5 mx-5 px-5" style={{justifyContent: 'space-between'}}>
              <Col style={{display: 'flex'}}>
                  <Button onClick={handleAdicionar} className="w-50 p-0 m-0 " style={{background: '#091B36'}}>
                      Adicionar +
                  </Button>
              </Col>
              <SearchBar />

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
    const api = process.env.REACT_APP_API_BASE_URL
    
    console.log(item)
    const [path, setPath] = useState('')
    const [days, setDays] = useState('')
    const [clicked, setClicked] = useState(false)
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
      console.log(relation)
      const photo = await PhotoService.getPhoto(relation.relationPhoto.id_foto_fk)
      setPath(relation.relationPhoto.id_foto_fk)
    }
    const handleClicked = (event) => {
      setClicked(!clicked)
    }

    console.log(path)
    return (
      <Col onClick={handleClicked} className="d-flex mt-5" style={{border: 'none', background: '#E2E8F082', borderRadius: '2rem', cursor: 'pointer'}}>
        <Image xs={4} style={{borderRadius: '2rem 0 0 2rem', width: '22%'}} src={`${api}photo/getPhoto/${path}`} />
        <Col xs={5} className="d-flex flex-column mx-5" style={{justifyContent: 'center', alignContent: 'center', alignItems: 'flex-start'}}>
          <p className="p-0 m-0 " style={{fontWeight: 500, fontSize: 20, color: '#213249' }}>{item.titulo}</p>
          <p className="p-0 m-0 pt-2" style={{fontWeight: 400, fontSize: 16, color: '#828282' }}>{days}</p>
        </Col>
        <Col xs={3} className="d-flex w-25" style={{justifyContent: 'space-evenly', alignContent: 'center', alignItems: 'center'}}>
            {clicked && 
            <>
              <GrEdit className="p-2" style={{borderRadius: '0.3rem', fontSize: 50, background: '#091B361A', fontColor: '#091B36', cursor: 'pointer'}}/>
              <FiTrash2 className="p-2" style={{borderRadius: '0.3rem', fontSize: 50, background: '#D6000729', color: '#D60007', cursor: 'pointer'}}/>
            </>}
        </Col>
      </Col>
    )
  }
  
  const SearchBar = () => {
  
  
    return (
          <Form className="d-flex flex-row w-75 gap-5">
              <InputGroup className="custom-input w-75">
                  <InputGroup.Text className="p-4" style={{borderRight: 'none', backgroundColor: '#F2F4F8', border: 'none'}}><FaSearch /></InputGroup.Text>
                  <FormControl
                    placeholder="Buscar por notícia" type="text" className="mr-sm-2 p-3 custom-input"  style={{borderLeft: 'none',fontWeight: 500}}></FormControl>
              </InputGroup>
              <Button  className="p-3 px-4" style={{maxHeight: 60, background: '#091B36', color: 'white', borderRadius: '1.2rem', border: 'none'}} variant="outline-success">Buscar</Button >
  
          </Form>
  
  )
  }
  