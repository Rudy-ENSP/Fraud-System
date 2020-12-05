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
import {serveur} from '../../serveur'

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
            nextA:'',
            previousA:'',
            countA:'',
            nextNR:'',
            previousNR:'',
            countNR:'',
            nextR:'',
            previousR:'',
            countR:'',
            nextW:'',
            previousW:'',
            countW:'',
            userselect:'',
            categorieselect:'',
            entitéselect:''
            
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
          axios.get(serveur+'listeUsers/')
          .then(res => {
            const Users = res.data;
            this.setState({Users: Users ,userselect:res.data[0].id});
            
          })
          .catch(function (error) {
            console.log(error);
          });

          axios.post(serveur+'listePlainte/',data)
          .then(res => {
            const plainteA = res.data;
            this.setState({plainteA: plainteA,nextA:res.data.next,previousA:res.data.previous,countA:res.data.count  });
            
            

          })
          .catch(function (error) {
            console.log(error);
          });

          axios.post(serveur+'nonresolues/',data)
        .then(res => {
            const plainteNR = res.data;
            this.setState({plainteNR: plainteNR,nextNR:res.data.next,previousNR:res.data.previous,countNR:res.data.count  });
          //console.log(plainteNR)
        })
        .catch(function (error) {
          console.log(error);
        });
        axios.post(serveur+'waiting/',data)
          .then(res => {
            const plainteW = res.data;
            this.setState({plainteW: plainteW,nextW:res.data.next,previousW:res.data.previous,countW:res.data.count  });
            
          })
          .catch(function (error) {
            console.log(error);
          });

        axios.post(serveur+'resolues/',data)
          .then(res => {
            const plainteR = res.data;
            this.setState({plainteR: plainteR,nextR:res.data.next,previousR:res.data.previous,countR:res.data.count  });
           
          })
          .catch(function (error) {
            console.log(error);
          });

          axios.get(serveur+'listeEntite/')
          .then(res => {
            const entités = res.data;
            this.setState({entités: entités ,entitéselect:res.data[0].id });
           
          })
          .catch(function (error) {
            console.log(error);
          });

          axios.get(serveur+'listeCategoriePlainte/')
          .then(res => {
            const categoriePlainte = res.data;
            this.setState({categoriePlainte: categoriePlainte ,categorieselect:res.data[0].id });
           
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
                    <AllPlaintes userselect={this.state.userselect} entitéselect={this.state.entitéselect} categorieselect={this.state.categorieselect} Users= {this.state.Users} plainte={this.state.plainteA} categoriePlainte={this.state.categoriePlainte} entités={this.state.entités} next={this.state.nextA} previous={this.state.previousA} count={this.state.countA}/>
                   </Route>
                   <Route path="/fraud/Plaintes/plaintes résolues" >
                    <ResolvedPlaintes  userselect={this.state.userselect} entitéselect={this.state.entitéselect} categorieselect={this.state.categorieselect} Users= {this.state.Users} plaintes={this.state.plainteR} categoriePlainte={this.state.categoriePlainte} entités={this.state.entités} next={this.state.nextR} previous={this.state.previousR} count={this.state.countR}/>
                   </Route>
                   <Route path="/fraud/Plaintes/plaintes non résolues" >
                    <NoResolvedPlaintes userselect={this.state.userselect} entitéselect={this.state.entitéselect} categorieselect={this.state.categorieselect} Users= {this.state.Users} plaintes={this.state.plainteNR} categoriePlainte={this.state.categoriePlainte} entités={this.state.entités} next={this.state.nextNR} previous={this.state.previousNR} count={this.state.countNR}/>
                   </Route>
                   <Route path="/fraud/Plaintes/Plaintes en attente" >
                    <WaitingPlaintes userselect={this.state.userselect} entitéselect={this.state.entitéselect} categorieselect={this.state.categorieselect} Users= {this.state.Users} plaintes={this.state.plainteW} categoriePlainte={this.state.categoriePlainte} entités={this.state.entités} next={this.state.nextW} previous={this.state.previousW} count={this.state.countW}/>
                   </Route>

                    <Route path="/fraud/Plaintes/Nouvelles plaintes" component={NewPlaintes}/>
                    <Route path="/fraud/Plaintes/Bilan">
                    <Rapport userselect={this.state.userselect} entitéselect={this.state.entitéselect} categorieselect={this.state.categorieselect} Users= {this.state.Users}  categoriePlainte={this.state.categoriePlainte} entités={this.state.entités}  />
                    </Route>
                </Route>
                </Router>
            </div>
        );
    }
}

export default PlainteSideBar 