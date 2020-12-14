import React, {useState} from 'react';
import {Container,  form, Button, Form} from 'react-bootstrap';
import {useFirebaseApp} from 'reactfire';
   const Cadastrar = () => {
       const firebase = useFirebaseApp();
       
       const [email, setEmail] = useState('');
       const [senha, setSenha] = useState('');

       const logar = (event) => {
           event.preventDefault();

           firebase.auth().createUserWithEmailAndPassword(email, senha)
           .then(result => {
               console.log(result);
               localStorage.setItem('nyous', result.user.refreshToken);
               alert('Usuario cadastrado com sucesso');
           })
           .catch(error => {
               alert('Dados invalidos');
               console.error(error);
           })
       }
       return(
           <Container>
               <Form className= 'form-signin' onSubmit={event => logar(event)}>
                   <br/>
                   <small>Informe os dados abaixo</small>
                   <br/>
                   <Form.Group controlId="formBasicEmail">
                       <Form.Label>Email</Form.Label>
                       <Form.Control type="email" placeholder="Informe seu email" value={email} onChange={event => setEmail(event.target.value)} required/>
                   </Form.Group>

                   <Form.Group controlId="FormBasicPassword">
                       <Form.Label>Senha</Form.Label>
                       <Form.Control type="password" placeholder="Senha" value={senha} onChange={event => setSenha(event.target.value)} required/>
                   </Form.Group>

                   <Button variant="primary" type="submit">
                       Cadastrar
                   </Button>
                   <br/><br/>
                   <a href='/cadastrar' style={{ marginTop : '30px'}}>Não tenho conta</a>
               </Form>
           </Container>

       )
   }
   export default Cadastrar;