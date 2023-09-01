import React, {useEffect, useState} from 'react'
import { AuthenticateService } from '../../services/services';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { AdminPainel } from '../../pages/adminPainel/adminPainel';
import Cookies from 'js-cookie';

export const AuthComponent = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const authenticate = Cookies.get('auth')
    useEffect(() => {
      
      if(authenticate === 'true') {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
    }, [authenticate])

    const checkCredentials = async (username, password) => {
        const user = await AuthenticateService.login({user: username, senha: password})
        console.log(user)
        return user;
    }

    const login = async (user, senha) => {
        if(await checkCredentials(user, senha)) {
            Cookies.set('auth', 'true', { expires: 1 })
            setIsLoggedIn(true)
        } else {
            console.log("Credenciais Invalidas")
        }
    }

    const logout = () => {
        setIsLoggedIn(false);
      };

      return (
          isLoggedIn ? 
            <AdminPainel setIsLoggedIn={setIsLoggedIn} />
          :
          <Container className='p-0 m-0 align-items-center align-content-center justify-center' style={{ fontFamily: 'Poppins'}}>
            <LoginForm onLogin={login} />
          </Container>
        
        
      );
    };
    
    const LoginForm = ({ onLogin }) => {
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');
      
        const handleSubmit = (e) => {
          e.preventDefault();
          
          onLogin(username, password);
        };
      
        return (
          <Form
      onSubmit={handleSubmit}
      className='p-4 m-0'
      style={{ border: '1px solid black', borderRadius: '2rem' }}
    >
      <Row className='px-5 py-5'>
        <Row>
          <Form.Group controlId="username">
            <Form.Label>Usuário</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite seu usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group controlId="password" className='mt-3'>
            <Form.Label>Senha</Form.Label>
            <Form.Control
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
        </Row>
        <Row xs={12} md={12} lg={4}>
          <Button variant="primary" type="submit" className='mt-3 w-100'>
            Login
          </Button>
        </Row>
      </Row>
    </Form>
        );
      };