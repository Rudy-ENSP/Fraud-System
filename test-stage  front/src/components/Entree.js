import React, { Component } from 'react';
import Navbar from './Navbar/Navbar'
import Footer from './Footer/footer'
import { BrowserRouter as Router, Route, Switch,NavLink} from 'react-router-dom';
import Accueil from './Accueil';
import Entités from './Entités/Entités'
import Plaintes from './Plaintes/Plaintes'
import CategoriePlainte from './CategoriePlainte/CategoriePlainte'
import Users from './Users/Users'
import '../styles.css';
import { isLoginAdmin,isLogin,isLoginClient } from './Login/login';


export class Entree extends Component {
    render(){
        return (
            <div class="main">
                    <Router>
                    <Navbar isLoginAdmin={isLoginAdmin} isLogin={isLogin} isLoginClient={isLoginClient}/>

                    <div class="space">

                    </div>
                    <Switch>
                                <Route  exact path="/fraud/home">
                                <Accueil/>
                                </Route>
                              
                                <Route  path="/fraud/Plaintes">
                                
                                <Plaintes/>
                                </Route>
                                <Route  path="/fraud/Entités">
                                <Entités/>
                                
                                </Route>
                                <Route  path="/fraud/Users">
                                <Users/>
                                
                                </Route>
                                
                                <Route  path="/fraud/CategoriePlainte">
                                <CategoriePlainte/>
                                
                                </Route>
                    </Switch>
                    <div class="space">
                    
                    </div>
                    <Footer/>
                   </Router>
                    
                    

            </div>
        );
    }
}

export default Entree