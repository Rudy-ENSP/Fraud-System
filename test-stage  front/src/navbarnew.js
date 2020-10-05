import React, { Component } from 'react';
import { NavLink ,Link,useHistory } from 'react-router-dom';
import {Navbar as BNavbar,NavDropdown} from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.css';

import axios from 'axios';
import { isLoginAdmin,isLogin,isLoginClient } from '../../../Fraud-System/fraud/fraud-front/src/components/Login/login';


export var isPlaintes=false;
export var isEntité=false;
export var isAcceuil=true;


class Navbar extends Component {


    constructor(props){
        super(props)
        this.state={
            isLogin:false,
            isLoginAdmin:false,
            isLoginClient:false,
            isEntité:false,
            isPlaintes:false,
            isAcceuil:true
        }
    }
    componentDidMount(){
        if (this.props.isLogin!=this.state.isLogin || this.props.isLoginAdmin!=this.state.isLoginAdmin 
            || this.props.isLoginClient!=this.state.isLoginClient) {
          this.setState({
            isLogin:this.props.isLogin,
            isLoginAdmin:this.props.isLoginAdmin,
            isLoginClient:this.props.isLoginClient,
          });
        }
   }
    
    deconnexion=()=>{
        this.setState({
            isLogin:false,
            isLoginAdmin:false,
            isLoginClient:false,
        })
       

        axios.get('http://localhost:8000/plaintes/logout/')
        .then(res => {
         alert(res.data)
        })
        .catch(function (error) {
          console.log(error);
        });

        window.location.reload(false);
    }
       
 
     refreshNavBar=()=> {
         this.setState({
            isLogin:isLogin,
            isLoginAdmin:isLoginAdmin,
            isLoginClient:isLoginClient,
          });
      }
    
    render(){
      
        return (
           
            <BNavbar bg="dark" variant="dark">
            <BNavbar.Brand href="#home">
              <img
                alt=""
                src="/logo.svg"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{' '}
              React Bootstrap
            </BNavbar.Brand>
          </BNavbar>
        );
    }
}

export default Navbar