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

export const AdminPainel = (props) => {
  console.log('entrei')
  const [selectButton, setSelectButton] = useState([{id: 0, selected: true, icon: <BsWindowStack id={0} className="mx-3"/>, title: 'Páginas'}, {id: 1, selected: false, icon: <BsCalendarDate id={1} className="mx-3"/>, title: 'Eventos'}, {id: 2, selected: false, icon: <BsTable id={2} className="mx-3"/>, title: 'Campeonatos'}])
  const [newsPage, setNewsPage] = useState(true)
  const [eventsPage, setEventsPage] = useState(false)
  const [championshipPage, setChampionshipPage] = useState(false)
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
      <div className="d-flex" style={{fontFamily: 'Poppins'}}>
        <Col xs={2} className="min-vh-100 d-flex flex-column" style={{background: '#091B36'}}>
                <Row className="p-4" style={{justifyContent: 'center'}}>
                    <Image className="w-75" src="LOGO.png"/>
                </Row>
                <hr className="m-0" style={{border: 'none', height: '2px', background: 'grey'}}></hr>
                <Row className="p-0 m-0 mx-4 mt-3 mt-5">
                  {selectButton.map((button, index) => (
                    <Row id={index} onClick={(e)=> handleButtons(e, index)} key={button.id} style={{cursor: 'pointer'}}>
                      <p id={index} className="p-3" style={{color: (button.selected) ? '#FFFFFF' : '#FFFFFFB2', background: (button.selected) ? '#FFFFFF17' : '', border: 'none', borderRadius: '0.5rem'}}>{renderIcon(button.icon, index)} {button.title}</p>
                    </Row>
                  ))}
                </Row>
                
                <Row onClick={handleLogout} className="p-0 m-0 mx-4" style={{cursor: 'pointer'}}>
                  <p className="p-3" style={{color: '#FFFFFFB2'}}><FiLogOut className="mx-3"/> Sair</p>
                </Row>

            </Col>
            
            <Col xs={10} className=" d-flex flex-column px-5" style={{marginTop: '3rem'}} >
                {(newsPage) && <News />}
                {(eventsPage) && <Events />}
                {(championshipPage) && <Championship />}
            </Col>
      </div>
    )
};



