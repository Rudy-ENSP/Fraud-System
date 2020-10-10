import React, {Component} from 'react';
import { BrowserRouter as Router, Route,Link} from 'react-router-dom';
import '../../styles.css';
import './css/simple-sidebar.css'
import './vendor/bootstrap/css/bootstrap.min.css'
import NewEntités from './NewEntités'
import AllEntités from './AllEntités'
import axios from 'axios';

class EntitéSideBar extends Component {
    constructor(props){
        super(props)
        this.state={
          
            
            reload:false,
            entités:[],
            
        }
    }
    componentDidMount() {
       
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
    callbackParent=(reload)=>{
        this.setState({reload:reload})
        this.setState({state:this.state})
        this.forceUpdate()
        console.log({'reload':reload})
    }
    
    render(){
        return(
 
            <div class="d-flex" id="wrapper">
                <Router>
                
                <div class="bg-light border-right" id="sidebar-wrapper">
                    <div class="sidebar-heading">Gestion des Entités </div>
                    <div class="list-group list-group-flush">
                        <Link class="list-group-item list-group-item-action bg-light" to="/fraud/Entités/All Entités">Toutes Les Entités</Link>
                        
                        <Link class="list-group-item list-group-item-action bg-light" to="/fraud/Entités/Nouvelle Entité">Nouvelles Entités</Link>
                    </div>
               </div>
                <Route>
                    <Route path="/fraud/Entités/All Entités" >
                     <AllEntités  entités={this.state.entités} callbackParent={this.callbackParent}/>
                    </Route>
                   
                    <Route path="/fraud/Entités/Nouvelle Entité" component={NewEntités}/>
                </Route>
                </Router>
            </div>
        );
    }
}

export default EntitéSideBar 