import React, { Component } from 'react';
import UsersSideBar from './UsersSideBar'
import axios from 'axios';

export var Organigramme = [
  { value: '1', label: 'Direction' },
  { value: '2', label: 'Sous-Direction' },
  { value: '3', label: 'Cellule' },
  { value: '4', label: 'Service' },
  { value: '5', label: 'Equipe' },
  { value: '6', label: 'Collaborateurs' },
  { value: '7', label: 'Stagiaires' },
]
class Users extends Component {
    render(){
        return (
        <UsersSideBar/>
        );
    }
}

export default Users

