import { Button, Col, Form, FormControl, Row } from "react-bootstrap"
import { ChampionshipTable } from "../../../../components/ChampionshipTable/championshipTable"
import { useEffect, useState } from "react"
import { GamesService } from "../../../../services/services"
import { AiOutlineArrowLeft } from "react-icons/ai"


export const UpdateChampionship = ({campeonato, showUpdate}) => {

    const [date, setDate] = useState('')
    const [hour, setHour] = useState('')
    const [local, setLocal] = useState('');
    const [mandante, setMandante] = useState('')
    const [visitante, setVisitante] = useState('')
    const [mandantePlacar, setMandantePlacar] = useState(0)
    const [visitantePlacar, setVisitantePlacar] = useState(0)
    const [rodada, setRodada] = useState(1)
    const [trigger, setTrigger] = useState(false)
    const [selectRow, setSelectRow] = useState(-1)
    const [selectJogo, setSelectJogo] = useState({})
    useEffect(() => {
        console.log(rodada)
    }, [rodada])

    useEffect(() => {
        console.log(rodada)
        console.log(selectRow)
    }, [selectRow])
    const handleRegisterNewGame = async () => {
        const object = {
            "id_rodada_fk": rodada,
            "data": date,
            "hora": hour,
            "local": local,
            "mandante": mandante,
            "visitante": visitante,
            "placar_visitante": 0,
            "placar_mandante": 0
        }
        console.log(date, hour)
        const response = await GamesService.registerGame(object)
        setTrigger(!trigger)
    }

    const handleUpdateGame = async () => {
        const jogoId = selectJogo.id

        const object = {
            "data": date,
            "hora": hour,
            "local": local,
            "mandante": mandante,
            "visitante": visitante,
            "placar_visitante": visitantePlacar,
            "placar_mandante": mandantePlacar
        }

        const response = await GamesService.updateGame(jogoId, object)
        setTrigger(!trigger)
    }
    const handleDeleteGame = async () => {
        const jogoId = selectJogo.id

        const response = await GamesService.deleteGame(jogoId)
        setTrigger(!trigger)
    }

    const handleDeleteChampionship = async () => {

    }
    return (
        <Row className="d-flex flex-row mx-5 px-5" style={{justifyContent: 'space-between'}}>
            <Col style={{maxWidth: '7%'}}>
                <Button onClick={(e) => showUpdate(false)} style={{background: '#091B36', border: 'none'}}><AiOutlineArrowLeft /></Button>
            </Col>
            <Row><ChampionshipTable create setTrigger={setTrigger} trigger={trigger} setSelectJogo={setSelectJogo} setVisitantePlacar={setVisitantePlacar} setMandantePlacar={setMandantePlacar} setVisitante={setVisitante} setMandante={setMandante} campeonato={campeonato} onChangeRodada={setRodada} selectRow={setSelectRow} setLocal={setLocal} setDate={setDate} setHour={setHour} /></Row>
            <Row>
            <Col>
                <Form>
                    <Row>
                        <Col>
                        <Form.Group controlId="Data">
                            <Form.Label>Data</Form.Label>
                            <FormControl
                             type="date"
                             value={date}
                             onChange={(e) => setDate(e.target.value)} />
                        </Form.Group>
                        </Col>
                        <Col>
                        <Form.Group controlId="Horario">
                            <Form.Label>Horario</Form.Label>
                            <FormControl 
                            type="time"
                            value={hour}
                            onChange={(e) => setHour(e.target.value)}  />
                        </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="Local">
                                <Form.Label>Local</Form.Label>
                                <FormControl 
                                style={{backgroundColor: 'white', border: '1px solid #CCCCCC', borderRadius: '4px'}}
                                type="Text"
                                value={local}
                                onChange={(e) => setLocal(e.target.value)}  />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                    <Col>
                        <Form.Group controlId="Mandante">
                            <Form.Label>Mandante</Form.Label>
                            <FormControl 
                            style={{backgroundColor: 'white', border: '1px solid #CCCCCC', borderRadius: '4px'}}
                             type="text"
                             value={mandante}
                             onChange={(e) => setMandante(e.target.value)}  />
                        </Form.Group>
                    </Col>
                    {(selectRow > -1) &&
                    <Col  style={{maxWidth: 100}}>
                    <Form.Group controlId="mandante_placar">
                        <Form.Label>M</Form.Label>
                        <FormControl 
                        style={{backgroundColor: 'white', border: '1px solid #CCCCCC', borderRadius: '4px'}}
                         type="text"
                         value={mandantePlacar}
                         onChange={(e) => setMandantePlacar(e.target.value)}  />
                    </Form.Group>
                </Col>}
                    <Col >
                        <Form.Group controlId="Visitante">
                            <Form.Label>Visitante</Form.Label>
                            <FormControl 
                            style={{backgroundColor: 'white', border: '1px solid #CCCCCC', borderRadius: '4px'}}
                             type="text"
                             value={visitante}
                             onChange={(e) => setVisitante(e.target.value)}  />
                        </Form.Group>
                    </Col>
                    {(selectRow > -1) &&
                    <Col style={{maxWidth: 100}}>
                    <Form.Group controlId="visitante_placar" >
                        <Form.Label>V</Form.Label>
                        <FormControl 
                        style={{backgroundColor: 'white', border: '1px solid #CCCCCC', borderRadius: '4px'}}
                         type="text"
                         value={visitantePlacar}
                         onChange={(e) => setVisitantePlacar(e.target.value)}  />
                    </Form.Group>
                </Col>}
                    </Row>
                </Form>
            </Col>
            {(selectRow > -1) ? 
            <><Button onClick={handleUpdateGame} className="mt-4 py-3" style={{background: '#091B36', border: 'none', borderRadius: 15}}>Atualizar</Button>
            <Button onClick={handleDeleteGame} variant="danger" className="mt-4 py-3" style={{border: 'none', borderRadius: 15}}>Excluir</Button></>
                :
            <Button onClick={handleRegisterNewGame} className="mt-4 py-3" style={{background: '#091B36', border: 'none', borderRadius: 15}}>Adicionar</Button>}
            </Row>

        </Row>
    )
}