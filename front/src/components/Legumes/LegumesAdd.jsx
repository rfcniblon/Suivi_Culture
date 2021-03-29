// https://fr.wikipedia.org/wiki/Liste_de_légumes
// https://fr.wikipedia.org/wiki/Légume
// https://fr.wikipedia.org/wiki/Jardin_potager


import React, { Fragment } from "react";

const SERVER_ADDRESS = process.env.REACT_APP_SERVER_ADDRESS;

class LegumesAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validationError: "",
      name:"",
      planteIdData: [],
    };
    
  }

  componentDidMount = () => {
    // const id = sessionStorage.getItem("idcheck");
    const token = "Bearer " + localStorage.getItem("token");
    fetch(SERVER_ADDRESS + "/api/legumes/" , {
      method: "GET",
      headers: {
        Authorization: token
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(data => {
        this.setState({ planteIdData: data });
      });
    };

  render() {
    // const check = {
    //   acces: sessionStorage.getItem("acces"),
    // };
    // const id = sessionStorage.getItem("idcheck");
    return (
      <Fragment>
        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <h2 id="title" className="txtcenter decoration">
            Ajout d'un légume
          </h2>
          <div className="composant_table ici">
            <form
              id="legumes-form"
              onSubmit={this.handleSubmit.bind(this)}
              method="POST"
            >
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <label htmlFor="nom">Nom :</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nom"
                  value={this.state.name || ""}
                  onChange={this.onNameChange.bind(this)}
                />
              </div>

              <div className="bt_insert">
                <button type="submit" className="bt" title="enregistrer">
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      </Fragment>
    );
  }

  onNameChange(event) {
    this.setState({ name: event.target.value });
  }


  handleSubmit(event) {
    event.preventDefault();
    const bearerToken = 'Bearer ' + localStorage.getItem('token');
    fetch(SERVER_ADDRESS + "/api/legumes", {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: new Headers({
        'Content-Type': 'application/json',
        authorization: bearerToken
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status === "success") {
          alert("Message Sent.");
          this.resetForm();
        } else if (response.status === "fail") {
          alert("Message failed to send.");
        }
      });
  }
}

export default LegumesAdd;


// import React from "react";

// const SERVER_ADDRESS = process.env.REACT_APP_SERVER_ADDRESS;
  
// class PlanteAdd extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//           variete:'',
//           origine: '',
//           sexe: '',
//           quantite: '',
//           isSent: false,
//           loading: false,
//           formErrors: {
//             sexe: '',
//             quantite: '',
//             origine: '',
//             variete:''
            
//           },
//           varietevalid: false,
//           originevalid: false,
//           sexevalid: false,
//           originevalid: false,
//           formvalid: false,
//           quantite: false,
//           planteData: [] ,
//           captcha: true,
//         };
      
//     }
// // rentre les données dans le state
// handleChangePlante = event => {
//   const name = event.target.name;
//   const value = event.target.value;
//   // const variete = event.target.variete;
//   this.setState({ [name]: value }, () => {
//     this.validateField(name, value);
//   });
// };



// // vérifie les données entrées
// validateField(fielname, value) {
//   let fieldValidationErrors = this.state.formErrors;
//   let sexevalid = this.state.sexevalid;
//   let varietevalid = this.state.varietevalid;
//   let originevalid = this.state.originevalid;
//   let quantitevalid = this.state.quantitevalid;

//   switch (fielname) {
//     case 'variete':
//       varietevalid = value.length > 0;

//       fieldValidationErrors.variete = varietevalid
//         ? ''
//         : '* Champ requis.';
//       break;
//     case 'origine':
//       originevalid = value.length > 0;
//       fieldValidationErrors.origine = originevalid ? '' : '* Champ requis.';
//       break;
//     case 'sexe':
//       sexevalid = value.length > 0;
//       fieldValidationErrors.sexe = sexevalid ? '' : '* sexe non valide.';
//       break;
//     case 'quantite':
//       quantitevalid = value.length > 0;
//       fieldValidationErrors.quantite = quantitevalid ? '' : '* Champ requis.';
//       break;
//     default:
//       break;
//   }
//   this.setState(
//     {
//       formErrors: fieldValidationErrors,
//       sexevalid: sexevalid,
//       originevalid: originevalid,
//       varietevalid: varietevalid,
//       quantitevalid: quantitevalid
//     },
//     this.validateForm
//   );
// }

// validateForm() {
//   this.setState({
//     formvalid:
//       this.state.sexevalid &&
//       this.state.varietevalid &&
//       this.state.originevalid &&
//       this.state.quantitevalid
//   });
// }

// //début fonction
// handleSuiviSubmit = event => {
//   event.preventDefault();
//   //errors

//   let fieldValidationError = this.state.formErrors;

//   fieldValidationError.variete = this.state.varietevalid
//     ? ''
//     : '* Champ requis.';

//   fieldValidationError.origine = this.state.originevalid
//     ? ''
//     : '* Champ requis.';

//   fieldValidationError.sexe = this.state.sexevalid
//     ? ''
//     : '* champ requis.';

//   fieldValidationError.quantite = this.state.quantitevalid
//     ? ''
//     : '* champs requis';

//   this.setState({ formErrors: fieldValidationError });

//   // execution du captcha
//   // this.recaptcha.execute();
// this.onFetch();
// };

// // envoi des données
// onFetch = () => {
//   if (
//     this.state.varietevalid &&
//     this.state.originevalid &&
//     this.state.sexevalid &&
//     this.state.quantitevalid
//   ) {
//     // const { quantite, origine, sexe, variete } = this.state;
//       if (this.state.captcha) {
//        const bearerToken = "Bearer " + localStorage.getItem("token");
//       this.setState({ loading: true });
//       fetch(SERVER_ADDRESS + '/api/plante', {
//         method: 'POST',
//         headers: new Headers({
//           'Content-Type': 'application/json',
//           authorization: bearerToken
//         }),
//         body: JSON.stringify({
         
//           variete: this.state.variete,
//           origine: this.state.origine,
//           sexe: this.state.sexe,
//           quantite: this.state.quantite
        
//         })
//       }).then(res => {
//         if (res.ok) {
//           // message de confirmation
//           this.setState({ isSent: true }, () => {
//             setTimeout(() => {
//               this.setState({ isSent: false });
//             }, 5000);
//           });

//           // Reset

//           this.setState({ loading: false });
//           this.setState({ variete: '' });
//           this.setState({ origine: '' });
//           this.setState({ sexe: '' });
//           this.setState({ quantite: '' });
//           return res.json();
//         } else {
//           return res.text().then(text => {
//             throw new Error(text);
//           });
//         }
//       });

//       }
//   }
// };


//     render() {
//       const { variete, origine, sexe, quantite } = this.state;
    
//         return (
//             <div className="container-fluid">
//                 <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
//                    <h2  className="txtcenter ">Ajout d'une plante</h2>
//                 <div className="composant_table ici">
                     
//                  <form id="planteadd-form"  onSubmit={this.handleSuiviSubmit} method="POST">
                   
//                     <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
//                         <label htmlFor="variete">Variete :</label> <span className="">{this.state.formErrors.variete}</span>
//                         <input type="text" className="form-control" name="variete" value={variete }title="input_variete" placeholder="Variete "  onChange={this.handleChangePlante} />
                        
//                     </div>
//                     <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
//                     <label htmlFor="origine"> Origine :</label> <span className="">{this.state.formErrors.origine}</span>
//                        <select name="origine" id="origine" className="form-control" value={origine} onChange={this.handleChangePlante}>
//                        <option value="">Origine</option>
//                         <option value="graine"> Graine </option>
//                         <option value="bouture"> Bouture </option>
//                         <option value="croisement"> Croisement </option>
//                         <option value="inconnu"> Inconnu </option>
//                     </select> 
//                     </div>
//                     <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
//                     <label htmlFor="sexe"> Sexe :</label> <span className="">{this.state.formErrors.sexe}</span>
//                        <select name="sexe" id="sexe" className="form-control" value={sexe} onChange={this.handleChangePlante}>
//                        <option value="">Sexualité</option>
//                         <option value="male"> Male </option>
//                         <option value="femelle"> Femelle </option>
//                         <option value="feminise">  Feminisé</option>
//                         <option value="inconnu"> Inconnu </option>
//                     </select> 
//                     </div>
//                     <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
//                         <label htmlFor="quantite">Quantité :</label> <span className="">{this.state.formErrors.quantite}</span>
//                         <select name="quantite" id="quantite" className="form-control" value={quantite} onChange={this.handleChangePlante}>
//                        <option value="">Quantité </option>
//                         <option value="1"> 1 </option>
//                         <option value="2"> 2 </option>
//                         <option value="3"> 3 </option>
//                         <option value="4"> 4 </option>
//                         <option value="5"> 5 </option>
//                         <option value="6"> 6 </option>
//                         <option value="7"> 7 </option>
//                         <option value="8"> 8 </option>
//                         <option value="9"> 9 </option>
//                         <option value="10"> 10 </option>
//                     </select> 
//                     </div>
//                    <div className="col-sm-12 mb-5 button-text-contact">
//                             <input
//                               type="submit"
//                               value={
//                                 this.state.loading
//                                   ? 'Envoi en cours...'
//                                   : 'Envoyer'
//                               }
//                               className="bt"
//                             />
//                           </div>
//                           <div
//                           className={
//                             this.state.isSent ? 'alert alert-success' : 'd-none'
//                           }
//                         >
//                           {this.state.isSent ? 'Données envoyé!' : ''}
//                         </div>
//                 </form>
//                 </div>
//           </div>  
//           </div>
//         )
//     }

//     }

// export default PlanteAdd;