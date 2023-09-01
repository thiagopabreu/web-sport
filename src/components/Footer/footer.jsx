import { Col, Container, Image, Nav, Navbar, Row } from "react-bootstrap"
import {FaFacebookF, FaTwitter} from "react-icons/fa"
import {BsInstagram} from 'react-icons/bs'
import { useMediaQuery } from "react-responsive"
export const Footer = () => {

  const isMobile = useMediaQuery({maxWidth: 425})

  const navLink = {
    color: '#FFFFFF',
    fontSize: '1rem',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: '1.5rem'
  }
    return (
            <footer className="text-light py-5 text-center" style={{backgroundColor:'#091B36'}}>
              <Container fluid className="justify-content-center align-itens-center align-content-center" style={isMobile ? {justifyContent: 'center', alignContent: 'center', alignItems: 'center'} : {}}>
                <Row className="align-items-center" style={{justifyContent: 'center'}}>
                  <Col md={3} className="justify-content-center align-itens-center align-content-center">
                      <Image src='../LOGO.png' style={{width: '12.5rem'}} />
                  </Col>
                  <Col md={3} className="d-flex flex-column align-items-center justify-content-center">
                    <Navbar style={{justifyContent: 'center'}}>
                      <Nav className="flex-column align-content-start align-itens-start" style={{justifyContent: 'center'}} >
                        <Nav.Link href="/" style={navLink} className={(isMobile ? "d-flex row align-items-center justify-content-center" : "d-flex row align-items-center")}>Ínicio</Nav.Link>
                        <Nav.Link href="/noticias" style={navLink} className={(isMobile ? "d-flex row align-items-center justify-content-center" : "d-flex row align-items-center")}>Notícias</Nav.Link>
                        <Nav.Link href="/campeonatos" style={navLink} className={(isMobile ? "d-flex row align-items-center justify-content-center" : "d-flex row align-items-center")}>Campeonatos</Nav.Link>
                      </Nav>
                    </Navbar>
                  </Col>
                  <Col md={3} className="d-flex flex-column align-items-center" style={{justifyContent: 'center'}}>
                    <Navbar style={{justifyContent: 'center'}}>
                      <Nav className="flex-column align-content-start align-itens-start">
                        <Nav.Link href="eventos" style={navLink} className="d-flex row align-items-start">Eventos</Nav.Link>
                        <Nav.Link href="#" style={navLink} className="d-flex row align-items-start">Contato</Nav.Link>
                      </Nav>
                    </Navbar>
                  </Col>
                  <Col md={3} className={(isMobile) ? "" : "d-flex flex-column align-items-start align-content-start"} style={isMobile ? {} : {}}>
                    <div className="d-flex flex-column align-content-start align-itens-start">
                      <p>Mídias Sociais</p>
                      <div className={(isMobile) ? "d-flex flex-row justify-content-center align-content-center align-items-center" : "d-flex flex-row justify-content-center align-content-center align-items-center"}>
                        <a href="https://www.instagram.com/portal.regional/" target="_blank" className="text-light me-2"><BsInstagram /></a>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </footer>
    )
}