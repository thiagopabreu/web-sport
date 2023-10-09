import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Dropdown, Form, FormControl, Image, InputGroup, Pagination, Row } from "react-bootstrap"
import {BsWindowStack, BsCalendarDate, BsTable} from "react-icons/bs"
import {FiLogOut } from 'react-icons/fi'


import { NewsService, PhotoService, RelationPhotoService } from "../../services/services";
import { News } from "./adminPainelComponents/news/news";
import { Events } from "./adminPainelComponents/events/events";
import { Championship } from "./adminPainelComponents/championship/championship";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import './customStyle.css'
export const AdminPainel = (props) => {
  console.log('entrei')
  const [selectButton, setSelectButton] = useState([{id: 0, selected: true, icon: <BsWindowStack id={0} className="mx-3"/>, title: 'Páginas'}, {id: 1, selected: false, icon: <BsCalendarDate id={1} className="mx-3"/>, title: 'Eventos'}, {id: 2, selected: false, icon: <BsTable id={2} className="mx-3"/>, title: 'Campeonatos'}])
  const [newsPage, setNewsPage] = useState(true)
  const [eventsPage, setEventsPage] = useState(false)
  const [championshipPage, setChampionshipPage] = useState(false)
  const isMobileP = useMediaQuery({ query: '(max-width: 320px)' });
  const isMobileM = useMediaQuery({ query: '(max-width: 375px)' });
  const isMobileL = useMediaQuery({ query: '(max-width: 425px)' });
  const isTablet = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1023px)' });
  const isLaptop = useMediaQuery({ query: '(min-width: 1024px) and (max-width: 1439px)' });
  const cardClass = isMobileP ? 'flex-column mobile-p-card' : isMobileM ? 'flex-column mobile-m-card' : isMobileL ? 'flex-column mobile-l-card' : isTablet ? 'flex-column tablet-card' : isLaptop ? 'flex-row laptop-card' : 'flex-row default-card';
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.set('auth', 'false')
    navigate('/')
  };
  const renderIcon = (icon) => {
    return (icon)
  }
  const handleButtons = (event, index) => {
    
    if(selectButton[index].selected) {
      return 
    } else {
      const buttonId = event.target.id;
      const updatedButton = selectButton.map((button) => ({
        ...button,
        selected: Number(button.id) == buttonId ? !button.selected : false
      }))
      setSelectButton(updatedButton)
      if(index === 0) {
        setEventsPage(false)
        setChampionshipPage(false)
        setNewsPage(true)

      }
      if(index === 1) {
        setChampionshipPage(false)
        setNewsPage(false)
        setEventsPage(true)

      }
      if(index === 2 ) {
        setNewsPage(false)
        setEventsPage(false)
        setChampionshipPage(true)
      }
    }

  }
    return(
      <Container fluid className="d-flex" style={{fontFamily: 'Poppins'}}>
        <Row>
          <Col xs={12} md={2} className="min-vh-100 d-flex flex-column" style={{background: '#091B36'}}>
                <Row className="p-4" style={{justifyContent: 'center'}}>
                    <Image className="w-75" src="LOGO.png"/>
                </Row>
                <hr className="m-0" style={{border: 'none', height: '2px', background: 'grey'}}></hr>
                <Row className="p-0 m-0 mx-3 mt-3 mt-md-5">
                  {selectButton.map((button, index) => (
                    <Row id={index} onClick={(e)=> handleButtons(e, index)} key={button.id} style={{display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center' ,cursor: 'pointer', background: (button.selected) ? '#FFFFFF17' : '', borderRadius: '0.5rem'}} className=" my-2 d-flex align-items-center" >
                      <p id={index} className="my-custom-text flex-grow-1 my-3" style={{color: (button.selected) ? '#FFFFFF' : '#FFFFFFB2', border: 'none', fontSize: 12}}>{renderIcon(button.icon, index)} {button.title}</p>
                    </Row>
                  ))}
                </Row>
                
                <Row onClick={handleLogout} className="p-0 m-0 mx-3 mt-3 d-flex align-items-center" style={{cursor: 'pointer'}}>
                  <p className="my-custom-text flex-grow-1" style={{color: '#FFFFFFB2', fontSize: 12}}><FiLogOut className="mx-3"/> Sair</p>
                </Row>

            </Col>
            
            <Col xs={12} md={10}className=" d-flex flex-column px-5" style={{marginTop: '3rem'}} >
                {(newsPage) && <News />}
                {(eventsPage) && <Events />}
                {(championshipPage) && <Championship />}
            </Col>
        </Row>
      </Container>
    )
};



