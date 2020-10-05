import React, { Component } from 'react';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import {  Link  } from 'react-router-dom';
import {Entree} from '../Entree';
import {Redirect} from "react-router-dom";
import {useHistory} from "react-router-dom";

import $ from 'jquery'
import { RiLoginCircleFill } from 'react-icons/ri';
export var isLogin;
export var isLoginAdmin;
export var isLoginClient;
export var username;
export var password;



export  class Signup extends Component {
	 
	constructor(){
        super()
        this.state={
           
            isLoginClient:false,
            isLoginAdmin:false,
            isLogin:false,
            isAdmin:false,
            username:'',
            password:'',
            redirect:'false'
            
        }
	}
	
    componentDidMount() {
		

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


	isLoginTest=()=>{
        console.log('isLoginAdmin ',isLoginAdmin , ' isLogin ', isLogin)
        isLogin=true
        isLoginClient=true
        console.log('isLoginAdmin ',isLoginAdmin , ' isLogin ', isLogin)
    }

    onChangeNom = (event) => {
        this.setState({username: event.target.value});
        console.log('Nom ',event.target.value)
      }
    onChangePassword = (event) => {
        event.preventDefault();
        this.setState({password: event.target.value});
        console.log('password ',event.target.value)
	  }
	
    
	  LoginUser=(event)=>{
        
        event.preventDefault();
        let AuthInfos={
            'username' : this.state.username,
            'password': this.state.password,
        };
		if (AuthInfos.username=='' || AuthInfos.password=='' ) { alert('Entrer Vos Identifiants de Connection')}
		   else{
			axios.post('http://localhost:8000/plaintes/login/', AuthInfos)
			.then(res => {
			  console.log(res);
			  console.log(res.data);
			  if(res.data['state']==='success'){
						username=this.state.username
						password=this.state.password
						isLogin=true
					if(this.state.username!='admin'){
						isLoginClient=true
					}
				this.setState({redirect:true})
					
				}
				else{
					alert('echec de connexion')
				}
			  
			})
			.catch(err => console.log(err));
		   }
        
    }

    render(){

		if(this.state.redirect==true){
             return <Redirect to="/Acceuil"/>
        }
        return (
<div class="main">
	<div class="limiter" >
		<div class="container-login100">
			<div class="wrap-login100">
				<form class="login100-form validate-form" >
					<span class="login100-form-title p-b-26">
						Connexion
					</span>
					<span class="login100-form-title p-b-48">
						
					<h1 style={{color:'#007bff'}}><RiLoginCircleFill/></h1>
					</span>

					<div class="wrap-input100 validate-input" data-validate = "Valid email is: a@b.c">
						<input class="input100" type="text" name="username" onChange={this.onChangeNom}/>
						<span class="focus-input100" data-placeholder="Username"></span>
					</div>

					<div class="wrap-input100 validate-input" data-validate="Enter password">
						<span class="btn-show-pass">
							<i class="zmdi zmdi-eye"></i>
						</span>
						<input class="input100" type="password" name="password" onChange={this.onChangePassword}/>
						<span class="focus-input100" data-placeholder="Password"></span>
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
							Vous avez deja un compte?
						</span>

						<li className="nav-item">
                        <Link className="nav-link" to="/">Login</Link>
                      </li>
					</div>
				</form>
			</div>
		</div>
	</div>
	

	<div id="dropDownSelect1"></div>
    <script src="vendor/jquery/jquery-3.2.1.min.js"/>

	<script src="vendor/animsition/js/animsition.min.js"/>

	<script src="vendor/bootstrap/js/popper.js"/>
	<script src="vendor/bootstrap/js/bootstrap.min.js"/>

	<script src="vendor/select2/select2.min.js"/>

	<script src="vendor/daterangepicker/moment.min.js"/>
	<script src="vendor/daterangepicker/daterangepicker.js"/>

	<script src="vendor/countdowntime/countdowntime.js"/>

	<script src="js/main.js"/>
 
</div>	
  
	


        );
    }
}

export default Signup