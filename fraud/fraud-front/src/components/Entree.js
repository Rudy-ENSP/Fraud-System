import React, { Component } from 'react';
import Navbar from './Navbar/Navbar'
import Footer from './Footer/footer'

import {Accueil} from './Accueil';
import '../styles.css';
import { isLoginAdmin,isLogin,isLoginClient } from './Login/login';

export class Entree extends Component {
    render(){
        return (
            <div class="main">
                    <Navbar isLoginAdmin={isLoginAdmin} isLogin={isLogin} isLoginClient={isLoginClient}/>

                        <div class="space">
                        
                        </div>

                    <Accueil/>
                    
                    <div class="space">
                    
                    </div>
                    <Footer/>

            </div>
        );
    }
}

export default Entree