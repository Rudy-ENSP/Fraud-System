import React, { useState } from 'react';
import Modal from 'react-modal';

function ShowModal(){
    
    const [modalIsOpen, setModalIsOpen] = useState(false)
    return(
        <div className='modal'>
            <button onClick={()=>setModalIsOpen(true)}>open modal</button>
            <Modal isOpen={true}>
                <h1>My modal</h1>
            </Modal>

        </div>
    )
}

export default ShowModal