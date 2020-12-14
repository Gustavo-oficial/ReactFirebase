import { cleanup } from '@testing-library/react';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import {Form, Button, Table, Card, Container, Row, Col} from 'react-bootstrap';
import { db } from '../../utils/firebaseConfig';
 const Eventos = () => {
     const [eventos, setEventos] = useState([]);
     const [nome, setNome] = useState('');
     const [id, setId] = useState(0);
     const [descricao, setDescricao] = useState('');

    const _dbCollection = db.collection ('eventos');

     useEffect(() => {
        listarEventos();
    }, []);


     const listarEventos= () => {
        try{
            _dbCollection
            .get()
            .then( result => {
             const data = result.docs.map(doc =>{
                 return{
                     id : doc.id,
                     nome : doc.data().nome,
                     descricao : doc.data().descricao
                 }
             });
             setEventos(data);
            })
            .catch(error => console.log(error));
        } catch (error) {
            console.error(error);
        }
    }


     const remover = (event) => {
         event.preventDefault();
         try{
             _dbCollection
             .doc(event.target.value)
             .delete()
             .then(() => {
                alert('Evento deletado');
                listarEventos();
                limparCampos();
            })
            .catch(error =>{
                console.error(error);
            })
         } catch (error){
             console.error(error);
         }
     }

     const editar = (event) => {
        event.preventDefault();

        try {
            _dbCollection.doc(event.target.value)
            .get()
            .then( result => {
                setId(result.id);
                setNome(result.data().nome);
                setDescricao(result.data().descricao);
            })
        } catch (error){
            console.error(error);
        }
    }

    const salvar = (event) => {
        event.preventDefault();
      
        try {
            const evento = {
                nome : nome,
                descricao : descricao
            }
    
            if(id === 0){
                _dbCollection
                .add(evento)
                .then(() => {
                    alert('Evento cadastrado');
                    listarEventos();
                    limparCampos();
                })
                .catch(error =>{
                    console.error(error);
                })
            } else {
                _dbCollection
                .doc(id)
                .set(evento)
                .then( () => {
                    alert('Evento alterado');
                    listarEventos();
                    limparCampos();
                });
            }
            console.log(`Dados ${nome}  ${descricao}`);
        } catch (error){
            console.error(error);
        }
    }
     
    const limparCampos = () => {
        setId(0);
        setNome('');
        setDescricao('');
    }

     return(
         <div>
              <Container>
                <h1>Eventos</h1>
                <p>Gerencie seus eventos</p>
                <Card>
                    <Card.Body>
                        <Form onSubmit={event => salvar(event)}>
                            <Form.Group controlId="formBasicNome">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control type="text" value={nome} onChange={event => setNome(event.target.value)} placeholder="Nome do evento"></Form.Control>
                            </Form.Group>
                          
                                 
                            
                            <Form.Group controlId="formBasicUrl">
                                <Form.Label>Descrição</Form.Label>
                                <Form.Control as="textarea" rows={3} value={descricao} onChange={event => setDescricao(event.target.value)}/>
                            </Form.Group>
        

                            <Button type="submit">Salvar</Button>
                        </Form>
                    </Card.Body>
                </Card>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Descrição</th>
                          
                        </tr>
                    </thead>
                    <tbody>
                    {
                            eventos.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.nome}</td>                                      
                                        <td>{item.descricao}</td>
                                        <td>
                                            <Button variant="warning" value={item.id} onClick={event => editar(event)} >Editar</Button>
                                            <Button variant="danger" value={item.id} onClick={event => remover(event)} style={{ marginLeft : '40px'}}>Remover</Button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </Container>
         </div>
     )
 }
 export default Eventos;