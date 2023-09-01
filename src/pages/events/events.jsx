import { Col, Container, Row } from "react-bootstrap"
import { Header } from "../../components/Header/header"
import { SearchBar } from "../../components/SearchBar/searchBar"
import { CardContent } from "../../components/CardContent/cardContent"
import { Footer } from "../../components/Footer/footer"
import '../../App.css'
import '../../index.css'
import { useEffect, useState } from "react"
import { EventCard } from "../../components/eventCard/eventCard"

export const Events = () => {

    const [searchItem, setSearchItem] = useState("")
    
    useEffect(() => {
        console.log(searchItem)
    }, [searchItem])

    return (
        <Container fluid className="d-flex flex-column justify-content-between min-vh-100" style={{fontFamily: 'Poppins'}}>
            <Row>
                <Header />
            </Row>

            <Row className="mt-5">
                <Container className="">
                    <Row>
                        <SearchBar placeholder="Buscar por evento"  
                            withCategory={false}
                            category={[{ value: 0, label: 'Todos' }, { value: 2, label: 'Volei' }, { value: 1, label: 'Futebol' },{ value: 3, label: 'Basquete' }]}
                            searchItem={searchItem}
                            onSearchTermChange={setSearchItem} />
                            
                    </Row>
                </Container>
            </Row>

            <Row>
                <Col xs={12} md={{span: 8, offset: 2}} className="d-flex flex-row flew-wrap justify-content-between">
                    <EventCard searchItem={searchItem}  />
                </Col>
            </Row>

            <Row className="justify-content-end">
                <Footer />
            </Row>
        </Container>
    )
}