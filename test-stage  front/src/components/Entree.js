import React, { Component } from 'react';
import Navbar from './Navbar/Navbar'
import Footer from './Footer/footer'
import { BrowserRouter as Router, Route, Switch,NavLink} from 'react-router-dom';
import Accueil from './Accueil';
import Entités from './Entités/Entités'
import Plaintes from './Plaintes/Plaintes'
import CategoriePlainte from './CategoriePlainte/CategoriePlainte'
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
                    <Route  exact path="/Acceuil">
                                <Accueil/>
                                </Route>
                              
                                <Route  path="/Plaintes">
                                
                                <Plaintes/>
                                </Route>
                                <Route  path="/Entités">
                                <Entités/>
                                
                                </Route>
                                
                                <Route  path="/CategoriePlainte">
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