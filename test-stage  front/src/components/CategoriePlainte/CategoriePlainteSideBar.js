import React, {Component} from 'react';
import { BrowserRouter as Router, Route,Link} from 'react-router-dom';
import '../../styles.css';
import './css/simple-sidebar.css'
import './vendor/bootstrap/css/bootstrap.min.css'
import NewCategoriePlainte from './NewCategoriePlainte'
import AllCategoriePlainte from './AllCategoriePlainte'

class EntitéSideBar extends Component {
    render(){
        return(
 
            <div class="d-flex" id="wrapper">
                <Router>
                
                <div class="bg-light border-right" id="sidebar-wrapper">
                    <div class="sidebar-heading">Gestion des Categories </div>
                    <div class="list-group list-group-flush">
                        <Link class="list-group-item list-group-item-action bg-light" to="/All CategoriePlainte">Toutes Les Categories</Link>
                        
                        <Link class="list-group-item list-group-item-action bg-light" to="/Nouvelle Categorie">Nouvelle Categorie</Link>
                    </div>
               </div>
                <Route>
                    <Route exact path="/All CategoriePlainte" component={AllCategoriePlainte}/>
                    <Route path="/Nouvelle Categorie" component={NewCategoriePlainte}/>
                </Route>
                </Router>
            </div>
        );
    }
}

export default EntitéSideBar 