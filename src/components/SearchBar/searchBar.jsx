import { useEffect, useState } from "react";
import { Button, Col, Dropdown, DropdownButton, Form, FormControl, InputGroup, Row } from "react-bootstrap"
import {FaSearch} from 'react-icons/fa'
import {MdOutlineClose} from 'react-icons/md'
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import { CategoriesService } from "../../services/services";

export const SearchBar = (props) => {

    
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [categories, setCategories] = useState([])
    const [withCategory, setWithCategory] = useState(props.withCategory)
    useEffect(() => {
        fetchData()
    }, [])
    const fetchData = async () => {
        const categories = await CategoriesService.getCategories();
        categories.push({id: 0, nome: 'Todos'})
        setCategories(categories)
    }
    const handleCheckboxChange = (event, value) => {
        
        if(value == 'Todos' && !(selectedOptions.includes('Todos'))) {
            console.log(!selectedOptions.includes('Todos'))
            setSelectedOptions([])
            setSelectedOptions([value])
            return
        }
        if (selectedOptions.includes(value)) {
            setSelectedOptions(selectedOptions.filter(option => option !== value));
            props.onSelectedCategoriesChange(props.selectedCategories.filter(option => option !== value))
            // ([...props.selectedCategories, value]);
        } 
        else if(!(selectedOptions.includes('Todos'))) {
            setSelectedOptions([...selectedOptions, value]);
            props.onSelectedCategoriesChange([...props.selectedCategories, value]);
        }
    };
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    
    const handleCloseCategory = (indexToRemove) => {
        const updatedItems = [...selectedOptions];
        updatedItems.splice(indexToRemove, 1);
    
        setSelectedOptions(updatedItems);
        props.onSelectedCategoriesChange(updatedItems)
    }

    const handleCloseAllCategorys = () => {
        setSelectedOptions([])
    }
    

    const handleInput = (event) => {
        event.preventDefault();

        props.onSearchTermChange(event.target.value)
    }

    return (
        <Col xs={12} md={{span: 8, offset: 2}}>
            <Form className="d-flex flex-row gap-3">
                <InputGroup className="custom-input">
                    <InputGroup.Text onChange={(event) => handleInput(event)} className="p-4" style={{borderRight: 'none', backgroundColor: '#F2F4F8', border: 'none'}}><FaSearch /></InputGroup.Text>
                    <FormControl
                    onChange={(event) => handleInput(event)} placeholder={props.placeholder} type="text" className="mr-sm-2 p-3 custom-input"  style={{borderLeft: 'none',fontWeight: 500}}></FormControl>
                </InputGroup>
                {withCategory &&
                <Dropdown className="custom-drop-down" show={showDropdown} onToggle={toggleDropdown}>
                    <Dropdown.Toggle size="lg" className="p-3" style={{background: 'white', color: '#091B36', border: '1px solid #F2F4F8', fontSize: 18}}>
                        Categorias
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="custom-drop-down">
                    {categories.map(option => (
                        <Dropdown.Item key={option.nome} onClick={(e) => handleCheckboxChange(e, option.nome)}>
                            <Form.Check
                                type="checkbox"
                                label={option.nome}
                                checked={selectedOptions.includes(option.nome)}
                                // onChange={() => handleCheckboxChange(option.value)}
                            />
                        </Dropdown.Item>
                    ))}
                    </Dropdown.Menu>
                </Dropdown>}
                {/* <Button onClick={handleSearch} className="p-3 px-4" style={{maxHeight: 60, background: '#091B36', color: 'white', borderRadius: '1.2rem', border: 'none'}} variant="outline-success">Buscar</Button > */}

            </Form>
            <Row hidden={(selectedOptions.length > 0) ? false : true}>
                <Stack className="d-flex flex-row mt-3" gap={2}>
                    {selectedOptions.map(value => (
                        
                        <Badge bg="light" className="d-flex flex-row justify-content-center align-items-center gap-2" style={{ color:'#091B36', border: '1px solid grey' }}>
                            <p className="m-0">{value}</p>
                            <MdOutlineClose onClick={(e) => handleCloseCategory(value)} style={{cursor: 'pointer'}}/>
                        </Badge>
                    ))}
                    <div className="" style={{borderLeft: '1px solid grey', paddingLeft: '0.5rem'}}>
                        <Badge onClick={handleCloseAllCategorys} bg="secondary" className=" ml-1 d-flex flex-row justify-content-center align-items-center p-2 gap-2" >
                            <p className="m-0">Remover filtros</p>
                            <MdOutlineClose style={{cursor: 'pointer', color:'#091B36' }}/>
                        </Badge>
                    </div>
                </Stack>
            </Row> 
        </Col>  

    )
}