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
            <footer className="text-light py-3 text-center" style={{backgroundColor:'#091B36'}}>
              <Container fluid className="justify-content-center align-itens-center align-content-center">
                <Row className="align-items-center justify-content-center">
                  <Col md={3} className="justify-content-center align-itens-center align-content-center">
                      <Image src='LOGO.png' style={{width: '12.5rem'}} />
                  </Col>
                  <Col md={3} className="d-flex flex-column align-items-center">
                    <Navbar>
                      <Nav className="flex-column" >
                        <Nav.Link href="#" style={navLink}>Ínicio</Nav.Link>
                        <Nav.Link href="#" style={navLink}>Notícias</Nav.Link>
                        <Nav.Link href="#" style={navLink}>Campeonatos</Nav.Link>
                      </Nav>
                    </Navbar>
                  </Col>
                  <Col md={3} className="d-flex flex-column align-items-center">
                    <Navbar>
                      <Nav className="flex-column">
                        <Nav.Link href="#" style={navLink}>Eventos</Nav.Link>
                        <Nav.Link href="#" style={navLink}>Contato</Nav.Link>
                      </Nav>
                    </Navbar>
                  </Col>
                  <Col md={3} className="d-flex flex-column align-items-center">
                    <div className="d-flex flex-column">
                      <p>Mídias Sociais</p>
                      <div className="d-flex justify-content-between">
                        <a href="#" className="text-light me-2"><FaFacebookF  /></a>
                        <a href="#" className="text-light me-2"><BsInstagram /></a>
                        <a href="#" className="text-light me-2"><FaTwitter /></a>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </footer>
    )
}