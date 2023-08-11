import { Container, Row } from "react-bootstrap"
import { Header } from "../../components/Header/header"
import { SearchBar } from "../../components/SearchBar/searchBar"
import { Footer } from "../../components/Footer/footer"

export const News = () => {

    return(
        <Container className="d-flex flex-column min-vh-100" fluid style={{fontFamily: 'Poppins'}}>
            <Row>
                <Header />
            </Row>

            <Row className="pb-5 flex-grow-1 mt-5">
                <Container className="mt-5">
                    <Row>
                        <SearchBar />
                    </Row>
                </Container>
            </Row>

            <Row>
                
            </Row>

            <Row>
                <Footer />
            </Row>
        </Container>
    )
}