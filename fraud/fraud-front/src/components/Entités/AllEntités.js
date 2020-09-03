import React, { Component } from 'react';
import Modal from 'react-modal'
import '../../styles.css';
import axios from 'axios';

class AllEntités extends Component {
    constructor(props){
        super(props)
        this.state={
            modalVisible:false,
            entités:[],
            id:'',
            Nom:'',
            Adresse:'',
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8000/plaintes/listeEntité/')
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
                        Adresse:entité.addresse
                        })}>
                    <th scope="row">{entité.id}</th>
                    <td>{entité.name}</td>
                   
                    <td>{entité.addresse}</td>
                </tr>
           
          );

         
        function showTable(){

            
              if(Entités.length <=8 && Entités.length>=1){
                return (
                    <div className="container-fluid">
              
                        <div className="table-wrapper-scroll-y my-custom-scrollbar">
                            <table className="table table-bordered table-hover mb-0">
                                <thead style={{backgroundColor:'orange'}}>
                                    <tr >
                                    <th scope="col">#</th>
                                    <th scope="col">Nom</th>
                                    <th scope="col">Adresse</th>
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
              
                        <div className="table-wrapper-scroll-y my-custom-scrollbar">
                            <table className="table table-bordered table-hover mb-0">
                                <thead style={{backgroundColor:'orange'}}>
                                    <tr >
                                    <th scope="col">#</th>
                                    <th scope="col">Nom</th>
                                    
                                    <th scope="col">Adresse</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {content}
                                </tbody>
                                <tfoot style={{backgroundColor:'orange'}}>
                                    <tr >
                                        <th scope="col">#</th>
                                        <th scope="col">Nom</th>
                                        <th scope="col">Adresse</th>
                                        
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
                <div style={{textAlign:'center',marginBottom:20}}>
                    <h3>Mes entités</h3>
                    <p>Ici vous pouvez voir toutes les entités que vous avez créé</p>
                </div>
                {showTable()}
               
            </div>
        );
    }
}

export default AllEntités