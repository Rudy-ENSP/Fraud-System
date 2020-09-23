import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link  } from 'react-router-dom';
import axios from 'axios';
import {Redirect} from "react-router-dom";
import {Login} from './Login/login';
import {SignUp} from './SignUp/signup';
import 'bootstrap/dist/css/bootstrap.css';

export default class Auth extends Component {
    render() {
        return (<Router>
            <div className="App">
             
              <div className="auth-wrapper">
                <div className="auth-inner">
                  <Switch>
                    <Route exact path='/' component={Login} />
                    <Route path="/sign-in" component={Login} />
                    <Route path="/sign-up" component={SignUp} />
                  </Switch>
                </div>
              </div>
            </div></Router>
          );
    }
}