import { Col, Container, Row } from "react-bootstrap"
import { CardNew } from "../Card/cardNews"


export const CardsNews = () => {




    return (
        <Container >
            <Col xs={12} md={{span: 8, offset: 2}} className="d-flex flex-row flew-wrap justify-content-between mt-5 px-3">
                <CardNew image="image_example_1.png"/>
                <CardNew image="image_example_2.png"/>
                <CardNew image="image_example_3.png"/>
                <CardNew image="image_example_4.png"/>
            </Col>    
        </Container>
    )
}