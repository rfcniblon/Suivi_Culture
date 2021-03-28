import React, { Component, Fragment } from 'react';
import { useParams } from 'react-router-dom';

class NavbarAdmin extends Component {


    render() {

          const user = {
            user: localStorage.getItem('user')
          }
        return (
           <Fragment>
               <nav className="navbar navbar-expand-lg background">
  <a className="navbar-brand titre_logo" href="/" title="bouton_home">Suivi de culture</a>
  <button className="navbar-toggler" type="button" tiltle="bouton_navbar" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-icon"><i className="fas fa-bars"></i></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ml-auto">
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle a_navbar" href="#" id="navbarDropdown" tiltle="bouton_navigation" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <i className="fas fa-user"></i>
        </a>
        <div className="dropdown-menu" id="dropdo" aria-labelledby="navbarDropdown">
                    <label htmlFor="">Mon compte {user.user}</label>
          <a className="dropdown-item a_navbar"  href="/configuration" title="configuration" >Configuration</a>
  
          <div className="dropdown-divider"></div>
         <a className="dropdown-item a_navbar" href="/test" title="test" >Deconnexion</a>
        </div>
      </li>
      
    </ul>
  </div>
</nav>
           </Fragment>
        );
    }
}

 export default NavbarAdmin;
