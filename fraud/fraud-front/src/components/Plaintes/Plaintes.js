import React, { Component } from 'react';
import PlainteSideBar from './PlainteSideBar';
import axios from 'axios';
import { username ,password, isLoginAdmin} from '../Login/login';

export class Plaintes extends Component {

      
    render(){
        return (
            <div id="main" >
               <PlainteSideBar/>
            </div>
        
        );
    }
}

export default Plaintes