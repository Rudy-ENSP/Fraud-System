import React, { Component } from 'react';
import Modal from 'react-modal'
import Box from '@material-ui/core/Box';
import '../../styles.css'
import axios from 'axios';
import { utilisateur ,password,isLoginAdmin,isLoginClient} from '../Accueil';

class ResolvedTickets extends Component {

    constructor(props){
        super(props)
        this.state={
            modalVisible:false,
            tickets:[],
            id:'',
            title:'',
            service:'',
            auteur:'',
            date:'',
            etat:'',
            contenu:'',
            response:'',
           
        }
    }

    componentDidMount() {
		let data={
              'user':utilisateur,
              'password':password
          };
        axios.post('http://localhost:8000/ticket/solved/',data)
          .then(res => {
            const tickets = res.data;
            this.setState({tickets: tickets  });
            console.log(tickets)
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    ShowModal(){
    
        return(
            <div className='main'>
                <Modal isOpen={this.state.modalVisible} closeTimeoutMS={500} contentLabel="modal"
                    style={{
                        overlay: {
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.8)'
                        },
                        content: {
                        position: 'absolute',
                        top: '40px',
                        left: '30%',
                        right: '30%',
                        bottom: '40px',
                        border: '1px solid black',
                        background: '#E0E0E0',
                        overflow: 'auto',
                        WebkitOverflowScrolling: 'touch',
                        borderRadius: '10px',
                        outline: 'none',
                        padding: '0px'
                        }
                    }}>
                    {this.contentModal()}
                </Modal>
    
            </div>
        )
    }


    contentModal=()=>{
        return(
            <div>
                <div style={{backgroundColor:"black",height:30 ,margin:20}}>
                    
                    <h5 style={{textAlign:"center",paddingTop:8 ,color:'white'}}>
                     {this.state.title}</h5>
                </div>
                <div style={{ width: '100%' }}>

                <Box display="flex" flexDirection="row" p={1} m={1}
                 bgcolor="background.paper" justifyContent='space-between'>
                    <Box p={1} bgcolor="grey.300">
                        <Box style={{textAlign:'center',color:'black',fontWeight:'bold',fontSize:16}}>service </Box>
                        <Box style={{textAlign:"center"}}>{this.state.service}</Box>
                    </Box>
                    <Box p={1} bgcolor="grey.300">
                        <Box style={{textAlign:'center',color:'black',fontWeight:'bold' ,fontSize:16}}>auteur </Box>
                        <Box style={{textAlign:"center"}}>{this.state.auteur}</Box>
                    </Box>
                    <Box  p={1} bgcolor="grey.300">
                        <Box style={{textAlign:'center',color:'black' ,fontWeight:'bold',fontSize:16}}>date de création</Box>
                        <Box style={{textAlign:"center"}}> {this.state.date}</Box>
                    </Box>
                    
                </Box>
                </div>
                <div>
                    <Box display="flex" flexDirection='column'  bgcolor="background.paper" p={1} m={1}>
                        <Box bgcolor="grey.300" style={{fontSize:18,fontWeight:"bold",textAlign:"center"}}>Details</Box>
                        <Box style={{marginTop:10}} >{this.state.contenu}</Box>
                    </Box>
                </div>
                <div>
                    <Box display="flex" flexDirection='column'  bgcolor="background.paper" p={1} m={1}>
                        <Box bgcolor="grey.300" style={{fontSize:18,fontWeight:"bold",textAlign:"center"}}>Response</Box>
                        <Box style={{marginTop:10}} >{this.state.response}</Box>
                    </Box>
                </div>
                <div style={{marginLeft:'30%'}}>
                            <button  style={{marginLeft:10}} onClick={()=>this.setState({modalVisible:false})}
                                className="btn btn-warning">Fermer la fenêtre</button>
                        </div>
               
            </div>
        )
    }
    
    render(){

        const MyTickets = this.state.tickets /*[
            {id: 1, title: 'Bonjour, monde', Service: 'aide et support',Auteur:'cardoun07',Date:'12/05/2020',Etat:'resolu',Content:'Nothing'},
            {id: 2, title: 'bonjour, monde', Service: 'aide et support',Auteur:'cardoun07',Date:'12/05/2020',Etat:'En attente',Content:'Nothing'},
            {id: 3, title: 'Bonjour, monde', Service: 'aide et support',Auteur:'cardoun07',Date:'12/05/2020',Etat:'resolu',Content:'Nothing'},
            {id: 4, title: 'bonjour, monde', Service: 'aide et support',Auteur:'cardoun07',Date:'12/05/2020',Etat:'En attente',Content:'Nothing'},
            {id: 5, title: 'Bonjour, monde', Service: 'aide et support',Auteur:'cardoun07',Date:'12/05/2020',Etat:'resolu',Content:'Nothing'},
            {id: 6, title: 'bonjour, monde', Service: 'aide et support',Auteur:'cardoun07',Date:'12/05/2020',Etat:'En attente',Content:'Nothing'},
            {id: 7, title: 'Bonjour, monde', Service: 'aide et support',Auteur:'cardoun07',Date:'12/05/2020',Etat:'En attente',Content:'Nothing'},
            {id: 8, title: 'bonjour, monde', Service: 'aide et support',Auteur:'cardoun07',Date:'12/05/2020',Etat:'En attente',Content:'Nothing'},
            {id: 9, title: 'Bonjour, monde', Service: 'aide et support',Auteur:'cardoun07',Date:'12/05/2020',Etat:'resolu',Content:'Nothing'},
            {id: 10, title: 'bonjour, monde', Service: 'aide et support',Auteur:'cardoun07',Date:'12/05/2020',Etat:'En attente',Content:'Nothing'},
            {id: 11, title: 'Bonjour, monde', Service: 'aide et support',Auteur:'cardoun07',Date:'12/05/2020',Etat:'En attente',Content:'Nothing'},
            {id: 12, title: 'bonjour, monde', Service: 'aide et support',Auteur:'cardoun07',Date:'12/05/2020',Etat:'En attente',Content:'Nothing'},
            {id: 13, title: 'Bonjour, monde', Service: 'aide et support',Auteur:'cardoun07',Date:'12/05/2020',Etat:'resolu',Content:'Nothing'},
            {id: 14, title: 'bonjour, monde', Service: 'aide et support',Auteur:'cardoun07',Date:'12/05/2020',Etat:'resolu',Content:'Nothing'},
          ];*/

        function TicketResolu(){
            const ticketResolu=[]
            MyTickets.map((ticket)=>ticketResolu.push(ticket))
			console.log(MyTickets)
            return ticketResolu
        }
          
         const content = TicketResolu().map((ticket) =>
          <tr onClick={
              ()=>this.setState({
                  modalVisible:true,
                  id:ticket.id,
                  title:ticket.title,
                  service:ticket.service,
                  auteur:ticket.auteur,
                  date:ticket.date_création,
                  etat:ticket.state,
                  contenu:ticket.details,
                  response:ticket.response,
                  })}>
              <th scope="row">{ticket.id}</th>
              <td>{ticket.title}</td>
              <td>{ticket.service}</td>
              <td>{ticket.date_création}</td>
              <td>{ticket.state}</td>
          </tr>
          );

          function showTable(){
             
              if(TicketResolu().length ===0){
                  return(
                      <h5 style={{textAlign:'center',marginTop:100}}>Aucun ticket dans cette rubrique</h5>
                  )
              }
              if(TicketResolu().length <=8 && TicketResolu().length>=1){
                return (
                    <div className="container-fluid">
              
                        <div className="table-wrapper-scroll-y my-custom-scrollbar">
                            <table className="table table-bordered table-hover mb-0 table">
                                <thead style={{backgroundColor:'orange'}}>
                                    <tr >
                                    <th scope="col">#</th>
                                    <th scope="col">Titre</th>
                                    <th scope="col">Service</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Etat</th>
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
              if(TicketResolu().length>8){
                return (
                    <div className="container-fluid">
              
                        <div className="table-wrapper-scroll-y my-custom-scrollbar">
                            <table className="table table-bordered table-hover mb-0">
                                <thead style={{backgroundColor:'orange'}}>
                                    <tr >
                                    <th scope="col">#</th>
                                    <th scope="col">Titre</th>
                                    <th scope="col">Service</th>
                                   
                                    <th scope="col">Date</th>
                                    <th scope="col">Etat</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {content}
                                </tbody>
                                <tfoot style={{backgroundColor:'orange'}}>
                                    <tr >
                                        <th scope="col">#</th>
                                        <th scope="col">Titre</th>
                                        <th scope="col">Service</th>
                                       
                                        <th scope="col">Date</th>
                                        <th scope="col">Etat</th>
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
                    <h3>Mes tickets resolus</h3>
                    <p>Ici vous pouvez voir toutes les réponses apportées à vos tickets</p>
                </div>
                {showTable()}
                {this.ShowModal()}
            </div>
        );
    }
}

export default ResolvedTickets