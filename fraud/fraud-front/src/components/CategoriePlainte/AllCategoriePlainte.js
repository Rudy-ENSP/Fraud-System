import React, { Component } from 'react';
import Modal from 'react-modal'
import '../../styles.css';
import axios from 'axios';
var listeCategoriePlainte
class AllCategoriePlainte extends Component {
    constructor(props){
        super(props)
        this.state={
            modalVisible:false,
            categoriePlainte:[],
            id:'',
            Nom:'',
            Adresse:'',
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

          const content = CategoriePlainte.map((categoriePlainte) =>
            
                <tr onClick={
                    ()=>this.setState({
                        modalVisible:true,
                        id:categoriePlainte.id,
                        Nom:categoriePlainte.name,                      
                        Entité:categoriePlainte.entité
                        })}>
                    <th scope="row">{categoriePlainte.id}</th>
                    <td>{categoriePlainte.name}</td>
                   
                    <td>{categoriePlainte.entité}</td>
                </tr>
           
          );

         
        function showTable(){

            
              if(CategoriePlainte.length <=8 && CategoriePlainte.length>=1){
                return (
                    <div className="container-fluid">
              
                        <div className="table-wrapper-scroll-y my-custom-scrollbar" style={{marginLeft:'150px'}} >
                            <table className="table table-bordered table-hover mb-0">
                                <thead style={{backgroundColor:'#007bff'}}>
                                    <tr >
                                    <th scope="col">Indice</th>
                                    <th scope="col">Nom</th>
                                    <th scope="col">Entité</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {content}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
                }
              if(CategoriePlainte.length>8){
                return (
                    <div className="container-fluid">
              
                        <div className="table-wrapper-scroll-y my-custom-scrollbar" style={{marginLeft:'150px'}}>
                            <table className="table table-bordered table-hover mb-0">
                                <thead style={{backgroundColor:'#007bff'}}>
                                    <tr >
                                    <th scope="col">Indice</th>
                                    <th scope="col">Nom</th>
                                    
                                    <th scope="col">Entité</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {content}
                                </tbody>
                                <tfoot style={{backgroundColor:'#007bff'}}>
                                    <tr >
                                        <th scope="col">Indice</th>
                                        <th scope="col">Nom</th>
                                        <th scope="col">Entité</th>
                                        
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                )
              }
            }
          
        return (
            <div className="main">
                <div style={{marginLeft:'70px',marginTop:'90px' ,fontWeight:'bold',fontSize:'1.1em'}}>
                    <h3>Les CategoriePlainte</h3>
                    <p>Ici Vous pouvez Consulter toutes les Categories de Plainte qui sont Enregistrées</p>
                </div>
                {showTable()}
               
            </div>
        );
    }
}

export default AllCategoriePlainte