import React, { useEffect, useState } from 'react';
import { Col, Dropdown, Row } from 'react-bootstrap';

export const CampeonatoDropdown = ({ rodadas, onSelectRodada, selectRodada, setRodada }) => {

    const [index, setIndex] = useState(0)
    const [rodadaName, setRodadaName] = useState('')
    useEffect(() => {
        console.log()
        setRodadaName(rodadas[0].numero_rodada)
        // if(rodadas[0] != undefined) { 
        //     setRodadaSelected(rodadas[0].numero_rodada)
        // } else {
        //     setRodadaSelected('-')
        // }
        
    }, [rodadas])
  return (
        <Col className="d-flex" style={{justifyContent: 'flex-end', alignContent: 'center', alignItems: 'center'}}>
            <Dropdown >
                <Dropdown.Toggle style={{background: '#091B36', border: 'none'}}>
                    {rodadaName}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                {rodadas.map((rodada, index) => (
                    <Dropdown.Item onClick={(e) => {
                        setIndex(index)
                        setRodada(rodada.id)
                        onSelectRodada(rodada.id)
                        setRodadaName(rodada.numero_rodada)
                    }}>{rodada.numero_rodada}</Dropdown.Item>
                ))}
                </Dropdown.Menu>
                
            </Dropdown>
        </Col>
  );
};
const IconSoccerBall = () => {

    return (
        <svg width="44" height="45" viewBox="0 0 44 45" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22 0.922852C17.6488 0.922852 13.3953 2.21313 9.77746 4.63052C6.15958 7.04791 3.33979 10.4838 1.67466 14.5038C0.00953226 18.5238 -0.426141 22.9473 0.422734 27.2148C1.27161 31.4824 3.3669 35.4024 6.44366 38.4792C9.52041 41.556 13.4404 43.6512 17.708 44.5001C21.9756 45.349 26.3991 44.9133 30.419 43.2482C34.439 41.5831 37.8749 38.7633 40.2923 35.1454C42.7097 31.5275 44 27.274 44 22.9228C43.9938 17.09 41.674 11.4978 37.5495 7.3733C33.4251 3.24884 27.8329 0.929011 22 0.922852ZM38.1869 32.1078H31.075L29.1162 29.4086L31.7879 21.6282L34.961 20.5938L40.5117 24.8521C40.2491 27.4059 39.4573 29.8769 38.1869 32.1078ZM3.49462 24.8521L9.03482 20.5959L12.2079 21.6303L14.8796 29.4107L12.925 32.1078H5.81309C4.5412 29.8773 3.74801 27.4062 3.48405 24.8521H3.49462ZM5.61001 14.1398L6.77559 18.0744L3.53482 20.5473C3.82213 18.3036 4.51908 16.1317 5.59097 14.1398H5.61001ZM17.9808 27.9998L15.5565 20.945L22 16.5153L28.4435 20.945L26.0192 27.9998H17.9808ZM37.2456 18.0744L38.4112 14.1398C39.483 16.1317 40.18 18.3036 40.4673 20.5473L37.2456 18.0744ZM35.934 10.5902L33.9223 17.3763L30.7344 18.4107L23.6923 13.5707V10.275L29.846 6.0442C32.1637 7.12811 34.2349 8.67521 35.9319 10.5902H35.934ZM25.8225 4.70304L22 7.33035L18.1775 4.70304C20.6985 4.1756 23.3015 4.1756 25.8225 4.70304ZM14.154 6.0442L20.3077 10.275V13.5707L13.2677 18.4107L10.0798 17.3763L8.06808 10.5902C9.76509 8.67521 11.8363 7.12811 14.154 6.0442ZM8.28174 35.4925H12.5908L14.1075 39.7803C11.905 38.7438 9.92607 37.2873 8.28174 35.4925ZM18.1923 41.1427L15.6792 34.073L17.6317 31.3844H26.3683L28.3208 34.073L25.8183 41.1427C23.3001 41.6704 20.6999 41.6704 18.1817 41.1427H18.1923ZM29.9031 39.7803L31.4198 35.4925H35.7288C34.0814 37.2884 32.0988 38.745 29.8925 39.7803H29.9031Z" fill="#D60007"/>
</svg>

    )
}
