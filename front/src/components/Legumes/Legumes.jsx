import React from "react";

const SERVER_ADDRESS = process.env.REACT_APP_SERVER_ADDRESS;

class Legumes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          legumesData:[],
          filterData:[],
            selectedsuiData: "",
        validationError: "",
          
        };
    
    }

    componentDidMount = () => {
      const check = {
        id: sessionStorage.getItem("idcheck"),
       }
      fetch(SERVER_ADDRESS + '/api/legumes/')
      // fetch(SERVER_ADDRESS + '/api/user/' +check.id +'/legumes/selection/1') 
      // fetch(SERVER_ADDRESS + "/api/chambre/user/" + users.users + "/selection/5")
      .then((res) => res.json())
      .then((res) => this.setState({ legumesData: res }));   
      console.log(fetch)
      console.log(check)
    };
  

  //   handleChangeSelect = (e) => {
  //   this.setState({
  //     variete: e.target.value,
  //     validationError: e.target.value === "" ? "select variete" : "",
  //   });
  //   const check = {
  //     id: sessionStorage.getItem("idcheck"),
  //   }
  //   fetch(SERVER_ADDRESS + "/api/chambreculture/user/"+ check.id +"/selection/" + e.target.value)
  //  //  fetch(SERVER_ADDRESS + "/api/chambreculture/user/" + users.users + "selection/" + e.target.value)
  //     .then((res) => res.json())
  //     .then((res) => this.setState({ chambData: res }));
  // };



  // Si on connais le nombre de colonne
  renderTableLegumes() {
    return this.state.legumesData.map((legumes, index) => {
       const { id_legumes, name} = legumes //destructuring
       return (
          <tr key={id_legumes}>
            <td>{id_legumes}</td>
            <td>{name}</td> 
          </tr>
       )
    })
  }

    render() {
        return (
            <div className="container-fluid">
            {/* <Navbar/> */}
              <div className="column  col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <h1 id='title' className="txtcenter espacement">Liste de toute les légumes</h1>
                <div className="offset-1 col-10 col-sm-10 col-md-8 col-lg-8 col-xl-8">
              {/* <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 flex1">
               <p className="ptext txtcenter">Séléctionner une quantité à afficher</p>
                <select name="filter1" id="filter1"
                className="form-control col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 selc" 
                value={this.state.filter ||''} 
                onChange={this.handleChangeSelect}
                >
                <option value="">Selectionner</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
              </div> */}
                <div className="composant_table ici">
                <table id='students'>
            <tbody>
              <tr className="table1">
                <td>Id légumes</td>
                 <td>Nom</td>
                 </tr>
                 {this.renderTableLegumes()}
              </tbody>
           </table>
                </div>
            </div>
            </div>
            </div>
        )
    }

    }
    export default Legumes;


// /*
//  tuto web  https://dev.to/abdulbasit313/an-easy-way-to-create-a-customize-dynamic-table-in-react-js-3igg
//  */
// import React from "react";
// const SERVER_ADDRESS = process.env.REACT_APP_SERVER_ADDRESS;
  
// class ChambreCulture extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             chambre: [],
//             // selectedEner: "",
//             validationError: "",
            
//         }
      
//     }
  
//     componentDidMount = () => {
//       fetch(SERVER_ADDRESS + "/api/chambreculture")
//          .then((res) => res.json())
//          .then((res) => this.setState({ chambre: res })); 
//     };
  
//   //Si on connais pas le nombre de colonne
//   renderTableChambre() {
//     return this.state.chambre.map((chambre_culture, index) => {
//        let col = Object.keys(chambre_culture)
//        return (
//           <tr key={chambre_culture.id_chambre_culture}>
//              {col.map((val, index) => {
//                 return <td key={index}>{chambre_culture[col[index]]}</td>
//              })}
//           </tr>
//        )
//     })
//   }

//     render() {
//         return (
//             <div className="container-fluid">
//               <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
//                      <h1 id='title' className="txtCenter">Liste des chambres de culture</h1>
//               <div className="">
//       <div className="composant_table">
//         <table id='students'>
//            <tbody>
//             {/* <tr>{this.renderTableHeader()}</tr>   */}
//               <tr className="table">
//                 <td>Id</td>
//                 <td>Utilisateur</td>
//                 <td>Nom</td>
//                 <td>Longueur</td>
//                 <td>Largeur</td>
//                 <td>Hauteur</td>
//                 <td>Resultat volume</td>
//                 <td>Resultat surface</td>
//               </tr>
//               {this.renderTableChambre()}
//            </tbody>
//         </table>
//      </div>
//           </div> 
//           </div>
//              </div>
//         )
//     }

//     }

// export default ChambreCulture;
