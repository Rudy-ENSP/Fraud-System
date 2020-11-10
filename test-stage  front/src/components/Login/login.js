import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import {  Link  } from 'react-router-dom';
import {Entree} from '../Entree';
import {Redirect} from "react-router-dom";
import {useHistory} from "react-router-dom";
import './Login_v2/css/main.css'
import './Login_v2/css/util.css'
import './Login_v2/vendor/bootstrap/css/bootstrap.min.css'
import './Login_v2/fonts/font-awesome-4.7.0/css/font-awesome.min.css'
import './Login_v2/fonts/iconic/css/material-design-iconic-font.min.css'
import './Login_v2/vendor/animate/animate.css'
import './Login_v2/vendor/css-hamburgers/hamburgers.min.css'
import './Login_v2/vendor/animsition/css/animsition.min.css'
import './Login_v2/vendor/select2/select2.min.css'
import './Login_v2/vendor/daterangepicker/daterangepicker.css'
import $ from 'jquery'
import { FcCheckmark } from 'react-icons/fc';
import Alert from 'react-bootstrap/Alert'
import {serveur} from '../../serveur'

import 'jquery-validation'


import {Modal as BModal,Button} from 'react-bootstrap'
import { RiLoginCircleFill } from 'react-icons/ri';
import Select from 'react-select';
export var isLogin;
export var isLoginAdmin;
export var isLoginClient;
export var username;
export var password;
var inputform;
var submitform;
var nombre_login_fail=0
var username_list=[];
var matricule_list=[];



export  class Login extends Component {
	 
	constructor(){
        super()
        this.state={
            loginalertvisible:false,
            signupalertvisible:false,
            isLoginClient:false,
            isLoginAdmin:false,
            forgetpasswordmodalVisible:false,
            mailforpasswordmodalVisible:false,
            isLogin:false,
            isAdmin:false,
            username:'',
            password:'',
			redirect:'false',
			signupmodalVisible:false,
			entités:[],
			Nom:'',
			Prenom:'',
			Entité:'',
			Email:'',
			Username:'',
			Password:'',
            ConfPassword:'',
            Users:[],
            Matricule:'',
            username_list:[],
            matricule_list:[],
            UsernameFP:'',
            EmailV:'',
            CodeBackend:'',
            Code:''
            
            
        }
	}
	
