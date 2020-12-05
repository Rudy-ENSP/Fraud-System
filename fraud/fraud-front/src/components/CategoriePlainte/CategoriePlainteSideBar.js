import React, {Component} from 'react';
import { BrowserRouter as Router, Route,Link} from 'react-router-dom';
import '../../styles.css';
import './css/simple-sidebar.css'
import './vendor/bootstrap/css/bootstrap.min.css'
import NewCategoriePlainte from './NewCategoriePlainte'
import AllCategoriePlainte from './AllCategoriePlainte'
import axios from 'axios';
import {serveur} from '../../serveur'
class EntitéSideBar extends Component {
    constructor(props){
        super(props)
        this.state={
          
            categoriePlainte:[],
            
            entités:[],
            count:'',
            entitéselect:''
            
        }
    }
    componentDidMount() {
        axios.get(serveur+'listeCategoriePlainte/')
          .then(res => {
            const categoriePlainte = res.data;
            this.setState({categoriePlainte: categoriePlainte ,count:res.data.count });
            
          })
          .catch(function (error) {
            console.log(error);
          });
          
          axios.get(serveur+'listeEntite/')
          .then(res => {
            const entités = res.data;
            this.setState({entités: entités,entitéselect:res.data[0].id  });
            
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    
    render(){
        return(
 
            <div class="d-flex" id="wrapper">
                <Router>
                
                <div class="bg-light border-right" id="sidebar-wrapper">
                    <div class="sidebar-heading">Gestion des Categories </div>
                    <div class="list-group list-group-flush">
                        <Link class="list-group-item list-group-item-action bg-light" to="/fraud/CategoriePlainte/All CategoriePlainte">Toutes Les Categories</Link>
                        
                        
                    </div>
               </div>
                <Route>
                    <Route path="/fraud/CategoriePlainte/All CategoriePlainte" >
                    <AllCategoriePlainte Entité={this.state.entitéselect} categoriePlainte={this.state.categoriePlainte} entités={this.state.entités} count={this.state.count}/>
                    </Route>
                    
                    
                </Route>
                </Router>
            </div>
        );
    }
}

export default EntitéSideBar 