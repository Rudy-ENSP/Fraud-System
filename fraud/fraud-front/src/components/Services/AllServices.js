import React, { Component } from 'react';
import Modal from 'react-modal'
import '../../styles.css';
import axios from 'axios';

class AllServices extends Component {
    constructor(props){
        super(props)
        this.state={
            modalVisible:false,
            services:[],
            id:'',
            Nom:'',
            Adresse:'',
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8000/ticket/listeService/')
          .then(res => {
            const services = res.data;
            this.setState({services: services  });
            console.log('tickets', services)
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    
    render(){

      const Services = this.state.services
        /*const Services = [
            {id: 1, Nom: 'Aide support',Date:'12/05/2020',Description:'Nothing'},
            {id: 2, Nom: 'Aide support',Date:'12/05/2020',Description:'Nothing'},
            {id: 3, Nom: 'Aide support',Date:'12/05/2020',Description:'Nothing'},
            {id: 4, Nom: 'Aide support',Date:'12/05/2020',Description:'Nothing'},
            {id: 5, Nom: 'Aide support',Date:'12/05/2020',Description:'Nothing'},
            {id: 6, Nom: 'Aide support',Date:'12/05/2020',Description:'Nothing'},
            {id: 7, Nom: 'Aide support',Date:'12/05/2020',Description:'Nothing'},
            {id: 8, Nom: 'Aide support',Date:'12/05/2020',Description:'Nothing'},
            {id: 9, Nom: 'Aide support',Date:'12/05/2020',Description:'Nothing'},
            {id: 10, Nom: 'Aide support',Date:'12/05/2020',Description:'Nothing'},
            {id: 11, Nom: 'Aide support',Date:'12/05/2020',Description:'Nothing'},
            {id: 12, Nom: 'Aide support',Date:'12/05/2020',Description:'Nothing'},
            {id: 13, Nom: 'Aide support',Date:'12/05/2020',Description:'Nothing'},
            {id: 14, Nom: 'Aide support',Date:'12/05/2020',Description:'Nothing'},
          ];*/

          const content = Services.map((service) =>
            
                <tr onClick={
                    ()=>this.setState({
                        modalVisible:true,
                        id:service.id,
                        Nom:service.name,                      
                        Adresse:service.addresse
                        })}>
                    <th scope="row">{service.id}</th>
                    <td>{service.name}</td>
                   
                    <td>{service.addresse}</td>
                </tr>
           
          );

         
        function showTable(){

            
              if(Services.length <=8 && Services.length>=1){
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
              if(Services.length>8){
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
                    <h3>Mes services</h3>
                    <p>Ici vous pouvez voir tous les services que vous avez créé</p>
                </div>
                {showTable()}
               
            </div>
        );
    }
}

export default AllServices