import React from 'react';
import { render } from 'react-dom';
import './index.css';

import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import Plaintes from './components/Plaintes/Plaintes';
import {Accueil} from './components/Accueil';
import {Body} from './components/Body';
import {Entree} from './components/Entree';
import Notifications from './components/Notifications/Notifications'
import Login from './components/Login/login'
import Auth from './components/Auth'
import Staff from './components/Staff/Staff'
import Entité from './components/Entités/Entités'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/footer'
import ProtectedRoute from'./components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import ClientRoute from './components/ClientRoute';
import Entités from './components/Entités/Entités';




render(
  
  

  <div>
    
    <Router>
        <Login/>
        <PublicRoute exact path="/" component={Login}/>
        <ProtectedRoute  path="/Acceuil" component={Entree}/>
        <ProtectedRoute path="/Plaintes" component={Plaintes}/>
        <ProtectedRoute path="/Entités" component={Entités}/>
        
    </Router>
    
  </div>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
