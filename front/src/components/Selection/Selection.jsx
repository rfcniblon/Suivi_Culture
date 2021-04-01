import React, { Component } from "react";

class Selection extends Component {
  render() {
    const potager_nb = 0;
    const potager_premier = "00/00/0000";
    const potager_dernier = "00/00/0000";
    const legume_nb = 97;
    const legume_premier = "00/00/0000";
    const legume_dernier = "00/00/0000";
    const suivi_nb = 0;
    const suivi_premier = "00/00/0000";
    const suivi_dernier = "00/00/0000";

    return (
      <div className="row selection">
        <section className="div1">
       <div className="justi_logo">
       <i className="fas fa-seedling i_placement"></i>
       <h2 className="esp5">Légumes</h2>
       </div>
          <label>Nombre : {legume_nb}</label>
          <p>Premier légume céer : {legume_premier}</p>
          <p>Dernier légume céer : {legume_dernier}</p>
          <div className="">
            <a href="#/legumeadd ">
              <i className="far fa-plus-square i_color_add"></i>
            </a>
             <a href="#/legumeput">
              <i className="fas fa-pen-square i_color_put"></i>  
            </a>
            <a href="#/legumedel">
              <i className="far fa-minus-square i_color_del"></i>
            </a>
          </div>
        </section>

        <section className="div2">
          <div className="justi_logo">
            <i className="fas fa-home i_placement"></i>
            <h2 className="esp5">Potager </h2>
          </div>
          
          <label>Nombre : {potager_nb}</label>
          <p>Premier potager céer : {potager_premier}</p>
          <p>Dernier potager céer : {potager_dernier}</p>
          <div className="">
            <a href="#/potageradd">
              <i className="far fa-plus-square i_color_add"></i>
            </a>
            <a href="#/potagerput">
              <i className="fas fa-pen-square i_color_put"></i>  
            </a>
            <a href="#/potagerdel">
              <i className="far fa-minus-square i_color_del"></i>
            </a>
            
          </div>
        </section>

        <section className="div3">
          <div className="justi_logo">
          <i className="fas fa-pencil-alt i_placement"></i>
          <h2 className="esp5">Suivi </h2>
          </div>
          
          <label>Nombre : {suivi_nb}</label>
          <p>Premier suivi céer : {suivi_premier}</p>
          <p>Dernier suivi céer : {suivi_dernier}</p>
          <div className="justi-center">
            <a href="#/suiviadd">
              <i className="far fa-plus-square i_color_add"></i>
            </a> 
            <a href="#/suiviput">
              <i className="fas fa-pen-square i_color_put"></i>
            </a>
            <a href="#/suividel">
              <i className="far fa-minus-square i_color_del"></i>
            </a>
           
          </div>
        </section>
      </div>
    );
  }
}

export default Selection;
