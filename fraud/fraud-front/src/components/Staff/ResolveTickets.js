import React, { Component } from 'react';
import '../../styles.css'
import Modal from 'react-modal'
import Box from '@material-ui/core/Box';
import axios from 'axios';

class ResolveTickets extends Component {
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
            addresponse:'',
        }
    }

    onChangeContent = (event) => {
        this.setState({addresponse: event.target.value});
      }

    componentDidMount() {
        axios.get('http://localhost:8000/ticket/unsolved')
          .then(res => {
            const tickets = res.data;
            this.setState({tickets: tickets  });
            console.log('tickets', tickets)
          })
          .catch(function (error) {
            console.log(error);
          });
      }
      sendResponse(response,id_ticket){
        let data = {'id':id_ticket,'response':response}
         axios.post('http://localhost:8000/ticket/edit/',data)
         .then(res => {
           console.log(res.data)
         })
         .catch(function (error) {
           console.log(error);
         });
         console.log('reponse ',response)
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
                        <Box bgcolor="grey.300" style={{fontSize:18,fontWeight:"bold",textAlign:"center"}}>Message</Box>
                        <Box style={{marginTop:10}} >{this.state.contenu}</Box>
                    </Box>
                </div>
                <div>
                    <form onSubmit={(event)=>{event.preventDefault(); this.sendResponse(this.state.addresponse,this.state.id)}} style={{margin:20}}>
                        <div className='form-group col-md-13 mb-3'>
                            <label for='content'>Ajouter un commentaire/une réponse</label>
                            <textarea value={this.state.value} placeholder={this.state.reponse} className ="form-control" 
                             onChange={this.onChangeContent} style={{height:100}} required/>
                        </div>
                        <div style={{marginLeft:'30%'}}>
                            <input type="submit" onClick={()=>this.setState({modalVisible:false})} className="btn btn-primary" value="Envoyer" />
                            <button  style={{marginLeft:10}} onClick={()=>this.setState({modalVisible:false})}
                                className="btn btn-warning">Fermer la fenêtre</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    render(){

        const MyTickets = this.state.tickets


        function TicketsNonResolus(){

            const ticketsNonResolus=[]

            MyTickets.map((ticket)=>
            {
                if(ticket.state!='resolu'){
                    ticketsNonResolus.push(ticket)
                   }
            }
               
                  
            )
            return ticketsNonResolus
        }
          

          const content = TicketsNonResolus().map((ticket) =>
          <tr onClick={
            ()=>this.setState({
                modalVisible:true,
                id:ticket.id,
                title:ticket.title,
                service:ticket.service,
                auteur:ticket.auteur,
                date:ticket.date_création,
                etat:ticket.state,
                contenu:ticket.details
                })}>
              <th scope="row">{ticket.id}</th>
              <td>{ticket.title}</td>
              <td>{ticket.service}</td>
              <td>{ticket.auteur}</td>
              <td>{ticket.date_création}</td>
              <td>{ticket.state}</td>
          </tr>
          );


          function showTable(){
             
              if(TicketsNonResolus().length ===0){
                  return(
                      <h5 style={{textAlign:'center',marginTop:100}}>
                          Aucun ticket dans cette rebrique</h5>
                  )
              }
              if(TicketsNonResolus().length <=8 && TicketsNonResolus().length>=1){
                return (
                    <div className="container-fluid">
              
                        <div className="table-wrapper-scroll-y my-custom-scrollbar">
                            <table className="table table-bordered table-hover mb-0">
                                <thead style={{backgroundColor:'orange'}}>
                                    <tr >
                                    <th scope="col">#</th>
                                    <th scope="col">Titre</th>
                                    <th scope="col">Service</th>
                                    <th scope="col">Auteur</th>
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
              if(TicketsNonResolus().length>8){
                return (
                    <div className="container-fluid">
              
                        <div className="table-wrapper-scroll-y my-custom-scrollbar">
                            <table className="table table-bordered table-hover mb-0">
                                <thead style={{backgroundColor:'orange'}}>
                                    <tr >
                                    <th scope="col">#</th>
                                    <th scope="col">Titre</th>
                                    <th scope="col">Service</th>
                                    <th scope="col">Auteur</th>
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
                                        <th scope="col">Auteur</th>
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
                    <h3>tickets non resolus</h3>
                    <p>Ici vous pouvez voir la liste de tous les tickets non resolu</p>
                </div>
                {showTable()}
                {this.ShowModal()}
            </div>
        );
    }
}

export default ResolveTickets