import React, {Component} from 'react';
import { BrowserRouter as Router, Route,Link} from 'react-router-dom';
import '../../styles.css';
import './css/simple-sidebar.css'
import './vendor/bootstrap/css/bootstrap.min.css'
import NewCategoriePlainte from './NewCategoriePlainte'
import AllCategoriePlainte from './AllCategoriePlainte'
import axios from 'axios';
class EntitéSideBar extends Component {
    constructor(props){
        super(props)
        this.state={
          
            categoriePlainte:[],
            
            entités:[],
            
        }
    }
    componentDidMount() {
        axios.get('http://localhost:8000/plaintes/listeCategoriePlainte/')
          .then(res => {
            const categoriePlainte = res.data;
            this.setState({categoriePlainte: categoriePlainte  });
            console.log('Categorieplaintes', categoriePlainte)
          })
          .catch(function (error) {
            console.log(error);
          });
          
          axios.get('http://localhost:8000/plaintes/listeEntite/')
          .then(res => {
            const entités = res.data;
            this.setState({entités: entités  });
            console.log('entités', entités)
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
                        
                        <Link class="list-group-item list-group-item-action bg-light" to="/fraud/CategoriePlainte/Nouvelle Categorie">Nouvelle Categorie</Link>
                    </div>
               </div>
                <Route>
                    <Route path="/fraud/CategoriePlainte/All CategoriePlainte" >
                    <AllCategoriePlainte categoriePlainte={this.state.categoriePlainte} entités={this.state.entités}/>
                    </Route>
                    
                    <Route path="/fraud/CategoriePlainte/Nouvelle Categorie" component={NewCategoriePlainte}/>
                </Route>
                </Router>
            </div>
        );
    }
}

export default EntitéSideBar 