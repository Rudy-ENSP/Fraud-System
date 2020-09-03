import React, {Component} from 'react';
import { BrowserRouter as Router, Route, /*Switch,*/Link} from 'react-router-dom';
import '../../styles.css';
import './css/simple-sidebar.css'
import './vendor/bootstrap/css/bootstrap.min.css'
import AllPlaintes from './AllPlaintes'
import NewPlaintes from './NewPlaintes'
import NoResolvedPlaintes from './NoResolvedPlaintes'
import ResolvedPlaintes from './ResolvedPlaintes'

class PlainteSideBar extends Component {
    render(){
        return(
            <div class="d-flex" id="wrapper">
                <Router>
                
                <div class="bg-light border-right" id="sidebar-wrapper">
                    <div class="sidebar-heading">Gestion des Plaintes </div>
                    <div class="list-group list-group-flush">
                        <Link class="list-group-item list-group-item-action bg-light" to="/All Plaintes">Toutes Les Plaintes</Link>
                        
                        <Link class="list-group-item list-group-item-action bg-light" to="/Nouvelles plaintes">Nouvelles Plaintes </Link>
                        
                        <Link class="list-group-item list-group-item-action bg-light"to="/plaintes résolues">Plaintes Resolues</Link>
                        
                        <Link class="list-group-item list-group-item-action bg-light" to="/plaintes non résolues">Plaintes Non Resolues</Link>
                        
                        <Link class="list-group-item list-group-item-action bg-light" to="/Plaintes en attente">Plaintes en Attente</Link>
                        
                        <Link class="list-group-item list-group-item-action bg-light" to="/Rapport">Rapport</Link>
                    </div>
               </div>
                <Route>
                    <Route exact path="/All Plaintes" component={AllPlaintes}/>
                    <Route path="/Nouvelles plaintes" component={NewPlaintes}/>
                    <Route path="/plaintes résolues" component={ResolvedPlaintes}/>
                    <Route path="/plaintes non résolues" component={NoResolvedPlaintes}/>
                </Route>
                </Router>
            </div>
        );
    }
}

export default PlainteSideBar 