import React, { Component } from 'react';
import Modal from 'react-modal'
import '../../styles.css';
import axios from 'axios';
import { FaPlusCircle } from 'react-icons/fa';
import { FaMinusCircle } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import Select from 'react-select';
import { Modal as BModal, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import Loader from '../loader'
import $ from 'jquery'

import 'jquery-validation'

var listeEntités
var liste_id_element_check = []
var list_id = []
var username_list=[]
var inputform;
class AllUsers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      addmodalVisible: false,
      deletemodalVisible: false,
      deletemultimodalVisible: false,
      editmodalVisible: false,
      Users:props.Users,
      id: '',
      Entités:'',
      Username: '',
      Nom: '',
      Prenom:'',
      Email:'',
      Status:"",
      SearchTerm:'',
      nom_entité:'',
      entités:props.entités,
      ConfPassword:'',
      username_list:[],
      ancien_nom:''
    }
    
  }

  componentDidMount() {
   
  }
  UNSAFE_componentWillReceiveProps(props) {

    this.setState({ Users: props.Users,entités:props.entités })

  }

  onEditSearchTerm=(e)=>{
    this.setState({SearchTerm:e.target.value})
   }
   dynamicSearch=()=>{
       if (this.state.SearchTerm==''){
         return this.state.Users
       }
       else{
         return this.state.Users.filter((user) => user.Username.toLocaleUpperCase().includes(this.state.SearchTerm.toLocaleUpperCase())||
         user.Prenom.toLocaleUpperCase().includes(this.state.SearchTerm.toLocaleUpperCase())||
         user.id.toString().toLocaleUpperCase().includes(this.state.SearchTerm.toLocaleUpperCase())||
         user.Nom.toLocaleUpperCase().includes(this.state.SearchTerm.toLocaleUpperCase())||
         user.Email.toLocaleUpperCase().includes(this.state.SearchTerm.toLocaleUpperCase())||
         user.nom_entité.toLocaleUpperCase().includes(this.state.SearchTerm.toLocaleUpperCase())||
         user.Status.toLocaleUpperCase().includes(this.state.SearchTerm.toLocaleUpperCase()))
         }
       
   }
  
   
