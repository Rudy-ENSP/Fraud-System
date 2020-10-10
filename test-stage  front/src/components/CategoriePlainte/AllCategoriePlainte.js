import React, { Component } from 'react';
import Modal from 'react-modal'
import '../../styles.css';
import axios from 'axios';
import { FaPlusCircle } from 'react-icons/fa';
import { FaMinusCircle } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import {MdEdit } from 'react-icons/md';
import 'bootstrap/dist/css/bootstrap.css';
import  Loader from '../loader'
import Select from 'react-select';
import $ from 'jquery'
import {Modal as BModal,Button} from 'react-bootstrap'
var list_id=[]

var listeCategoriePlainte
var liste_id_element_check=[] 
var elementdefaut=[]
var idCatcurrent



class AllCategoriePlainte extends Component {
    constructor(props){
        super(props)
        this.state={
          modalVisible:false,
          addmodalVisible:false,
          deletemodalVisible:false,
          deletemultimodalVisible:false,
          editmodalVisible:false,
          categoriePlainte:[],
          id:'',
          Nom:'',
          Adresse:'',
          entités:[],
          Entité:'',
          selectOptions : [],
          reload:false,
          nom_entité:''
        }
    }

    componentDidMount() {
     
    }
      onChangeNom = (event) => {
        this.setState({Nom: event.target.value});
        console.log('Nom ',event.target.value)
      }
      onChangeEntité=(event) =>{
        this.setState({Entité:event.value});
        console.log('Entité ',event.value)
       }
      onCancel=()=>{
        this.setState({
          Nom:'',
          Entité:'',
        })
      }
      
