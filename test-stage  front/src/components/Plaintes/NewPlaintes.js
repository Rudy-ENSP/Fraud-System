import React, { Component } from 'react';
import '../../styles.css'


import axios from 'axios';
import { username ,password} from '../Login/login';

class NewPlaintes extends Component {

  componentDidMount() {
    axios.get('http://localhost:8000/plaintes/listeEntite/')
      .then(res => {
        const entités = res.data;
        this.setState({entités: entités  });
        console.log('plaintes', entités)
      })
      .catch(function (error) {
        console.log(error);
      });
  }
    constructor(props) {
        super(props);
        this.state = {
          Titre: '',
          Entité: "Collaborateur",
          Description:'',
          entités:[],
        };
      }
      onChangeTitre = (event) => {
        this.setState({Titre: event.target.value});
      }
      onChangeEntité = (event) => {
        this.setState({Entité: event.target.value});
      }
      onChangeDescription = (event) => {
        this.setState({Description: event.target.value});
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
          let newPlainte={
              'cas' : this.state.Titre,
              'description': this.state.Description,
              'state': 'ajoutée',
              'entité':this.state.Entité,
              'user':username,
              'password':password
          };
          axios.post('http://localhost:8000/plaintes/enregistrer/', newPlainte)
          .then(res => {
            console.log(res);
            console.log(res.data);
            if(res.data['state']==='success'){
              alert( "PLAINTE " +newPlainte.cas.toLocaleUpperCase() +" crée avec succèss" );
              this.setState ({
                Titre: '',
                Entité: "Collaborateur",
                Description:'',
              });
            }
            else{
                alert('echec de lors de la création de la  plaintes')
            }
          })
          .catch(err => console.log(err));

          //
         
      }

      



      render() {
        const Entités = this.state.entités
        const content = Entités.map((value) =>
                
                <option key={value.id}>{value.nom}</option>
               
                
          );
        return (
        <div className='main'>

          <div style={{textAlign:'center', marginRight:50,marginBottom:20}}>
            <h3 >Création d'une nouvelle plainte</h3>
            <p style={{marginLeft:'50px',marginTop:'20px' ,fontWeight:'bold',fontSize:'1.1em' }}>Formulaire de Création de Plaintes. Remplissez et envoyez-nous vos problèmes.
              Notre système s'occupera du reste</p>
          </div>


          <form onSubmit={this.onSendPlainte} className="needs-validation">
            <div id="formulairenewplainte" className="form-row">
              <div id="titre" className='col-md-6'>
                <label for='titre' style={{fontWeight:"bold"}}>Titre</label>
                <input type='text' className ="form-control" name='Titre'
                  onChange={this.onChangeTitre} required />
              </div>

              <div id="choix1" className='col-md-6'>
                    
                        <label for='categorie' style={{fontWeight:"bold"}}> Choisir La Categorie de la Plainte </label>
                        <div >
                          <select value={this.state.value} className ="form-control" 
                                  onChange={this.onChangeCategorie} required>
                            <option value="Web-Defacement">Web-Defacement</option>
                            <option value="Spam">Spam</option>
                            <option value="Ingenierie Sociale">Ingenierie Sociale</option>
                            <option value="FleeceWare">FleeceWare</option>
                          </select>
                        </div> 
                
              </div>
              <div id="choix2" className='col-md-6'>
                <label for='entités' style={{fontWeight:"bold"}}> Choisir une entité </label>
                <div >
                  <select value={this.state.value} className ="form-control" 
                          onChange={this.onChangeEntité} required>
                    <option value="CIRT">Equipe Aide</option>
                    <option value="Entité 2">Direction du CIRT</option>
                    <option value="Entité 3">Reseau et Systeme</option>
                    <option value="Entité 4">Entité 4</option>
                  </select>
                </div>
              </div>
            </div>
            <div className='form-group col-md-12 mb-3' style={{marginTop:'12px',marginLeft:'50px'}}>
                  <div><label for='description' style={{fontWeight:"bold"}}>Description</label></div> 
                  <div><textarea value={this.state.value} className ="form-control" style={{height:90}}
                              onChange={this.onChangeDescription} required/></div>
            </div>
            <div style={{marginLeft:'90px'}}>
            <input type="submit" className="btn btn-primary" value="Créer" />
            <button style={{marginLeft:10}} onClick={this.onCancel} className="btn btn-danger">Annuler</button>
            </div>
          </form>
         
          </div>
        );
      }
  }
  export default NewPlaintes