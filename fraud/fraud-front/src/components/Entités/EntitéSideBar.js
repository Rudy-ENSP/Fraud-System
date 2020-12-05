import React, {Component} from 'react';
import { BrowserRouter as Router, Route,Link} from 'react-router-dom';
import '../../styles.css';
import './css/simple-sidebar.css'
import './vendor/bootstrap/css/bootstrap.min.css'
import NewEntités from './NewEntités'
import AllEntités from './AllEntités'
import axios from 'axios'
import {serveur} from '../../serveur'

class EntitéSideBar extends Component {
    constructor(props){
        super(props)
        this.state={
          
            
            reload:false,
            entités:  [],
            hierachie:'',
            count:''
            
        }
       
        axios.get(serveur+'listeEntite/')
        .then(res => {
          const entités = res.data;
          this.setState({entités: entités ,hierachie:"1" ,count:res.data.count});
         
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
     
    }
    
    render(){
        return(
 
            <div class="d-flex" id="wrapper">
                <Router>
                
                <div class="bg-light border-right" id="sidebar-wrapper">
                    <div class="sidebar-heading">Gestion des Entités </div>
                    <div class="list-group list-group-flush">
                        <Link class="list-group-item list-group-item-action bg-light" to="/fraud/Entités/All Entités">Toutes Les Entités</Link>
                        
                        
                    </div>
               </div>
                <Route>
                    <Route path="/fraud/Entités/All Entités" >
                     <AllEntités  entités={this.state.entités} Hierarchie={this.state.hierachie} count={this.state.count} callbackParent={this.callbackParent}/>
                    </Route>
                   
                    
                </Route>
                </Router>
            </div>
        );
    }
}

export default EntitéSideBar 