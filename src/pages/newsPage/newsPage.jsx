import { Col, Container, Row } from "react-bootstrap"
import { Header } from "../../components/Header/header"
import { Footer } from "../../components/Footer/footer"
import { useMediaQuery } from "react-responsive"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { NewsService, PhotoService, RelationPhotoService } from "../../services/services"
import { CardsNews } from "../../components/CardNews/cardsNews"


export const NewsPage = () => {

    const {id} = useParams();
    const api = process.env.REACT_APP_API_BASE_URL
    const [path, setPath] = useState('')
    const [news, setNews] = useState({})
    const isMobile = useMediaQuery({maxWidth: 1439})
    const location = useLocation()
    const navigate = useNavigate()
    const htmlString = news.conteudo

    useEffect(() => {
        fetchData()
    }, [id])

    const fetchData = async () => {
        const one_news = await NewsService.getANews(id)
        setNews(one_news)
        const relation = await RelationPhotoService.getRelation(one_news.id)
        setPath(relation.relationPhoto.id_foto_fk)
    }
    return (
        <Container className="d-flex flex-column min-vh-100" fluid style={{fontFamily: 'Poppins'}}>
            <Row>
                <Header />
            </Row>
            <Container className="mt-5 pb-5 px-5 d-flex flex-column align-items-center justify-content-center">
                <h3 style={{ fontWeight: 500, color: '#091B36', fontSize: 48 }}>{news.titulo}</h3>
                <Col xs={12} md={6} className="img-container mb-3 mt-5">
                    <img
                    src={`${api}photo/getPhoto/${path}`}
                    className="img-fluid"
                    width={'100%'}
                    alt="Imagem"
                    />
                    
                </Col>
                <div dangerouslySetInnerHTML={{ __html: htmlString }} className="mt-5 mb-5"/>
                <p className="align-self-start ml-5" style={{fontWeight: 500, fontSize: 32}}>Outras noticias</p>
                <CardsNews className="mb-5" one_news={news.news}/>
            </Container>
            <Row>
                <Footer />
            </Row>
        </Container>
    )
}