onChangeEntité=(event) =>{
  this.setState({Entité:event.value});
  console.log('Entité ',event.value)
 }
 onChangeStatus=(event) =>{
  this.setState({Status:event.value});
  console.log('Status ',event.value)
 }
  onChangeNom = (event) => {
    this.setState({ Nom: event.target.value });
    console.log('Nom ', event.target.value)
  }
  onChangePrenom = (event) => {
    this.setState({ Prenom: event.target.value });
    console.log('Prenom ', event.target.value)
  }
  onChangeEmail = (event) => {
    this.setState({ Email: event.target.value });
    console.log('Email ', event.target.value)
  }
 

  //Cas de Create User
  onChangeUsername = (event) => {
    this.setState({Username: event.target.value});
    console.log('Username ',event.target.value)
    var flag=((username_list).includes(event.target.value) && event.target.value != this.state.ancien_nom)
    console.log(username_list)
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

  
  onCancel = () => {
    this.setState({
      Username: '',
      Nom: '',
      Email:'',
      

    })
  }
  onSendUsers = (event) => {
    event.preventDefault()
    let newUser = {
      'Nom' : this.state.Nom,
			'Prenom' : this.state.Prenom,
      'Username': this.state.Username,
      'Password': this.state.Password,
      'Email':this.state.Email,
      'Entité':this.state.Entité,
      'Status':this.state.Status,
      'nom_entité':this.state.nom_entité
    }

    axios.post('http://localhost:8000/plaintes/CreateUser/', newUser)
      .then(res => {
        console.log(res);
        console.log(res.data);
        if (res.data['state'] === 'success') {
          alert("Entité : " + newUser.Username + " crée avec succèss");
          this.setState({
            Username: '',
            Nom: '',
          });
          var new_name=''
                const content_entité = this.state.entités.map((entité) => {

                  if (entité.id == newUser.Entité) {
                    new_name=entité.name ;
                    
                  }
      
                })
                var status=''
                

                  if (newUser.Status=='1') {
                    status="Administrateur" ;
                    
                  }
                  else{
                    status="Utilisateur"
                  }
      
                
       
       this.state.Users.push({ id: res.data['id'], "Nom":newUser.Nom ,"Prenom":newUser.Prenom,"Email":newUser.Email,"Username":newUser.Username ,"Entité":newUser.Entité,"nom_entité":new_name,"Status":status})

        }
        else {
          alert('echec de lors de la création de notre entité')
        }
      })

  }
  onEditUser = (event) => {
    event.preventDefault()
    let newUser = {
      'id':this.state.id,
      'Nom' : this.state.Nom,
			'Prenom' : this.state.Prenom,
      'Username': this.state.Username,
      'Password': this.state.Password,
      'Email':this.state.Email,
      'Entité':this.state.Entité,
      'Status':this.state.Status,
      'nom_entité':this.state.nom_entité
    }

    axios.post('http://localhost:8000/plaintes/editUsers/', newUser)
      .then(res => {
        console.log(res);
        console.log(res.data);
        if (res.data['state'] === 'success') {
          alert("Utilisateur : " + newUser.Username + " Mise à jour avec succèss");
          this.setState({
            Username: '',
            Nom: '',
          });

          var new_name=''
                const content_entité = this.state.entités.map((entité) => {

                  if (entité.id == newUser.Entité) {
                    new_name=entité.name ;
                    
                  }
      
                })
                var status=''
                

                  if (newUser.Status=='1') {
                    status="Administrateur" ;
                    
                  }
                  else{
                    status="Utilisateur"
                  }
          const content = this.state.Users.map((user) => {


            if (user.id == newUser.id) {
              user.Username = newUser.Username;
              user.Nom = newUser.Nom
              user.Prenom = newUser.Prenom
              user.Email = newUser.Email
              user.Password=newUser.Password
              user.Status=status
              user.nom_entité=new_name
              user.Entité=newUser.Entité
            }

          })
          
        }
        else {
          alert('echec de lors de la création de l"Utilisateur')
        }
      })

  }
  onDeleteMultiUser = (event) => {
    event.preventDefault()
    let Users = { delete_list: liste_id_element_check }

    axios.post('http://localhost:8000/plaintes/deletemultiUser/', Users)
      .then(res => {
        console.log(res);
        console.log(res.data);
        if (res.data['status'] === 'success') {
          
          var i = 0
          while (i < (liste_id_element_check).length) {
            //console.log('#tablerow' + (liste_id_element_check)[i]);
            //$('#tablerow' + (liste_id_element_check)[i]).remove();
                var id_remove=0;
                var p=0
                const content = this.state.Users.map((user) => {

                  if ((liste_id_element_check).includes(user.id) ) {
                    id_remove=p
                  }
                p++
                })
                this.state.Users.splice(id_remove,1)
            i++
          }
          var checkbox = $('table tbody input[type="checkbox"]');
                      checkbox.each(function () {
                          this.checked = false;
                          var id = this.getAttribute('id');
                          liste_id_element_check = []

                        });
                
          liste_id_element_check = []
          alert("les Utilisateurs selectioneés ont été supprimées avec succèss");
        }
        else {
          alert('echec de lors de la suppression des entités')
        }
      })

  }
  onDeleteUser = (event) => {
    event.preventDefault()
    let newUsers = {
      id: this.state.id,
      Username: this.state.Username,
      Nom: this.state.Nom,
    }

    axios.post('http://localhost:8000/plaintes/deleteUser/', newUsers)
      .then(res => {
        console.log(res);
        console.log(res.data);
        if (res.data['status'] === 'success') {
          alert("Utilisateur :" + newUsers.Username + " supprimée avec succèss");
          this.setState({
            Username: '',
            Nom: '',
          });
         /* const id = '#tablerow' + this.state.id
          $(id).remove();*/
          var id_remove=0;
                var i=0
                const content = this.state.Users.map((user) => {

                  if (user.id == newUsers.id) {
                    id_remove=i
                  }
                i++
                })
                this.state.Users.splice(id_remove,1)

        }
        else {
          alert("echec de lors de la suppression de l'Utilisateur !")
        }
      })

  }

  render() {

    //const Entités = this.state.entités
    const Users = this.dynamicSearch()
    const users = this.state.Users
       // const history=useHistory();
          const temp4 = users.map((option) =>
          username_list.push( option.Username )
         
        );
       
        const entité = this.state.entités
        const entité_select=[]
          const temp1 = entité.map((option) =>
          entité_select.push({ value: option.id, label: option.name })
        
           
          );
          const Status=[{ value: 1, label: 'Administrateur' },{ value: 0, label: 'Utilisateur' }]

    const test = Users.map((user) =>
      list_id.push(user.id))
    var i = 0



    const content = Users.map((user) =>

      <tr id={'tablerow' + user.id} onClick={
        () => {this.setState({
          'id':user.id,
          'Nom' : user.Nom,
          'Prenom' : user.Prenom,
          'Username': user.Username,
          'Password': user.Password,
          'Email':user.Email,
          'Entité':user.Entité,
          'Status':user.Status,
          'nom_entité':user.nom_entité,
          'ancien_nom':user.Username
        })
        console.log(user)
        }}>
        <td>
          <span class="custom-checkbox">

            <input type="checkbox" id={user.id} name="options[]" value="1" onClick={() => {
              var id = user.id
              var checkbox = document.getElementById(id);
              console.log(checkbox.checked)

              if (checkbox.checked) {
                var flag = (liste_id_element_check).includes(user.id)
                if (!flag) { liste_id_element_check.push(user.id) }


                console.log(liste_id_element_check)
              } else {
                var index = liste_id_element_check.indexOf(user.id)
                if (index >= 0) { (liste_id_element_check).splice(index, 1) }


                console.log(liste_id_element_check)

              }


            }} />
            <label for="checkbox1"></label>
          </span>
        </td>
        <th scope="row" onClick={
          () => this.setState({
            modalVisible: true,
          })}>{user.id}</th>
        <td id={'name' + user.id} onClick={
          () => this.setState({
            modalVisible: true,
          })}>{user.Username}</td>

        <td id={'Nom' + user.id} onClick={
          () => this.setState({
            modalVisible: true,
          })}>{user.Nom}</td>
          <td id={'Prenom' + user.id} onClick={
          () => this.setState({
            modalVisible: true,
          })}>{user.Prenom}</td>
           <td id={'Email' + user.id} onClick={
          () => this.setState({
            modalVisible: true,
          })}>{user.Email}</td>
          <td id={'entité' + user.id} onClick={
          () => this.setState({
            modalVisible: true,
          })}>{user.nom_entité}</td>
          <td id={'Email' + user.id} onClick={
          () => this.setState({
            modalVisible: true,
          })}>{user.Status}</td>
        <td style={{ display: "flex", justifyContent: "space-between" }}>
          <a class="edit" data-toggle="modal" onClick={() => this.setState({ editmodalVisible: true })}><FaEdit /></a>
          <a class="delete" data-toggle="modal" onClick={() => this.setState({ deletemodalVisible: true })}><FaTrash /></a>
        </td>
      </tr>

    );


    function showTable() {

      if (Users.length === 0) {
        return (
          <Loader />
        )
      }
      if (Users.length <= 8 && Users.length >= 1) {
        return (
          <div className="table-wrapper-scroll-y my-custom-scrollbar" >
            <table id="myTable" className="table table-bordered table-striped table-hover mb-0 ">
              <thead >
                <th>
                  <span class="custom-checkbox">
                    <input type="checkbox" id="selectAll" onClick={() => {
                      var checkbox = $('table tbody input[type="checkbox"]');
                      var selectAll = document.getElementById("selectAll")

                      if (selectAll.checked) {
                        liste_id_element_check = []

                        checkbox.each(function () {
                          this.checked = true;
                          var id = parseInt(this.getAttribute('id'));

                          liste_id_element_check.push(id)

                        });
                        console.log(liste_id_element_check)
                      } else {
                        checkbox.each(function () {
                          this.checked = false;
                          var id = this.getAttribute('id');
                          liste_id_element_check = []

                        });
                        console.log(liste_id_element_check)
                      }

                      checkbox.click(function () {
                        if (!this.checked) {
                          $("#selectAll").prop("checked", false);
                        }

                      });
                    }} />
                    <label for="selectAll"></label>
                  </span>
                </th>
                <th scope="col">Indice</th>
                <th scope="col">Username</th>
                <th scope="col">Nom</th>
                <th scope="col">Prenom</th>
                <th scope="col">Email</th>
                <th scope="col">Entité</th>
                <th scope="col">Status</th>
                <th>Actions</th>
              </thead>

              <tbody>
                {content}
              </tbody>
            </table>

          </div>
        )

      }
      if (Users.length > 8) {
        return (
          <div className="table-wrapper-scroll-y my-custom-scrollbar" >
            <table id="myTable" className="table table-bordered table-striped table-hover mb-0 ">
              <thead >
                <th>
                  <span class="custom-checkbox">
                    <input type="checkbox" id="selectAll" onClick={() => {
                      var checkbox = $('table tbody input[type="checkbox"]');
                      
                      var selectAll = document.getElementById("selectAll")

                      if (selectAll.checked) {
                        liste_id_element_check = []
                        checkbox.each(function () {
                          this.checked = true;
                          var id = parseInt(this.getAttribute('id'));

                          liste_id_element_check.push(id)

                        });
                        console.log(liste_id_element_check)
                      } else {
                        checkbox.each(function () {
                          this.checked = false;
                          var id = this.getAttribute('id');
                          liste_id_element_check = []

                        });
                        console.log(liste_id_element_check)
                      }

                      checkbox.click(function () {
                        if (!this.checked) {
                          $("#selectAll").prop("checked", false);
                        }

                      });
                    }} />
                    <label for="selectAll"></label>
                  </span>
                </th>
                <th scope="col">Indice</th>
                <th scope="col">Username</th>
                <th scope="col">Nom</th>
                <th scope="col">Prenom</th>
                <th scope="col">Email</th>
                <th scope="col">Status</th>
                <th>Actions</th>
              </thead>

              <tbody>
                {content}
              </tbody>
            </table>

          </div>
        )
      }
    }

    return (
      <body>
        <div class="container-xl" style={{ marginTop: '50px' }}>
          <div class="table-responsive">
            <div class="table-wrapper">
              <div class="table-title">
                <div class="row">
                  <div class="col-sm-6">
                    <h2>Gestion des <b>Utilisateurs</b></h2>
                    <input type='text' style={{marginTop:"20px"}}className ="form-group form-control" value={this.state.SearchTerm} onChange={this.onEditSearchTerm} placeholder="Rechercher"/>
                  </div>
                  <div class="col-sm-6">
                 
                    <button class="btn btn-success" data-toggle="modal" onClick={() => this.setState({ addmodalVisible: true })}><i ><FaPlusCircle /></i> <span>Ajouter Utilisateur</span></button>
                    <button class="btn btn-danger" data-toggle="modal" onClick={() => this.setState({ deletemultimodalVisible: true })}><i><FaMinusCircle /></i> <span>Supprimer</span></button>
                  </div>
                </div>
              </div>
              {showTable()}


            </div>
          </div>
        </div>



        <BModal
                        id="addmodal"
                        size="sm"
                        show={this.state.addmodalVisible}
                        onHide={() => this.setState({addmodalVisible:false})}
                        aria-labelledby="example-modal-sizes-title-lg">          
                        
						<form id="validate" onSubmit={this.onSendUsers} >
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
												<label for='Entité' style={{fontWeight:'bold'}}>Status</label>
												<Select
													className="basic-single"
													classNamePrefix="select"
													defaultValue={Status[0]}
													isDisabled={false}
													isLoading={false}
													isClearable={false}
													isRtl={false}
													isSearchable={true}
													name="Entité"
													options={Status}
													onChange={this.onChangeStatus}
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
									
                            </BModal.Body>
                            <BModal.Footer>
							    <input type="button" class="btn btn-warning" data-dismiss="modal" value="Annuler"  onClick={()=>this.setState({addmodalVisible:false})}/>
                  <input type="submit" id="input" onClick={this.inputmodif}  class="btn btn-success" value="Enregistrer"  />
                            </BModal.Footer>
							</form>
        </BModal>
        <BModal
          id="editmodal"
          size="sm"
          show={this.state.editmodalVisible}
          onHide={() => this.setState({ editmodalVisible: false })}
          aria-labelledby="contained-modal-title-vcenter"

        >           <form onSubmit={this.onEditUser} >
            <BModal.Header closeButton>
              <BModal.Title id="example-modal-sizes-title-sm">
                <h4 class="modal-title">Editer Utilisateur</h4>
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
												<label for='Entité' style={{fontWeight:'bold'}}>Status</label>
												<Select
													className="basic-single"
													classNamePrefix="select"
													defaultValue={Status[0]}
													isDisabled={false}
													isLoading={false}
													isClearable={false}
													isRtl={false}
													isSearchable={true}
													name="Entité"
													options={Status}
													onChange={this.onChangeStatus}
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
									
                            </BModal.Body>
            <BModal.Footer>

            <input type="button" class="btn btn-warning" data-dismiss="modal" value="Annuler"  onClick={()=>this.setState({editmodalVisible:false})}/>
                  <input type="submit" id="input" onClick={this.inputmodif}  class="btn btn-success" value="Enregistrer"  />

            </BModal.Footer>
          </form>
        </BModal>

        <BModal
          id="deletemodal"
          size="sm"
          show={this.state.deletemodalVisible}
          onHide={() => this.setState({ deletemodalVisible: false })}
          aria-labelledby="contained-modal-title-vcenter"

        >          <form onSubmit={this.onDeleteUser}>
            <BModal.Header closeButton>
              <BModal.Title id="example-modal-sizes-title-sm">
                <h4 class="modal-title">Supprimer Entité</h4>
              </BModal.Title>
            </BModal.Header>
            <BModal.Body>
              <p>Voulez vous supprimer cet enregistrement?</p>
              <p class="text-warning"><small>Cette action est definitive.</small></p>
            </BModal.Body>
            <BModal.Footer>
              <input type="button" class="btn btn-default" data-dismiss="modal" value="Annuler" onClick={() => this.setState({ deletemodalVisible: false })} />
              <input type="submit" class="btn btn-danger" value="Supprimer" />
            </BModal.Footer>
          </form>
        </BModal>

        <BModal
          id="deletemultimodal"
          size="sm"
          show={this.state.deletemultimodalVisible}
          onHide={() => this.setState({ deletemultimodalVisible: false })}
          aria-labelledby="contained-modal-title-vcenter"

        >          <form onSubmit={this.onDeleteMultiUser}>
            <BModal.Header closeButton>
              <BModal.Title id="example-modal-sizes-title-sm">
                <h4 class="modal-title">Supprimer Entité</h4>
              </BModal.Title>
            </BModal.Header>
            <BModal.Body>
              <p>Voulez vous supprimer ces enregistrements?</p>
              <p class="text-warning"><small>Cette action est definitive.</small></p>
            </BModal.Body>
            <BModal.Footer>
              <input type="button" class="btn btn-default" data-dismiss="modal" value="Annuler" onClick={() => this.setState({ deletemultimodalVisible: false })} />
              <input type="submit" class="btn btn-danger" value="Supprimer" />
            </BModal.Footer>
          </form>
        </BModal>

        <div id="addEmployeeModal" class="modal fade">
          <div class="modal-dialog">
            <div class="modal-content">
              <form onSubmit={this.onSendEntité} >
                <div class="modal-header">
                  <h4 class="modal-title">Ajouter Entité</h4>
                  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                </div>
                <div class="modal-body">
                  <div class="form-group">
                    <label for='Username' style={{ fontWeight: 'bold' }}>Username</label>
                    <input type='text' className="form-control" name='Username'
                      onChange={this.onChangeUsername} required />
                  </div>

                  <div class="form-group">
                    <label for='Hiérarchie' style={{ fontWeight: 'bold' }}>Nom</label>
                    <select value={this.state.Nom} className="form-control"
                      onChange={this.onChangeNom} required>
                      <option value="1">Direction</option>
                      <option value="2">Sous-Direction</option>
                      <option value="3">Cellule</option>
                      <option value="4">Service</option>
                      <option value="5">Equipe</option>
                      <option value="6">Collaborateurs</option>
                      <option value="7">Stagiaires</option>
                    </select>
                  </div>

                </div>
                <div class="modal-footer">
                  <input type="button" class="btn btn-default" data-dismiss="modal" value="Annuler" onClick={this.onCancel} />
                  <input type="submit" class="btn btn-success" value="Ajouter" />
                </div>
              </form>
            </div>
          </div>
        </div>

        <div id="editEmployeeModal" class="modal fade">
          <div class="modal-dialog">
            <div class="modal-content">
              <form onSubmit={this.onEditEntité} >
                <div class="modal-header">
                  <h4 class="modal-title">Editer Entité</h4>
                  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                </div>
                <div class="modal-body">
                  <div class="form-group">
                    <label for='Username' style={{ fontWeight: 'bold' }}>Username</label>
                    <input type='text' className="form-control" name='Username'
                      onChange={this.onChangeUsername} required />
                  </div>

                  <div class="form-group">
                    <label for='Hiérarchie' style={{ fontWeight: 'bold' }}>Nom</label>
                    <select value={this.state.Nom} className="form-control"
                      onChange={this.onChangeNom} required>
                      <option value="1">Direction</option>
                      <option value="2">Sous-Direction</option>
                      <option value="3">Cellule</option>
                      <option value="4">Service</option>
                      <option value="5">Equipe</option>
                      <option value="6">Collaborateurs</option>
                      <option value="7">Stagiaires</option>
                    </select>
                  </div>

                </div>
                <div class="modal-footer">
                  <input type="button" class="btn btn-default" data-dismiss="modal" value="Annuler" onClick={this.onCancel} />
                  <input type="submit" class="btn btn-success" value="Enregistrer" />
                </div>
              </form>
            </div>
          </div>
        </div>


        <div id="deleteEmployeeModal" class="modal fade">
          <div class="modal-dialog">
            <div class="modal-content">
              <form onSubmit={this.onDeleteEntité}>
                <div class="modal-header">
                  <h4 class="modal-title">Supprimer Entité</h4>
                  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                </div>
                <div class="modal-body">
                  <p>Are you sure you want to delete this Records?</p>
                  <p class="text-warning"><small>This action cannot be undone.</small></p>
                </div>
                <div class="modal-footer">
                  <input type="button" class="btn btn-default" data-dismiss="modal" value="Annuler" />
                  <input type="submit" class="btn btn-danger" value="Supprimer" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </body>
    );
  }
}

export default AllUsers