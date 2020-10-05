import React, { Component } from 'react';
import '../../styles.css';
import axios from 'axios';

class NewEntités extends Component {
    constructor(props) {
        super(props);
        this.state = {
          Nom: '',
          Hierarchie:'',
        };
      }
      onChangeNom = (event) => {
        this.setState({Nom: event.target.value});
        console.log('Nom ',event.target.value)
      }
      onChangeHierarchie = (event) => {
        this.setState({Hierarchie: event.target.value});
        console.log('Hierarchie ',event.target.value)
      }
      onCancel=()=>{
        this.setState({
          Nom:'',
          Hierarchie:'',
        })
      }

      onSendEntité=(event)=>{
        event.preventDefault()
          let newEntités={
              Nom : this.state.Nom,
              Hierarchie: this.state.Hierarchie,
          }
         
          axios.post('http://localhost:8000/plaintes/createEntite/', newEntités)
            .then(res => {console.log(res);
              console.log(res.data);
              if(res.data['state']==='success'){
                alert( "Entité :" +newEntités.Nom +" crée avec succèss" );
                this.setState ({
                  Nom:'',
                  Hierarchie:'',
                });
              }
              else{
                  alert('echec de lors de la création de notre entité')
              }
            })
            
      }
      render() {
        return (
        <div className='main'>

          <div style={{textAlign:'center', marginRight:50,marginBottom:20}}>
            
            <p style={{marginLeft:'50px',marginTop:'90px' ,fontWeight:'bold',fontSize:'1.1em'}}>Création Des Entités de Notre Entreprise</p>
          </div>


          <form onSubmit={this.onSendEntité} className="needs-validation" novalidate>
            <div className="form-row">
              <div className='col-md-12' style={{marginTop:'12px',marginLeft:'50px'}}>
                <label for='Nom' style={{fontWeight:'bold'}}>Entrer le nom de L'Entité</label>
                <input type='text' className ="form-control" name='Nom'
                  onChange={this.onChangeNom} required />
              </div>
            </div>
            <div className='form-group col-md-12 mb-3' style={{marginTop:'12px',marginLeft:'38px'}}>
            <label for='Hiérarchie' style={{fontWeight:'bold'}}>Hierarchie</label>
                  <select value={this.state.Hierarchie} className ="form-control" 
                          onChange={this.onChangeHierarchie} required>
                    <option value="1">Direction</option>
                    <option value="2">Sous-Direction</option>
                    <option value="3">Cellule</option>
                    <option value="4">Service</option>
                    <option value="5">Equipe</option>
                    <option value="6">Collaborateurs</option>
                    <option value="7">Stagiaires</option>
                  </select>
            </div>
            <div >
            
                </div>
            <div style={{marginLeft:'50%'}}>
            <input type="submit" className="btn btn-primary" value="Créer" />
            <button style={{marginLeft:10}} onClick={this.onCancel} className="btn btn-danger">Annuler</button>
            </div>
          </form>
         
          </div>
        );
      }
}

export default NewEntités