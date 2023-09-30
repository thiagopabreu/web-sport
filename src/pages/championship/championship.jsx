import { Col, Container, Dropdown, Form, Modal, Row, Table } from "react-bootstrap"
import { Header } from "../../components/Header/header"
import { SearchBar } from "../../components/SearchBar/searchBar"
import { CardContent } from "../../components/CardContent/cardContent"
import { Footer } from "../../components/Footer/footer"
import '../../App.css'
import '../../index.css'
import { useEffect, useState } from "react"
import { EventCard } from "../../components/eventCard/eventCard"
import { ChampionshipTable } from "../../components/ChampionshipTable/championshipTable"
import { ChampionshipService, GamesService, RoundsService } from "../../services/services"
import { CampeonatoDropdown } from "../../components/CampeonatoDropdown/campeonatoDropdown"
import { AiOutlineCalendar, AiOutlineClockCircle } from "react-icons/ai"
import { GrLocation } from "react-icons/gr"

export const Championship = () => {

    // const [searchItem, setSearchItem] = useState("")
    const [championships, setChampionships] = useState([])
    const [rodadas, setRodadas] = useState([])
    const [rodada, setRodada] = useState(0)
    const [rodadasSelecionadas, setRodadasSelecionadas] = useState({});
    const [games, setGames] = useState([])
    const [trigger, setTrigger] = useState(false)
    const [rowSelect, setRowSelect] = useState(false)
    // const [thisRound, setThisRound] = useState(1)
    // const [rounds, setRounds] = useState([])
    // const [gameXround, setGameXRound] = useState([])
    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const responseChampionship = await ChampionshipService.getChampionships();
        setChampionships(responseChampionship)
        let rounds
        rounds = await responseChampionship.map(async (championship) => {
            const response = await RoundsService.getRoundByChampionshipId(championship.id)
            console.log(response)
            return response

        })
        console.log(rounds)
        const promisesRounds = await Promise.all(rounds)
        console.log(promisesRounds)
        
        let games
        games = promisesRounds.map(async (roundArray) => {
            let gameArray
            gameArray = await roundArray.map(async(round) => {
                const response = await GamesService.getGameByRoundId(round.id)
                console.log(response)
                return response
            })
            const promiseGames = await Promise.all(gameArray)
            return promiseGames
        })
        console.log(games)
        const promiseGames = await Promise.all(games)
        console.log(promiseGames)
        console.log(promiseGames[0])
        console.log(promiseGames[0][rodada])

        let rodadaIndex
        rodadaIndex = promiseGames.map((item) => {
            return 0
        })
        console.log(rodada)
        setChampionships(responseChampionship)
        setRodadas(promisesRounds)
        setGames(promiseGames)
        setRodadasSelecionadas(rodadaIndex)
    }

    const handleRodadaChange = (index, indexChampionship) => {
        setRodadasSelecionadas((prevRodadas) => ({
            ...prevRodadas,
            [indexChampionship]: index
        }))
    }

    const getSelectedRoundName = (indexChampionship) => {
        const selectedRoundIndex = rodadasSelecionadas[indexChampionship] || 0;
        if (rodadas && rodadas[indexChampionship] && rodadas[indexChampionship][selectedRoundIndex]) {
          return rodadas[indexChampionship][selectedRoundIndex].numero_rodada;
        }
        return ''; // Ou qualquer valor padrão desejado se não houver rodada selecionada
      };
    return (
        <Container fluid className="d-flex flex-column justify-content-between min-vh-100" style={{fontFamily: 'Poppins'}}>
            <Row>
                <Header />
            </Row>

            <Row className="mt-5 mb-5">
                <Row style={{paddingRight: '15rem', paddingLeft: '15rem'}}>
                    {championships.map((item, indexChampionship) => (
                        <>
                        <Col className="d-flex" style={{justifyContent: 'flex-end', alignContent: 'center', alignItems: 'center'}}>
                            <Dropdown >
                                <Dropdown.Toggle style={{background: '#091B36', border: 'none'}}>
                                    {getSelectedRoundName(indexChampionship)}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                {rodadas &&
                                    rodadas[indexChampionship] &&
                                    rodadas[indexChampionship].map((item, index) => (
                                    <Dropdown.Item onClick={(e) => {
                                        setRodada(index)
                                        console.log(index, indexChampionship)
                                        handleRodadaChange(index, indexChampionship)
                                    }}>{item.numero_rodada}</Dropdown.Item>
                                ))}
                                </Dropdown.Menu>
                                
                            </Dropdown>
                        </Col>
                            <Row className="mb-5" style={{justifyContent: 'space-between'}}>
                            <Col style={{display: 'flex', alignContent: 'center', alignItems: 'center'}}>
                                <IconSoccerBall />
                                <h5 className="m-5" style={{fontSize: 36, fontWeight: 500}}>{item.nome_campeonato}</h5>
                            </Col>
                        </Row>
                        <Row>
                            <Table responsive style={{boxShadow: '0 4px 15px #00000040'}}>
                                <thead >
                                    <tr >
                                        <th><AiOutlineCalendar/> Data</th>
                                        <th><AiOutlineClockCircle /> Horario</th>
                                        <th><GrLocation/> Local</th>
                                        <th>Mandante</th>
                                        <th>Placar</th>
                                        <th>Visitante</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {games && 
                                        games[indexChampionship] &&
                                        games[indexChampionship][rodadasSelecionadas[indexChampionship]] &&
                                        games[indexChampionship][rodadasSelecionadas[indexChampionship]].map((jogo, index) => (
                                                    <tr key={index}>
                                                        <td >{jogo.data}</td>
                                                        <td >{jogo.hora}</td>
                                                        <td >{jogo.local}</td>
                                                        <td >{jogo.mandante}</td>
                                                        <td >{jogo.placar_mandante} x {jogo.placar_visitante}</td>
                                                        <td >{jogo.visitante}</td>
                                                    </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Row>
                    </>
                    ))}
                </Row>
            </Row>

            <Row className="justify-content-end">
                <Footer />
            </Row>
        </Container>
    )
}

const IconSoccerBall = () => {

    return (
        <svg width="44" height="45" viewBox="0 0 44 45" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22 0.922852C17.6488 0.922852 13.3953 2.21313 9.77746 4.63052C6.15958 7.04791 3.33979 10.4838 1.67466 14.5038C0.00953226 18.5238 -0.426141 22.9473 0.422734 27.2148C1.27161 31.4824 3.3669 35.4024 6.44366 38.4792C9.52041 41.556 13.4404 43.6512 17.708 44.5001C21.9756 45.349 26.3991 44.9133 30.419 43.2482C34.439 41.5831 37.8749 38.7633 40.2923 35.1454C42.7097 31.5275 44 27.274 44 22.9228C43.9938 17.09 41.674 11.4978 37.5495 7.3733C33.4251 3.24884 27.8329 0.929011 22 0.922852ZM38.1869 32.1078H31.075L29.1162 29.4086L31.7879 21.6282L34.961 20.5938L40.5117 24.8521C40.2491 27.4059 39.4573 29.8769 38.1869 32.1078ZM3.49462 24.8521L9.03482 20.5959L12.2079 21.6303L14.8796 29.4107L12.925 32.1078H5.81309C4.5412 29.8773 3.74801 27.4062 3.48405 24.8521H3.49462ZM5.61001 14.1398L6.77559 18.0744L3.53482 20.5473C3.82213 18.3036 4.51908 16.1317 5.59097 14.1398H5.61001ZM17.9808 27.9998L15.5565 20.945L22 16.5153L28.4435 20.945L26.0192 27.9998H17.9808ZM37.2456 18.0744L38.4112 14.1398C39.483 16.1317 40.18 18.3036 40.4673 20.5473L37.2456 18.0744ZM35.934 10.5902L33.9223 17.3763L30.7344 18.4107L23.6923 13.5707V10.275L29.846 6.0442C32.1637 7.12811 34.2349 8.67521 35.9319 10.5902H35.934ZM25.8225 4.70304L22 7.33035L18.1775 4.70304C20.6985 4.1756 23.3015 4.1756 25.8225 4.70304ZM14.154 6.0442L20.3077 10.275V13.5707L13.2677 18.4107L10.0798 17.3763L8.06808 10.5902C9.76509 8.67521 11.8363 7.12811 14.154 6.0442ZM8.28174 35.4925H12.5908L14.1075 39.7803C11.905 38.7438 9.92607 37.2873 8.28174 35.4925ZM18.1923 41.1427L15.6792 34.073L17.6317 31.3844H26.3683L28.3208 34.073L25.8183 41.1427C23.3001 41.6704 20.6999 41.6704 18.1817 41.1427H18.1923ZM29.9031 39.7803L31.4198 35.4925H35.7288C34.0814 37.2884 32.0988 38.745 29.8925 39.7803H29.9031Z" fill="#D60007"/>
</svg>

    )
}


