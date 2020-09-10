import React, { Component } from 'react';
import Modal from 'react-modal'
import Box from '@material-ui/core/Box';
import '../../styles.css'
import axios from 'axios';
import { username ,password,isLoginAdmin,isLoginClient} from '../Login/login';

class ResolvedPlaintes extends Component {

    constructor(props){
        super(props)
        this.state={
            modalVisible:false,
            plaintes:[],
            id:'',
            title:'',
            entité:'',
            auteur:'',
            date:'',
            etat:'',
            contenu:'',
            response:'',
           
        }
    }

    componentDidMount() {
		let data={
              'user':username,
              'password':password
          };
        axios.post('http://localhost:8000/plaintes/resolues/',data)
          .then(res => {
            const plaintes = res.data;
            this.setState({plaintes: plaintes  });
            console.log(plaintes)
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


    contentModal=()=>{
        return(
            <div>
                <div style={{backgroundColor:"#007bff",height:30 ,margin:20}}>
                    
                    <h5 style={{textAlign:"center",paddingTop:8 ,color:'white'}}>
                     {this.state.title}</h5>
                </div>
                <div style={{ width: '100%' }}>

                <Box display="flex" flexDirection="row" p={1} m={1}
                 bgcolor="background.paper" justifyContent='space-between'>
                    <Box p={1} bgcolor="grey.300">
                        <Box style={{textAlign:'center',color:'black',fontWeight:'bold',fontSize:16}}>entité </Box>
                        <Box style={{textAlign:"center"}}>{this.state.entité}</Box>
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
                            <button  style={{marginLeft:10,marginTop:2}} onClick={()=>this.setState({modalVisible:false})}
                                className="btn btn-warning">Fermer la fenêtre</button>
                        </div>
               
            </div>
        )
    }
    
    render(){

        const MyPlaintes = this.state.plaintes /*[
            {id: 1, title: 'Bonjour, monde', Entité: 'aide et support',Auteur:'rudy',Date:'12/05/2020',Etat:'resoluee',Content:'Nothing'},
            {id: 2, title: 'bonjour, monde', Entité: 'aide et support',Auteur:'rudy',Date:'12/05/2020',Etat:'En attente',Content:'Nothing'},
            {id: 3, title: 'Bonjour, monde', Entité: 'aide et support',Auteur:'rudy',Date:'12/05/2020',Etat:'resolue',Content:'Nothing'},
            {id: 4, title: 'bonjour, monde', Entité: 'aide et support',Auteur:'rudy',Date:'12/05/2020',Etat:'En attente',Content:'Nothing'},
            {id: 5, title: 'Bonjour, monde', Entité: 'aide et support',Auteur:'rudy',Date:'12/05/2020',Etat:'resolue',Content:'Nothing'},
            {id: 6, title: 'bonjour, monde', Entité: 'aide et support',Auteur:'rudy',Date:'12/05/2020',Etat:'En attente',Content:'Nothing'},
            {id: 7, title: 'Bonjour, monde', Entité: 'aide et support',Auteur:'rudy',Date:'12/05/2020',Etat:'En attente',Content:'Nothing'},
            {id: 8, title: 'bonjour, monde', Entité: 'aide et support',Auteur:'rudy',Date:'12/05/2020',Etat:'En attente',Content:'Nothing'},
            {id: 9, title: 'Bonjour, monde', Entité: 'aide et support',Auteur:'rudy',Date:'12/05/2020',Etat:'resolue',Content:'Nothing'},
            {id: 10, title: 'bonjour, monde', Entité: 'aide et support',Auteur:'rudy',Date:'12/05/2020',Etat:'En attente',Content:'Nothing'},
            {id: 11, title: 'Bonjour, monde', Entité: 'aide et support',Auteur:'rudy',Date:'12/05/2020',Etat:'En attente',Content:'Nothing'},
            {id: 12, title: 'bonjour, monde', Entité: 'aide et support',Auteur:'rudy',Date:'12/05/2020',Etat:'En attente',Content:'Nothing'},
            {id: 13, title: 'Bonjour, monde', Entité: 'aide et support',Auteur:'rudy',Date:'12/05/2020',Etat:'resolue',Content:'Nothing'},
            {id: 14, title: 'bonjour, monde', Entité: 'aide et support',Auteur:'rudy',Date:'12/05/2020',Etat:'resolue',Content:'Nothing'},
          ];*/

        function PlainteResolue(){
            const plainteResolue=[]
            MyPlaintes.map((plainte)=>plainteResolue.push(plainte))
			console.log(MyPlaintes)
            return plainteResolue
        }
          
         const content = PlainteResolue().map((plainte) =>
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
                  response:plainte.response,
                  })}>
              <th scope="row">{plainte.id}</th>
              <td>{plainte.title}</td>
              <td>{plainte.entité}</td>
              <td>{plainte.date_création}</td>
              <td>{plainte.state}</td>
          </tr>
          );

          function showTable(){
             
              if(PlainteResolue().length ===0){
                  return(
                      <h5 style={{textAlign:'center',marginTop:100}}>Aucun plainte dans cette rubrique</h5>
                  )
              }
              if(PlainteResolue().length <=8 && PlainteResolue().length>=1){
                return (
                    <div className="container-fluid">
              
                        <div className="table-wrapper-scroll-y my-custom-scrollbar" style={{marginLeft:'100px'}}>
                            <table className="table table-bordered table-hover mb-0 table">
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
              if(PlainteResolue().length>8){
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
                    <h3>Les Plaintes Resolues</h3>
                    <p>Ici vous pouvez voir toutes les réponses et les plaintes Résolues</p>
                </div>
                {showTable()}
                {this.ShowModal()}
            </div>
        );
    }
}

export default ResolvedPlaintes