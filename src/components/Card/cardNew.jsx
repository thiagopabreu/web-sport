import { useEffect, useState } from "react"
import { Row, Card, Button } from "react-bootstrap"
import { PhotoService, RelationPhotoService } from "../../services/services"
import { useLocation, useNavigate } from "react-router-dom"



export const CardNew = (props) => {
    const navigate = useNavigate()
    const location = useLocation();
    const [path, setPath] = useState('')
    const {news} = props
    const api = process.env.REACT_APP_API_BASE_URL
    console.log(news)
    useEffect(() => {
        fetchData()
    }, [news])

    const fetchData = async () => {
    
        const relation = await RelationPhotoService.getRelation(news.id);
        const photo = await PhotoService.getPhoto(relation.relationPhoto.id_foto_fk);
        console.log(photo.photo.caminho)
        console.log(news.titulo.length)
        setPath(photo.photo.caminho)
    }
    const handleNavigate = (event) => {
      navigate(`/noticia/${news.id}`)
      window.location.reload(true);
    }
    return(
        <Card style={{ width: "16rem", border: "none", marginBottom: "1rem" }}>
      {/* Added marginBottom style to create spacing */}
      <Card.Img variant="top" src={`${api}photo/readPhoto/${path}`} />
      <Card.Body className="px-0">
        <Card.Text style={{ color: "#828282", fontSize: 14, fontWeight: 400 }}>{news.data_publicacao}</Card.Text>
        <Card.Text style={{ color: "#213249", fontWeight: 400, fontSize: 16 }}>
          {news.titulo}
        </Card.Text>
        <Button onClick={handleNavigate} className="px-0" style={{ backgroundColor: "white", color: "red", border: "none" }}>
          Ler mais
        </Button>
      </Card.Body>
    </Card>
    )
}