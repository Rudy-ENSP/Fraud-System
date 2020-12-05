import React from 'react';
import { render } from 'react-dom';
import './index.css';

import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

import {Accueil} from './components/Accueil';

import {Entree} from './components/Entree';

import Login from './components/Login/login'

import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/footer'
import ProtectedRoute from'./components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import ClientRoute from './components/ClientRoute';
import Entités from './components/Entités/Entités';
import Plaintes from './components/Plaintes/Plaintes';
import CategoriePlainte from './components/CategoriePlainte/CategoriePlainte';


render(
  
  

  <div id="root" >
    
    <Router>
        <Login/>
        <ProtectedRoute path="/fraud" component={Entree}/>
        
    </Router>
    
  </div>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
