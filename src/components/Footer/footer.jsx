import { Col, Container, Image, Nav, Navbar, Row } from "react-bootstrap"
import {FaFacebookF, FaTwitter} from "react-icons/fa"
import {BsInstagram} from 'react-icons/bs'
export const Footer = () => {

  const navLink = {
    color: '#FFFFFF',
    fontSize: '1rem',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: '1.5rem'
  }
    return (
            <footer className="text-light py-5 text-center" style={{backgroundColor:'#091B36'}}>
              <Container fluid className="justify-content-center align-itens-center align-content-center">
                <Row className="align-items-center justify-content-center">
                  <Col md={3} className="justify-content-center align-itens-center align-content-center">
                      <Image src='../LOGO.png' style={{width: '12.5rem'}} />
                  </Col>
                  <Col md={3} className="d-flex flex-column align-items-center">
                    <Navbar>
                      <Nav className="flex-column align-content-start align-itens-start" >
                        <Nav.Link href="/" style={navLink} className="d-flex row align-items-start">Ínicio</Nav.Link>
                        <Nav.Link href="/noticias" style={navLink} className="d-flex row align-items-start">Notícias</Nav.Link>
                        <Nav.Link href="/campeonatos" style={navLink} className="d-flex row align-items-start">Campeonatos</Nav.Link>
                      </Nav>
                    </Navbar>
                  </Col>
                  <Col md={3} className="d-flex flex-column align-items-center">
                    <Navbar>
                      <Nav className="flex-column">
                        <Nav.Link href="eventos" style={navLink}>Eventos</Nav.Link>
                        <Nav.Link href="#" style={navLink}>Contato</Nav.Link>
                      </Nav>
                    </Navbar>
                  </Col>
                  <Col md={3} className="d-flex flex-column align-items-start align-content-start">
                    <div className="d-flex flex-column">
                      <p>Mídias Sociais</p>
                      <div className="d-flex flex-row justify-content-between align-content-center align-items-center">
                        <a href="#" className="text-light me-2"><FaFacebookF  /></a>
                        <a href="https://www.instagram.com/portal.regional/" target="_blank" className="text-light me-2"><BsInstagram /></a>
                        <a href="#" className="text-light me-2"><FaTwitter /></a>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </footer>
    )
}