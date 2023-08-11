import { useEffect, useState } from "react";
import { Button, Col, Dropdown, DropdownButton, Form, FormControl, InputGroup, Row } from "react-bootstrap"
import {FaSearch} from 'react-icons/fa'
import {MdOutlineClose} from 'react-icons/md'
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';

export const SearchBar = () => {

    const options = [
        { value: 'todos', label: 'Todos' },
        { value: 'volei', label: 'Volei' },
        { value: 'futebol', label: 'Futebol' },
        { value: 'basquete', label: 'Basquete' },
    ];
    
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);

    const handleCheckboxChange = (event, value) => {
        if(value == 'Todos' && !(selectedOptions.includes('Todos'))) {
            console.log(!selectedOptions.includes('Todos'))
            setSelectedOptions([])
            setSelectedOptions([value])
            return
        }
        if (selectedOptions.includes(value)) {
            setSelectedOptions(selectedOptions.filter(option => option !== value));
        } 
        else if(!(selectedOptions.includes('Todos'))) {
        setSelectedOptions([...selectedOptions, value]);
        }
    };
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleCheck = (event) => {
        
    }
    
    const handleCloseCategory = (indexToRemove) => {
        const updatedItems = [...selectedOptions];

        updatedItems.splice(indexToRemove, 1);
    
        setSelectedOptions(updatedItems);
    }
    
    useEffect(() => {

    }, [selectedOptions])

    return (
        <Col xs={12} md={{span: 8, offset: 2}}>
            <Form className="d-flex flex-row gap-3">
                <InputGroup className="custom-input w-75">
                    <InputGroup.Text className="p-4" style={{borderRight: 'none', backgroundColor: '#F2F4F8', border: 'none'}}><FaSearch /></InputGroup.Text>
                    <FormControl placeholder="Buscar por notícia" type="text" className="mr-sm-2 p-3 custom-input"  style={{borderLeft: 'none',fontWeight: 500}}></FormControl>
                </InputGroup>
                <Dropdown className="custom-drop-down" show={showDropdown} onToggle={toggleDropdown}>
                    <Dropdown.Toggle size="lg" className="p-3" style={{background: 'white', color: '#091B36', border: '1px solid #F2F4F8', fontSize: 18}}>
                        Categorias
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="custom-drop-down">
                    {options.map(option => (
                        <Dropdown.Item key={option.label} onClick={(e) => handleCheckboxChange(e, option.label)}>
                            <Form.Check
                                type="checkbox"
                                label={option.label}
                                checked={selectedOptions.includes(option.label)}
                                // onChange={() => handleCheckboxChange(option.value)}
                            />
                        </Dropdown.Item>
                    ))}
                    </Dropdown.Menu>
                </Dropdown>
                <Button className="p-3 px-4" style={{maxHeight: 60, background: '#091B36', color: 'white', borderRadius: '1.2rem', border: 'none'}} variant="outline-success">Buscar</Button >

            </Form>
            {(selectedOptions.length > 0) ?
            <Row>
            <Stack className="d-flex flex-row mt-3" gap={2}>
                {selectedOptions.map(value => (
                    <Badge bg="light" className="d-flex flex-row justify-content-center align-items-center gap-2" style={{ color:'#091B36', border: '1px solid grey' }}>
                        <p className="m-0">{value}</p>
                        <MdOutlineClose onClick={(e) => handleCloseCategory(value)} style={{cursor: 'pointer'}}/>
                    </Badge>
                ))}
                <div className="" style={{borderLeft: '1px solid grey', paddingLeft: '0.5rem'}}>
                    <Badge bg="secondary" className=" ml-1 d-flex flex-row justify-content-center align-items-center p-2 gap-2" >
                        <p className="m-0">Remover filtros</p>
                        <MdOutlineClose style={{cursor: 'pointer', color:'#091B36' }}/>
                    </Badge>
                </div>
            </Stack>
        </Row> 
        :
        <></>}
        </Col>  

    )
}