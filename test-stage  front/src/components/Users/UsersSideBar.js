import React, {Component} from 'react';
import { BrowserRouter as Router, Route,Link} from 'react-router-dom';
import '../../styles.css';
import './css/simple-sidebar.css'
import './vendor/bootstrap/css/bootstrap.min.css'
import {serveur} from '../../serveur'

import AllUsers from './AllUsers'
import axios from 'axios';

class EntitéSideBar extends Component {
    constructor(props){
        super(props)
        this.state={
          
            
            reload:false,
            entités:  [],
            Users:[]
            
        }
       
        axios.get(serveur+'listeEntite/')
        .then(res => {
          const entités = res.data;
          this.setState({entités: entités  });
          console.log('entités', entités)
        })
        .catch(function (error) {
          console.log(error);
        });
       


        axios.get(serveur+'allUsers/')
        .then(res => {
          const Users = res.data;
          this.setState({Users: Users  });
          console.log('Users', Users)
        })
        .catch(function (error) {
          console.log(error);
        });
      
    }
    componentDidMount() {
        
         
      }
    callbackParent=(reload)=>{
        this.setState({reload:reload, state:this.state})
        this.forceUpdate()
        console.log({'reload':reload})
    }
    
    render(){
        return(
 
            <div class="d-flex" id="wrapper">
                <Router>
                
                <div class="bg-light border-right" id="sidebar-wrapper">
                    <div class="sidebar-heading">Gestion des Utilisateurs </div>
                    <div class="list-group list-group-flush">
                        <Link class="list-group-item list-group-item-action bg-light" to="/fraud/Users/All Users">Tous Les Utilisateurs</Link>
                        
                        
                    </div>
               </div>
                <Route>
                    <Route path="/fraud/Users/All Users" >
                     <AllUsers  entités={this.state.entités} callbackParent={this.callbackParent} Users={this.state.Users}/>
                    </Route>
                   
                   
                </Route>
                </Router>
            </div>
        );
    }
}

export default EntitéSideBar 