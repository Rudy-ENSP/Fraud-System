import React, {Component} from 'react';
import Modal from 'react-modal'
import '../styles.css';
import image from '../images/friends.png';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import {Redirect} from "react-router-dom";
import { isAcceuil,isEntité,isPlaintes } from './Navbar/Navbar';    


export class Accueil extends Component {

    constructor(){
        super()
        this.state={
            isLoginClient:false,
            isLoginAdmin:false,
            isLogin:false,
            isAdmin:false,
            username:'',
            password:'',
            
            
        }
    }

    

    render(){
       
        return(

          <div style={{backgroundColor:'white'}}>
            <Box display="flex" flexDirection="row" p={1} m={1} style={{height:450, marginTop:50}}
                bgcolor="background.paper" justifyContent='center'>
                <Box p={1} bgcolor="grey.300" style={{width:200,marginRight:50, borderRadius:10}}>
                    <Box style={{textAlign:'center',color:'black',fontWeight:'bold',fontSize:18, 
                        marginTop:10, marginBottom:20}}>NIVEAU DE SERVICE </Box>
                    <Box style={{textAlign:"center,",fontSize:15}}>Decrivez juste votre Typologie de Fraudes lors de la création  et le système 
                        s'occupera du reste</Box>

                    <Box style={{textAlign:'center',color:'black',fontWeight:'bold',fontSize:18, 
                        marginTop:25, marginBottom:20}}>FILTRAGE DE FRAUDE PAR CATEGORIES </Box>
                    <Box style={{textAlign:"center",fontSize:15}}>Notre  système de filtrage
                        des billets garantit que les bons billets sont acheminés au bon service, 
                        </Box>
                </Box>
                <Box p={1} bgcolor="white" style={{width:300, marginRight:50, borderRadius:10}}>
                    <Box display="flex" flexDirection="row" p={1} m={1} style={{marginBottom:40}}
                        bgcolor="background.paper" justifyContent='space-between'>
                        

                    </Box>
                    <div style={{height:200, marginLeft:100}}>
                        <img src={image}></img>
                    </div>
                </Box>
                <Box p={1} bgcolor="grey.300" style={{width:200, marginLeft:300, borderRadius:10}}>
                    <Box style={{textAlign:'center',color:'black',fontWeight:'bold',fontSize:18, 
                        marginTop:10, marginBottom:20}}>PORTAIL DE SUPPORT CLIENT </Box>
                    <Box style={{textAlign:"center",fontSize:15}}>Système concu
                        pour aider l'entreprise à Repertorier et a Traiter les fraudes et fausses alertes sur internet</Box>

                    <Box style={{textAlign:'center',color:'black',fontWeight:'bold',fontSize:18, 
                        marginTop:25, marginBottom:20}}>ET BEAUCOUP PLUS! </Box>
                    <Box style={{textAlign:"center",fontSize:15}}>FraudStats est livré avec des 
                        fonctionnalités impressionnantes que vous devez essayer </Box>
                </Box>
            </Box>

        </div> 
       
        );
    }
}

export default Accueil