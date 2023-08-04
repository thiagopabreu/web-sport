import React from 'react';
import { Navbar, Nav, Container, Image } from 'react-bootstrap';

export const Header = () => {


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
          <Navbar.Brand href="#home" style={{color: '#FFFFFF'}}><Image src='LOGO.png' style={{width: '12.5rem', marginLeft: '2rem'}} /></Navbar.Brand>
        </Nav>
        <Nav>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" style={{color: 'white'}}/>
        <Navbar.Collapse id="responsive-navbar-nav" style={{justifyContent: 'space-between'}}>
          <Nav>
            <Nav.Link style={ {color: '#FFFFFF', fontSize: '1rem', fontStyle: 'normal', fontWeight: '400', lineHeight: '1.5rem', paddingBottom: 2}} className='mx-4 underline-small'>Ínicio</Nav.Link>
            <Nav.Link style={navLink} className='mx-4'>Notícias</Nav.Link>
            <Nav.Link style={navLink} className='mx-4'>Campeonatos</Nav.Link>
            <Nav.Link style={navLink} className='mx-4'>Eventos</Nav.Link>
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