import { Col, Container, Row } from "react-bootstrap"
import { CardNew } from "../Card/cardNew"
import { NewsService } from "../../services/services"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"


export const CardsNews = (props) => {

  const [news, setNews] = useState([])
  const location = useLocation()
  const {one_news} = props
  console.log(one_news)
  useEffect(() => {
    fetchData()
  }, [])
  
const fetchData = async () => {
    const response = await NewsService.getNews();
    response.news.forEach((item, index) => {
      const dateOriginal = item.data_publicacao
      const dateHourObject = new Date(dateOriginal)
      const day = dateHourObject.getUTCDate();
      const month = dateHourObject.getUTCMonth();
      const formatedMonth = month.toString().padStart(2, '0');
      const year = dateHourObject.getUTCFullYear();
      
      const formatedDate = `${day}/${formatedMonth}/${year}`
      response.news[index].data_publicacao = formatedDate
  })
    let newsList = response.news.reverse()
    delete newsList[0]
    setNews(newsList)
  }

    return (
      <Container>
      <Row className="justify-content-center mt-5">
        {news.length > 0 &&
          news.map((one_news, index) => (
            <Col key={index} xs={12} md={6} lg={4} xl={3} className="mb-4">
              {/* Added "mb-4" class and adjusted column breakpoints */}
              <CardNew news={one_news} />
            </Col>
          ))}
      </Row>
    </Container>
    )
}