import React, { Component } from 'react';
import '../../styles.css'
import axios from 'axios';

class GestionAdmin extends Component {

    constructor(props){
        super(props)
        this.state={
            modalVisible:false,
            admins:[],
            id:'',
            Nom:'',
            first_name:'',
            email:'',
        }
    }
    componentDidMount() {

        axios.get('http://localhost:8000/ticket/listeAdmin/')
          .then(res => {
            const admins = res.data;
            this.setState({admins: admins  });
            console.log(admins)
          })
          .catch(function (error) {
            console.log(error);
          });
      }

    render(){
        const Admins = this.state.admins

          const content = Admins.map((admin) =>
            
                <tr onClick={
                    ()=>this.setState({
                        modalVisible:true,
                        id:Admins.id,
                        Nom:Admins.last_name,
                        first_name:Admins.first_name,
                        email:Admins.email,
                        })}>
                    <th scope="row">{admin.id}</th>
                    <td>{admin.last_name}</td>
                    <td>{admin.first_name}</td>
                    <td>{admin.email}</td>
                </tr>
           
          );

         
        function showTable(){

            
              if(Admins.length <=8 && Admins.length>=1){
                return (
                    <div className="container-fluid">
              
                        <div className="table-wrapper-scroll-y my-custom-scrollbar">
                            <table className="table table-bordered table-hover mb-0">
                                <thead style={{backgroundColor:'orange'}}>
                                    <tr >
                                    <th scope="col">#</th>
                                    <th scope="col">Nom</th>
                                    <th scope="col">Prenom</th>
                                    <th scope="col">Email</th>
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
              if(Admins.length>8){
                return (
                    <div className="container-fluid">
              
                        <div className="table-wrapper-scroll-y my-custom-scrollbar">
                            <table className="table table-bordered table-hover mb-0">
                                <thead style={{backgroundColor:'orange'}}>
                                    <tr >
                                    <th scope="col">#</th>
                                    <th scope="col">Nom</th>
                                    <th scope="col">Prenom</th>
                                    <th scope="col">Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {content}
                                </tbody>
                                <tfoot style={{backgroundColor:'orange'}}>
                                    <tr >
                                        <th scope="col">#</th>
                                        <th scope="col">Nom</th>
                                        <th scope="col">Prenom</th>
                                        <th scope="col">Email</th>
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
                    <h3>administrateurs</h3>
                    <p>Liste de tous les administrateurs</p>
                </div>
                {showTable()}
            </div>
        );
    }
}

export default GestionAdmin