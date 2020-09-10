import React, { Component } from 'react';
import '../../styles.css';
import axios from 'axios';

class NewEntités extends Component {
    constructor(props) {
        super(props);
        this.state = {
          Nom: '',
          Entité:'',
        };
      }
      onChangeNom = (event) => {
        this.setState({Nom: event.target.value});
        console.log('Nom ',event.target.value)
      }
      onChangeEntité = (event) => {
        this.setState({Entité: event.target.value});
        console.log('Entité ',event.target.value)
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
            
            <p style={{marginLeft:'50px',marginTop:'90px' ,fontWeight:'bold',fontSize:'1.1em'}}>Création Des Categories De Plainte à Traiter</p>
          </div>


          <form onSubmit={this.onSendCategoriePlainte} className="needs-validation" novalidate>
            <div className="form-row">
              <div className='col-md-12' style={{marginTop:'12px',marginLeft:'50px'}}>
                <label for='Nom' style={{fontWeight:'bold'}}>Entrer le nom de La Categorie</label>
                <input type='text' className ="form-control" name='Nom'
                  onChange={this.onChangeNom} required />
              </div>
            </div>
            <div className='form-group col-md-12 mb-3' style={{marginTop:'12px',marginLeft:'38px'}}>
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