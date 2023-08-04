import { Container, Row } from "react-bootstrap"
import { Header } from "../../components/Header/header"
import { SubHeader } from "../../components/SubHeader/subHeader"


export const Home = () => {

    

    return (

        <Container fluid style={{fontFamily: 'Poppins'}}>
            <Row>
                <Header />
            </Row>
            <Row>
                <Container >
                    <Row>
                        <SubHeader />
                    </Row>
                </Container>
            </Row>
        </Container>

    )
}