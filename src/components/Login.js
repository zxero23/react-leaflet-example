import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Button } from 'reactstrap';
import Cookies from 'universal-cookie';
import Input from '../components/Input/input';
import '../css/Login.css';
const baseUrl="http://localhost:8001/login";
const cookies = new Cookies();

const  Login=()=> {

    const [user,setUser]=useState('');
    const [pass,setPass]=useState('');

    function handleChange(name,value){
        if (name=='usuario'){
                setUser(value);                
        }else if (name=='contrasenia'){
            setPass(value);
        }
    }


    async function  iniciarSesion(){
        await axios.post(baseUrl, {"username": user,
        "password": pass})
        .then(response=>{  
            return response.data.token;
        })
        .then(response=>{
            console.info(response);
            if(response.length>0 ){                
                cookies.set('usuario', user, {path: "/"});
                cookies.set('contrasenia', pass, {path: "/"});
                cookies.set("token", response, {path: "/"});                    
                alert(`Bienvenido ${user}`);
                window.location.href="./mapa";
            }else{
                cookies.set('usuario', '', {path: "/"});
                        cookies.set('contrasenia', '', {path: "/"});
                    alert('El usuario o la contraseña no son correctos');
            }
        })
        .catch(error=>{
            alert('El usuario o la contraseña no son correctos');
            console.log(error);
        })

    }

    function  handleSubmit(){
        iniciarSesion();
    }

    return (
        
    <div>
    <div className="sidenav" >

         <div className="login-main-text" >
                <h2>Centralización de Acontecimientos de Violencia</h2>                
         </div>
     </div>
     <div className="main">
        <div className="col-md-6 col-sm-12">
           <div className="login-form">
              <form>
                 <div className="form-group">
                    <label>Usuario</label>
                    <Input 
                               className="form-control"
                               atributte={{
                                   id:'usuario',
                                   name:'usuario',
                                   type:'text',
                                   placeholder:'Ingrese su usuario'
                               }}
                               handleChange={handleChange}
                           />
                 </div>
                 <div className="form-group">
                    <label>Contraseña</label>
                    <Input 
                           className="form-control"
                           atributte={{
                               id:'contrasenia',
                               name:'contrasenia',
                               type:'password',
                               placeholder:'Ingrese su Contraseña'
                           }}
                           handleChange={handleChange}                    
                       />  
                 </div>
                 <Button  className="btn btn-info" onClick={handleSubmit}>Ingresar</Button>
                 
              </form>
           </div>
        </div>
     </div>  
     </div>
      
    );
  }
  
  export default Login;