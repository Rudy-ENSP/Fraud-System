import React, { Component } from 'react';
import Modal from 'react-modal'
import Box from '@material-ui/core/Box';
import Select from 'react-select';
import {Modal as BModal,Button} from 'react-bootstrap'
import '../../styles.css'
import axios from 'axios';
import { FaPlusCircle } from 'react-icons/fa';
import { FaMinusCircle } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import {MdEdit } from 'react-icons/md';
import 'bootstrap/dist/css/bootstrap.css';
import  Loader from '../loader'
import $ from 'jquery'

import { username ,password,isLoginAdmin,isLoginClient} from '../Login/login';

var liste_id_element_check=[] 
class ResolvedPlaintes extends Component {

    constructor(props){
        super(props)
        this.state={
            modalVisible:false,
            addmodalVisible:false,
            deletemodalVisible:false,
            deletemultimodalVisible:false,
            editmodalVisible:false,
            plaintes:[],
            id:'',
            title:'',
            entité:'',
            auteur:'',
            date:'',
            etat:'',
            contenu:'',
            response:'',
            Reponse:'Aucune reponse pour le moment',
            addresponse:'',
            Titre: '',
            Entité: "Collaborateur",
            Description:'',
            Assignation:'',
            Categorie:'',
            entités:[],
            categoriePlainte:[],
            plainte:[],
            Users:[],
            nom_auteur:'',
            nom_entité:'',
            nom_Categorie:'',
            assignation:'',
            nom_assigne:''
        }
    }

