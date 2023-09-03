import { useEffect, useState } from "react";
import { Button, Col, Form, FormControl, InputGroup, Modal, Row } from "react-bootstrap"
import { FaSearch } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import { GrEdit } from "react-icons/gr";
import { ChampionshipService, GamesService, RoundsService } from "../../../../services/services";
import { UpdateChampionship } from "./updateChampionship";


export const Championship = () => {

    const [addChampionship, setAddChampionship] = useState(false)
    const [showCreate, setShowCreate] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [championships, setChampionships] = useState([])
    const [title, setTitle] = useState('')
    const [year, setYear] = useState('')
    const [showUpdate, setShowUpdate]= useState(false)
    const [selectChampionship, setSelectChampionship] = useState({})
    const [trigger, setTrigger] = useState(false)
    const [searchResults, setSearchResults] = useState([]);
    useEffect(() => {
        fetchData()
    }, [trigger])

    
    const fetchData = async () => {
        const responseChampionship = await ChampionshipService.getChampionships();
        setChampionships(responseChampionship)
    }

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
      };

      const handleSearch = async (e) => {
        e.preventDefault()
        
        const filteredChampionships = championships.filter((championship) =>
        championship.nome_campeonato.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredChampionships);
      };

      const createChampion = async () => {
        const object = {
            "nome_campeonato": title,
            "ano_campeonato": Number(year)
        }
        console.log(object)
        const response = await ChampionshipService.registerChampionship(object)
        const responseRound = await RoundsService.registerRound({
            "id_campeonato_fk": response.newChampionship.id,
            "numero_rodada": 1
        })
        setShowCreate(false)
        setTrigger(!trigger)

      }
      const exitModal = () => {
        setShowDelete(false)
      }

      const deleteChampionship = async(event, championship) => {
        const response = await RoundsService.getRoundByChampionshipId(championship.id)
        await response.map(async (item, index) => {
          const responseGames = await GamesService.getGameByRoundId(item.id)
          await responseGames.map(async (item, index) => {
            const response = await GamesService.deleteGame(item.id)
          })
          const response = await RoundsService.deleteRound(item.id)
        })
        const championshipDelete = await ChampionshipService.deleteChampionship(championship.id)
        setShowDelete(false)
        setTrigger(!trigger)

        // const responseRound = await RoundsService.getRounds();
        // const responseGames = await GamesService.getGameByRoundId(response)


        
      }
      const handleUpdatePage = async (event, championship) => {
        event.preventDefault();
        setSelectChampionship(championship)
        setShowUpdate(true)
      }
    return (
        (showUpdate) ? 
            <UpdateChampionship campeonato={selectChampionship} showUpdate={setShowUpdate} />   
        :
        <Row className="d-flex flex-row mt-5 mx-5 px-5" style={{justifyContent: 'space-between'}}>
            <Col xs={12} sm={6} md={4} lg={3} style={{display: 'flex'}}>
                  <Button onClick={(e) => setShowCreate(true)} className="w-50 p-0 m-0 " style={{background: '#091B36'}}>
                      Adicionar +
                  </Button>
                  <Modal show={showCreate} onHide={setShowCreate}>
                <Modal.Header closeButton>
                  <Modal.Title>Create</Modal.Title>
                </Modal.Header>
                <Modal.Footer style={{display: 'flex', justifyContent: 'center'}}>
                  <Form>
                      <Form.Group controlId="title">
                          <Form.Label>Titulo</Form.Label>
                          <FormControl 
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          />

                        <Form.Label>Ano</Form.Label>
                          <FormControl 
                          type="text"
                          value={year}
                          onChange={(e) => setYear(e.target.value)}
                          />
                      </Form.Group>
                      
                  </Form>
                </Modal.Footer>
                <Button className="my-4 mx-5" variant="success" onClick={createChampion}>Criar</Button>
              </Modal>
              </Col>
              <SearchBar
                searchTerm={searchTerm}
                onSearchTermChange={handleSearchTermChange}
                onSearch={handleSearch}
            />

            {championships.map((item) => (
                <Col xs={12} sm={6} md={4} lg={3} className="mt-5" style={{display: 'flex', flexDirection: 'row', width: '93%', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', background:'#E2E8F082', borderRadius: 10 }}>
                    
                    <div className="mx-3" style={{display: 'flex', alignContent: 'center', alignItems: 'center'}}>
                        <IconSoccerBall  />
                        <p className="m-3" style={{color: '#3D3D3D', fontWeight: 500, fontSize: 20}}>
                            {item.nome_campeonato}
                        </p>
                    </div>
                    <div className="d-flex justify-content-around align-items-end gap-3" >
                        <GrEdit onClick={(e) => handleUpdatePage(e, item)}  className="p-2" style={{borderRadius: '0.3rem', fontSize: 30, background: '#091B361A', fontColor: '#091B36', cursor: 'pointer'}}/>
                        <FiTrash2 onClick={(e) => setShowDelete(true)}  className="p-2" style={{borderRadius: '0.3rem', fontSize: 30, background: '#D6000729', color: '#D60007', cursor: 'pointer'}}/>
                        <Modal show={showDelete} onHide={setShowDelete}>
                <Modal.Header closeButton>
                  <Modal.Title>Deletar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Você realmente deseja deletar essa noticia?
                </Modal.Body>
                <Modal.Footer>
                  <Button onClick={(e) => deleteChampionship(e, item)} variant="success">Sim</Button>
                  <Button onClick={exitModal} variant="danger">Não</Button>
                </Modal.Footer>
              </Modal>
                    </div>
                </Col>  
            ))}
            
        </Row>
    )
}

const SearchBar = ({ searchTerm, onSearchTermChange, onSearch }) => {
    return (
      <Form className="d-flex flex-row w-75 gap-5" onSubmit={e => { onSearch(e) }}>
        <InputGroup className="custom-input w-75">
          <InputGroup.Text
            className="p-4"
            style={{ borderRight: 'none', backgroundColor: '#F2F4F8', border: 'none' }}
          >
            <FaSearch />
          </InputGroup.Text>
          <FormControl
            placeholder="Buscar por notícia"
            type="text"
            className="mr-sm-2 p-3 custom-input"
            style={{ borderLeft: 'none', fontWeight: 500 }}
            value={searchTerm}
            onChange={onSearchTermChange} // Lidar com a mudança no termo de pesquisa
          ></FormControl>
        </InputGroup>
        <Button
          className="p-3 px-4"
          style={{ maxHeight: 60, background: '#091B36', color: 'white', borderRadius: '1.2rem', border: 'none' }}
          variant="outline-success"
          onClick={onSearch} // Lidar com a ação de pesquisa
        >
          Buscar
        </Button>
      </Form>
    );
  };

  const IconSoccerBall = () => {

    return (
        <svg width="25" height="25" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16 0C12.8355 0 9.74207 0.938383 7.11088 2.69649C4.4797 4.45459 2.42894 6.95344 1.21793 9.87706C0.00693255 12.8007 -0.309921 16.0177 0.307443 19.1214C0.924806 22.2251 2.44866 25.0761 4.6863 27.3137C6.92394 29.5513 9.77486 31.0752 12.8786 31.6926C15.9823 32.3099 19.1993 31.9931 22.1229 30.7821C25.0466 29.5711 27.5454 27.5203 29.3035 24.8891C31.0616 22.2579 32 19.1645 32 16C31.9955 11.7579 30.3084 7.69085 27.3088 4.69124C24.3092 1.69163 20.2421 0.00447972 16 0ZM27.7723 22.68H22.6L21.1754 20.7169L23.1185 15.0585L25.4262 14.3061L29.4631 17.4031C29.2721 19.2604 28.6962 21.0575 27.7723 22.68ZM2.54154 17.4031L6.57077 14.3077L8.87847 15.06L10.8215 20.7185L9.4 22.68H4.2277C3.30269 21.0578 2.72582 19.2606 2.53385 17.4031H2.54154ZM4.08001 9.61231L4.9277 12.4738L2.57078 14.2723C2.77973 12.6405 3.2866 11.061 4.06616 9.61231H4.08001ZM13.0769 19.6923L11.3139 14.5615L16 11.34L20.6862 14.5615L18.9231 19.6923H13.0769ZM27.0877 12.4738L27.9354 9.61231C28.7149 11.061 29.2218 12.6405 29.4308 14.2723L27.0877 12.4738ZM26.1338 7.03077L24.6708 11.9662L22.3523 12.7185L17.2308 9.19846V6.80154L21.7062 3.72461C23.3918 4.51291 24.8981 5.63808 26.1323 7.03077H26.1338ZM18.78 2.74923L16 4.66L13.22 2.74923C15.0535 2.36564 16.9465 2.36564 18.78 2.74923ZM10.2939 3.72461L14.7692 6.80154V9.19846L9.64924 12.7185L7.33077 11.9662L5.8677 7.03077C7.10188 5.63808 8.60821 4.51291 10.2939 3.72461ZM6.02308 25.1415H9.15693L10.26 28.26C8.65819 27.5062 7.21896 26.4469 6.02308 25.1415ZM13.2308 29.2508L11.4031 24.1092L12.8231 22.1538H19.1769L20.5969 24.1092L18.7769 29.2508C16.9455 29.6346 15.0545 29.6346 13.2231 29.2508H13.2308ZM21.7477 28.26L22.8508 25.1415H25.9846C24.7865 26.4477 23.3446 27.507 21.74 28.26H21.7477Z" fill="#091B36"/>
</svg>


    )
}