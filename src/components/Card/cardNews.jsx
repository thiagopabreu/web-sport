import { Row, Card, Button } from "react-bootstrap"



export const CardNew = (props) => {
    return(
        <Row>
            <Card style={{ width: '16rem', border: 'none'}} className="p-0 m-0">
                <Card.Img variant="top" src={props.image} />
                <Card.Body className="px-0">
                    <Card.Text style={{color: '#828282', fontSize: 14, fontWeight: 400}}>Hoje às 08:27</Card.Text>
                    <Card.Text style={{color: '#213249', fontWeight: 400, fontSize: 16}}>
                    Atleta local quebra recorde histórico no salto em altura durante competição regional.
                    </Card.Text>
                    <Button className="px-0" style={{backgroundColor: 'white', color: 'red', border: 'none'}}>Ler mais</Button>
                </Card.Body>
            </Card>
        </Row>
    )
}