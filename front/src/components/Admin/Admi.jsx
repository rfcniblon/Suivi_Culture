import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar'
import Selection from '../Selection/Selection';
class Admi extends Component {
    render() {
        return (
            <>
              <div className="bgcolor">
              <Navbar />
             
               <Selection/>
              </div>
            </>
        );
    }
}

export default Admi;
