import React, { useState } from 'react';
import {Modal as BModal} from 'react-bootstrap/Modal'

function ShowBModal() {
    const [smShow, setSmShow] = useState(false);
    const [lgShow, setLgShow] = useState(false);
  
    return (
      <>
        <Button onClick={() => setSmShow(true)}>Small modal</Button>{' '}
        <Button onClick={() => setLgShow(true)}>Large modal</Button>
        <BModal
          size="mm"
          show={smShow}
          onHide={() => setSmShow(false)}
          aria-labelledby="example-modal-sizes-title-sm"
        >
          <BModal.Header closeButton>
            <BModal.Title id="example-modal-sizes-title-sm">
              Small Modal
            </BModal.Title>
          </BModal.Header>
          <Modal.Body>...</Modal.Body>
        </BModal>
        <BModal
          size="lg"
          show={lgShow}
          onHide={() => setLgShow(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <BModal.Header closeButton>
            <BModal.Title id="example-modal-sizes-title-lg">
              Large Modal
            </BModal.Title>
          </BModal.Header>
          <BModal.Body>...</BModal.Body>
          
        </BModal>
      </>
    );
  }
  


export default ShowBModal


<BModal.Body>
          
          <form onSubmit={this.onSendPlainte} >
          <div class="form-group">
                            <label for='Titre' style={{fontWeight:"bold"}}>Titre</label>
                                <input type='text' className ="form-control" name='Titre'
                        onChange={this.onChangeTitre} required />
                            </div>
                            <div class="form-group">
                                <label for='categorie' style={{fontWeight:"bold"}}>Categorie</label>
                                <select value={this.state.value} className ="form-control" 
                                        onChange={this.onChangeCategorie} required>
                                    <option value="Web-Defacement">Web-Defacement</option>
                                    <option value="Spam">Spam</option>
                                    <option value="Ingenierie Sociale">Ingenierie Sociale</option>
                                    <option value="FleeceWare">FleeceWare</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for='entités' style={{fontWeight:"bold"}}>Entité</label>
                                <select value={this.state.value} className ="form-control" 
                                onChange={this.onChangeEntité} required>
                                    <option value="CIRT">Equipe Aide</option>
                                    <option value="Entité 2">Direction du CIRT</option>
                                    <option value="Entité 3">Reseau et Systeme</option>
                                    <option value="Entité 4">Entité 4</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for='assignation' style={{fontWeight:"bold"}}>Employé Assigné</label>
                                <select value={this.state.value} className ="form-control" 
                                onChange={this.onChangeAssignation} >
                                    <option value="2">Rudy</option>
                                    <option value="3">Arold</option>
                                    <option value="4">Nick</option>
                                    <option value="1">Cardoun</option>
                                </select>
                            </div>
                            <div class="form-group">
                            <label for='description' style={{fontWeight:"bold"}}>Description</label>
                            <textarea value={this.state.value} className ="form-control" style={{height:90}}
                                    onChange={this.onChangeDescription} required/>
                            </div>					
                        
          </form>
          </BModal.Body>
          <Modal.Footer>
          <input type="button" class="btn btn-default" data-dismiss="modal" value="Cancel" onClick={this.onCancel}/>
                            <input type="submit" class="btn btn-success" value="Add"  />
        <Button class="btn btn-danger" onClick={()=>this.setState({addmodalVisible:false})}>Close</Button>
      </Modal.Footer>