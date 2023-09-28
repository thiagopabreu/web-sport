import { useEffect, useState } from "react"
import { Button, Card, Col, Image, Row } from "react-bootstrap"
import { CategoriesService, NewsService, PhotoService, RelationPhotoService } from "../../services/services"
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

export const CardContent = (props) => {
    const api = process.env.REACT_APP_API_BASE_URL
    const [news, setNews] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        fetchData();
        console.log(props.selectedCategories)
    }, [props.searchItem, props.selectedCategories]);

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
        console.log(response.news)
        const categories = await CategoriesService.getCategories();
        console.log(categories)
        let newsPhoto = [];

        for (const one_news of response.news) {
            const relationResponse = await RelationPhotoService.getRelation(one_news.id);
            const responsePhoto = await PhotoService.getPhoto(relationResponse.relationPhoto.id_foto_fk);
            
            const isMatchingSearch = props.searchItem === '' || one_news.titulo.toLowerCase().includes(props.searchItem.toLowerCase());
            
            const isMatchingCategory = props.selectedCategories.length === 0 || props.selectedCategories.includes(categories[one_news.id_categoria_fk - 1].nome);
            
            if(isMatchingSearch && isMatchingCategory) {
                newsPhoto.push({
                    id: one_news.id,
                    titulo: one_news.titulo,
                    data_publicacao: one_news.data_publicacao,
                    id_categoria_fk: one_news.id_categoria_fk,
                    id_foto_fk: relationResponse.relationPhoto.id_foto_fk
                });
            }


        }

        setNews(newsPhoto);
    }

    const handleNavigate = (item) => {
        navigate(`/noticia/${item.id}`, {state: {news: item}})
    }
    console.log('entrei')

    const isMobileP = useMediaQuery({ query: '(max-width: 320px)' });
    const isMobileM = useMediaQuery({ query: '(max-width: 375px)' });
    const isMobileL = useMediaQuery({ query: '(max-width: 425px)' });
    const isTablet = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1023px)' });
    const isLaptop = useMediaQuery({ query: '(min-width: 1024px) and (max-width: 1439px)' });
    const cardClass = isMobileP ? 'flex-column mobile-p-card' : isMobileM ? 'flex-column mobile-m-card' : isMobileL ? 'flex-column mobile-l-card' : isTablet ? 'flex-column tablet-card' : isLaptop ? 'flex-row laptop-card' : 'flex-row default-card';
    let colSize = 6; // Tamanho padrão de coluna para telas maiores
    console.log(isLaptop)

    if(isTablet) {
        colSize = 12
    }
    if(isLaptop) {
        colSize = 12
    }
    const renderNewsCards = () => {
        return news.map((item, index) => (
            <Col key={index} xs={12} sm={colSize} md={colSize} lg={colSize} className="m-0 mb-3 d-flex justify-content-around" style={{maxWidth: 610}}>  
                <Card className={`d-flex p-0 m-0 ${cardClass}` }style={{border: 'none', width: '100%'}}>
                    <Card.Img variant="top" src={`${api}photo/getPhoto/${item.id_foto_fk}`} style={{width: (isMobileP) ? 300 : 250, height: (isMobileP) ? 200 : 150}}/>
                    <Card.Body className="p-0 mx-3">
                        <p className="card-date p-0 m-0">{item.data_publicacao}</p>
                        <Card.Title>{item.titulo}</Card.Title>
                        <p onClick={() => handleNavigate(item)} style={{color: '#D60007', textDecoration: 'underline', fontWeight: 500, cursor: 'pointer'}}>Ler mais</p>
                    </Card.Body>
                </Card>
            </Col>
        ));
    };

    return (
        <Row>
            {renderNewsCards()}
        </Row>
    )
}
