import { Button, Col, Image, Row } from "react-bootstrap"


export const MainNews = () => {

    return (
        <Row className="d-flex justify-content-between gap-5">
            <Col className="img-container"  style={{width: '40rem'}}>
                <Image src="image_example.png" className="img-fluid"/>
            </Col>
            
            <Col className="d-flex flex-wrap flex-column">
                <p style={{fontWeight: 400, fontSize: 14, color: '#828282'}}>Hoje às 08:27</p>
                <h3 style={{fontWeight: 400, color: '#091B36'}}>Time feminino de futebol conquista campeonato amador</h3>
                <p style={{fontWeight: 400, color: '#091B36'}}>O time feminino de futebol conquistou o tão almejado campeonato amador, e sua vitória inspiradora ficará marcada na história esportiva regional. Ao demonstrar que talento e dedicação são capazes de superar quaisquer desafios, essas talentosas atletas não apenas levantaram a taça, mas também deixaram um poderoso legado motivador para as gerações futuras. Sua conquista é um exemplo de como a determinação e o amor pelo esporte podem abrir caminhos e quebrar barreiras.</p>
                <Button variant="outline-danger" size="lg" style={{borderRadius: '2rem', fontWeight: 500, maxWidth: 150, fontSize: 16}}>Ler mais</Button>
            </Col>
        </Row>
    )
}