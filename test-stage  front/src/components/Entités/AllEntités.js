import React, { Component } from 'react';
import Modal from 'react-modal'
import '../../styles.css';
import axios from 'axios';
import { FaPlusCircle } from 'react-icons/fa';
import { FaMinusCircle } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import Select from 'react-select';
import { Modal as BModal, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import Loader from '../loader'
import $ from 'jquery'
import { Organigramme } from './Entités'

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


var listeEntités
var liste_id_element_check = []
var list_id = []
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


class AllEntités extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      addmodalVisible: false,
      deletemodalVisible: false,
      deletemultimodalVisible: false,
      editmodalVisible: false,

      id: '',
      Nom: '',
      Hierachie: Organigramme[0].value,
      Entités: props.entités,
      SearchTerm:''
    }
    
  }

  componentDidMount() {
   
  }
  UNSAFE_componentWillReceiveProps(props) {

    this.setState({ Entités: props.entités ,Hierachie:Organigramme[0].value})

  }

  onEditSearchTerm=(e)=>{
    this.setState({SearchTerm:e.target.value})
   }
   dynamicSearch=()=>{
       if (this.state.SearchTerm==''){
         return this.state.Entités
       }
       else{
         return this.state.Entités.filter((entité) => entité.name.toLocaleUpperCase().includes(this.state.SearchTerm.toLocaleUpperCase())||
         entité.hierarchie.toString().toLocaleUpperCase().includes(this.state.SearchTerm.toLocaleUpperCase())||
         entité.id.toString().toLocaleUpperCase().includes(this.state.SearchTerm.toLocaleUpperCase()))
         
         
       }
       
   }
  
  onChangeNom = (event) => {
    this.setState({ Nom: event.target.value });
    console.log('Nom ', event.target.value)
  }
  onChangeHierarchie = (event) => {
    this.setState({ Hierarchie: event.value });
    console.log('Hierarchie ', event.value)
  }
  onCancel = () => {
    this.setState({
      Nom: '',
      Hierarchie: '',
    })
  }
  onSendEntité = (event) => {
    event.preventDefault()
    let newEntités = {
      Nom: this.state.Nom,
      Hierarchie: this.state.Hierarchie,
    }

    axios.post('http://localhost:8000/plaintes/createEntite/', newEntités)
      .then(res => {
        console.log(res);
        console.log(res.data);
        if (res.data['state'] === 'success') {
          alert("Entité : " + newEntités.Nom + " crée avec succèss");
          this.setState({
            Nom: '',
            Hierarchie: '',
          });
       
       this.state.Entités.push({ id: res.data['id'], "hierarchie":newEntités.Hierarchie ,name:newEntités.Nom })

        }
        else {
          alert('echec de lors de la création de notre entité')
        }
      })

  }
  onEditEntité = (event) => {
    event.preventDefault()
    let newEntités = {
      id: this.state.id,
      Nom: this.state.Nom,
      Hierarchie: this.state.Hierarchie,
    }

    axios.post('http://localhost:8000/plaintes/editEntite/', newEntités)
      .then(res => {
        console.log(res);
        console.log(res.data);
        if (res.data['status'] === 'success') {
          alert("Entité : " + newEntités.Nom + " Mise à jour avec succèss");
          this.setState({
            Nom: '',
            Hierarchie: '',
          });
          const content = this.state.Entités.map((entité) => {

            if (entité.id == newEntités.id) {
              entité.name = newEntités.Nom;
              entité.hierarchie = newEntités.Hierarchie
            }

          })
          
        }
        else {
          alert('echec de lors de la création de notre entité')
        }
      })

  }
  onDeleteMultiEntité = (event) => {
    event.preventDefault()
    let Entités = { delete_list: liste_id_element_check }

    axios.post('http://localhost:8000/plaintes/deletemultiEntite/', Entités)
      .then(res => {
        console.log(res);
        console.log(res.data);
        if (res.data['status'] === 'success') {
          
          var i = 0
          while (i < (liste_id_element_check).length) {
            //console.log('#tablerow' + (liste_id_element_check)[i]);
            //$('#tablerow' + (liste_id_element_check)[i]).remove();
                var id_remove=0;
                var p=0
                const content = this.state.Entités.map((entité) => {

                  if ((liste_id_element_check).includes(entité.id) ) {
                    id_remove=p
                  }
                p++
                })
                this.state.Entités.splice(id_remove,1)
            i++
          }
          var checkbox = $('table tbody input[type="checkbox"]');
                      checkbox.each(function () {
                          this.checked = false;
                          var id = this.getAttribute('id');
                          liste_id_element_check = []

                        });
                
          liste_id_element_check = []
          alert("les Entités selectioneés ont été supprimées avec succèss");
        }
        else {
          alert('echec de lors de la suppression des entités')
        }
      })

  }
  onDeleteEntité = (event) => {
    event.preventDefault()
    let newEntités = {
      id: this.state.id,
      Nom: this.state.Nom,
      Hierarchie: this.state.Hierarchie,
    }

    axios.post('http://localhost:8000/plaintes/deleteEntite/', newEntités)
      .then(res => {
        console.log(res);
        console.log(res.data);
        if (res.data['status'] === 'success') {
          alert("Entité :" + newEntités.Nom + " supprimée avec succèss");
          this.setState({
            Nom: '',
            Hierarchie: '',
          });
         /* const id = '#tablerow' + this.state.id
          $(id).remove();*/
          var id_remove=0;
                var i=0
                const content = this.state.Entités.map((entité) => {

                  if (entité.id == newEntités.id) {
                    id_remove=i
                  }
                i++
                })
                this.state.Entités.splice(id_remove,1)

        }
        else {
          alert('echec de lors de la suppression de votre entité')
        }
      })

  }

  render() {

    //const Entités = this.state.entités
    const Entités = this.dynamicSearch()
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

    const test = Entités.map((entité) =>
      list_id.push(entité.id))
    var i = 0



    const content = Entités.map((entité) =>

      <tr id={'tablerow' + entité.id} onClick={
        () => this.setState({
          id: entité.id,
          Nom: entité.name,
          Hierarchie: entité.hierarchie
        })}>
        <td>
          <span class="custom-checkbox">

            <input type="checkbox" id={entité.id} name="options[]" value="1" onClick={() => {
              var id = entité.id
              var checkbox = document.getElementById(id);
              console.log(checkbox.checked)

              if (checkbox.checked) {
                var flag = (liste_id_element_check).includes(entité.id)
                if (!flag) { liste_id_element_check.push(entité.id) }


                console.log(liste_id_element_check)
              } else {
                var index = liste_id_element_check.indexOf(entité.id)
                if (index >= 0) { (liste_id_element_check).splice(index, 1) }


                console.log(liste_id_element_check)

              }


            }} />
            <label for="checkbox1"></label>
          </span>
        </td>
        <th scope="row" onClick={
          () => this.setState({
            modalVisible: true,
          })}>{entité.id}</th>
        <td id={'name' + entité.id} onClick={
          () => this.setState({
            modalVisible: true,
          })}>{entité.name}</td>

        <td id={'hierarchie' + entité.id} onClick={
          () => this.setState({
            modalVisible: true,
          })}>{entité.hierarchie}</td>
        <td style={{ display: "flex", justifyContent: "space-between" }}>
          <a class="edit" data-toggle="modal" onClick={() => this.setState({ editmodalVisible: true })}><FaEdit /></a>
          <a class="delete" data-toggle="modal" onClick={() => this.setState({ deletemodalVisible: true })}><FaTrash /></a>
        </td>
      </tr>

    );


    function showTable() {

      if (Entités.length === 0) {
        return (
          <Loader />
        )
      }
      if (Entités.length <= 8 && Entités.length >= 1) {
        return (
          <div className="table-wrapper-scroll-y my-custom-scrollbar" >
          
            <table id="myTable" className="table table-bordered table-striped table-hover mb-0 ">
              <thead >
                <th>
                  <span class="custom-checkbox">
                    <input type="checkbox" id="selectAll" onClick={() => {
                      var checkbox = $('table tbody input[type="checkbox"]');
                      var selectAll = document.getElementById("selectAll")

                      if (selectAll.checked) {
                        liste_id_element_check = []

                        checkbox.each(function () {
                          this.checked = true;
                          var id = parseInt(this.getAttribute('id'));

                          liste_id_element_check.push(id)

                        });
                        console.log(liste_id_element_check)
                      } else {
                        checkbox.each(function () {
                          this.checked = false;
                          var id = this.getAttribute('id');
                          liste_id_element_check = []

                        });
                        console.log(liste_id_element_check)
                      }

                      checkbox.click(function () {
                        if (!this.checked) {
                          $("#selectAll").prop("checked", false);
                        }

                      });
                    }} />
                    <label for="selectAll"></label>
                  </span>
                </th>
                <th scope="col">Indice</th>
                <th scope="col">Nom</th>
                <th scope="col">Hierarchie</th>
                <th>Actions</th>
              </thead>

              <tbody>
                {content}
              </tbody>
            </table>

          </div>
        )

      }
      if (Entités.length > 8) {
        return (
          <div className="table-wrapper-scroll-y my-custom-scrollbar" >
            <table  id="myTable" className="table table-bordered table-striped table-hover mb-0 ">
              <thead >
                <th>
                  <span class="custom-checkbox">
                    <input type="checkbox" id="selectAll" onClick={() => {
                      var checkbox = $('table tbody input[type="checkbox"]');
                      
                      var selectAll = document.getElementById("selectAll")

                      if (selectAll.checked) {
                        liste_id_element_check = []
                        checkbox.each(function () {
                          this.checked = true;
                          var id = parseInt(this.getAttribute('id'));

                          liste_id_element_check.push(id)

                        });
                        console.log(liste_id_element_check)
                      } else {
                        checkbox.each(function () {
                          this.checked = false;
                          var id = this.getAttribute('id');
                          liste_id_element_check = []

                        });
                        console.log(liste_id_element_check)
                      }

                      checkbox.click(function () {
                        if (!this.checked) {
                          $("#selectAll").prop("checked", false);
                        }

                      });
                    }} />
                    <label for="selectAll"></label>
                  </span>
                </th>
                <th scope="col">Indice</th>
                <th scope="col">Nom</th>
                <th scope="col">Hierarchie</th>
                <th>Actions</th>
              </thead>

              <tbody>
                {content}
              </tbody>
            </table>

          </div>
        )
      }
    }

    return (
      <body>
        <div class="container-xl" style={{ marginTop: '50px' }}>
          <div class="table-responsive">
            <div class="table-wrapper">
              <div class="table-title">
                <div class="row">
                  <div class="col-sm-6">
                    <h2>Gestion des <b>Entités</b></h2>
                    <input type='text' style={{marginTop:"20px"}}className ="form-group form-control" value={this.state.SearchTerm} onChange={this.onEditSearchTerm} placeholder="Rechercher"/>
                  </div>
                  <div class="col-sm-6">
                 
                    <button class="btn btn-success" data-toggle="modal" onClick={() => this.setState({ addmodalVisible: true })}><i ><FaPlusCircle /></i> <span>Ajouter Entité</span></button>
                    <button class="btn btn-danger" data-toggle="modal" onClick={() => this.setState({ deletemultimodalVisible: true })}><i><FaMinusCircle /></i> <span>Supprimer</span></button>
                  </div>
                </div>
              </div>
              {showTable()}


            </div>
          </div>
        </div>



        <BModal
          id="addmodal"
          size="sm"
          show={this.state.addmodalVisible}
          onHide={() => this.setState({ addmodalVisible: false })}
          aria-labelledby="contained-modal-title-vcenter"

        >           <form onSubmit={this.onSendEntité} >
            <BModal.Header closeButton>
              <BModal.Title id="example-modal-sizes-title-sm">
                <h4 class="modal-title">Ajouter Entité</h4>
              </BModal.Title>
            </BModal.Header>
            <BModal.Body>
              <div style={{ display: 'flex', flexDirection: "column", justifyContent: 'space-between' }}>
                <div class="form-group">
                  <label for='Nom' style={{ fontWeight: 'bold' }}>Nom</label>
                  <input type='text' className="form-control" name='Nom'
                    onChange={this.onChangeNom} required />
                </div>


                <div class="form-group">
                  <label for='Hiérarchie' style={{ fontWeight: 'bold' }}>Hierarchie</label>
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    defaultValue={Organigramme[0]}
                    isDisabled={false}
                    isLoading={false}
                    isClearable={false}
                    isRtl={false}
                    isSearchable={true}
                    name="Hiérarchie"
                    options={Organigramme}
                    onChange={this.onChangeHierarchie}
                    required
                  />
                </div>
              </div>
            </BModal.Body>
            <BModal.Footer>

              <input type="button" class="btn btn-default" data-dismiss="modal" value="Annuler" onClick={() => this.setState({ addmodalVisible: false })} />
              <input type="submit" class="btn btn-success" value="Add" />

            </BModal.Footer>
          </form>
        </BModal>
        <BModal
          id="editmodal"
          size="sm"
          show={this.state.editmodalVisible}
          onHide={() => this.setState({ editmodalVisible: false })}
          aria-labelledby="contained-modal-title-vcenter"

        >           <form onSubmit={this.onEditEntité} >
            <BModal.Header closeButton>
              <BModal.Title id="example-modal-sizes-title-sm">
                <h4 class="modal-title">Editer Entité</h4>
              </BModal.Title>
            </BModal.Header>
            <BModal.Body>
              <div style={{ display: 'flex', flexDirection: "column", justifyContent: 'space-between' }}>
                <div class="form-group">
                  <label for='Nom' style={{ fontWeight: 'bold' }}>Nom</label>
                  <input type='text' className="form-control" name='Nom'
                    onChange={this.onChangeNom} required />
                </div>


                <div class="form-group">
                  <label for='Hiérarchie' style={{ fontWeight: 'bold' }}>Hierarchie</label>
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    defaultValue={Organigramme[0]}
                    isDisabled={false}
                    isLoading={false}
                    isClearable={false}
                    isRtl={false}
                    isSearchable={true}
                    name="Hiérarchie"
                    options={Organigramme}
                    onChange={this.onChangeHierarchie}
                    required
                  />
                </div>
              </div>
            </BModal.Body>
            <BModal.Footer>

              <input type="button" class="btn btn-default" data-dismiss="modal" value="Annuler" onClick={() => this.setState({ editmodalVisible: false })} />
              <input type="submit" class="btn btn-success" value="Enregistrer" />

            </BModal.Footer>
          </form>
        </BModal>

        <BModal
          id="deletemodal"
          size="sm"
          show={this.state.deletemodalVisible}
          onHide={() => this.setState({ deletemodalVisible: false })}
          aria-labelledby="contained-modal-title-vcenter"

        >          <form onSubmit={this.onDeleteEntité}>
            <BModal.Header closeButton>
              <BModal.Title id="example-modal-sizes-title-sm">
                <h4 class="modal-title">Supprimer Entité</h4>
              </BModal.Title>
            </BModal.Header>
            <BModal.Body>
              <p>Voulez vous supprimer cet enregistrement?</p>
              <p class="text-warning"><small>cette action est definitive.</small></p>
            </BModal.Body>
            <BModal.Footer>
              <input type="button" class="btn btn-default" data-dismiss="modal" value="Annuler" onClick={() => this.setState({ deletemodalVisible: false })} />
              <input type="submit" class="btn btn-danger" value="Supprimer" />
            </BModal.Footer>
          </form>
        </BModal>

        <BModal
          id="deletemultimodal"
          size="sm"
          show={this.state.deletemultimodalVisible}
          onHide={() => this.setState({ deletemultimodalVisible: false })}
          aria-labelledby="contained-modal-title-vcenter"

        >          <form onSubmit={this.onDeleteMultiEntité}>
            <BModal.Header closeButton>
              <BModal.Title id="example-modal-sizes-title-sm">
                <h4 class="modal-title">Supprimer Entité</h4>
              </BModal.Title>
            </BModal.Header>
            <BModal.Body>
              <p>Etes vous sure de vouloir supprimer ces enregistrements?</p>
              <p class="text-warning"><small>Cette action est definitive.</small></p>
            </BModal.Body>
            <BModal.Footer>
              <input type="button" class="btn btn-default" data-dismiss="modal" value="Annuler" onClick={() => this.setState({ deletemultimodalVisible: false })} />
              <input type="submit" class="btn btn-danger" value="Supprimer" />
            </BModal.Footer>
          </form>
        </BModal>

        <div id="addEmployeeModal" class="modal fade">
          <div class="modal-dialog">
            <div class="modal-content">
              <form onSubmit={this.onSendEntité} >
                <div class="modal-header">
                  <h4 class="modal-title">Ajouter Entité</h4>
                  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                </div>
                <div class="modal-body">
                  <div class="form-group">
                    <label for='Nom' style={{ fontWeight: 'bold' }}>Nom</label>
                    <input type='text' className="form-control" name='Nom'
                      onChange={this.onChangeNom} required />
                  </div>

                  <div class="form-group">
                    <label for='Hiérarchie' style={{ fontWeight: 'bold' }}>Hierarchie</label>
                    <select value={this.state.Hierarchie} className="form-control"
                      onChange={this.onChangeHierarchie} required>
                      <option value="1">Direction</option>
                      <option value="2">Sous-Direction</option>
                      <option value="3">Cellule</option>
                      <option value="4">Service</option>
                      <option value="5">Equipe</option>
                      <option value="6">Collaborateurs</option>
                      <option value="7">Stagiaires</option>
                    </select>
                  </div>

                </div>
                <div class="modal-footer">
                  <input type="button" class="btn btn-default" data-dismiss="modal" value="Annuler" onClick={this.onCancel} />
                  <input type="submit" class="btn btn-success" value="Add" />
                </div>
              </form>
            </div>
          </div>
        </div>

        <div id="editEmployeeModal" class="modal fade">
          <div class="modal-dialog">
            <div class="modal-content">
              <form onSubmit={this.onEditEntité} >
                <div class="modal-header">
                  <h4 class="modal-title">Editer Entité</h4>
                  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                </div>
                <div class="modal-body">
                  <div class="form-group">
                    <label for='Nom' style={{ fontWeight: 'bold' }}>Nom</label>
                    <input type='text' className="form-control" name='Nom'
                      onChange={this.onChangeNom} required />
                  </div>

                  <div class="form-group">
                    <label for='Hiérarchie' style={{ fontWeight: 'bold' }}>Hierarchie</label>
                    <select value={this.state.Hierarchie} className="form-control"
                      onChange={this.onChangeHierarchie} required>
                      <option value="1">Direction</option>
                      <option value="2">Sous-Direction</option>
                      <option value="3">Cellule</option>
                      <option value="4">Service</option>
                      <option value="5">Equipe</option>
                      <option value="6">Collaborateurs</option>
                      <option value="7">Stagiaires</option>
                    </select>
                  </div>

                </div>
                <div class="modal-footer">
                  <input type="button" class="btn btn-default" data-dismiss="modal" value="Annuler" onClick={this.onCancel} />
                  <input type="submit" class="btn btn-success" value="Enregistrer" />
                </div>
              </form>
            </div>
          </div>
        </div>


        <div id="deleteEmployeeModal" class="modal fade">
          <div class="modal-dialog">
            <div class="modal-content">
              <form onSubmit={this.onDeleteEntité}>
                <div class="modal-header">
                  <h4 class="modal-title">Supprimer Entité</h4>
                  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                </div>
                <div class="modal-body">
                  <p>Voulez vous supprimer cet enregistrement?</p>
                  <p class="text-warning"><small>Cette action est definitive.</small></p>
                </div>
                <div class="modal-footer">
                  <input type="button" class="btn btn-default" data-dismiss="modal" value="Annuler" />
                  <input type="submit" class="btn btn-danger" value="Supprimer" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </body>
    );
  }
}

export default AllEntités