    componentDidMount() {
      
      }
      onChangeReponse = (event) => {
        this.setState({Reponse: event.target.value});
        console.log('Reponse ',event.target.value)
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
        this.setState({Categorie: event.value});
        console.log('Categorie',event.value)
      }
      onCancel=()=>{
        this.setState({
          Titre:'',
          entité:'',
          Description:'',
        })
      }
      onChangeContent = (event) => {
        this.setState({addresponse: event.target.value});
      }
      onDeletePlainte=(event)=>{
        event.preventDefault();
          let plainte={
              'id':this.state.id,
              
          };
          axios.post('http://localhost:8000/plaintes/delete/', plainte)
          .then(res => {
            console.log(res);
            console.log(res.data);
            if(res.data['status']=='success'){
              alert( "PLAINTE " +plainte.cas.toLocaleUpperCase() +" supprimé avec succèss" );
              const id='#tablerow'+this.state.id
              $(id).remove();
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
              alert( "Plaintes  supprimées avec succèss" );
              var i=0
                  while(i<(liste_id_element_check).length){
                  console.log('#tablerow'+(liste_id_element_check)[i]);
                  $('#tablerow'+(liste_id_element_check)[i]).remove();
                  i++
                  }
                  liste_id_element_check=[]
              
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
          let plainte={
              'id':this.state.id,
              'cas' : this.state.Titre,
              'description': this.state.Description,
              'entité':this.state.Entité,
              'user':username,
              'password':password,
              'Assignation':this.state.Assignation,
              'nom_assigne':this.state.nom_assigne
          };
          axios.post('http://localhost:8000/plaintes/editer/', plainte)
          .then(res => {
            console.log(res);
            console.log(res.data);
            if(res.data['state']==='success'){
              alert( "PLAINTE " +plainte.cas.toLocaleUpperCase() +" mise a jour avec succèss" );
              this.setState ({
                Titre: '',
                Entité: "Collaborateur",
                Description:'',
              });
              const id='#title'+this.state.id
                
                $(id).html(plainte.Nom);
                const id1='#nom_entité'+this.state.id
                
                $(id1).html(plainte.nom_entité);
                const id2='#nom_Categorie'+this.state.id
                $(id2).html(plainte.nom_entité);
                const id3='#nom_assigne'+this.state.id
                $(id3).html(plainte.nom_assigne);
            }
            else{
                alert('echec de lors de la création de la  plaintes')
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


    contentModal=()=>{
        return(
            <div>
                <div style={{backgroundColor:"#007bff",height:30 ,margin:20}}>
                    
                    <h5 style={{textAlign:"center",paddingTop:8 ,color:'white'}}>
                     {this.state.title}</h5>
                </div>
                <div style={{ width: '100%' }}>

                <Box display="flex" flexDirection="row" p={1} m={1}
                 bgcolor="background.paper" justifyContent='space-between'>
                    <Box p={1} bgcolor="grey.300">
                        <Box style={{textAlign:'center',color:'black',fontWeight:'bold',fontSize:16}}>entité </Box>
                        <Box style={{textAlign:"center"}}>{this.state.nom_entité}</Box>
                    </Box>
                    <Box p={1} bgcolor="grey.300">
                        <Box style={{textAlign:'center',color:'black',fontWeight:'bold' ,fontSize:16}}>auteur </Box>
                        <Box style={{textAlign:"center"}}>{this.state.nom_auteur}</Box>
                    </Box>
                    <Box  p={1} bgcolor="grey.300">
                        <Box style={{textAlign:'center',color:'black' ,fontWeight:'bold',fontSize:16}}>date de création</Box>
                        <Box style={{textAlign:"center"}}> {this.state.date}</Box>
                    </Box>
                    
                </Box>
                </div>
                <div>
                    <Box display="flex" flexDirection='column'  bgcolor="background.paper" p={1} m={1}>
                        <Box bgcolor="grey.300" style={{fontSize:18,fontWeight:"bold",textAlign:"center"}}>Details</Box>
                        <Box style={{marginTop:10}} >{this.state.contenu}</Box>
                    </Box>
                </div>
                <div>
                    <Box display="flex" flexDirection='column'  bgcolor="background.paper" p={1} m={1}>
                        <Box bgcolor="grey.300" style={{fontSize:18,fontWeight:"bold",textAlign:"center"}}>Response</Box>
                        <Box style={{marginTop:10}} >{this.state.response}</Box>
                    </Box>
                </div>
                <div style={{marginLeft:'30%'}}>
                            <button  style={{marginLeft:10,marginTop:2}} onClick={()=>this.setState({modalVisible:false})}
                                className="btn btn-warning">Fermer la fenêtre</button>
                        </div>
               
            </div>
        )
    }
    
    render(){
        const assignation = this.props.Users
        const entité = this.props.entités
        const categorie = this.props.categoriePlainte
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
        const MyPlaintes = this.props.plaintes /*[
            {id: 1, title: 'Bonjour, monde', Entité: 'aide et support',Auteur:'rudy',Date:'12/05/2020',Etat:'resoluee',Content:'Nothing'},
            {id: 2, title: 'bonjour, monde', Entité: 'aide et support',Auteur:'rudy',Date:'12/05/2020',Etat:'En attente',Content:'Nothing'},
            {id: 3, title: 'Bonjour, monde', Entité: 'aide et support',Auteur:'rudy',Date:'12/05/2020',Etat:'resolue',Content:'Nothing'},
            {id: 4, title: 'bonjour, monde', Entité: 'aide et support',Auteur:'rudy',Date:'12/05/2020',Etat:'En attente',Content:'Nothing'},
            {id: 5, title: 'Bonjour, monde', Entité: 'aide et support',Auteur:'rudy',Date:'12/05/2020',Etat:'resolue',Content:'Nothing'},
            {id: 6, title: 'bonjour, monde', Entité: 'aide et support',Auteur:'rudy',Date:'12/05/2020',Etat:'En attente',Content:'Nothing'},
            {id: 7, title: 'Bonjour, monde', Entité: 'aide et support',Auteur:'rudy',Date:'12/05/2020',Etat:'En attente',Content:'Nothing'},
            {id: 8, title: 'bonjour, monde', Entité: 'aide et support',Auteur:'rudy',Date:'12/05/2020',Etat:'En attente',Content:'Nothing'},
            {id: 9, title: 'Bonjour, monde', Entité: 'aide et support',Auteur:'rudy',Date:'12/05/2020',Etat:'resolue',Content:'Nothing'},
            {id: 10, title: 'bonjour, monde', Entité: 'aide et support',Auteur:'rudy',Date:'12/05/2020',Etat:'En attente',Content:'Nothing'},
            {id: 11, title: 'Bonjour, monde', Entité: 'aide et support',Auteur:'rudy',Date:'12/05/2020',Etat:'En attente',Content:'Nothing'},
            {id: 12, title: 'bonjour, monde', Entité: 'aide et support',Auteur:'rudy',Date:'12/05/2020',Etat:'En attente',Content:'Nothing'},
            {id: 13, title: 'Bonjour, monde', Entité: 'aide et support',Auteur:'rudy',Date:'12/05/2020',Etat:'resolue',Content:'Nothing'},
            {id: 14, title: 'bonjour, monde', Entité: 'aide et support',Auteur:'rudy',Date:'12/05/2020',Etat:'resolue',Content:'Nothing'},
          ];*/

        function PlainteResolue(){
            const plainteResolue=[]
            MyPlaintes.map((plainte)=>plainteResolue.push(plainte))
			console.log(MyPlaintes)
            return plainteResolue
        }
          
         const content = PlainteResolue().map((plainte) =>
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
                nom_auteur:plainte.nom_auteur,
                nom_entité:plainte.nom_entité,
                nom_Categorie:plainte.nom_Categorie,
                nom_assigne:plainte.nom_assigne,
                assignation:plainte.assignation,

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
                 })}>{plainte.date_création}</td>
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
                                <p>Are you sure you want to delete this Records?</p>
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
<div id="editEmployeeModal" class="modal fade">
<div class="modal-dialog">
    <div class="modal-content">
    <form onSubmit={this.onEditPlainte} >
            <div class="modal-header">						
                <h4 class="modal-title">Editer Plainte</h4>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            </div>
            <div class="modal-body">					
                <div class="form-group">
                <label for='Titre' style={{fontWeight:"bold"}}>Titre</label>
                    <input type='text' className ="form-control" name='Titre'
               onChange={this.onChangeTitre} required />
                </div>
                <div class="form-group">
                    <label for='categorie' style={{fontWeight:"bold"}}>Categorie</label>
                    <select value={this.state.value} className ="form-control" 
                              onChange={this.onChangeCategorie} required>
                        <option value="Web-Defacement">Web-Defacement</option>
                        <option value="Spam">Spam</option>
                        <option value="Ingenierie Sociale">Ingenierie Sociale</option>
                        <option value="FleeceWare">FleeceWare</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for='entités' style={{fontWeight:"bold"}}>Entité</label>
                    <select value={this.state.value} className ="form-control" 
                      onChange={this.onChangeEntité} required>
                        <option value="CIRT">Equipe Aide</option>
                        <option value="Entité 2">Direction du CIRT</option>
                        <option value="Entité 3">Reseau et Systeme</option>
                        <option value="Entité 4">Entité 4</option>
                    </select>
                </div>
                <div class="form-group">
                <label for='description' style={{fontWeight:"bold"}}>Description</label>
                <textarea value={this.state.value} className ="form-control" style={{height:90}}
                          onChange={this.onChangeDescription} required/>
                </div>					
            </div>
            <div class="modal-footer">
                <input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel" onClick={this.onCancel}/>
                <input type="submit" class="btn btn-success" value="Save" />
            </div>
        </form>
    </div>
</div>
</div>


<div id="deleteEmployeeModal" class="modal fade">
<div class="modal-dialog">
    <div class="modal-content">
        <form onSubmit={this.onDeletePlainte}>
            <div class="modal-header">						
                <h4 class="modal-title">Delete Plainte</h4>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            </div>
            <div class="modal-body">					
                <p>Are you sure you want to delete this Records?</p>
                <p class="text-warning"><small>This action cannot be undone.</small></p>
            </div>
            <div class="modal-footer">
                <input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel"/>
                <input type="submit" class="btn btn-danger" value="Delete"/>
            </div>
        </form>
    </div>
</div>
</div>
        </body>
    );
}
}

export default ResolvedPlaintes