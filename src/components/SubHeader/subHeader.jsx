import React from 'react';
import { Navbar, Nav, Container, Image, Col } from 'react-bootstrap';

export const SubHeader = () => {

    return (
        <Col xs={12} md={{span: 6, offset: 3}}>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginTop: '7.69rem', alignItems: 'flex-end'}}>
                <div style={{display: 'block', fontSize: '1.6rem', fontWeight: 400, color: '#213249;'}}>
                    As principais noticias sobre o<br/>esporte regional em <span style={{color: 'red'}}>um só lugar</span>
                </div>
                <p style={{margin: 0, color: '#828282'}}>quarta-feira, 2 de agosto de 2023</p>
            </div>
            <hr style={{borderColor: '#D9D9D9'}}></hr>
        </Col>
    )
}