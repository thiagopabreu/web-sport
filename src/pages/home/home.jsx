import { Container, Row } from "react-bootstrap"
import { Header } from "../../components/Header/header"
import { SubHeader } from "../../components/SubHeader/subHeader"
import { Main } from "../../components/Main/main"
import { CardsNews } from "../../components/CardNews/cardNews"
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
                    </Row>
                    <Row className="mt-5 mb-5">
                        <CardsNews />
                        <CardsNews className="mb-5"/>
                    </Row>
                </Container>
            </Row>
            <Row>
                <Footer />
            </Row>
        </Container>
    )
}