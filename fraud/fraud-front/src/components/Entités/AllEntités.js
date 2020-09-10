import React, { Component } from 'react';
import Modal from 'react-modal'
import '../../styles.css';
import axios from 'axios';
var listeEntités
class AllEntités extends Component {
    constructor(props){
        super(props)
        this.state={
            modalVisible:false,
            entités:[],
            id:'',
            Nom:'',
            Hierachie:'',
        }
    }

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
    
    render(){

      const Entités = this.state.entités
        /*const Entités = [
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

          const content = Entités.map((entité) =>
            
                <tr onClick={
                    ()=>this.setState({
                        modalVisible:true,
                        id:entité.id,
                        Nom:entité.name,                      
                        Hiérarchie:entité.hierarchie
                        })}>
                    <th scope="row">{entité.id}</th>
                    <td>{entité.name}</td>
                   
                    <td>{entité.hierarchie}</td>
                </tr>
           
          );

         
        function showTable(){

            
              if(Entités.length <=8 && Entités.length>=1){
                return (
                    <div className="container-fluid">
              
                        <div className="table-wrapper-scroll-y my-custom-scrollbar" style={{marginLeft:'150px'}} >
                            <table className="table table-bordered table-hover mb-0">
                                <thead style={{backgroundColor:'#007bff'}}>
                                    <tr >
                                    <th scope="col">Indice</th>
                                    <th scope="col">Nom</th>
                                    <th scope="col">Hierarchie</th>
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
              if(Entités.length>8){
                return (
                    <div className="container-fluid">
              
                        <div className="table-wrapper-scroll-y my-custom-scrollbar" style={{marginLeft:'150px'}}>
                            <table className="table table-bordered table-hover mb-0">
                                <thead style={{backgroundColor:'#007bff'}}>
                                    <tr >
                                    <th scope="col">Indice</th>
                                    <th scope="col">Nom</th>
                                    
                                    <th scope="col">Hierarchie</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {content}
                                </tbody>
                                <tfoot style={{backgroundColor:'#007bff'}}>
                                    <tr >
                                        <th scope="col">Indice</th>
                                        <th scope="col">Nom</th>
                                        <th scope="col">Hierarchie</th>
                                        
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
                    <h3>Mes entités</h3>
                    <p>Ici vous pouvez voir toutes les entités que vous avez créé</p>
                </div>
                {showTable()}
               
            </div>
        );
    }
}

export default AllEntités