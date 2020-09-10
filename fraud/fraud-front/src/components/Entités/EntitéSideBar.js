import React, {Component} from 'react';
import { BrowserRouter as Router, Route,Link} from 'react-router-dom';
import '../../styles.css';
import './css/simple-sidebar.css'
import './vendor/bootstrap/css/bootstrap.min.css'
import NewEntités from './NewEntités'
import AllEntités from './AllEntités'

class EntitéSideBar extends Component {
    render(){
        return(
 
            <div class="d-flex" id="wrapper">
                <Router>
                
                <div class="bg-light border-right" id="sidebar-wrapper">
                    <div class="sidebar-heading">Gestion des Entités </div>
                    <div class="list-group list-group-flush">
                        <Link class="list-group-item list-group-item-action bg-light" to="/All Entités">Toutes Les Entités</Link>
                        
                        <Link class="list-group-item list-group-item-action bg-light" to="/Nouvelle Entité">Nouvelles Entités</Link>
                    </div>
               </div>
                <Route>
                    <Route exact path="/All Entités" component={AllEntités}/>
                    <Route path="/Nouvelle Entité" component={NewEntités}/>
                </Route>
                </Router>
            </div>
        );
    }
}

export default EntitéSideBar 