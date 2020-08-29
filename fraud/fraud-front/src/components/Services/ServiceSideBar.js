import React, {Component} from 'react';
import { HashRouter as Router, Route,NavLink} from 'react-router-dom';
import '../../styles.css';
import NewServices from './NewServices'
import AllServices from './AllServices'

class ServiceSideBar extends Component {
    render(){
        return(
            <div className='side_container'>
                <Router>
                <div class="sidenav">
                <h4>Gestion des services</h4>
                    <div style={{
                        height:3,
                        backgroundColor:'white',
                        marginBottom:45,
                        marginTop:30,
                        }}>
                    </div>
                    <span activeClassName="main-nav">
                    <NavLink exact to="/">Tous les services</NavLink>
                    </span>
                    <div style={{
                        height:1,
                        backgroundColor:'white',
                        marginBottom:5,
                        marginTop:5,
                        }}></div>
                </div>
                <Route>
                    <Route exact path="/" component={AllServices}/>
                    <Route path="/Nouveaux Services" component={NewServices}/>
                </Route>
                </Router>
            </div>
        );
    }
}

export default ServiceSideBar 