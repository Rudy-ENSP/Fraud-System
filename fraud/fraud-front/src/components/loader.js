import React, { Component } from 'react';
import Spinner from 'react-bootstrap/Spinner'
import '../styles.css';


export class Loader extends Component {
    render(){
        return (
            <h3 style={{textAlign:'center',marginTop:70}}>
                        <Spinner animation="border" role="status">
  <span className="sr-only">Loading...</span>
</Spinner></h3>
        );
    }
}

export default Loader
