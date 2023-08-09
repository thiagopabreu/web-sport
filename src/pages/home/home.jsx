import { Container, Row } from "react-bootstrap"
import { Header } from "../../components/Header/header"
import { SubHeader } from "../../components/SubHeader/subHeader"
import { Main } from "../../components/Main/main"
import { CardNews } from "../../components/CardNews/cardNews"
import { Footer } from "../../components/Footer/footer"


export const Home = () => {

    

    return (
        <Container fluid style={{fontFamily: 'Poppins'}}>
            <Row>
                <Header />
            </Row>
            <Row className="pb-5">
                <Container >
                    <Row>
                        <SubHeader />
                    </Row>
                    <Row>
                        <Main />
                        <CardNews />
                    </Row>
                </Container>
            </Row>
            <Row>
                <Footer />
            </Row>
        </Container>
    )
}