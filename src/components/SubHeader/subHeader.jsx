import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Image, Col } from 'react-bootstrap';
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR';

export const SubHeader = () => {

    const [date, setDate] = useState()

    useEffect(() => {
        const dateNow = new Date();
        const dateFormat = format(dateNow, "EEEE, d 'de' MMMM 'de' yyyy", {locale: ptBR})
        setDate(dateFormat)
    }, [])

    return (
        <Col xs={12} md={{span: 8, offset: 2}}>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '7.69rem', alignItems: 'flex-end'}}>
                <div style={{display: 'block', fontSize: '1.6rem', fontWeight: 400, color: '#213249;'}}>
                    As principais noticias sobre o<br/>esporte regional em <span style={{color: 'red'}}>um só lugar</span>
                </div>
                <p style={{margin: 0, color: '#828282'}}>{date}</p>
            </div>
            <hr style={{borderColor: '#D9D9D9', border: 'solid 1px'}}></hr>
        </Col>
    )
}