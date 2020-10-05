import React, { Component } from 'react';
import Navbar from './Navbar/Navbar'
import Footer from './Footer/footer'
import { BrowserRouter as Router, Route, Switch,NavLink} from 'react-router-dom';
import Accueil from './Accueil';
import Entités from './Entités/Entités'
import Plaintes from './Plaintes/Plaintes'
import CategoriePlainte from './CategoriePlainte/CategoriePlainte'
import {Login} from './Login/login';
import {Signup} from './signup/signup.js';
import '../styles.css';
import { isLoginAdmin,isLogin,isLoginClient } from './Login/login';


export class Auth extends Component {
    render(){
        return (
            <div class="main">
                    <Router>
                   
                    <Switch>
                    <Route  exact path="/">
                                <Login/>
                                </Route>
                              
                                
                                
                                <Route  path="/sign-up">
                                <Signup/>
                                
                                </Route>
                    </Switch>
                   
                   </Router>
                    
                    

            </div>
        );
    }
}

export default Auth