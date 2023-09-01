import { Col, Container, Row } from "react-bootstrap"
import { Header } from "../../components/Header/header"
import { SubHeader } from "../../components/SubHeader/subHeader"
import { Main } from "../../components/Main/main"
import { CardsNews } from "../../components/CardNews/cardsNews"
import { Footer } from "../../components/Footer/footer"
import { useEffect, useState } from "react"
import { NewsService } from "../../services/services"
import { useDispatch, useSelector } from "react-redux"
import { fetchNews, selectNews } from "../../redux/features/news"
import axios from "axios"
import { useMediaQuery } from "react-responsive"


export const Home = () => {

    const dispatch = useDispatch()
    const [news, setNews] = useState([])
    
    useEffect(() => {
        fetchData()
      }, [])
      
    const fetchData = async () => {
        const response = await NewsService.getNews();

        setNews(response.news[response.news.length - 1])
    }
    return (
        <Container className="d-flex flex-column min-vh-100" fluid style={{fontFamily: 'Poppins'}}>
            <Row>
                <Header />
            </Row>
            <Row className="pb-5 flex-grow-1">
                <Container >
                    <Row>
                        <SubHeader />
                    </Row>
                    <Row fluid>
                        <Main />
                    </Row>
                    <Row fluid className="mt-5 mb-5">
                        <Col>
                            <CardsNews className="mb-5"/>
                        </Col>
                    </Row>
                </Container>
            </Row>
            <Row>
                <Footer />
            </Row>
        </Container>
    )
}