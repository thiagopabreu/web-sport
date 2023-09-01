import { Col, Container, Row } from "react-bootstrap"
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

export const Championship = () => {

    // const [searchItem, setSearchItem] = useState("")
    const [championships, setChampionships] = useState([])
    // const [thisRound, setThisRound] = useState(1)
    // const [rounds, setRounds] = useState([])
    // const [gameXround, setGameXRound] = useState([])
    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const responseChampionship = await ChampionshipService.getChampionships();
        console.log(responseChampionship)
        setChampionships(responseChampionship)
        // const responseRounds = await RoundsService.getRounds();
        // console.log(responseRounds)
        // const responseGames = await GamesService.getGames();
        // console.log(responseGames)
        // const games = []
        
        // championships.map((championship) => {
        //     const championshipRounds = []
        //     responseRounds.map((round) => {
                
        //         if(Number(round.id_campeonato_fk) == championship.id) {
        //             championshipRounds.push({championship, round})
        //         }
                
        //     })
        //     // responseGames.map((game) => {
        //     //     responseRounds.map((round) => {
        //     //             if(game.id_rodada_fk == round.id) {
        //     //                 if(round.numero_rodada == thisRound ) {
        //     //                     games.push([game, round, championship])
        //     //                 }
        //     //         }
                    
        //     //     }) 
        //     // })
        // })
        // setGameXRound(games)
    }
    return (
        <Container fluid className="d-flex flex-column justify-content-between min-vh-100" style={{fontFamily: 'Poppins'}}>
            <Row>
                <Header />
            </Row>

            <Row className="mt-5 mb-5">
                <Row style={{paddingRight: '15rem', paddingLeft: '15rem'}}>
                    {championships.map((item) => (
                        <ChampionshipTable key={item.id} campeonato={item}/>
                    ))}
                </Row>
            </Row>

            <Row className="justify-content-end">
                <Footer />
            </Row>
        </Container>
    )
}