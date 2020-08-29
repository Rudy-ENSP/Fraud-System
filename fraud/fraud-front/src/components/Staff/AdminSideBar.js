import React, {Component} from 'react';
import { HashRouter as Router, Route,NavLink} from 'react-router-dom';
import '../../styles.css';
import GestionAdmin from './GestionAdmin'
import ResolveTickets from './ResolveTickets'

class AdminSideBar extends Component {
    render(){
        return(
            <div className='side_container'>
                <Router>
                <div class="sidenav">
                <h4>Administrateurs</h4>
                    <div style={{
                        height:3,
                        backgroundColor:'white',
                        marginBottom:45,
                        marginTop:30,
                        }}>
                    </div>
                    <span activeClassName="main-nav">
                    <NavLink exact to="/">gestion des Administrateurs</NavLink>
                    </span>
                    <div style={{
                        height:1,
                        backgroundColor:'white',
                        marginBottom:5,
                        marginTop:5,
                        }}></div>
                    <span activeClassName="main-nav">
                    <NavLink to="/Résoudre un ticket">Résoudre un ticket</NavLink>
                    </span>
                    <div style={{
                        height:1,
                        backgroundColor:'white',
                        marginBottom:5,
                        marginTop:5,
                        }}></div>
                    
                </div>
                <Route>
                    <Route exact path="/" component={GestionAdmin}/>
                    <Route path="/Résoudre un ticket" component={ResolveTickets}/>
                </Route>
                </Router>
            </div>
        );
    }
}

export default AdminSideBar 