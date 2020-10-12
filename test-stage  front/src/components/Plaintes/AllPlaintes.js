import React, { Component } from 'react';
import Modal from 'react-modal'
import {Modal as BModal,Button} from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner'
import Box from '@material-ui/core/Box';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { FaPlusCircle } from 'react-icons/fa';
import { FaMinusCircle } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import {MdEdit } from 'react-icons/md';
import '../../styles.css';
import  Loader from '../loader'
import $ from 'jquery'
import moment  from 'moment'

import '../Login/Login_v2/fonts/font-awesome-4.7.0/css/font-awesome.css';
import { username ,password, isLoginAdmin} from '../Login/login';
var liste_id_element_check=[] 
var list_id=[]

class AllPlaintes extends Component {

    constructor(props){
        super(props)
        this.state={
            modalVisible:false,
            addmodalVisible:false,
            deletemodalVisible:false,
            deletemultimodalVisible:false,
            editmodalVisible:false,
            id:'',
            title:'',
            entité:'',
            auteur:'',
            date:'',
            etat:'',
            contenu:'',
            Reponse:'Aucune reponse pour le moment',
            addresponse:'',
            Titre: '',
            Entité: "Collaborateur",
            Description:'',
            Assignation:'',
            categorie:'',
            entités:props.entités,
            categoriePlainte:props.categoriePlainte,
            Users:props.Users,
            plainte:props.plainte,
            nom_auteur:'',
            nom_entité:'',
            nom_Categorie:'',
            assignation:'',
            nom_assigne:'',
            SearchTerm:''
            
        }
    }


    //on recupère les données back end

    componentDidMount() {
     
      }
    UNSAFE_componentWillReceiveProps(props) {

        this.setState({entités: props.entités,plainte:props.plainte ,categoriePlainte: props.categoriePlainte,Users:props.Users });
    
      }
      onEditSearchTerm=(e)=>{
       this.setState({SearchTerm:e.target.value})
      }
      dynamicSearch=()=>{
          if (this.state.SearchTerm==''){
            return this.state.plainte
          }
          else{
            return this.state.plainte.filter((plainte) => plainte.title.toLocaleUpperCase().includes(this.state.SearchTerm.toLocaleUpperCase())||
            plainte.nom_assigne.toLocaleUpperCase().includes(this.state.SearchTerm.toLocaleUpperCase())||
            plainte.nom_entité.toLocaleUpperCase().includes(this.state.SearchTerm.toLocaleUpperCase())||
            plainte.nom_Categorie.toLocaleUpperCase().includes(this.state.SearchTerm.toLocaleUpperCase())||
            plainte.state.toLocaleUpperCase().includes(this.state.SearchTerm.toLocaleUpperCase())||
            plainte.date_création.toLocaleUpperCase().includes(this.state.SearchTerm.toLocaleUpperCase())||
            plainte.details.toLocaleUpperCase().includes(this.state.SearchTerm.toLocaleUpperCase())||
            plainte.id.toString().toLocaleUpperCase().includes(this.state.SearchTerm.toLocaleUpperCase())
            )
          }
          
      }
      onChangeTitre = (event) => {
        this.setState({Titre: event.target.value});
        console.log('Titre ',event.target.value)
      }
      onChangeEntité = (event) => {
        this.setState({Entité: event.value});
        console.log('Entité',event.value)
      }
      onChangeDescription = (event) => {
        this.setState({Description: event.target.value});
        console.log('Description',event.target.value)
      }
      onChangeAssignation = (event) => {
        this.setState({Assignation: event.value});
        console.log('Assignation',event.value)
      }
      onChangeCategorie= (event) => {
        this.setState({categorie: event.value});
        console.log('categorie',event.value)
      }
      onCancel=()=>{
        this.setState({
          Titre:'',
          entité:'',
          Description:'',
        })
      }
    
