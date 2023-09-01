import { Button, Col, Image, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from 'react-responsive';
import { fetchNews, selectNews, selectNewsLoading } from "../../redux/features/news";
import { useEffect, useState } from "react";
import { NewsService, PhotoService, RelationPhotoService } from "../../services/services";
import { useLocation, useNavigate } from "react-router-dom";


export const MainNews = (props) => {
    const api = process.env.REACT_APP_API_BASE_URL
    
    const isMobile = useMediaQuery({ maxWidth: 1439 });
    const [path, setPath] = useState('')
    const [news, setNews] = useState([])
    const navigate = useNavigate()
    const location = useLocation()
    useEffect(() => {
      fetchData()
    }, [])

    const handleNavigate = (event) => {
        navigate(`/noticia/${news.id}`, {state: {news: news}})
    }
    const fetchData = async () => {
      const response = await NewsService.getNews();
      console.log(response)
      const thisNews = response.news
        if(thisNews.length > 0) {
          const dateOriginal = response.news[response.news.length - 1].data_publicacao
          const dateHourObject = new Date(dateOriginal)
          const day = dateHourObject.getUTCDate();
          const month = dateHourObject.getUTCMonth();
          const formatedMonth = month.toString().padStart(2, '0');
          const year = dateHourObject.getUTCFullYear();

          const formatedDate = `${day}/${formatedMonth}/${year}`
          response.news[response.news.length - 1].data_publicacao = formatedDate
    //   response.news.forEach((item, index) => {
    //     const dateOriginal = item.data_publicacao
    //     const dateHourObject = new Date(dateOriginal)
    //     const day = dateHourObject.getUTCDate();
    //     const month = dateHourObject.getUTCMonth();
    //     const formatedMonth = month.toString().padStart(2, '0');
    //     const year = dateHourObject.getUTCFullYear();
        
    //     const formatedDate = `${day}/${formatedMonth}/${year}`
    //     response.news[index].data_publicacao = formatedDate
    // })
        if (response.news && Array.isArray(response.news) && response.news.length > 0) {
          console.log('entrei aqui');
          
          setNews(response.news[response.news.length - 1]);

          
          const lastNewsItem = response.news[response.news.length - 1];
          console.log(lastNewsItem);
          const relation = await RelationPhotoService.getRelation(lastNewsItem.id);
          console.log(relation);
          setPath(relation.relationPhoto.id_foto_fk);
      }
        }
    }

    console.log(news)
    return (
      <>
        <Row className={isMobile ? "flex-column align-content-center justify-content-center align-items-center" : "d-flex flex-row"} style={{flexWrap: "nowrap"}}>
        <Col xs={12} md={6} className="img-container d-flex flex-column align-items-center justify-content-center">
          {console.log('entrei aqui')}
          <img src={`${api}photo/getPhoto/${path}`} width={640} height={400} alt="Imagem de exemplo" className="img-fluid" />
        </Col>
        <Col xs={12} md={6} className={isMobile && "mt-5 w-100"} style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly'}}>
          <p style={{ fontWeight: 400, fontSize: 14, color: '#828282' }}>{news.data_publicacao}</p>
          <h3 style={{ fontWeight: 400, color: '#091B36' }}>{news.titulo}</h3>
          <p style={{ fontWeight: 400, color: '#091B36' }}>{news.sub_conteudo}</p>
          <button onClick={handleNavigate} className="btn btn-outline-danger btn-lg" style={{ borderRadius: '2rem', fontWeight: 500, maxWidth: 150, fontSize: 16 }}>Ler mais</button>
        </Col>
      </Row>
      </>
    );
  }

  
  
  
  
  
  