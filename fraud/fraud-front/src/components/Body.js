import React, {Component} from 'react';
import Modal from 'react-modal'
import '../styles.css';
import image from '../images/friends.png';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import {Accueil} from './Accueil';
import {Plaintes} from './Plaintes/Plaintes';
import {Redirect} from "react-router-dom";
import { isAcceuil,isEntité,isPlaintes } from './Navbar/Navbar';    


export class Body extends Component {

    constructor(){
        super()
        this.state={
            isLoginClient:false,
            isLoginAdmin:false,
            isLogin:false,
            isAdmin:false,
            username:'',
            password:'',
            isAcceuil:true,
            isEntité:false,
            isPlaintes:false
            
        }
    }

    

    render(){
        if (isAcceuil){
            
        
            return(
          <Accueil/>
        );
        }
        if (isPlaintes){
            this.setState({
                isPlaintes:true,
                isEntité:false,
                isAcceuil:false
            })
            return(
              <Plaintes/>
            );
        }
      /*  if (isEntité){
            this.setState({
                isPlaintes:false,
                isEntité:true,
                isAcceuil:false
            })
           
            return(
                  <Entité/>
                );
            }*/
    }
}

export default Body