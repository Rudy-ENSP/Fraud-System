import React, { Component } from 'react';
import '../../styles.css'
import axios from 'axios';
import { username ,password} from '../Login/login';

class NewPlaintes extends Component {


    constructor(props) {
        super(props);
        this.state = {
          Titre: '',
          Entité: "Aide et support",
          Content:'',
        };
      }
      onChangeTitre = (event) => {
        this.setState({Titre: event.target.value});
      }
      onChangeEntité = (event) => {
        this.setState({Entité: event.target.value});
      }
      onChangeContent = (event) => {
        this.setState({Content: event.target.value});
      }
      onCancel=()=>{
        this.setState({
          Titre:'',
          entité:'',
          Content:'',
        })
      }

      onSendPlainte=(event)=>{
        event.preventDefault();
          let newPlaintes={
              'cas' : this.state.Titre,
              'content': this.state.Content,
              'state': 'Cree',
              'entité':this.state.Entité,
              'user':username,
              'password':password
          };
          axios.post('http://localhost:8000/plaintes/create/', newPlaintes)
          .then(res => {
            console.log(res);
            console.log(res.data);
            if(res.data['state']==='success'){
              alert( "PLAINTE " +newPlaintes.cas +" crée avec succèss" );
              this.setState ({
                Titre: '',
                Entité: "Aide et support",
                Content:'',
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
        return (
        <div className='main'>

          <div style={{textAlign:'center', marginRight:50,marginBottom:20}}>
            <h3 >Création d'un nouveau plaintes</h3>
            <p>Il s'agit d'un formulaire de création de plaintes. Remplissez le et envoyez-nous vos problèmes .
              Notre système d'assistance s'occupera du reste</p>
          </div>


          <form onSubmit={this.onSendPlainte} className="needs-validation">
            <div className="form-row">
              <div className='col-md-6'>
                <label for='titre'></label>
                <input type='text' className ="form-control" name='Titre'
                  onChange={this.onChangeTitre} required />
              </div>

              <div className='col-md-6'>
                <label for='entités'> Choisir une entité </label>
                <select value={this.state.value} className ="form-control" 
                        onChange={this.onChangeEntité} required>
                  <option value="Aide et support">Aide et support</option>
                  <option value="Entité 2">Direction du CIRT</option>
                  <option value="Entité 3">Entité 3</option>
                  <option value="Entité 4">Entité 4</option>
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
  export default NewPlaintes