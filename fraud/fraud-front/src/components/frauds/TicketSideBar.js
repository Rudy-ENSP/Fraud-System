import React, {Component} from 'react';
import { HashRouter as Router, Route, /*Switch,*/NavLink} from 'react-router-dom';
import '../../styles.css';
import AllTickets from './AllTickets'
import NewTickets from './NewTickets'
import NoResolvedTickets from './NoResolvedTickets'
import ResolvedTickets from './ResolvedTickets'

class TicketSideBar extends Component {
    render(){
        return(
            <div className='side_container'>
                <Router>
                <div class="sidenav">
                <h4>Gestion des Tickets</h4>
                    <div style={{
                        height:3,
                        backgroundColor:'white',
                        marginBottom:45,
                        marginTop:30,
                        }}>
                    </div>
                    <NavLink exact to="/">Tous mes tickets</NavLink>
                    <div style={{
                        height:1,
                        backgroundColor:'white',
                        marginBottom:5,
                        marginTop:5,
                        }}></div>
                         <span activeClassName="main-nav">
                    <NavLink to="/Nouveaux tickets">Nouveaux tickets</NavLink>
                    </span>
                    <div style={{
                        height:1,
                        backgroundColor:'white',
                        marginBottom:5,
                        marginTop:5,
                        }}></div>
                         <span activeClassName="main-nav">
                     <NavLink to="/tickets résolus">tickets résolus</NavLink>
                     </span>
                    <div style={{
                        height:1,
                        backgroundColor:'white',
                        marginBottom:5,
                        marginTop:5,
                        }}></div>
                    
                </div>
                <Route>
                    <Route exact path="/" component={AllTickets}/>
                    <Route path="/Nouveaux tickets" component={NewTickets}/>
                    <Route path="/tickets résolus" component={ResolvedTickets}/>
                    <Route path="/tickets non résolus" component={NoResolvedTickets}/>
                </Route>
                </Router>
            </div>
        );
    }
}

export default TicketSideBar 