      onSendPlainte=(event)=>{
        event.preventDefault();
          let newplainte={
            'id':this.state.id,
            'cas' : this.state.Titre,
            'description': this.state.Description,
            'entité':this.state.Entité,
            'user':username,
            'password':password,
            'Assignation':this.state.Assignation,
            'nom_assigne':this.state.nom_assigne,
            'nom_entité':this.state.nom_entité,
            'nom_Categorie':this.state.nom_Categorie,
            'Categorie':this.state.categorie,
            'state':'ajoutée'
          };
          axios.post('http://localhost:8000/plaintes/enregistrer/', newplainte)
          .then(res => {
            console.log(res);
            console.log(res.data);
            if(res.data['state']==='success'){
              alert( "PLAINTE " +newplainte.cas.toLocaleUpperCase() +" crée avec succèss" );
              this.setState ({
                Titre: '',
                Entité: "Collaborateur",
                Description:'',
                Assignation:''
              });

              var new_name_entité=''
              const content_entité = this.state.entités.map((entité) => {

                if (entité.id == newplainte.entité) {
                  new_name_entité=entité.name ;
                  
                }
    
              })
              var new_name_categorie=''
              const content_categorie = this.state.categoriePlainte.map((categorie) => {

                if (categorie.id == newplainte.Categorie) {
                  new_name_categorie=categorie.name ;
                  
                }
    
              })
              var new_name_assignation=''
              const content_assignation = this.state.Users.map((user) => {

                if (user.id == newplainte.Assignation) {
                  new_name_assignation=user.user ;
                  
                }
    
              })
             
            
    
             this.state.plainte.push({id: res.data['id'], 
             "title": newplainte.cas,
              "nom_entité": new_name_entité,
              "entité":newplainte.entité,
              "categorie":newplainte.Categorie,
              "nom_Categorie":new_name_categorie,
              "assignation":newplainte.Assignation,
              "nom_assigne":new_name_assignation,
              "details":newplainte.description,
              "nom_auteur":res.data['username'],
              "state":'ajoutée',
              "date_création":moment().format(moment.HTML5_FMT.DATETIME_LOCAL_SECONDS)
             })

             
            }
            else{
                alert('echec de lors de la création de la  plaintes')
            }
          })
          .catch(err => console.log(err));

          
         
      }
      
      onDeletePlainte=(event)=>{
        event.preventDefault();
          let newplainte={
              'id':this.state.id,
              
          };
          axios.post('http://localhost:8000/plaintes/delete/', newplainte)
          .then(res => {
            console.log(res);
            console.log(res.data);
            if(res.data['state']=='success'){
              
              /*const id='#tablerow'+this.state.id
              $(id).remove();*/

                var id_remove=0;
                var i=0
                console.log(this.state.plainte)
                const content = this.state.plainte.map((cas) => {

                  if (cas.id == newplainte.id) {
                    id_remove=i
                  }
                i++
                })
                console.log(id_remove)
                console.log(newplainte.id)
                this.state.plainte.splice(id_remove,1)

                alert( "PLAINTE  supprimé avec succèss" );
            }
            else{
                alert('echec de lors de la suppression de la  plaintes')
            }
          })
          .catch(err => console.log(err));

          //
         
      }

