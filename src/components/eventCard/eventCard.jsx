import { useEffect, useState } from "react"
import { Button, Card, Col, Image, Row } from "react-bootstrap"
import { CategoriesService, EventService, NewsService, PhotoService, RelationPhotoEventService, RelationPhotoService } from "../../services/services"
import { useNavigate } from "react-router-dom";

export const EventCard = (props) => {
    console.log('entrei aqui')
    const api = process.env.REACT_APP_API_BASE_URL
    const timeStamp = Date.now()
    const [events, setEvents] = useState([]);
    const [paths, setPaths] = useState([])
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
        
        response.forEach((item, index) => {
            const dateOriginal = item.data_evento
            const dateHourObject = new Date(dateOriginal)
            const hour = dateHourObject.getHours()
            let minutes = dateHourObject.getMinutes();
            if(minutes > 0 && minutes < 9) minutes = '0' + minutes
            console.log(`${hour}:${minutes}`)
            const day = dateHourObject.getUTCDate();
            const month = dateHourObject.getUTCMonth() + 1;
            const formatedMonth = month.toString().padStart(2, '0');
            const year = dateHourObject.getUTCFullYear();
            
            const formatedDate = `${day}/${formatedMonth}/${year} às ${hour}:${minutes}`
            response[index].data_evento = formatedDate
        })

        setEvents(response)
        for (const event of response) {
            // const relationResponse = await RelationPhotoService.getRelation(event.id);
            // const responsePhoto = await PhotoService.getPhoto(relationResponse.relationPhoto.id_foto_fk);
            const isMatchingSearch = props.searchItem === '' || event.nome_evento.toLowerCase().includes(props.searchItem.toLowerCase());
        
            
            if(isMatchingSearch ) {
                newEvent.push({
                    id: event.id,
                    data_evento: event.data_evento,
                    nome_evento: event.nome_evento,
                    descricao: event.descricao,
                    id_categoria_fk: event.id_categoria_fk
                });
            }
            
            console.log(newEvent)
        }
        let caminhos = []
        caminhos = response.map(async (event) => {
            console.log(event)
            const responseRelation = await RelationPhotoEventService.getRelation(event.id)

            return responseRelation.relationPhoto
        })
        const pathsResolver = await Promise.all(caminhos)
        setPaths(pathsResolver)
        setEvents(newEvent);
    }
    const handleNavigate = (item) => {
        navigate(`/evento/${item.id}`, {state: {event: item}})
    }
    console.log(events)
    console.log(paths)
    const renderNewsCards = () => {
        return events.map((item, index) => (
            <Col key={index} xs={6} sm={3} md={3} lg={3} className="mb-3">  
                <Card className="d-flex flex-column" style={{border: 'none', minWidth: 300}}>
                    {paths.length > 0 && <Card.Img variant="top" src={`${api}photo/getPhoto/${paths[index].id_foto_fk}`} style={{ // Definindo a altura máxima
                        maxWidth: 400,
                        maxHeight: 250
                    }}/>}
                    <Card.Body className="p-0">
                        <p className="card-date p-0 m-0 mt-3" style={{fontWeight: 600, color: '#D60007', fontSize: 14}}>{`${item.data_evento}`}</p>
                        <Card.Title style={{color: '#091B36', fontWeight: 600, fontSize: 18, marginTop: 10}}>{item.nome_evento}</Card.Title>
                        <Card.Text style={{color: '#213249', fontWeight: 400, fontSize: 14, marginTop: 10}}>{item.descricao}</Card.Text>
                        <Card.Text style={{color: '#828282', fontWeight: 400, fontSize: 14}}>{item.local}</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        ));
    };

    return (
        <Row className="mt-5">
            {renderNewsCards()}
        </Row>
    )
}
