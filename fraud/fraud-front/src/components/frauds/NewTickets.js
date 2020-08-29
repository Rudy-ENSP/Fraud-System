import React, { Component } from 'react';
import '../../styles.css'
import axios from 'axios';
import { utilisateur ,password} from '../Accueil';

class NewTickets extends Component {


    constructor(props) {
        super(props);
        this.state = {
          Titre: '',
          Service: "Aide et support",
          Content:'',
          services:[],
        };
      }
      onChangeTitre = (event) => {
        this.setState({Titre: event.target.value});
      }
      onChangeService = (event) => {
        this.setState({Service: event.target.value});
      }
      onChangeContent = (event) => {
        this.setState({Content: event.target.value});
      }
      onCancel=()=>{
        this.setState({
          Titre:'',
          service:'',
          Content:'',
        })
      }


	componentDidMount() {
        axios.get('http://localhost:8000/ticket/listeService/')
          .then(res => {
            const services = res.data;
            this.setState({services: services  });
          })
          .catch(function (error) {
            console.log(error);
          });
      }
      
      onSendTicket=(event)=>{
        event.preventDefault();
          let newTickets={
              'cas' : this.state.Titre,
              'content': this.state.Content,
              'state': 'Cree',
              'service':this.state.Service,
              'user':utilisateur,
              'password':password
          };
          axios.post('http://localhost:8000/ticket/create/', newTickets)
          .then(res => {
            console.log(res);
            console.log(res.data);
            if(res.data['state']==='success'){
              alert( "TICKET " +newTickets.cas +" crée avec succèss" );
              this.setState ({
                Titre: '',
                Service: "Aide et support",
                Content:'',
              });
            }
            else{
                alert('echec de lors de la création du ticket')
            }
          })
          .catch(err => console.log(err));

          //
         
      }

      



      render() {
      
      const Services = this.state.services
        

          const content = Services.map((service) =>
            
                
                    <option value={service.name}>{service.name}</option>
                
           
          );
      
        return (
        <div className='main'>

          <div style={{textAlign:'center', marginRight:50,marginBottom:20}}>
            <h3 >Création d'un nouveau ticket</h3>
            <p>Il s'agit d'un formulaire de création de tickets. Remplissez le et envoyez-nous vos problèmes / doutes / suggestions.
              Notre système d'assistance vous répondra dans les plus brefs délais.</p>
          </div>


          <form onSubmit={this.onSendTicket} className="needs-validation">
            <div className="form-row">
              <div className='col-md-6'>
                <label for='titre'></label>
                <input type='text' className ="form-control" name='Titre'
                  onChange={this.onChangeTitre} required />
              </div>

              <div className='col-md-6'>
                <label for='services'> Choisir un service </label>
                <select value={this.state.value} className ="form-control" 
                        onChange={this.onChangeService} required>
                        
                  {content}
                  
                </select>
              </div>
            </div>
            <div className='form-group col-md-12 mb-3' style={{marginTop:20}}>
              <label for='content'>Description</label>
              <textarea value={this.state.value} className ="form-control" style={{height:180}}
                        onChange={this.onChangeContent} required/>
            </div>
            <div style={{marginLeft:'40%'}}>
            <input type="submit" className="btn btn-primary" value="Créer" />
            <button style={{marginLeft:10}} onClick={this.onCancel} className="btn btn-danger">Annuler</button>
            </div>
          </form>
         
          </div>
        );
      }
  }
  export default NewTickets