      onDeleteMultiPlainte=(event)=>{
        event.preventDefault();
          let plainte={
              'delete_list':liste_id_element_check
               };
          axios.post('http://localhost:8000/plaintes/deletemulti/', plainte)
          .then(res => {
            console.log(res);
            console.log(res.data);
            if(res.data['status']=='success'){
              
              var i = 0
                while (i < (liste_id_element_check).length) {
                 
                      var id_remove=0;
                      var p=0
                      const content = this.state.plainte.map((plainte) => {
      
                        if ((liste_id_element_check).includes(plainte.id) ) {
                          id_remove=p
                        }
                      p++
                      })
                      this.state.plainte.splice(id_remove,1)
                  i++
                }
                var checkbox = $('table tbody input[type="checkbox"]');
                            checkbox.each(function () {
                                this.checked = false;
                                var id = this.getAttribute('id');
                                liste_id_element_check = []
      
                              });
                      
                liste_id_element_check = []
                alert( "Plaintes  supprimées avec succèss" );
            }
            else{
                alert('echec de lors de la suppression des  plaintes')
            }
          })
          .catch(err => console.log(err));

          //
         
      }
      onEditPlainte=(event)=>{
        event.preventDefault();
          let newplainte={
              'id':this.state.id,
              'cas' : this.state.Titre,
              'description': this.state.Description,
              'entité':this.state.Entité,
              'user':username,
              'password':password,
              'Assignation':this.state.Assignation,
              'nom_assigne':this.state.nom_assigne,
              'nom_entité':this.state.nom_entité,
              'nom_Categorie':this.state.nom_Categorie,
              'categorie':this.state.categorie,
          };
          axios.post('http://localhost:8000/plaintes/editer/', newplainte)
          .then(res => {
            console.log(res);
            console.log(res.data);
            if(res.data['state']==='success'){
             
              this.setState ({
                Titre: '',
                Entité: "Collaborateur",
                Description:'',
                Assignation:''
              });
              
                var new_name_entité=''
                const content_entité = this.state.entités.map((entité) => {

                  if (entité.id == newplainte.entité) {
                    new_name_entité=entité.name ;
                    
                  }
      
                })
                var new_name_categorie=''
                const content_categorie = this.state.categoriePlainte.map((categorie) => {

                  if (categorie.id == newplainte.categorie) {
                    new_name_categorie=categorie.name ;
                    
                  }
      
                })
                var new_name_assignation=''
                const content_assignation = this.state.Users.map((user) => {

                  if (user.id == newplainte.Assignation) {
                    new_name_assignation=user.user ;
                    
                  }
      
                })
                /*console.log(new_name_assignation)
                console.log(this.state.Users)*/
                const content = this.state.plainte.map((plainte) => {

                  if (plainte.id == newplainte.id) {
                    plainte.title = newplainte.cas;
                    plainte.entité = newplainte.entité
                    plainte.nom_entité=new_name_entité
                    plainte.categorie = newplainte.categorie
                    plainte.nom_Categorie=new_name_categorie
                    plainte.assignation=newplainte.Assignation
                    plainte.nom_assigne=new_name_assignation  
                    plainte.details=newplainte.description
                  }
      
                })
                alert( "PLAINTE " +newplainte.cas.toLocaleUpperCase() +" mise a jour avec succèss" );
            }
            else{
                alert('echec de lors de la création de la  plaintes')
            }
          })
          .catch(err => console.log(err));

          
         
      }
      solve(id_plainte){
        let data={
            'id':this.state.id,
            'title':this.state.title,
            'user':username,
            'password':password,
            'Reponse':this.state.Reponse
        };
        axios.post('http://localhost:8000/plaintes/valider/',data)
        .then(res => {
          console.log(res.data)
        })
        .catch(function (error) {
          console.log(error);
        });
        this.setState({modalVisible:false})
        console.log('Plainte Resolue :',id_plainte)
      }


      onChangeContent = (event) => {
        this.setState({addresponse: event.target.value});
      }


      envoyer=(event)=>{
        event.preventDefault();
          let newPlainte={
              'id':this.state.id,
              'title':this.state.title,
              'user':username,
              'password':password,
              'Reponse':this.state.Reponse
          };
          axios.post('http://localhost:8000/plaintes/resoudre/', newPlainte)
          .then(res => {
            console.log(res);
            console.log(res.data);
            if(res.data['state']==='success'){
              alert( "LA PLAINTE " +newPlainte.title.toLocaleUpperCase() +" mise a jour avec succes" );
             
            }
            else{
                alert('echec de lors de la mise à jour  de la  plainte')
            }
          })
          .catch(err => console.log(err));

          //
         
      }


