import React, { Component } from 'react';
import Modal from 'react-modal'
import Box from '@material-ui/core/Box';
import axios from 'axios';
import '../../styles.css';
import { username ,password, isLoginAdmin} from '../Login/login';

class AllPlaintes extends Component {

    constructor(props){
        super(props)
        this.state={
            modalVisible:false,
            plainte:[],
            id:'',
            title:'',
            entité:'',
            auteur:'',
            date:'',
            etat:'',
            contenu:'',
            reponse:'Aucune reponse pour le moment',
            addresponse:'',
        }
    }


    //on recupère les données back end

    componentDidMount() {
		let data={
              'user':username,
              'password':password
          };
          axios.post('http://localhost:8000/plaintes/listePlainte/',data)
          .then(res => {
            const plainte = res.data;
            this.setState({plainte: plainte  });
            console.log(plainte)
          })
          .catch(function (error) {
            console.log(error);
          });
      }


      isResolu(id_plainte){
       let data={'id':id_plainte}
        axios.post('http://localhost:8000/plaintes/validate/',data)
        .then(res => {
          console.log(res.data)
        })
        .catch(function (error) {
          console.log(error);
        });
        this.setState({modalVisible:false})
        console.log('id de la plainte ',id_plainte)
      }


      onChangeContent = (event) => {
        this.setState({addresponse: event.target.value});
      }


      sendResponse(response,id_plainte){
       let data = {'id':id_plainte,'response':response}
        axios.post('http://localhost:8000/plaintes/edit/',data)
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
                        top: 15,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.8)'
                        },
                        content: {
                        position: 'absolute',
                        top: '60px',
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

    IsAdmin=()=>{
        if(isLoginAdmin){
            return(
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
            )
        }
        else{
            return(
                <div>
                    <Box display="flex" flexDirection='column'  bgcolor="background.paper" p={1} m={1}>
                        <Box bgcolor="grey.300" style={{fontSize:16,fontWeight:"bold",textAlign:"center"}}>Reponse</Box>
                        <Box style={{marginTop:8}} >{this.state.reponse}</Box>
                    </Box>
                    <button  style={{marginLeft:'25%'}} onClick={()=>                          
                            this.isResolu(this.state.id)      
                    }
                                className="btn btn-primary">plainte resolu</button>
                    <button  style={{marginLeft:10}} onClick={()=>this.setState({modalVisible:false})}
                                className="btn btn-warning">Fermer la fenêtre</button>
                </div>
            )
        }
    }

    contentModal=()=>{
        return(
            <div>
                <div style={{backgroundColor:"#007bff",height:30 ,margin:20}}>
                    
                    <h5 style={{textAlign:"center",paddingTop:5 ,color:'white'}}>
                     {this.state.title}</h5>
                </div>
                <div style={{ width: '100%' }}>

                <Box display="flex" flexDirection="row" p={1} m={1}
                    bgcolor="background.paper" justifyContent='space-between'>
                    <Box p={1} bgcolor="grey.300">
                        <Box style={{textAlign:'center',color:'black',fontWeight:'bold',fontSize:16}}>Entité </Box>
                        <Box style={{textAlign:"center"}}>{this.state.entité}</Box>
                    </Box>
                    <Box p={1} bgcolor="grey.300">
                        <Box style={{textAlign:'center',color:'black',fontWeight:'bold' ,fontSize:16}}>Auteur </Box>
                        <Box style={{textAlign:"center"}}>{this.state.auteur}</Box>
                    </Box>
                    <Box  p={1} bgcolor="grey.300">
                        <Box style={{textAlign:'center',color:'black' ,fontWeight:'bold',fontSize:16}}>Date de Création</Box>
                        <Box style={{textAlign:"center"}}> {this.state.date}</Box>
                    </Box>
                    
                </Box>
                </div>
                <div>
                    <Box display="flex" flexDirection='column'  bgcolor="background.paper" p={1} m={1}>
                        <Box bgcolor="grey.300" style={{fontSize:16,fontWeight:"bold",textAlign:"center"}}>Details</Box>
                        <Box style={{marginTop:8}} >{this.state.contenu}</Box>
                    </Box>
                </div>
                


                {this.IsAdmin()}


            </div>
        )
    }
    
    render(){

        const MyPlaintes = this.state.plainte
       

          const content = MyPlaintes.map((plainte) =>
            
                <tr onClick={
                    ()=>this.setState({
                        modalVisible:true,
                        id:plainte.id,
                        title:plainte.title,
                        entité:plainte.entité,
                        auteur:plainte.auteur,
                        date:plainte.date_création,
                        etat:plainte.state,
                        contenu:plainte.details,
                        reponse:plainte.response,
                        })}>
                    <th scope="row">{plainte.id}</th>
                    <td>{plainte.title}</td>
                    <td>{plainte.entité}</td>
                    
                    <td>{plainte.date_création}</td>
                    <td>{plainte.state}</td>
                </tr>
           
          );

         
        function showTable(){

            
             
              if(MyPlaintes.length ===0){
                  return(
                    <h5 style={{textAlign:'center',marginTop:70}}>
                        Aucune Plainte Enregistrée</h5>
                  )
              }
              if(MyPlaintes.length <=8 && MyPlaintes.length>=1){
                return (
                    <div className="container-fluid">
              
                        <div className="table-wrapper-scroll-y my-custom-scrollbar" style={{marginLeft:'100px'}}>
                            <table className="table table-bordered table-hover mb-0">
                                <thead style={{backgroundColor:'#007bff'}}>
                                    <tr >
                                    <th scope="col">Indice</th>
                                    <th scope="col">Titre</th>
                                    <th scope="col">Entité</th>
                                    
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
              if(MyPlaintes.length>8){
                return (
                    <div className="container-fluid">
              
                        <div className="table-wrapper-scroll-y my-custom-scrollbar" style={{marginLeft:'100px'}}>
                            <table className="table table-bordered table-hover mb-0">
                                <thead style={{backgroundColor:'#007bff'}}>
                                    <tr >
                                    <th scope="col">Indice</th>
                                    <th scope="col">Titre</th>
                                    <th scope="col">Entité</th>
                                    
                                    <th scope="col">Date</th>
                                    <th scope="col">Etat</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {content}
                                </tbody>
                                <tfoot style={{backgroundColor:'#007bff'}}>
                                    <tr >
                                        <th scope="col">Indice</th>
                                        <th scope="col">Titre</th>
                                        <th scope="col">Entité</th>
                                       
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
                <div style={{marginLeft:'60px',marginTop:'80px' ,fontWeight:'bold',fontSize:'1.1em'}}>
                    <h3>Toutes Les Plaintes</h3>
                    <p>Ici vous pouvez voir toutes les Plaintes ayant été Enregistrées</p>
                </div>


                


                
                {showTable()}
                {this.ShowModal()}
            </div>
        );
    }
}

export default AllPlaintes