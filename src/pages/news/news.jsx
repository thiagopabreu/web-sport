import { Col, Container, Row } from "react-bootstrap"
import { Header } from "../../components/Header/header"
import { SearchBar } from "../../components/SearchBar/searchBar"
import { Footer } from "../../components/Footer/footer"
import { MainNews } from "../../components/MainNews/mainNews"
import { CardsNews } from "../../components/CardNews/cardsNews"
import { CardContent } from "../../components/CardContent/cardContent"
import { useEffect, useState } from "react"

export const News = () => {

    const [searchItem, setSearchItem] = useState("")
    const [selectedCategories, setSelectedCategories] = useState([]);

    useEffect(() => {
        console.log(selectedCategories)
    }, [selectedCategories])

    return(
        <Container className="d-flex flex-column justify-content-between min-vh-100" fluid style={{fontFamily: 'Poppins'}}>
            <Row>
                <Header />
            </Row>

            <Row className="mt-5">
                <Container>
                    <Row>
                        <SearchBar placeholder="Buscar por notícia"
                         withCategory={true}
                         category={[{ value: 0, label: 'Todos' }, { value: 2, label: 'Volei' }, { value: 1, label: 'Futebol' },{ value: 3, label: 'Basquete' }]}
                         searchItem={searchItem}
                         selectedCategories={selectedCategories}
                         onSearchTermChange={setSearchItem}
                         onSelectedCategoriesChange={setSelectedCategories}
                         />
                    </Row>
                </Container>
            </Row>

            <Row>
                <Col xs={12} md={{span: 8, offset: 2}} className="d-flex flex-row flew-wrap justify-content-between">
                    <CardContent searchItem={searchItem} selectedCategories={selectedCategories} />
                </Col>
            </Row>

            <Row className="justify-content-end">
                <Footer />
            </Row>
        </Container>
    )
}