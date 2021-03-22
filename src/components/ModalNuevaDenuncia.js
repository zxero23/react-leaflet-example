import React,{useState} from 'react';
import axios from 'axios'
import { Button, Modal, ModalFooter, ModalHeader, ModalBody,FormGroup, Input, Label } from 'reactstrap';


class ModalNuevaDenuncia extends React.Component {
    constructor(props) {

        
        super(props);
        this.state = {
            modal: props.initialModalState,
            fade: true,
            motivo:"",
            tipoDenuncia:"",
            nombre:"",
            apellido:"",
            dni:"",
            latitud:"",
            longitud:""
            

        };
        
      

        this.toggle = this.toggle.bind(this);
    }

    
    changeHandler = e => {      
        this.setState({ [e.target.name]: e.target.value })  
	}
    submitHandler = e => {
        const persona=({
            nombre:null,
            apellido:null,
            dni:null,
            sexo:null,
            fechaNacimiento:null

        })
        const ubicacion=({
            lat:null,
            lon:null
        })
        const judicial=({
            id:null
        })

        const denuncia=({
            motivo:this.state.motivo,
            fecha:new Date(),
            tipoDenuncia:"ROBO",
            ubicacion:ubicacion,
            denunciado:persona,
            denunciante:persona,
            judicial:judicial

        })
        const myObjStr = JSON.stringify(denuncia);        
		e.preventDefault()
		//console.log(myObjStr)
        
            
       
		axios
			.post('http://denuncias-api-posadas.herokuapp.com/denuncias', myObjStr,{
                headers: {
                    'Content-Type': 'application/json'
                }
              })
			.then(response => {
				console.log(response)
                this.toggle();
			})
			.catch(error => {
                console.log(myObjStr)
				console.log(error)
			})
	}

    

    toggle() {
        this.setState({
            modal: !this.state.modal,
            fade: !this.state.fade

        });
    }

    render() {
        return (
            <div>
                <Button color="danger" onClick={this.toggle}>NUEVA DENUNCIA</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}
                    fade={this.state.fade}
                    className={this.props.className} >
                    <form onSubmit={this.submitHandler}>
                    <ModalHeader toggle={this.toggle}>NUEVA DENUNCIA</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="motivo">Motivo</Label>
                            <Input type="text" id="motivo" name="motivo" onChange={this.changeHandler} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="tipoDenuncia">Tipo Denuncia</Label>
                            <Input type="text" id="tipoDenuncia" name="tipoDenuncia" onChange={this.changeHandler} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="nombre">Nombre</Label>
                            <Input type="text" id="nombre" name="nombre" onChange={this.changeHandler} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="apellido">Apellido</Label>
                            <Input type="text" id="apellido" name="apellido" onChange={this.changeHandler} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="dni">Dni</Label>
                            <Input type="text" id="dni" name="dni" onChange={this.changeHandler} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="latitud">Latitud</Label>
                            <Input type="text" id="latitud" name="latitud" onChange={this.changeHandler} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="longitud">Longitud</Label>
                            <Input type="text" id="longitud" name="longitud" onChange={this.changeHandler} />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.submitHandler}>CREAR</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>CANCELAR</Button>
                    </ModalFooter>
                    </form>
                </Modal>
            </div>
        );
    }
}

export default ModalNuevaDenuncia;