    ShowModal(){
    
        return(
            <div className='main'>
                <Modal isOpen={this.state.modalVisible} closeTimeoutMS={500} contentLabel="modal"
                    style={{
                        overlay: {
                        position: 'fixed',
                        top: 15,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.8)'
                        },
                        content: {
                        position: 'absolute',
                        top: '60px',
                        left: '30%',
                        right: '30%',
                        bottom: '40px',
                        border: '1px solid black',
                        background: '#E0E0E0',
                        overflow: 'auto',
                        WebkitOverflowScrolling: 'touch',
                        borderRadius: '10px',
                        outline: 'none',
                        padding: '0px'
                        }
                    }}>
                    {this.contentModal()}
                </Modal>
    
            </div>
        )
    }

    IsAdmin=()=>{
        if(this.state.etat=="ajoutée" || this.state.etat=="waiting"){
            return(
                <div>
                    <form style={{margin:20}} onSubmit={this.envoyer}>
                        <div className='form-group col-md-13 mb-3'>
                            <label for='content'>Ajouter un commentaire/une réponse</label>
                            <textarea value={this.state.value} className ="form-control" style={{height:100}} 
                            onChange={this.onChangeContent}
                            required/>
                        </div>
                        <div style={{marginLeft:'30%'}}>
                            <input type="submit" className="btn btn-primary" value="Envoyer" />
                            <button  style={{marginLeft:10}} onClick={()=>this.setState({modalVisible:false})}
                                className="btn btn-warning">Fermer la fenêtre</button>
                        </div>
                    </form>
                </div>
            )
        }
        else{
            return(
                <div>
                    <Box display="flex" flexDirection='column'  bgcolor="background.paper" p={1} m={1}>
                        <Box bgcolor="grey.300" style={{fontSize:16,fontWeight:"bold",textAlign:"center"}}>Reponse</Box>
                        <Box style={{marginTop:8}} >{this.state.reponse}</Box>
                    </Box>
                    <button  style={{marginLeft:'25%'}} onClick={()=>                          
                            this.solve(this.state.id)      
                    }
                                className="btn btn-primary">Resoudre</button>
                    <button  style={{marginLeft:10}} onClick={()=>this.setState({modalVisible:false})}
                                className="btn btn-warning">Fermer la fenêtre</button>
                </div>
            )
        }
    }

    contentModal=()=>{
        return(
            <div>
                <div style={{backgroundColor:"#007bff",height:30 ,margin:20}}>
                    
                    <h5 style={{textAlign:"center",paddingTop:5 ,color:'white'}}>
                     {this.state.title}</h5>
                </div>
                <div style={{ width: '100%' }}>

                <Box display="flex" flexDirection="row" p={1} m={1}
                    bgcolor="background.paper" justifyContent='space-between'>
                    <Box p={1} bgcolor="grey.300">
                        <Box style={{textAlign:'center',color:'black',fontWeight:'bold',fontSize:16}}>Entité </Box>
                        <Box style={{textAlign:"center"}}>{this.state.nom_entité}</Box>
                    </Box>
                    <Box p={1} bgcolor="grey.300">
                        <Box style={{textAlign:'center',color:'black',fontWeight:'bold' ,fontSize:16}}>Auteur </Box>
                        <Box style={{textAlign:"center"}}>{this.state.nom_auteur}</Box>
                    </Box>
                    <Box  p={1} bgcolor="grey.300">
                        <Box style={{textAlign:'center',color:'black' ,fontWeight:'bold',fontSize:16}}>Date de Création</Box>
                        <Box style={{textAlign:"center"}}> {this.state.date}</Box>
                    </Box>
                   
                </Box>
                </div>
                <div>
                    <Box display="flex" flexDirection='column'  bgcolor="background.paper" p={1} m={1}>
                        <Box bgcolor="grey.300" style={{fontSize:16,fontWeight:"bold",textAlign:"center"}}>Details</Box>
                        <Box style={{marginTop:8}} >{this.state.contenu}</Box>
                    </Box>
                </div>
                


                {this.IsAdmin()}


            </div>
        )
    }
    
    
    render(){
        
        const assignation = this.state.Users
        const entité = this.state.entités
        const categorie = this.state.categoriePlainte
          const entité_select=[]
          const temp1 = entité.map((option) =>
          entité_select.push({ value: option.id, label: option.name })
           
          );
          const categorie_select=[]
          const temp2 = categorie.map((option) =>
          categorie_select.push({ value: option.id, label: option.name })
           
          );
          const assignation_select=[]
          const temp3 = assignation.map((option) =>
          assignation_select.push({ value: option.id, label: option.user })
           
          );
          



        const MyPlaintes = this.dynamicSearch()
        const test=MyPlaintes.map((entité) =>
             list_id.push(entité.id))
          const content = MyPlaintes.map((plainte) =>
            
                <tr id={'tablerow'+plainte.id} onClick={
                    ()=>this.setState({
                        id:plainte.id,
                        title:plainte.title,
                        entité:plainte.entité,
                        auteur:plainte.auteur,
                        date:plainte.date_création,
                        etat:plainte.state,
                        contenu:plainte.details,
                        reponse:plainte.response,
                        categorie:plainte.Categorie,
                        assignation:plainte.assignation,
                        nom_auteur:plainte.nom_auteur,
                        nom_entité:plainte.nom_entité,
                        nom_Categorie:plainte.nom_Categorie,
                        nom_assigne:plainte.nom_assigne,
                        details:plainte.details
                        })}>
                    <td>
							<span class="custom-checkbox">
								
                                <input type="checkbox" id={plainte.id} name="options[]" value="1" onClick={()=>{
                                    var id=plainte.id
                                    var checkbox = document.getElementById(id);
                                    console.log(checkbox.checked)  
                                                        
                                                            if(checkbox.checked){
                                                                var flag=(liste_id_element_check).includes(plainte.id)
                                                                if(!flag){ liste_id_element_check.push(plainte.id)}
                                                               
                                                                
                                                                console.log(liste_id_element_check)
                                                            } else{
                                                               var index=liste_id_element_check.indexOf(plainte.id)
                                                               if(index>=0){ (liste_id_element_check).splice(index,1)}
                                                               
                                                                    
                                                                console.log(liste_id_element_check)                        
                                                              
                                                            } 
                                                       
            
                                                        }}/>
								<label for="checkbox1"></label>
							</span>
					</td>
                    
                    <th scope="row" onClick={
                    ()=>this.setState({
                        modalVisible:true,
                        })} >{plainte.id}</th>
                    <td id={'title'+plainte.id} onClick={
                    ()=>this.setState({
                        modalVisible:true,
                         })}>{plainte.title}</td>
                    <td  id={'nom_Categorie'+plainte.id} onClick={
                    ()=>this.setState({
                        modalVisible:true,
                         })}>{plainte.nom_Categorie}</td>
                    <td id={'nom_entité'+plainte.id} onClick={
                    ()=>this.setState({
                        modalVisible:true,
                         })}>{plainte.nom_entité}</td>
                    <td id={'nom_assigne'+plainte.id} onClick={
                    ()=>this.setState({
                        modalVisible:true,
                         })}>{plainte.nom_assigne}</td>
                    
                        
                    <td onClick={
                    ()=>this.setState({
                        modalVisible:true,
                         })}>{moment().format(plainte.date_création,'YYYY-MM-DDTHH:mm:ss',true)}</td>
                    <td onClick={
                    ()=>this.setState({
                        modalVisible:true,
                       })}>{plainte.state}</td>
                        
                    <td style={{display:"flex",justifyContent:"space-between"}}>
							<a  class="edit" data-toggle="modal" onClick={()=>this.setState({editmodalVisible:true})}><FaEdit /></a>
							<a  class="delete" data-toggle="modal" onClick={()=>this.setState({deletemodalVisible:true})}><FaTrash/></a>
					</td>
                </tr>
           
          );

         
        function showTable(){

            
             
              if(MyPlaintes.length ===0){
                  return(
                    <Loader/>
                  )
              }
              if(MyPlaintes.length <=8 && MyPlaintes.length>=1){
                return (
                    
                        
                        <div className="table-wrapper-scroll-y my-custom-scrollbar" >
                            <table className="table table-bordered table-striped table-hover mb-0 ">
                                <thead >
                                    <th>
                                        <span class="custom-checkbox">
                                        <input type="checkbox" id="selectAll" onClick={()=>{var checkbox = $('table tbody input[type="checkbox"]');
                                                       var selectAll= document.getElementById("selectAll")
                                                        
                                                            if(selectAll.checked){
                                                                liste_id_element_check=[]
                                                                checkbox.each(function(){
                                                                    this.checked = true;
                                                                    var id = parseInt(this.getAttribute('id')) ;
                                                                    
                                                                    liste_id_element_check.push(id)  
                                                                                          
                                                                });
                                                                console.log(liste_id_element_check)
                                                            } else{
                                                                checkbox.each(function(){
                                                                    this.checked = false; 
                                                                    var id = this.getAttribute('id') ;
                                                                    liste_id_element_check=[] 
                                                                                         
                                                                });
                                                                console.log(liste_id_element_check)
                                                            } 
                                                        
                                                        checkbox.click(function(){
                                                            if(!this.checked){
                                                                $("#selectAll").prop("checked", false);
                                                            }
                                                            
                                                        });
                                                        }}/>
                                            <label for="selectAll"></label>
                                        </span>
                                    </th>
                                    <th>Indice</th>
                                    <th>Titre</th>
                                    <th>Categorie</th>
                                    <th>Entité</th>
                                    <th>Assignation</th>
                                    <th>Date</th> 
                                    <th>Etat</th>
                                    <th>Actions</th>
                                </thead>
                                
                                <tbody>
                                    {content}
                                </tbody>
                            </table>
                            
                        </div>
                    
                )
                }
              if(MyPlaintes.length>8){
                return (
                   
              
              
                    <div className="table-wrapper-scroll-y my-custom-scrollbar" >
                    <table className="table table-bordered table-striped table-hover mb-0">
                        <thead >
                            <th>
                                <span class="custom-checkbox">
                                <input type="checkbox" id="selectAll" onClick={()=>{var checkbox = $('table tbody input[type="checkbox"]');
                                                       var selectAll= document.getElementById("selectAll")
                                                        
                                                            if(selectAll.checked){
                                                                liste_id_element_check=[]
                                                                checkbox.each(function(){
                                                                    this.checked = true;
                                                                    var id = parseInt(this.getAttribute('id')) ;
                                                                    
                                                                    liste_id_element_check.push(id)  
                                                                                          
                                                                });
                                                                console.log(liste_id_element_check)
                                                            } else{
                                                                checkbox.each(function(){
                                                                    this.checked = false; 
                                                                    var id = this.getAttribute('id') ;
                                                                    liste_id_element_check=[] 
                                                                                         
                                                                });
                                                                console.log(liste_id_element_check)
                                                            } 
                                                        
                                                        checkbox.click(function(){
                                                            if(!this.checked){
                                                                $("#selectAll").prop("checked", false);
                                                            }
                                                            
                                                        });
                                                        }}/>
                                    <label for="selectAll"></label>
                                </span>
                            </th>
                            <th>Indice</th>
                            <th>Titre</th>
                            <th>Categorie</th>
                            <th>Entité</th>
                            <th>Assignation</th>
                            <th>Date</th> 
                            <th>Etat</th>
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
                <div class="container-xl" style={{marginTop:'50px'}}>
                    <div class="table-responsive">
                            <div class="table-wrapper">
                                    <div class="table-title">
                                            <div class="row">
                                                    <div class="col-sm-6">
                                                        <h2>Gestion de <b>Plaintes</b></h2>
                                                        
                                                    </div>
                                                       
                                                    <div class="col-sm-6">
                                                    <input type='text' style={{marginTop:"20px"}}className ="form-group form-control" value={this.state.SearchTerm} onChange={this.onEditSearchTerm} placeholder="Rechercher"/>
                                                        <button  class="btn btn-success" data-toggle="modal" onClick={()=>this.setState({addmodalVisible:true})}><i ><FaPlusCircle /></i> <span>Add Plainte</span></button>
                                                        <button class="btn btn-danger" data-toggle="modal" onClick={()=>this.setState({deletemultimodalVisible:true})}><i><FaMinusCircle /></i> <span>Delete</span></button>						
                                                        </div>
                                                    </div>
                                    </div>
                                    {showTable()}
                                    {this.ShowModal()}

                                    </div>
                    </div>    
                </div>
                
               
            
        <BModal
          id="addmodal"
          size="sm"
          show={this.state.addmodalVisible}
          onHide={() => this.setState({addmodalVisible:false})}
          aria-labelledby="contained-modal-title-vcenter"
         
        >           <form onSubmit={this.onSendPlainte} >
                            <BModal.Header closeButton>
                                <BModal.Title id="example-modal-sizes-title-sm">
                                <h4 class="modal-title">Ajouter Plainte</h4>
                                </BModal.Title>
                            </BModal.Header>
                            <BModal.Body>
                                <div style={{display:'flex',flexDirection:"column",justifyContent:'space-between'}}>
                                    <div class="form-group">
                                        <label for='Titre' style={{fontWeight:"bold"}}>Titre</label>
                                                    <input type='text' className ="form-control" name='Titre'
                                            onChange={this.onChangeTitre} required />
                                                
                                    </div>
                                    <div class="form-group">
                                        <label for='Categorie' style={{fontWeight:'bold'}}>Categorie</label>
                                        <Select
                                            className="basic-single"
                                            classNamePrefix="select"
                                            defaultValue={categorie_select[0]}
                                            isDisabled={false}
                                            isLoading={false}
                                            isClearable={false}
                                            isRtl={false}
                                            isSearchable={true}
                                            name="Categorie"
                                            options={categorie_select}
                                            onChange={this.onChangeCategorie}
                                        />
                                    </div>
                                    <div class="form-group">
                                    <label for='assignation' style={{fontWeight:"bold"}}>Employé Assigné</label>
                                        <Select
                                            className="basic-single"
                                            classNamePrefix="select"
                                            defaultValue={assignation_select[0]}
                                            isDisabled={false}
                                            isLoading={false}
                                            isClearable={false}
                                            isRtl={false}
                                            isSearchable={true}
                                            name="Assignation"
                                            options={assignation_select}
                                            onChange={this.onChangeAssignation}
                                        />
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
                                    <label for='description' style={{fontWeight:"bold"}}>Description</label>
                                    <textarea value={this.state.value} className ="form-control" style={{height:40}}
                                            onChange={this.onChangeDescription} required/>
                                    </div>
                                </div>      
                            </BModal.Body>
                            <BModal.Footer>
                            
                                <input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel" onClick={()=>this.setState({addmodalVisible:false})}/>
                                <input type="submit" class="btn btn-success" value="Add"  />
                                
                            </BModal.Footer>
                    </form>    
        </BModal>
        <BModal
          id="editmodal"
          size="sm"
          show={this.state.editmodalVisible}
          onHide={() => this.setState({editmodalVisible:false})}
          aria-labelledby="contained-modal-title-vcenter"
         
        >           <form onSubmit={this.onEditPlainte} >
                             <BModal.Header closeButton>
                                <BModal.Title id="example-modal-sizes-title-sm">
                                <h4 class="modal-title">Ajouter Plainte</h4>
                                </BModal.Title>
                            </BModal.Header>
                            <BModal.Body>
                           
                                <div style={{display:'flex',flexDirection:"column",justifyContent:'space-between'}}>
                                    <div class="form-group">
                                        <label for='Titre' style={{fontWeight:"bold"}}>Titre</label>
                                                    <input type='text' className ="form-control" name='Titre'
                                            onChange={this.onChangeTitre} required />
                                                
                                    </div>
                                    <div class="form-group">
                                        <label for='Categorie' style={{fontWeight:'bold'}}>Categorie</label>
                                        <Select
                                            className="basic-single"
                                            classNamePrefix="select"
                                            defaultValue={categorie_select[0]}
                                            isDisabled={false}
                                            isLoading={false}
                                            isClearable={false}
                                            isRtl={false}
                                            isSearchable={true}
                                            name="Categorie"
                                            options={categorie_select}
                                            onChange={this.onChangeCategorie}
                                        />
                                    </div>
                                    <div class="form-group">
                                    <label for='assignation' style={{fontWeight:"bold"}}>Employé Assigné</label>
                                        <Select
                                            className="basic-single"
                                            classNamePrefix="select"
                                            defaultValue={assignation_select[0]}
                                            isDisabled={false}
                                            isLoading={false}
                                            isClearable={false}
                                            isRtl={false}
                                            isSearchable={true}
                                            name="Assignation"
                                            options={assignation_select}
                                            onChange={this.onChangeAssignation}
                                        />
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
                                    <label for='description' style={{fontWeight:"bold"}}>Description</label>
                                    <textarea value={this.state.value} className ="form-control" style={{height:40}}
                                            onChange={this.onChangeDescription} required/>
                                    </div>
                                </div>      
                            </BModal.Body>
                            <BModal.Footer>
                            
                                <input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel" onClick={()=>this.setState({editmodalVisible:false})}/>
                                <input type="submit" class="btn btn-success" value="Save"  />
                                
                            </BModal.Footer>
                    </form>    
        </BModal>

        <BModal
          id="deletemodal"
          size="sm"
          show={this.state.deletemodalVisible}
          onHide={() => this.setState({deletemodalVisible:false})}
          aria-labelledby="contained-modal-title-vcenter"
         
        >          <form onSubmit={this.onDeletePlainte}>
                            <BModal.Header closeButton>
                                <BModal.Title id="example-modal-sizes-title-sm">
                                <h4 class="modal-title">Delete Plainte</h4>
                                </BModal.Title>
                            </BModal.Header>
                            <BModal.Body>
                                <p>Are you sure you want to delete this Record?</p>
                                <p class="text-warning"><small>This action cannot be undone.</small></p>
                            </BModal.Body>
                            <BModal.Footer>
                                <input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel" onClick={()=>this.setState({deletemodalVisible:false})}/>
                                <input type="submit" class="btn btn-danger" value="Delete"/> 
                            </BModal.Footer>
                    </form>    
        </BModal>

        <BModal
          id="deletemultimodal"
          size="sm"
          show={this.state.deletemultimodalVisible}
          onHide={() => this.setState({deletemultimodalVisible:false})}
          aria-labelledby="contained-modal-title-vcenter"
         
        >          <form onSubmit={this.onDeleteMultiPlainte}>
                            <BModal.Header closeButton>
                                <BModal.Title id="example-modal-sizes-title-sm">
                                <h4 class="modal-title">Delete Plainte</h4>
                                </BModal.Title>
                            </BModal.Header>
                            <BModal.Body>
                                <p>Are you sure you want to delete all the selected values?</p>
                                <p class="text-warning"><small>This action cannot be undone.</small></p>
                            </BModal.Body>
                            <BModal.Footer>
                                <input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel" onClick={()=>this.setState({deletemultimodalVisible:false})}/>
                                <input type="submit" class="btn btn-danger" value="Delete"/> 
                            </BModal.Footer>
                    </form>    
        </BModal>
            </body>
        );
    }
}

export default AllPlaintes