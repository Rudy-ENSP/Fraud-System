import React, { Component } from 'react';
import { NavLink ,Link,useHistory } from 'react-router-dom';
import { RiLogoutBoxRFill } from 'react-icons/ri';
import { FaUserCircle } from 'react-icons/fa';
import { RiLogoutCircleRFill } from 'react-icons/ri';
import 'bootstrap/dist/css/bootstrap.css';
import {Modal as BModal,Button} from 'react-bootstrap'

import '../../styles.css';
import axios from 'axios';
import { isLoginAdmin,isLogin,isLoginClient,username ,password } from '../Login/login';


export var isPlaintes=false;
export var isEntité=false;
export var isAcceuil=true;
var user='';



class Navbar extends Component {


    constructor(props){
        super(props)
        this.state={
            isLogin:false,
            isLoginAdmin:false,
            isLoginClient:false,
            isEntité:false,
            isPlaintes:false,
            isAcceuil:true,
            profilemodalVisible:false,
            Profile:[]
        }
    }
    componentDidMount(){
        //mettre la premiere lettre en majuscule

        user=username.charAt(0).toUpperCase()+username.slice(1)
        var i=1
        


        if (this.props.isLogin!=this.state.isLogin || this.props.isLoginAdmin!=this.state.isLoginAdmin 
            || this.props.isLoginClient!=this.state.isLoginClient) {
          this.setState({
            isLogin:this.props.isLogin,
            isLoginAdmin:this.props.isLoginAdmin,
            isLoginClient:this.props.isLoginClient,
          });
        }

        let data={
            'user':username,
            'password':password
        };
        axios.post('http://localhost:8000/plaintes/UserProfile/',data)
        .then(res => {
          const UsersProfile = res.data;
          this.setState({Profile: UsersProfile });
          console.log('Profile', UsersProfile)
        })
        .catch(function (error) {
          console.log(error);
        });
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
       
    onclickPlaintes=()=>{
      isPlaintes=true
  }

    onclickAcceuil=()=>{
      isAcceuil=true

    }
    onclickEntité=()=>{
      isEntité=true
      
    }

     refreshNavBar=()=> {
         this.setState({
            isLogin:isLogin,
            isLoginAdmin:isLoginAdmin,
            isLoginClient:isLoginClient,
          });
      }
    /*IsLogin=()=>{
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
                        <RiLogoutBoxRFill/>
                        <button onClick={(this.deconnexion)} style={{border:'none'}} >
                        
                             <a  style={{fontSize:12,
                                color:'black',fontWeight:'bold',marginLeft:10}}> Deconnexion</a>
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
    }*/
    render(){
        const MyProfile = this.state.Profile
        var nom=this.state.Profile.nom
        var prenom=this.state.Profile.prenom
        var email=this.state.Profile.email

        
        const content = MyProfile.map((Profile) =>
        { 
         nom=Profile.nom
         prenom=Profile.prenom
         email=Profile.email}
        );
        if (isLoginAdmin){
            return (
                  <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark ">
                    <a class="nav-link" href=""><span id="fraud">Fraud Stats</span></a>
                    <button onClick={ ()=>{
                      const password = document.querySelector('#navbarCollapse');
                      const classe = password.getAttribute('class') === 'navbar-collapse collapse show' ? 'navbar-collapse collapse' : 'navbar-collapse collapse show';
                      password.setAttribute('class', classe);
                    }
                      

                    }     class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="true" aria-label="Toggle navigation">
                      <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="navbar-collapse collapse" id="navbarCollapse">
                      <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                        <NavLink exact to="/fraud/home"><a class="nav-link"  href="/fraud/home" onClick={this.onclickAcceuil}>Acceuil </a></NavLink>
                          
                        </li>
                        <li class="nav-item">
                        <NavLink to="/fraud/Plaintes"><a class="nav-link" href="" onClick={this.onclickPlaintes} >Plaintes</a></NavLink>
                          
                        </li>
                      
                        <li class="nav-item">
                        <NavLink to="/fraud/Entités/All Entités"><a class="nav-link" onClick={this.onclickEntité} href="" >Entités</a></NavLink>
                          
                        </li>
                        <li class="nav-item">
                        <NavLink to="/fraud/CategoriePlainte/All CategoriePlainte"><a class="nav-link" onClick={this.onclickEntité} href="" >Categories de Plainte</a></NavLink>
                        
                        </li>
                        <li class="nav-item">
                        <NavLink to="/fraud/Users/All Users"><a class="nav-link" onClick={this.onclickEntité} href="" >Utilisateurs</a></NavLink>
                        
                        </li>
                      </ul>
                      <span style={{color:'white',fontWeight:'bold'}}>{user}</span>
                      <div className="ecartnav"></div>
                      <button style={{color:'white'}}      onClick={() => this.setState({profilemodalVisible:true})}><h1><FaUserCircle /></h1></button>
                    </div>
                    <BModal
                            id="profilemodal"
                            size="sm"
                            style={{marginLeft:'420px',marginTop:'-5px'}}
                            show={this.state.profilemodalVisible}
                            onHide={() => this.setState({profilemodalVisible:false})}
                            aria-labelledby="contained-modal-title-vcenter">          
                            
                            
                                <BModal.Header closeButton>
                                    <BModal.Title id="example-modal-sizes-title-sm">
                                    <h4 class="modal-title">Profile </h4>
                                    </BModal.Title>
                                </BModal.Header>
                                <BModal.Body>
                                    
                                    <p class="text-warning">Nom d'Utilisateur : {username} </p>
                                    <p class="text-warning">Nom : {nom} </p>
                                    <p class="text-warning">Prenom : {prenom} </p>
                                    <p class="text-warning">Email : {email} </p>
                                </BModal.Body>
                                <BModal.Footer>
                                <button style={{color:'blue',alignContent:'center'}}      onClick={this.deconnexion}><h1><RiLogoutCircleRFill /></h1></button>
                                </BModal.Footer>
                         
            </BModal>
                  </nav>
                  
               
            );
        }
        if (isLoginClient){
            return (
                <body>
    
                <header>
                  
                  <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                    <a class="nav-link" href=""><span id="fraud">Fraud Stats</span></a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                      <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarCollapse">
                      <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                        <NavLink exact to="/fraud/home"><a class="nav-link"  href="" onClick={this.onclickAcceuil}>Acceuil </a></NavLink>
                          
                        </li>
                        <li class="nav-item">
                        <NavLink to="/fraud/Plaintes"><a class="nav-link" href="" onClick={this.onclickPlaintes} >Plaintes</a></NavLink>
                          
                        </li>
                      
                        <li class="nav-item">
                        <NavLink to="/fraud/Entités"><a class="nav-link" onClick={this.onclickEntité} href="" >Entités</a></NavLink>
                          
                        </li>
                        <li class="nav-item">
                        <NavLink to="/fraud/CategoriePlainte"><a class="nav-link" onClick={this.onclickEntité} href="" >Categories de Plainte</a></NavLink>
                        
                        </li>
                      </ul>
                      <span style={{color:'white',fontWeight:'bold'}}>{user}</span>
                      <div className="ecartnav"></div>
                      <button style={{color:'white'}}      onClick={() => this.setState({profilemodalVisible:true})}><h1><FaUserCircle /></h1></button>
                    </div>
                    <BModal
                            id="profilemodal"
                            size="sm"
                            style={{marginLeft:'420px',marginTop:'-5px'}}
                            show={this.state.profilemodalVisible}
                            onHide={() => this.setState({profilemodalVisible:false})}
                            aria-labelledby="contained-modal-title-vcenter">          
                            
                            
                                <BModal.Header closeButton>
                                    <BModal.Title id="example-modal-sizes-title-sm">
                                    <h4 class="modal-title">Profile </h4>
                                    </BModal.Title>
                                </BModal.Header>
                                <BModal.Body>
                                    
                                    <p class="text-warning">Nom d'Utilisateur : {username} </p>
                                    <p class="text-warning">Nom : {nom} </p>
                                    <p class="text-warning">Prenom : {prenom} </p>
                                    <p class="text-warning">Email : {email} </p>
                                </BModal.Body>
                                <BModal.Footer>
                                <button style={{color:'blue',alignContent:'center'}}      onClick={this.deconnexion}><h1><RiLogoutCircleRFill /></h1></button>
                                </BModal.Footer>
                         
            </BModal>
                  </nav>
                  
                </header>
            
            </body>
            );
        }
        
    }
}

export default Navbar