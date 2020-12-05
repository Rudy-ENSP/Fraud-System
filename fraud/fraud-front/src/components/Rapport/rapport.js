import React, {Component} from 'react';
import Modal from 'react-modal'
import '../../../src/';
import {Line} from 'react-chartjs-2';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import {Redirect} from "react-router-dom";
import Select from 'react-select';   
import { RiArrowGoBackFill } from 'react-icons/ri';
import {serveur} from '../../serveur'
import DatePicker from "react-datepicker";
import { Form } from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";
import moment  from 'moment'
import {Modal as BModal,Button} from 'react-bootstrap'
import { username ,password, isLoginAdmin} from '../Login/login';
import  Loader from '../loader'

export class Rapport extends Component {

    constructor(props){
        super()
        this.state={
            isLoginClient:false,
            modalvisible:false,
            isLoginAdmin:false,
            isLogin:false,
            isAdmin:false,
            username:'',
            password:'',
            Entité:'0',
            entités:props.entités,
            Assignation:'0',
            Users:props.Users,
            Categorie:'0',
            categoriePlainte:props.categoriePlainte,
            Etat:'0',
            Description:'',
            Date1:Date.now(),
            Date2:Date.now(),
            plainte:{
              labels: ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet','Aout','Septembre','Octobre','Nomvembre','Decembre'],
              datasets:[{
                label:"Plaintes",
                backgroudColor:"#007bff",
                borderColor:"#03b1fc",
                data:[4,5,1,10,32,2,12,24,10,15,18,2]

              }]
                 

              
            }
            
            
        }
    }
    
    UNSAFE_componentWillReceiveProps(props) {

        this.setState({Assignation:props.userselect, Entité:props.entitéselect ,Categorie:props.categorieselect,entités: props.entités,plainte:props.plainte ,categoriePlainte: props.categoriePlainte,Users:props.Users });
    
      }

    onChangeEntité = (event) => {
        this.setState({Entité: event.value});
        
      }
    onChangeEtat = (event) => {
        this.setState({Etat: event.value});
      
      }
    onChangeCategorie = (event) => {
        this.setState({Categorie: event.value});
       
      }
      onChangeAssignation = (event) => {
        this.setState({Assignation: event.value});
       
      }
      onChangeDate1= (event) => {
        this.setState({Date1: event});
     
      }
      onChangeDate2 = (event) => {
        this.setState({Date2: event});
      
      }
      onSendData=(event)=>{
        event.preventDefault();
          let newData={
            'Entité':this.state.Entité,
            'Assignation' : this.state.Assignation,
            'Categorie': this.state.Categorie,
            'Etat':this.state.Etat,
            'Date1':this.state.Date1,
            'Date2':this.state.Date2,
            'user':username,
            'password':password,
            
          };
          axios.post(serveur+'getChart/', newData)
          .then(res => {
           
            if(res.data['state']==='success'){
              
              this.setState({plainte:{
                labels: res.data['labels'],
                datasets:[{
                  label:"Plaintes",
                  backgroudColor:"#007bff",
                  data:res.data['chart']
  
                }]
                   
  
                
              }})
             // alert("DATASET OBTENU")
              }
            
            
            else{
                alert("echec de lors de l'obtention dU DATASET")
            }
          })
          .catch(err => console.log(err));

          
         
      }
      
    render(){
        var entités=this.state.entités
        const entité_select=[]
        entité_select.push({ value: '0', label: 'Tout' })
          const temp2 = entités.map((option) =>
        entité_select.push({ value: option.id, label: option.name })
         
        );
        var categories=this.state.categoriePlainte
        const categorie_select=[]
        categorie_select.push({ value: '0', label: 'Tout' })
        const temp = categories.map((option) =>
        categorie_select.push({ value: option.id, label: option.name })
         
        );
        const assignation = this.state.Users
        const assignation_select=[]
        assignation_select.push({ value: '0', label: 'Tout' })
        const temp3 = assignation.map((option) =>
        assignation_select.push({ value: option.id, label: option.user })
         
        );

        var etat_select = [
            {value:'0',label:'Tout'},
            { value: '1', label: 'ajoutée' },
            { value: '2', label: 'waiting' },
            { value: '3', label: 'resolu' },
            
          
          ]
        if (this.state.plainte==null){
          this.setState({plainte:{
            labels: ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet','Aout','Septembre','Octobre','Nomvembre','Decembre'],
            datasets:[{
              label:"Plaintes",
              backgroudColor:"#007bff",
              borderColor:"#03b1fc",
              data:[4,5,1,10,32,2,12,24,10,15,18,2]

            }]
               

            
          }})
        }
      
        return(
<div class="d-flex" id="wrapper">

        <div style={{position:"relative",marginTop:'40px',marginLeft:'15px',width:850,height:750}}>
          <div style={{display:'flex',justifyContent:"space-between"}}>
          <h3>Graphique</h3>
          <input type="button" style={{backgroudColor:'#03b1fc'}} value="Filtre du Graphique" onClick={()=>this.setState({modalVisible:true})} />
          </div>
          
          <Line
            options={{
              responsive:true
            }}
            data={this.state.plainte}
          />

       </div>
       <BModal
          id="filtremodal"
          size="sm"
          show={this.state.modalVisible}
          onHide={() => this.setState({modalVisible:false})}
          aria-labelledby="contained-modal-title-vcenter"
         
        >          
        <form onSubmit={this.onSendData}>
        <BModal.Header closeButton>
                                <BModal.Title id="example-modal-sizes-title-sm">
                                <h4 class="modal-title">Selectionner Votre Filtre</h4>
                                </BModal.Title>
        </BModal.Header>
        <BModal.Body>
        <div class="form-group">
                                    <label for='assignation' >Etat de la PLainte</label>
                                        <Select
                                            className="basic-single"
                                            classNamePrefix="select"
                                            defaultValue={etat_select[0]}
                                            isDisabled={false}
                                            isLoading={false}
                                            isClearable={false}
                                            isRtl={false}
                                            isSearchable={true}
                                            name="Assignation"
                                            options={etat_select}
                                            onChange={this.onChangeEtat}
                                        />
            </div>
            <div class="form-group">
                                        <label for='Entité' >Entité</label>
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
                                        <label for='Categorie' >Categorie</label>
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
                                    <label for='assignation' >Employé Assigné</label>
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
            <div class="form-group" style={{display:'flex',flexDirection:'column' , justifyContent:"space-between"}}>
            <Form.Label> Date de Début</Form.Label>
            <DatePicker selected={this.state.Date1} onChange={date=>this.onChangeDate1(date)}/>
            </div>
            
            <div class="form-group">
            <div class="form-group" style={{display:'flex',flexDirection:'column' , justifyContent:"space-between"}}>
            <Form.Label> Date de Fin</Form.Label>
            <DatePicker selected={this.state.Date2} onChange={date=>this.onChangeDate2(date)}/>
            </div>
            </div>
                           
           
        </BModal.Body>
        <BModal.Footer>
                                <input type="button" class="btn btn-warning" data-dismiss="modal" value="Annuler" onClick={()=>this.setState({modalVisible:false})}/>
                                <input type="submit" class="btn btn-success" value="Valider" onClick={()=>this.setState({modalVisible:false})} />
        </BModal.Footer>
            
            
            </form>
        </BModal>  
        
        
        
           
       
</div>


            
        );
    }
}

export default Rapport