    componentDidMount() {
	    axios.get(serveur+'listeUsers/')
          .then(res => {
            const Users = res.data;
            this.setState({Users: Users  });
            console.log('Users', Users)
          })
          .catch(function (error) {
            console.log(error);
          });
	
        axios.get(serveur+'listeEntite/')
          .then(res => {
            const entités = res.data;
            this.setState({entités: entités,Entité:res.data[0].id  });
            console.log('entités', entités)
          })
          .catch(function (error) {
            console.log(error);
          });

(function ($) {
    "use strict";


    /*==================================================================
    [ Focus input ]*/
    $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })    
    })
    
    function validatePassword() {
        var validator = $("#validate").validate({
            rules: {
                Password: "required",
                ConfPassword: {
                    equalTo: "#Password"
                }
            },
            messages: {
                password: " Enter Password",
                confirmpassword: " Enter Confirm Password Same as Password"
            }
        });
        if (validator.form()) {
            alert('Sucess');
        }
    }
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }
   

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
    /*==================================================================
    [ Show pass ]*/
    
    var showPass = 0;
    $('.btn-show-pass').on('click', function(){
        if(showPass == 0) {
            $(this).next('input').attr('type','text');
            $(this).find('i').removeClass('zmdi-eye');
            $(this).find('i').addClass('zmdi-eye-off');
            showPass = 1;
        }
        else {
            $(this).next('input').attr('type','password');
            $(this).find('i').addClass('zmdi-eye');
            $(this).find('i').removeClass('zmdi-eye-off');
            showPass = 0;
        }
        
    });


})($);
      

		
      }
	
	   
	  onChangeNom = (event) => {
        this.setState({Nom: event.target.value});
        console.log('Nom ',event.target.value)
	  }
	  onChangePrenom = (event) => {
        this.setState({Prenom: event.target.value});
        console.log('Prenom ',event.target.value)
	  }
	  onChangeUsername = (event) => {
        this.setState({Username: event.target.value});
        console.log('Username ',event.target.value)
        var flag=(username_list).includes(event.target.value)
        //console.log(username_list)
         if(flag){
            $("#userE").html("Nom d'utilsateur deja utilsé").css("color","red");
            const input = document.querySelector('#input');
            input.setAttribute('type','button'); 
            inputform=0;
         }
         else{
            $("#userE").html("").css("color","red"); 
            const input = document.querySelector('#input');
            input.setAttribute('type','submit'); 
            inputform=1;
         }
       
        
      }
      
      onChangeMatricule= (event) => {
        this.setState({Matricule: event.target.value});
        console.log('Matricule',event.target.value)
        var flag=(matricule_list).includes(event.target.value)
        //console.log(username_list)
         if(flag){
            $("#matriculeE").html("Matricule déja attribué").css("color","red");
            const input = document.querySelector('#input');
            input.setAttribute('type','button'); 
            inputform=0;
         }
         else{
            $("#matriculeE").html("").css("color","red"); 
            const input = document.querySelector('#input');
            input.setAttribute('type','submit'); 
            inputform=1;
         }
       
        
      }


	  onChangeEmail = (event) => {
        this.setState({Email: event.target.value});
        console.log('Email ',event.target.value)
	  }
	  onChangePassword = (event) => {
        const Password = event.target.value
        const confPassword = this.state.ConfPassword
        if(Password === '') {
            //$("#passb").html("Password ne peut etre vide!").css("color","red");
        } else{
            $("#passb").html("").css("color","red");
        }
        if (Password !=confPassword) {
            $("#msg").html("Les Mots de passe doivent etre Identique !!").css("color","red");
            const input = document.querySelector('#input');
            input.setAttribute('type','button'); 
            inputform=0;

           
            
        }else{
            $("#msg").html("Les Mots de passe Correspondent!! ").css("color","green");
            const input = document.querySelector('#input');
            input.setAttribute('type','submit'); 
            inputform=1;
            
            
       }
        this.setState({Password: event.target.value});
        console.log('Password ',event.target.value)
      }
      onChangeEmailVerification = (event) => {
        this.setState({EmailV: event.target.value});
        console.log('Email ',event.target.value)
      }
      onChangeCodeVerification=(event) => {
        this.setState({Code: event.target.value});
        if (this.state.CodeBackend!=event.target.value){
            submitform=0
        }
        else{
            submitform=1
        }
        console.log('Code ',event.target.value)
      }
      
      
      onSendEmailVerification= (event) => {
       
        event.preventDefault();
        let EmailV={
            
            'Email': this.state.EmailV.toLocaleLowerCase(),
           
            
        };

        axios.post(serveur+'verifyEmail/',EmailV)
          .then(res => {
            const flag = res.data['state'];
            this.setState({CodeBackend:res.data['Code']})

            if (flag=='false') {
                $("#verifyemail").html("Votre Email n'est pas enregistré Veuillez verifier la saisie").css("color","red");
                
    
               
                
            }else{
                $("#verifyemail").html("Votre Email est bien lié à un compte; Continuer la procédure jusqu'à la fin pour reinitialiser le mot de passe ").css("color","green");
                   
           }
          })
          .catch(function (error) {
            console.log(error);
          });
       
       
        
      }

      inputmodif = (event) =>{
        
        if(inputform===0){
            this.setState({signupalertvisible:true})
            const input = document.querySelector('#input');
            input.setAttribute('type','button'); 
            
        }
        else{
            const input = document.querySelector('#input');
            
            input.setAttribute('type','submit');
            inputform=1;
        }
      }

      submitmodif= (event) =>{
        
        if(submitform===0){
            this.setState({signupalertvisible:true})
            const input = document.querySelector('#submitway');
            input.setAttribute('type','button'); 
            
        }
        else{
            const input = document.querySelector('#submitway');
            
            input.setAttribute('type','submit');
            submitform=1;
        }
      }

	  onChangeConfPassword = (event) => {
        const Password = this.state.Password
        const confPassword = event.target.value

        const input = document.querySelector('#input');

        
            // toggle the type attribute
            
        
                 if (Password !=confPassword) {
                     $("#msg").html("Les Mots de passe doivent etre Identique !!").css("color","red");
                     const input = document.querySelector('#input');
                     input.setAttribute('type','button'); 
                     inputform=0;
                    
                     
                 }else{
                     $("#msg").html("Les Mots de passe Correspondent!! ").css("color","green");
                     const input = document.querySelector('#input');
                     input.setAttribute('type','submit'); 
                     inputform=1;
                     
                }
                if(Password === '') {
                    $("#passb").html("Password ne peut etre vide!").css("color","red");
                } 
                
                
          
        this.setState({ConfPassword: event.target.value});
        console.log('ConfPassword ',event.target.value)
      }
      
     
      
      onChangeEntité = (event) => {
        this.setState({Entité: event.value});
        console.log('Entité',event.value)
      }

      showPass = (event) => {
        const togglePassword = document.querySelector('#togglePassword');
        const password = document.querySelector('#Password');
       

        
            // toggle the type attribute
            const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
            const classe = togglePassword.getAttribute('class') === 'zmdi zmdi-eye' ? 'zmdi zmdi-eye-off' : 'zmdi zmdi-eye';
            password.setAttribute('type', type);
            togglePassword.setAttribute('class', classe);
            // toggle the eye slash icon
            
            
            
      
      }
      showPass1 = (event) => {
        const togglePassword1 = document.querySelector('#togglePassword1');
        const password = document.querySelector('#ConfPassword');

        
            // toggle the type attribute
            const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
            const classe = togglePassword1.getAttribute('class') === 'zmdi zmdi-eye' ? 'zmdi zmdi-eye-off' : 'zmdi zmdi-eye';
            password.setAttribute('type', type);
            togglePassword1.setAttribute('class', classe);
            // toggle the eye slash icon
            
            
            
      
      }

	isLoginTest=()=>{
        console.log('isLoginAdmin ',isLoginAdmin , ' isLogin ', isLogin)
        isLogin=true
        isLoginClient=true
        console.log('isLoginAdmin ',isLoginAdmin , ' isLogin ', isLogin)
    }

    onChangeusername = (event) => {
        this.setState({username: event.target.value});
        console.log('username ',event.target.value)
      }
    onChangepassword = (event) => {
        event.preventDefault();
        this.setState({password: event.target.value});
        console.log('password ',event.target.value)
      }
      
    onUpdatePassword=(event)=>{


        event.preventDefault();
        let Code={
            
            'Code': this.state.Code,
           
            
        };

        axios.post(serveur+'verifyCode/',Code)
          .then(res => {
            const flag = res.data['state'];

            if (flag=='false') {
                $("#verifycode").html("Code Erroné veuillez verifier").css("color","red");
                submitform=0
                
    
               
                
            }else{
                $("#verifycode").html("Code Correct").css("color","green");
                   submitform=1
           }
          })
          .catch(function (error) {
            console.log(error);
          });
       
       





        event.preventDefault();
          let newUser={
			  
            'Email': this.state.EmailV.toLocaleLowerCase(),
              'Password': this.state.Password,
             
              
              
          };
          axios.post(serveur+'UpdatePassword/', newUser)
          .then(res => {
            console.log(res);
            console.log(res.data);
            if(res.data['state']==='success'){
              alert( "Utilisateur " +newUser.Username.toLocaleUpperCase() +" modifié avec succèss" );
              this.setState ({
              
              'Username':'',
              'Password': '',
              
              });
			}
			else if(res.data['state']==='User exist'){
				alert('Nom Utilisateur existant veuillez choisir un autre nom')
			}
            else{
                alert('Echec de lors de la Création de Utilisateur;Veuillez modifier votre nom Utilisateur!')
            }
          })
          .catch(err => console.log(err));

          //
         
      }
    
	  
	onSaveUser=(event)=>{
        event.preventDefault();
          let newUser={
			  'Nom' : this.state.Nom,
			  'Prenom' : this.state.Prenom,
              'Username': this.state.Username,
              'Password': this.state.Password,
              'Email':this.state.Email,
              'Entité':this.state.Entité,
              'password':password,
              'Matricule':this.state.Matricule
              
          };
          axios.post(serveur+'CreateUser/', newUser)
          .then(res => {
            console.log(res);
            console.log(res.data);
            if(res.data['state']==='success'){
              alert( "Utilisateur " +newUser.Nom.toLocaleUpperCase() +" crée avec succèss" );
              this.setState ({
              'Nom' : '',
			  'Prenom' : '',
              'Username':'',
              'Password': '',
              'Email':'',
              'Entité':'',
              'password':'',
              'Matricule':''
              });
			}
			else if(res.data['state']==='User exist'){
				alert('Nom Utilisateur existant veuillez choisir un autre nom')
			}
            else{
                alert('Echec de lors de la Création de Utilisateur;Veuillez modifier votre nom Utilisateur!')
            }
          })
          .catch(err => console.log(err));

          //
         
      }
    
	  LoginUser=(event)=>{
       
        event.preventDefault();
        let AuthInfos={
            'username' : this.state.username,
            'password': this.state.password,
        };
		if (AuthInfos.username=='' || AuthInfos.password=='') { 
            this.setState ({
                loginalertvisible:true
                });

        }
        
		   if(AuthInfos.username!='' && AuthInfos.password!=''){
            this.setState ({
                loginalertvisible:false
                });
			axios.post(serveur+'login/', AuthInfos)
			.then(res => {
			  console.log(res);
			  console.log(res.data);
			  if(res.data['state']==='success'){
						username=res.data['username']
						password=this.state.password
						isLogin=true
					if(this.state.username!='admin'){
						isLoginClient=true
                    }
                    if(this.state.username=='admin'){
						isLoginAdmin=true
                    }  
                    
                this.setState({redirect:true})
                //this.history.push("/Entree")
					
				}
				else{
                    alert('Échec de connexion : '+res.data['motif'])
                    if (res.data['motif']=="Mot de passe Erroné"){
                        nombre_login_fail++
                        console.log(nombre_login_fail)
                        if(nombre_login_fail>=2){
                            document.getElementById('forgotpass').style.color = 'red'
                        }
                       
                    }
				}
			  
			})
			.catch(err => console.log(err));
		   }
        
    }

    render(){
        const users = this.state.Users
       // const history=useHistory();
          const temp4 = users.map((option) =>
          {
            username_list.push( option.username);
            matricule_list.push(option.matricule)
          }
         

         
        );
        

		const entité = this.state.entités
        const entité_select=[]
          const temp1 = entité.map((option) =>
          entité_select.push({ value: option.id, label: option.name })
        
           
          );
		if(this.state.redirect==true){
             return <Redirect to="/fraud/home"/>
        }
        return (
<div class="main">
	<div class="limiter" >
		<div class="container-login100">
			<div class="wrap-login100">
				<form onSubmit={this.LoginUser}    class="login100-form validate-form" >
					<span class="login100-form-title p-b-26">
						Connexion
					</span>
					<span class="login100-form-title p-b-48">
						
					<h1 style={{color:'#007bff'}}><RiLoginCircleFill/></h1>
					</span>

					<div class="wrap-input100 validate-input" data-validate = "Valid email is: a@b.c">
                        
                        <input class="input100" type="text" name="username" onChange={this.onChangeusername}/>
						<span class="focus-input100" data-placeholder="Username"></span>
                        
					</div>
                    		

					<div class="wrap-input100 validate-input" data-validate="Enter password">
						<span class="btn-show-pass">
							<i class="zmdi zmdi-eye"></i>
						</span>
						<input class="input100" type="password" name="password" onChange={this.onChangepassword} />
						<span class="focus-input100" data-placeholder="Password"></span>
					</div>
                    
                    <div> 
                        <li className="nav-item" style={{marginLeft:"100px"}}>
                        <Link className="nav-link" to="/Mot de passe Oublié" onClick={() => this.setState({mailforpasswordmodalVisible:true})}><span id="forgotpass">Mot de passe Oublié?</span></Link>
                        </li>
                    </div>

					<div class="container-login100-form-btn">
						<div class="wrap-login100-form-btn">
							<div class="login100-form-bgbtn"></div>
							<button class="login100-form-btn" onClick={this.LoginUser}  >
								Login
							</button>
						</div>
					</div>

					<div class="text-center ">
						<span class="txt1">
							Vous n'avez pas de compte?
						</span>

						<li className="nav-item">
                        <Link className="nav-link" to="/sign-up" onClick={() => this.setState({signupmodalVisible:true})}>Sign up</Link>
                        </li>
					</div>
				</form>
			</div>
		</div>
        <BModal
                        id="codeverificationmodal"
                        size="xl"
                        show={this.state.codeverificationmodalVisible}
                        onHide={() => this.setState({codeverificationmodalVisible:false})}
                        aria-labelledby="example-modal-sizes-title-lg">          
                        
						<form id="validationEmail" onSubmit={this.onUpdatePassword} >
                            <BModal.Header closeButton>
                                <BModal.Title id="example-modal-sizes-title-lg">
                                <h4 class="modal-title">Modification du mot de passe </h4>
                                </BModal.Title>
						
                            </BModal.Header>
                            <BModal.Body>
                                    
									<div class="form-group">
                                    <label for='Email' style={{fontWeight:"bold"}}>Renseignez le code que vous avez recu dans votre boite</label>
                                                                    <input id="email-validation" type='text' className ="form-control" name='Titre'
                                                                    onChange={this.onChangeCodeVerification} required />
                                    </div>                          
                                    <div class="" id="verifycode"></div>		
									
                                   
                                    
									
                                    
									<input type="submit" id="submitway" onClick={this.submitmodif} style={{marginLeft:'235px'}} class="btn btn-success" value="Enregistrer"  />
                            </BModal.Body>
                            <BModal.Footer>
							    <input type="button" class="btn btn-warning" data-dismiss="modal" value="Cancel" style={{marginRight:'40px'}} onClick={()=>this.setState({codeverificationmodalVisible:false})}/>
                                <Link className="nav-link"  onClick={() => {this.setState({codeverificationmodalVisible:false})
                            this.setState({codeverificationmodalVisible:false})
                            } }>Connectez vous </Link>
                            </BModal.Footer>
							</form>
        </BModal>

        <BModal
                        id="mailforpasswordmodal"
                        size="xl"
                        show={this.state.mailforpasswordmodalVisible}
                        onHide={() => this.setState({mailforpasswordmodalVisible:false})}
                        aria-labelledby="example-modal-sizes-title-lg">          
                        
						<form id="validationEmail" onSubmit={this.onSendEmailVerification} >
                            <BModal.Header closeButton>
                                <BModal.Title id="example-modal-sizes-title-lg">
                                <h4 class="modal-title">Modification du mot de passe </h4>
                                </BModal.Title>
						
                            </BModal.Header>
                            <BModal.Body>
                                    
									<div class="form-group">
                                    <label for='Email' style={{fontWeight:"bold"}}>Renseignez l'email lié à votre compte</label>
                                                                    <input id="email-validation" type='email' className ="form-control" name='Titre'
                                                                    onChange={this.onChangeEmailVerification} required />
                                    </div>                          
                                    <div class="" id="verifyemail"></div>		
									
                                   
                                    
									
                                    
									<input type="submit" id="input" onClick={this.inputmodif} style={{marginLeft:'235px'}} class="btn btn-success" value="Valider"  />
                            </BModal.Body>
                            <BModal.Footer>
							    <input type="button" class="btn btn-warning" data-dismiss="modal" value="Cancel" style={{marginRight:'40px'}} onClick={()=>this.setState({mailforpasswordmodalVisible:false})}/>
                                <Link className="nav-link"  onClick={() => {this.setState({mailforpasswordmodalVisible:false})
                            this.setState({forgetpasswordmodalVisible:true})
                            } }>Suivant</Link>
                            </BModal.Footer>
							</form>
        </BModal>

        <BModal
                        id="forgetpasswordmodal"
                        size="xl"
                        show={this.state.forgetpasswordmodalVisible}
                        onHide={() => this.setState({forgetpasswordmodalVisible:false})}
                        aria-labelledby="example-modal-sizes-title-lg">          
                        
						
                            <BModal.Header closeButton>
                                <BModal.Title id="example-modal-sizes-title-lg">
                                <h4 class="modal-title">Modification du mot de passe </h4>
                                </BModal.Title>
						
                            </BModal.Header>
                            <BModal.Body>
									<div class="form-group">
                                    <label for='password' style={{fontWeight:"bold"}}>Mot de passe</label>
                                            <div class="" id="" style={{display:"flex"}} >
                                                    
                                                                    <input id="Password" type='password' className ="form-control" name='Titre'
                                                                    onChange={this.onChangePassword} required />
                                                               <h4><i style={{marginLeft:'-30px',cursor:'pointer',color:'#007bff'}} onClick={this.showPass} id="togglePassword" class="zmdi zmdi-eye"></i></h4> 
                                            </div>
												
												<div class="" id="passb"></div>		
									</div>
                                    <div class="form-group">
                                    <label for='confirm-password' style={{fontWeight:"bold"}}>Confirmer le mot de passe</label>
                                            <div class="" id="" style={{display:"flex"}} >
                                                    
                                            <input id="ConfPassword" type='password' className ="form-control" name='Titre'
													onChange={this.onChangeConfPassword} required />
                                                               <h4><i style={{marginLeft:'-30px',cursor:'pointer',color:'#007bff'}} onClick={this.showPass1} id="togglePassword1" class="zmdi zmdi-eye"></i></h4> 
                                            </div>
												
                                            <div class="" id="cpassb"></div>	
									</div>
                                    
									
                                    <div class="form-group" id="msg"></div>
									<input type="submit" id="input" onClick={this.inputmodif} style={{marginLeft:'235px'}} class="btn btn-success" value="Valider"  />
                            </BModal.Body>
                            <BModal.Footer>
							    <input type="button" class="btn btn-warning" data-dismiss="modal" value="Cancel" style={{marginRight:'40px'}} onClick={()=>this.setState({forgetpasswordmodalVisible:false})}/>
                                <Link className="nav-link"  onClick={() => {this.setState({forgetpasswordmodalVisible:false})
                            this.setState({codeverificationmodalVisible:true})
                            
                            }}>Continuer</Link>
                            </BModal.Footer>
							
        </BModal>

		<BModal
                        id="signupmodal"
                        size="xl"
                        show={this.state.signupmodalVisible}
                        onHide={() => this.setState({signupmodalVisible:false})}
                        aria-labelledby="example-modal-sizes-title-lg">          
                        
						<form id="validate" onSubmit={this.onSaveUser} >
                            <BModal.Header closeButton>
                                <BModal.Title id="example-modal-sizes-title-lg">
                                <h4 class="modal-title">Enregistrement  d'un utilisateur </h4>
                                </BModal.Title>
						
                            </BModal.Header>
                            <BModal.Body>
                                    <div class="form-group">
												<label for='username' style={{fontWeight:"bold"}}>Username</label>
															<input type='text' className ="form-control" name='Titre'
													onChange={this.onChangeUsername} required />
														
									</div>
                                    <div class="" id="userE"></div>
                                    <div class="form-group">
												<label for='matricule' style={{fontWeight:"bold"}}>Matricule</label>
															<input type='text' className ="form-control" name='Titre'
													onChange={this.onChangeMatricule} required />
														
									</div>
                                    <div class="" id="matriculeE"></div>
									<div class="form-group">
												<label for='nom' style={{fontWeight:"bold"}}>Nom</label>
															<input type='text' className ="form-control" name='Titre'
													onChange={this.onChangeNom} required />
														
									</div>
									<div class="form-group">
												<label for='prenom' style={{fontWeight:"bold"}}>Prénom</label>
															<input type='text' className ="form-control" name='Titre'
													onChange={this.onChangePrenom} required />
														
									</div>     
                                                
                            
							
									<div class="form-group">
												<label for='email' style={{fontWeight:"bold"}}>Email</label>
															<input type='email' className ="form-control" name='Titre'
													onChange={this.onChangeEmail} required />
														
									</div>
									
									<div class="form-group">
												<label for='Entité' style={{fontWeight:'bold'}}>Entité</label>
												<Select
													className="basic-single"
													classNamePrefix="select"
													defaultValue={entité_select[0]}
													isDisabled={false}
													isLoading={false}
													isClearable={false}
													isRtl={false}
													isSearchable={true}
													name="Entité"
													options={entité_select}
													onChange={this.onChangeEntité}
												/>
									</div>
									
									<div class="form-group">
                                    <label for='password' style={{fontWeight:"bold"}}>Mot de passe</label>
                                            <div class="" id="" style={{display:"flex"}} >
                                                    
                                                                    <input id="Password" type='password' className ="form-control" name='Titre'
                                                                    onChange={this.onChangePassword} required />
                                                               <h4><i style={{marginLeft:'-30px',cursor:'pointer',color:'#007bff'}} onClick={this.showPass} id="togglePassword" class="zmdi zmdi-eye"></i></h4> 
                                            </div>
												
												<div class="" id="passb"></div>		
									</div>
                                    <div class="form-group">
                                    <label for='confirm-password' style={{fontWeight:"bold"}}>Confirmer le mot de passe</label>
                                            <div class="" id="" style={{display:"flex"}} >
                                                    
                                            <input id="ConfPassword" type='password' className ="form-control" name='Titre'
													onChange={this.onChangeConfPassword} required />
                                                               <h4><i style={{marginLeft:'-30px',cursor:'pointer',color:'#007bff'}} onClick={this.showPass1} id="togglePassword1" class="zmdi zmdi-eye"></i></h4> 
                                            </div>
												
                                            <div class="" id="cpassb"></div>	
									</div>
                                    
									
                                    <div class="form-group" id="msg"></div>
									<input type="submit" id="input" onClick={this.inputmodif} style={{marginLeft:'235px'}} class="btn btn-success" value="Enregistrer"  />
                            </BModal.Body>
                            <BModal.Footer>
							    <input type="button" class="btn btn-warning" data-dismiss="modal" value="Cancel" style={{marginRight:'40px'}} onClick={()=>this.setState({signupmodalVisible:false})}/>
                                <span style={{fontWeight:"bold"}}> Vous avez deja un compte?</span><Link className="nav-link"  onClick={() => this.setState({signupmodalVisible:false})}>Connectez Vous Ici!</Link>
                            </BModal.Footer>
							</form>
        </BModal>
        <BModal show={this.state.loginalertvisible} variant="warning"
                        id="loginalert"
                        size="sm"
                        style={{marginLeft:'420px',marginTop:'-5px'}}
                        show={this.state.loginalertvisible}
                        onHide={() => this.setState({loginalertvisible:false})}
                        aria-labelledby="example-modal-sizes-title-sm">
        
        
        <BModal.Header closeButton>
                                <BModal.Title id="example-modal-sizes-title-lg">
                                <h4 class="modal-title">Alerte d'Authentification </h4>
                                </BModal.Title>
						
        </BModal.Header>
        <BModal.Body>
            <p>
            Veuillez entrer les Informations requises!
            </p>
        </BModal.Body>
        <BModal.Footer>
        <div className="d-flex justify-content-end">
          <Button onClick={() => this.setState({loginalertvisible:false})} style={{marginRight:'125px'}} variant="outline-success">
            Close
          </Button>
        </div>
        </BModal.Footer>
       
        
        
      </BModal>
      <BModal style={{marginLeft:'420px',marginTop:'-20px'}} show={this.state.loginalertvisible} variant="warning"
                        id="signupalert"
                        size="sm"
                        show={this.state.signupalertvisible}
                        onHide={() => this.setState({signupalertvisible:false})}
                        aria-labelledby="example-modal-sizes-title-sm">
        
        
        <BModal.Header closeButton>
                                <BModal.Title id="example-modal-sizes-title-lg">
                                <h4 class="modal-title">Alerte d'Enregistrement d'Utilisateur </h4>
                                </BModal.Title>
						
        </BModal.Header>
        <BModal.Body>
            <p>
            Veuillez entrer les Informations requises!
            </p>
        </BModal.Body>
        <BModal.Footer>
        <div className="d-flex justify-content-end">
          <Button onClick={() => this.setState({signupalertvisible:false})} style={{marginRight:'125px'}} variant="outline-success">
            Close
          </Button>
        </div>
        </BModal.Footer>
       
        
        
      </BModal>
		
	</div>
</div>	
  
	


        );
    }
}

export default Login