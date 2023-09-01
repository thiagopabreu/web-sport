import React from 'react';
import { Navbar, Nav, Container, Image } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

export const Header = () => {

  const location = useLocation()

  const navLink = {
    color: '#FFFFFF',
    fontSize: '1rem',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: '1.5rem'
  }


  return (
    <Navbar collapseOnSelect expand="lg" style={{backgroundColor:'#091B36' }}>
    <Container fluid>
      <Nav>
        <Navbar.Brand href="/" style={{color: '#FFFFFF'}}><Image src='../LOGO.png' style={{width: '12.5rem', marginLeft: '2rem'}} /></Navbar.Brand>
      </Nav>
      <Nav>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" style={{color: 'white'}}/>
      <Navbar.Collapse id="responsive-navbar-nav" style={{justifyContent: 'space-between'}}>
        <Nav>
          <Nav.Link href="/" style={navLink} className={ (location.pathname == '/') ? 'mx-4 underline-small' : 'mx-4'}>Ínicio</Nav.Link>
          <Nav.Link href="/noticias" style={navLink} className={ (location.pathname == '/noticias') ? 'mx-4 underline-small' : 'mx-4'}>Notícias</Nav.Link>
          <Nav.Link href="/campeonatos" style={navLink} className={ (location.pathname == '/campeonatos') ? 'mx-4 underline-small' : 'mx-4'}>Campeonatos</Nav.Link>
          <Nav.Link href="/eventos" style={navLink} className={ (location.pathname == '/eventos') ? 'mx-4 underline-small' : 'mx-4'}>Eventos</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      </Nav>
      <Nav.Link style={{color: '#FFFFFF'}}>
        <div style={{display: 'inline-flex', padding: '1rem 2.3125rem', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem', borderRadius: '6.25rem', backgroundColor: '#D60007', color: '#FFFFFF', fontSize: '1rem', fontStyle: 'normal', fontWeight: 700, lineHeight: '1.5rem'}}>Contato</div>
      </Nav.Link>
    </Container>
    </Navbar>
  )
    
}