      onSendCategoriePlainte=(event)=>{
        event.preventDefault()
          let newCategoriePlainte={
              Nom : this.state.Nom,
              Entité: this.state.Entité,
          }
         
          axios.post('http://localhost:8000/plaintes/createCategoriePlainte/', newCategoriePlainte)
            .then(res => {console.log(res);
              console.log(res.data);
              if(res.data['state']==='success'){
                alert( "Categorie :" +newCategoriePlainte.Nom +" crée avec succèss" );
                this.setState ({
                  Nom:'',
                  Entité:'',
                });

                var max=0
                var i=0
             while(i<list_id.length){
               if(list_id[i]>max){max=list_id[i]}
               i++
             }
             max++

               
                var id='#'+list_id[0]
                var td1='<td> <span class="custom-checkbox">'+$(id).html()+'	<label for="checkbox1"></label> </span> </td>'
                var td4='<td id="name3">'+newCategoriePlainte.Nom+'</td>'
                var td2='<th id="'+max+'">'+max+'</th>'
                var td3='<td id="entité3">'+newCategoriePlainte.Entité+'</td>'
               
                var td5='<td style="display: flex; justify-content: space-between;"><a class="edit" data-toggle="modal"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"></path></svg></a><a class="delete" data-toggle="modal"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"></path></svg></a></td>'
                var row='<tr>'+td1+td2+td4+td3+td5+'</tr>'
                $('#myTable > tbody:last-child').append(row);

               
                
              }
              else{
                  alert('echec de lors de la création de notre entité')
              }
            })
         

      }
      onEditCategoriePlainte=(event)=>{
        event.preventDefault()
          let newCategoriePlainte={
            id :this.state.id,  
            Nom : this.state.Nom,
            Entité: this.state.Entité,
            nom_entité:this.state.nom_entité
          }
         
          axios.post('http://localhost:8000/plaintes/editCategoriePlainte/', newCategoriePlainte)
            .then(res => {console.log(res);
              console.log(res.data);
              if(res.data['status']==='success'){
                alert( "Categorie :" +newCategoriePlainte.Nom +" misea jour  avec succèss" );
                this.setState ({
                  Nom:'',
                  Entité:'',
                });
                const id='#name'+this.state.id
                
                $(id).html(newCategoriePlainte.Nom);
                const id1='#entité'+this.state.id
                
                $(id1).html(newCategoriePlainte.nom_entité);

              }
              else{
                  alert('echec de lors de la mise a jour  de la categorie')
              }
              
            })
         this.forceUpdate(()=>{this.setState({reload:true})})    
      }
      onDeleteMultiCategoriePlainte=(event)=>{
        event.preventDefault()
          let delete_list={delete_list:liste_id_element_check}
         
          axios.post('http://localhost:8000/plaintes/deletemultiCategoriePlainte/', delete_list)
            .then(res => {console.log(res);
              console.log(res.data);
              if(res.data['status']==='success'){
                alert( "Categories  supprimées avec succèss" );
                this.setState ({
                  Nom:'',
                  Entité:'',
                });
                var i=0
                while(i<(liste_id_element_check).length){
                  console.log('#tablerow'+(liste_id_element_check)[i]);
                  $('#tablerow'+(liste_id_element_check)[i]).remove();
                  i++
                }
                liste_id_element_check=[]
              }
              else{
                  alert('echec de lors de la suppression de notre categorie')
              }
            })
            
      }
      onDeleteCategoriePlainte=(event)=>{
        event.preventDefault()
          let newCategoriePlainte={
            id:this.state.id,  
            Nom : this.state.Nom,
              Entité: this.state.Entité,
          }
         
          axios.post('http://localhost:8000/plaintes/deleteCategoriePlainte/', newCategoriePlainte)
            .then(res => {console.log(res);
              console.log(res.data);
              if(res.data['status']==='success'){
                alert( "Categorie :" +newCategoriePlainte.Nom +" supprimée avec succèss" );
                this.setState ({
                  Nom:'',
                  Entité:'',
                });
                const id='#tablerow'+this.state.id
                $(id).remove();
              }
              else{
                  alert('echec de lors de la suppression de notre categorie')
              }
            })
            
         
      }
    render(){

      const CategoriePlainte = this.props.categoriePlainte
      const entité =this.props.entités

      const test=CategoriePlainte.map((entité) =>
             list_id.push(entité.id))
             
             
        /*const CategoriePlainte = [
            {id: 1, Nom: 'Aide support',Date:'03/09/2020',Description:'Nothing'},
            {id: 2, Nom: 'Aide support',Date:'03/09/2020',Description:'Nothing'},
            {id: 3, Nom: 'Aide support',Date:'03/09/2020',Description:'Nothing'},
            {id: 4, Nom: 'Aide support',Date:'03/09/2020',Description:'Nothing'},
            {id: 5, Nom: 'Aide support',Date:'03/09/2020',Description:'Nothing'},
            {id: 6, Nom: 'Aide support',Date:'03/09/2020',Description:'Nothing'},
            {id: 7, Nom: 'Aide support',Date:'03/09/2020',Description:'Nothing'},
            {id: 8, Nom: 'Aide support',Date:'03/09/2020',Description:'Nothing'},
            {id: 9, Nom: 'Aide support',Date:'03/09/2020',Description:'Nothing'},
            {id: 10, Nom: 'Aide support',Date:'03/09/2020',Description:'Nothing'},
            {id: 11, Nom: 'Aide support',Date:'03/09/2020',Description:'Nothing'},
            {id: 12, Nom: 'Aide support',Date:'03/09/2020',Description:'Nothing'},
            {id: 13, Nom: 'Aide support',Date:'03/09/2020',Description:'Nothing'},
            {id: 14, Nom: 'Aide support',Date:'03/09/2020',Description:'Nothing'},
          ];*/
         
          const data=[]
          
          const temp = entité.map((option) => { 
            data.push({ value: option.id, label: option.name })
        }
         
           
          );
          
          const content = CategoriePlainte.map((categoriePlainte) =>
            
                <tr id={'tablerow'+categoriePlainte.id} onClick={
                    ()=>
                    
                    this.setState({
                        modalVisible:true,
                        id:categoriePlainte.id,
                        Nom:categoriePlainte.name,                      
                        Entité:categoriePlainte.entité,
                        nom_entité:categoriePlainte.nom_entité
                         })}>
                         
                    <td>
							<span class="custom-checkbox">
              <input type="checkbox" id={categoriePlainte.id} name="options[]" value="1" onClick={()=>{
                                    var id=categoriePlainte.id
                                    var checkbox = document.getElementById(id);
                                    console.log(checkbox.checked)  
                                                        
                                                            if(checkbox.checked){
                                                                var flag=(liste_id_element_check).includes(categoriePlainte.id)
                                                                if(!flag){ liste_id_element_check.push(categoriePlainte.id)}
                                                               
                                                                
                                                                console.log(liste_id_element_check)
                                                            } else{
                                                               var index=liste_id_element_check.indexOf(categoriePlainte.id)
                                                               if(index>=0){ (liste_id_element_check).splice(index,1)}
                                                               
                                                                    
                                                                console.log(liste_id_element_check)                        
                                                              
                                                            } 
                                                       
            
                                                        }}/>
								<label for="checkbox1"></label>
							</span>
					</td>
                    <th id={'indice'+categoriePlainte.id} scope="row" onClick={
                    ()=>this.setState({
                        modalVisible:true,
                      })}>{categoriePlainte.id}</th>
                    <td id={'name'+categoriePlainte.id} onClick={
                    ()=>this.setState({
                        modalVisible:true,
                       })}>{categoriePlainte.name}</td>
                   
                    <td id={'entité'+categoriePlainte.id} onClick={
                    ()=>this.setState({
                        modalVisible:true,
                       })}>{categoriePlainte.nom_entité}</td>
                     <td style={{display:"flex",justifyContent:"space-between"}}>
                     <a  class="edit" data-toggle="modal" onClick={()=>this.setState({editmodalVisible:true})}><FaEdit /></a>
							<a  class="delete" data-toggle="modal" onClick={()=>this.setState({deletemodalVisible:true})}><FaTrash/></a>
					           </td>
                </tr>
           
          );

         
        function showTable(){

          if(CategoriePlainte.length ===0){
            return(
              <Loader/>
            )
        }
              if(CategoriePlainte.length <=8 && CategoriePlainte.length>=1){
                return (
                    <div className="table-wrapper-scroll-y my-custom-scrollbar" >
                    <table id="myTable" className="table table-bordered table-striped table-hover mb-0 ">
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
                            <th scope="col">Indice</th>
                            <th scope="col">Nom</th>
                            <th scope="col">Entité</th>
                            <th>Actions</th>
                        </thead>
                        
                        <tbody id="tableBody">
                            {content}
                        </tbody>
                    </table>
                    
                </div>
                )
                }
                
              if(CategoriePlainte.length>8){
                return (
                    <div className="table-wrapper-scroll-y my-custom-scrollbar" >
                    <table id="myTable" className="table table-bordered table-striped table-hover mb-0 ">
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
                            <th scope="col">Indice</th>
                            <th scope="col">Nom</th>
                            <th scope="col">Entité</th>
                            <th>Actions</th>
                
                        </thead>
                        
                        <tbody id="tableBody">
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
                                                    <h2>Gestion des <b>Categories</b></h2>
                                                </div>
                                                <div class="col-sm-6">
                                                <button  class="btn btn-success" data-toggle="modal" onClick={()=>this.setState({addmodalVisible:true})}><i ><FaPlusCircle /></i> <span>Add Categorie</span></button>
                                                        <button class="btn btn-danger" data-toggle="modal" onClick={()=>this.setState({ deletemultimodalVisible:true})}><i><FaMinusCircle /></i> <span>Delete</span></button>
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
          aria-labelledby="contained-modal-title-vcenter"
         
        >           <form onSubmit={this.onSendCategoriePlainte} >
                            <BModal.Header closeButton>
                                <BModal.Title id="example-modal-sizes-title-sm">
                                <h4 class="modal-title">Ajouter Categorie</h4>
                                </BModal.Title>
                            </BModal.Header>
                            <BModal.Body>
                            <div style={{display:'flex',flexDirection:"column",justifyContent:'space-between'}}>
                            <div class="form-group">
                                  <label for='Nom' style={{fontWeight:'bold'}}>Nom</label>
                                      <input type='text' className ="form-control" name='Nom'
                                        onChange={this.onChangeNom} required />
                                        
                                </div>
                                
                                
                                <div class="form-group">
                                <label for='Entité' style={{fontWeight:'bold'}}>Entité</label>
                                  <Select
                                    className="basic-single"
                                    classNamePrefix="select"
                                    defaultValue={data[0]}
                                    isDisabled={false}
                                    isLoading={false}
                                    isClearable={false}
                                    isRtl={false}
                                    isSearchable={true}
                                    name="Entité"
                                    options={data}
                                    onChange={this.onChangeEntité}
                                  />
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
         
        >           <form onSubmit={this.onEditCategoriePlainte} >
                            <BModal.Header closeButton>
                                <BModal.Title id="example-modal-sizes-title-sm">
                                <h4 class="modal-title">Editer Categorie</h4>
                                </BModal.Title>
                            </BModal.Header>
                            <BModal.Body>
                            <div style={{display:'flex',flexDirection:"column",justifyContent:'space-between'}}>
                            <div class="form-group">
                                  <label for='Nom' style={{fontWeight:'bold'}}>Nom</label>
                                      <input type='text' className ="form-control" name='Nom'
                                        onChange={this.onChangeNom} required />
                                        
                                </div>
                                
                                
                                <div class="form-group">
                                <label for='Entité' style={{fontWeight:'bold'}}>Entité</label>
                                  <Select
                                    className="basic-single"
                                    classNamePrefix="select"
                                    defaultValue={data[0]}
                                    isDisabled={false}
                                    isLoading={false}
                                    isClearable={false}
                                    isRtl={false}
                                    isSearchable={true}
                                    name="Entité"
                                    options={data}
                                    onChange={this.onChangeEntité}
                                  />
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
         
        >          <form onSubmit={this.onDeleteCategoriePlainte}>
                            <BModal.Header closeButton>
                                <BModal.Title id="example-modal-sizes-title-sm">
                                <h4 class="modal-title">Delete Category</h4>
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
         
        >          <form onSubmit={this.onDeleteMultiCategoriePlainte}>
                            <BModal.Header closeButton>
                                <BModal.Title id="example-modal-sizes-title-sm">
                                <h4 class="modal-title">Delete Categorie</h4>
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
            
<div id="addEmployeeModal" class="modal fade">
<div class="modal-dialog">
    <div class="modal-content">
       <form onSubmit={this.onSendCategoriePlainte} >
            <div class="modal-header">						
                <h4 class="modal-title">Ajouter Entité</h4>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            </div>
            <div class="modal-body">					
                <div class="form-group">
                <label for='Nom' style={{fontWeight:'bold'}}>Nom</label>
                <input type='text' className ="form-control" name='Nom'
                  onChange={this.onChangeNom} required />
                </div>
               
                <div class="form-group">
                <label for='Entité' style={{fontWeight:'bold'}}>Entité</label>
                  <select value={this.state.Entité} className ="form-control" 
                          onChange={this.onChangeEntité} required>
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
                <input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel" onClick={this.onCancel}/>
                <input type="submit" class="btn btn-success" value="Add"  />
            </div>
        </form>
    </div>
</div>
</div>

<div id="editEmployeeModal" class="modal fade">
<div class="modal-dialog">
    <div class="modal-content">
    <form onSubmit={this.onEditCategoriePlainte} >
            <div class="modal-header">						
                <h4 class="modal-title">Editer Entité</h4>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            </div>
            <div class="modal-body">					
                <div class="form-group">
                <label for='Nom' style={{fontWeight:'bold'}}>Nom</label>
                <input type='text' className ="form-control" name='Nom'
                  onChange={this.onChangeNom} required />
                </div>

                <div class="form-group">
                <label for='Entité' style={{fontWeight:'bold'}}>Entité</label>
                  <select value={this.state.Entité} className ="form-control" 
                          onChange={this.onChangeEntité} required>
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
                <input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel" onClick={this.onCancel}/>
                <input type="submit" class="btn btn-success" value="Save"  />
            </div>
        </form>
    </div>
</div>
</div>


<div id="deleteEmployeeModal" class="modal fade">
<div class="modal-dialog">
    <div class="modal-content">
        <form onSubmit={this.onDeleteCategoriePlainte}>
            <div class="modal-header">						
                <h4 class="modal-title">Supprimer Entité</h4>
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
export default AllCategoriePlainte