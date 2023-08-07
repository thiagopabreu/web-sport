import { Container, Row } from "react-bootstrap"
import { Header } from "../../components/Header/header"
import { SubHeader } from "../../components/SubHeader/subHeader"
import { Main } from "../../components/Main/main"


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
                    <Row>
                        <Main />
                    </Row>
                </Container>
            </Row>
        </Container>
    )
}