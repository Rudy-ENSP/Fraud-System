import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import './Navbarcss/bootstrap.min.css';

import './Navbarcss/navbar.css'
import axios from 'axios';
import { isLoginAdmin,isLogin,isLoginClient } from '../Login/login';

class Navbar extends Component {


    constructor(props){
        super(props)
        this.state={
            isLogin:false,
            isLoginAdmin:false,
            isLoginClient:false,
        }
    }
    componentDidMount(){
        if (this.props.isLogin!=this.state.isLogin || this.props.isLoginAdmin!=this.state.isLoginAdmin 
            || this.props.isLoginClient!=this.state.isLoginClient) {
          this.setState({
            isLogin:this.props.isLogin,
            isLoginAdmin:this.props.isLoginAdmin,
            isLoginClient:this.props.isLoginClient,
          });
        }
   }
    
    deconnexion=()=>{
        this.setState({
            isLogin:false,
            isLoginAdmin:false,
            isLoginClient:false,
        })


        axios.get('http://localhost:8000/plaintes/logout/')
        .then(res => {
         alert(res.data)
        })
        .catch(function (error) {
          console.log(error);
        });

        window.location.reload(false);
    }
       
    

     refreshNavBar=()=> {
         this.setState({
            isLogin:isLogin,
            isLoginAdmin:isLoginAdmin,
            isLoginClient:isLoginClient,
          });
      }
    IsLogin=()=>{
        if(this.state.isLogin){

            if(this.state.isLoginAdmin){
                return(
                    <>
                        <li className="li_nav" activeClassName="main-nav">
                            <NavLink to="/Tickets">Tickets</NavLink>
                        </li>
                        <li className="li_nav" activeClassName="main-nav">
                            <NavLink to="/Staff">Administration</NavLink>
                        </li>
                        <li className="li_nav" activeClassName="main-nav">
                            <NavLink to="/Services">Services</NavLink>
                        </li>
                        <button onClick={this.deconnexion} style={{border:'none'}} >
                             <a className="navbar-brand" style={{fontSize:12,
                                color:'black',fontWeight:'bold',marginLeft:10}}>Deconnexion</a>
                        </button>
                    </>
                )
            }
            if(this.state.isLoginClient){
                return(
                    <>
                        <li className="li_nav" activeClassName="main-nav">
                            <NavLink to="/Tickets">Tickets</NavLink>
                        </li>
                        <button onClick={this.deconnexion} style={{border:'none'}} >
                             <a className="navbar-brand" style={{fontSize:12,
                                color:'black',fontWeight:'bold',marginLeft:10}}>Deconnexion</a>
                        </button>
                    </>
                )
            }
        }
        else{
            return(
                <li className="li_nav" activeClassName="main-nav">
                    <NavLink exact to="/">Accueil</NavLink>
                </li>
            )
        }
    }
    render(){
        return (
            <body>

            <header>
              
              <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                <a class="nav-link" href="https://getbootstrap.com/docs/4.0/examples/sticky-footer-navbar/#"><span id="fraud">Fraud Stats</span></a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarCollapse">
                  <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                      <a class="nav-link" href="https://getbootstrap.com/docs/4.0/examples/sticky-footer-navbar/#">Acceuil </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" href="https://getbootstrap.com/docs/4.0/examples/sticky-footer-navbar/#">Plaintes</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link disabled" href="https://getbootstrap.com/docs/4.0/examples/sticky-footer-navbar/#">Assignation</a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link disabled" href="https://getbootstrap.com/docs/4.0/examples/sticky-footer-navbar/#">Entités</a>
                    </li>
                  </ul>
                  <form class="form-inline mt-2 mt-md-0">
                    
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={this.deconnexion}>Deconnection</button>
                  </form>
                </div>
              </nav>
              
            </header>
        
        </body>
        );
    }
}

export default Navbar