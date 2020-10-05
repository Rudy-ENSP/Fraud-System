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
import {Modal as BModal,Button} from 'react-bootstrap'
var listeCategoriePlainte
class AllCategoriePlainte extends Component {
    constructor(props){
        super(props)
        this.state={
          modalVisible:false,
          addmodalVisible:false,
          deletemodalVisible:false,
          editmodalVisible:false,
            categoriePlainte:[],
            id:'',
            Nom:'',
            Adresse:'',
            entités:[],
            Entité:'',
            selectOptions : [],
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8000/plaintes/listeCategoriePlainte/')
          .then(res => {
            const categoriePlainte = res.data;
            this.setState({categoriePlainte: categoriePlainte  });
            console.log('Categorieplaintes', categoriePlainte)
          })
          .catch(function (error) {
            console.log(error);
          });
          axios.get('http://localhost:8000/plaintes/listeEntite/')
          .then(res => {
            const entités = res.data;
            this.setState({entités: entités  });
            console.log('entités', entités)
          })
          .catch(function (error) {
            console.log(error);
          });
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
              if(res.data['status']==='success'){
                alert( "Categorie :" +newCategoriePlainte.Nom +" crée avec succèss" );
                this.setState ({
                  Nom:'',
                  Entité:'',
                });
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
              }
              else{
                  alert('echec de lors de la mise a jour  de la categorie')
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
              }
              else{
                  alert('echec de lors de la suppression de notre categorie')
              }
            })
            
      }
    render(){

      const CategoriePlainte = this.state.categoriePlainte
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
          const entité = this.state.entités
          const data=[]
          const temp = entité.map((option) =>
          data.push({ value: option.id, label: option.name })
           
          );
          
          const content = CategoriePlainte.map((categoriePlainte) =>
            
                <tr onClick={
                    ()=>this.setState({
                        modalVisible:true,
                        id:categoriePlainte.id,
                        Nom:categoriePlainte.name,                      
                        Entité:categoriePlainte.entité
                         })}>
                    <td>
							<span class="custom-checkbox">
								<input type="checkbox" id="checkbox1" name="options[]" value="1"/>
								<label for="checkbox1"></label>
							</span>
					</td>
                    <th scope="row" onClick={
                    ()=>this.setState({
                        modalVisible:true,
                      })}>{categoriePlainte.id}</th>
                    <td onClick={
                    ()=>this.setState({
                        modalVisible:true,
                       })}>{categoriePlainte.name}</td>
                   
                    <td onClick={
                    ()=>this.setState({
                        modalVisible:true,
                       })}>{categoriePlainte.entité}</td>
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
                    <table className="table table-bordered table-striped table-hover mb-0 ">
                        <thead >
                            <th>
                                <span class="custom-checkbox">
                                    <input type="checkbox" id="selectAll"/>
                                    <label for="selectAll"></label>
                                </span>
                            </th>
                            <th scope="col">Indice</th>
                            <th scope="col">Nom</th>
                            <th scope="col">Entité</th>
                            <th>Actions</th>
                        </thead>
                        
                        <tbody>
                            {content}
                        </tbody>
                    </table>
                    
                </div>
                )
                }
                
              if(CategoriePlainte.length>8){
                return (
                    <div className="table-wrapper-scroll-y my-custom-scrollbar" >
                    <table className="table table-bordered table-striped table-hover mb-0 ">
                        <thead >
                            <th>
                                <span class="custom-checkbox">
                                    <input type="checkbox" id="selectAll"/>
                                    <label for="selectAll"></label>
                                </span>
                            </th>
                            <th scope="col">Indice</th>
                            <th scope="col">Nom</th>
                            <th scope="col">Entité</th>
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
                                                    <h2>Gestion des <b>Categories</b></h2>
                                                </div>
                                                <div class="col-sm-6">
                                                <button  class="btn btn-success" data-toggle="modal" onClick={()=>this.setState({addmodalVisible:true})}><i ><FaPlusCircle /></i> <span>Add Categorie</span></button>
                                                        <button class="btn btn-danger" data-toggle="modal" onClick={()=>this.setState({deletemodalVisible:true})}><i><FaMinusCircle /></i> <span>Delete</span></button>
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