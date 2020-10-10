import React, {Component} from 'react';
import { BrowserRouter as Router, Route, /*Switch,*/Link} from 'react-router-dom';
import { username ,password, isLoginAdmin} from '../Login/login';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import AllPlaintes from './AllPlaintes'
import NewPlaintes from './NewPlaintes'
import NoResolvedPlaintes from './NoResolvedPlaintes'
import ResolvedPlaintes from './ResolvedPlaintes'
import WaitingPlaintes from './WaitingPlaintes'
import Rapport from '../Rapport/rapport.js'

class PlainteSideBar extends Component {
    constructor(props){
        super(props)
        this.state={
            
            entités:[],
            categoriePlainte:[],
            Users:[],
            plainteA:[],
            plainteNR:[],
            plainteR:[],
            plainteW:[],
            
        }
    }


    //on recupère les données back end

    componentDidMount() {


       // Activate tooltip
           // $('[data-toggle="tooltip"]').tooltip();
            
            // Select/Deselect checkboxes
            



		let data={
              'user':username,
              'password':password
          };
          axios.get('http://localhost:8000/plaintes/listeUsers/')
          .then(res => {
            const Users = res.data;
            this.setState({Users: Users  });
            //console.log('Users', Users)
          })
          .catch(function (error) {
            console.log(error);
          });

          axios.post('http://localhost:8000/plaintes/listePlainte/',data)
          .then(res => {
            const plainteA = res.data;
            this.setState({plainteA: plainteA  });
            //console.log(plainteA)
          })
          .catch(function (error) {
            console.log(error);
          });

          axios.post('http://localhost:8000/plaintes/nonresolues/',data)
        .then(res => {
            const plainteNR = res.data;
          this.setState({plainteNR: plainteNR });
          //console.log(plainteNR)
        })
        .catch(function (error) {
          console.log(error);
        });
        axios.post('http://localhost:8000/plaintes/waiting/',data)
          .then(res => {
            const plainteW = res.data;
            this.setState({plainteW: plainteW  });
            //console.log('plainteW', plainteW)
          })
          .catch(function (error) {
            console.log(error);
          });

        axios.post('http://localhost:8000/plaintes/resolues/',data)
          .then(res => {
            const plainteR = res.data;
            this.setState({plainteR: plainteR  });
           // console.log(plainteR)
          })
          .catch(function (error) {
            console.log(error);
          });

          axios.get('http://localhost:8000/plaintes/listeEntite/')
          .then(res => {
            const entités = res.data;
            this.setState({entités: entités  });
            //console.log('entités', entités)
          })
          .catch(function (error) {
            console.log(error);
          });

          axios.get('http://localhost:8000/plaintes/listeCategoriePlainte/')
          .then(res => {
            const categoriePlainte = res.data;
            this.setState({categoriePlainte: categoriePlainte  });
            //console.log('Categorieplaintes', categoriePlainte)
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
                    <div class="sidebar-heading">Gestion des Plaintes </div>
                    <div class="list-group list-group-flush">
                        <Link class="list-group-item list-group-item-action bg-light" to="/fraud/Plaintes/All Plaintes">Toutes Les Plaintes</Link>
                        
                        <Link class="list-group-item list-group-item-action bg-light"to="/fraud/Plaintes/plaintes résolues">Plaintes Resolues</Link>
                        
                        <Link class="list-group-item list-group-item-action bg-light" to="/fraud/Plaintes/plaintes non résolues">Plaintes Non Resolues</Link>
                        
                        <Link class="list-group-item list-group-item-action bg-light" to="/fraud/Plaintes/Plaintes en attente">Plaintes en Attente</Link>
                        
                        <Link class="list-group-item list-group-item-action bg-light" to="/fraud/Plaintes/Bilan">Rapport</Link>
                    </div>
               </div>
                <Route>   
                
                    <Route path="/fraud/Plaintes/All Plaintes" >
                    <AllPlaintes Users= {this.state.Users} plainte={this.state.plainteA} categoriePlainte={this.state.categoriePlainte} entités={this.state.entités}/>
                   </Route>
                   <Route path="/fraud/Plaintes/plaintes résolues" >
                    <ResolvedPlaintes Users= {this.state.Users} plaintes={this.state.plainteR} categoriePlainte={this.state.categoriePlainte} entités={this.state.entités}/>
                   </Route>
                   <Route path="/fraud/Plaintes/plaintes non résolues" >
                    <NoResolvedPlaintes Users= {this.state.Users} plaintes={this.state.plainteNR} categoriePlainte={this.state.categoriePlainte} entités={this.state.entités}/>
                   </Route>
                   <Route path="/fraud/Plaintes/Plaintes en attente" >
                    <WaitingPlaintes Users= {this.state.Users} plaintes={this.state.plainteW} categoriePlainte={this.state.categoriePlainte} entités={this.state.entités}/>
                   </Route>

                    <Route path="/fraud/Plaintes/Nouvelles plaintes" component={NewPlaintes}/>
                    <Route path="/fraud/Plaintes/Bilan" component={Rapport}/>
                </Route>
                </Router>
            </div>
        );
    }
}

export default PlainteSideBar 