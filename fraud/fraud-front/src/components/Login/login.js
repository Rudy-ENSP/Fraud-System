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


export var isLogin;
export var isLoginAdmin;
export var isLoginClient;
export var username;
export var password;



export  class Login extends Component {
	 
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
		const script=document.createElement("script");
		script.src="./Login_v2/js/main.js";
		script.async=true;
		document.body.appendChild(script);
		
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
						Welcome
					</span>
					<span class="login100-form-title p-b-48">
						<i class="zmdi zmdi-font"></i>
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

					<div class="text-center p-t-115">
						<span class="txt1">
							Don’t have an account?
						</span>

						<li className="nav-item">
                        <Link className="nav-link" to="/sign-up">Sign up</Link>
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

export default Login