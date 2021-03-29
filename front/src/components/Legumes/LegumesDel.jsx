import React from "react";

const SERVER_ADDRESS = process.env.REACT_APP_SERVER_ADDRESS;

class LegumesDel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id_chambre: "",
    chambreData:[],
      isSent: false,
      loading: false,
      formErrors: {
        id_chambre: "",
      },
      id_chambrevalid: false,
      formvalid: false,
      chambrecultureData: [],
      captcha: true,
    };
  }

  componentDidMount = () => { 
    const id = sessionStorage.getItem("idcheck");
    const token = "Bearer " + localStorage.getItem("token");
    fetch(SERVER_ADDRESS + "/api/chambreculture/user/" + id, {
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
        this.setState({ chambreData: data });
        
      });
  };

  // rentre les données dans le state
  handleChangeChambre = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
    console.log(name);
  };

  // vérifie les données entrées
  validateField(fielname, value) {
    let fieldValidationErrors = this.state.formErrors;
    let id_chambrevalid = this.state.id_chambrevalid;
 

    switch (fielname) {
      case "id_chambre":
        id_chambrevalid = value.length > 0;

        fieldValidationErrors.id_chambre = id_chambrevalid
          ? ""
          : "* Champ requis.";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        id_chambrevalid: id_chambrevalid
     
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formvalid:
        this.state.id_chambrevalid 
    });
  }

  //début fonction
  handleSuiviSubmit = (event) => {
    event.preventDefault();
    //errors

    let fieldValidationError = this.state.formErrors;

    fieldValidationError.id_chambre = this.state.id_chambrevalid
      ? ""
      : "* Champ requis.";
   
    this.setState({ formErrors: fieldValidationError });


    this.onFetch();
  };

  // envoi des données
  onFetch = () => {
    const active = 2; 
    if (
      this.state.id_chambrevalid 
    ) {
      // const { quantite, origine, sexe, fk_id_plante } = this.state;
      if (this.state.captcha) {
        const bearerToken = "Bearer " + localStorage.getItem("token");
        this.setState({ loading: true });
        console.log(this.state.id_chambre);
        fetch(SERVER_ADDRESS + "/api/chambreculture/" + this.state.id_chambre, {
          method: "PUT",
          headers: new Headers({
            "Content-Type": "application/json",
            authorization: bearerToken,
          }),
          body: JSON.stringify({
            id_chambre: this.state.id_chambre,
            active: active,
          }),
        }).then((res) => {
          if (res.ok) {
            // message de confirmation
            this.setState({ isSent: true }, () => {
              setTimeout(() => {
                this.setState({ isSent: false });
              }, 5000);
            });

            // Reset

            this.setState({ loading: false });
            this.setState({ id_chambre: "" });
            return res.json();
          } else {
            return res.text().then((text) => {
              throw new Error(text);
            });
          }
        });
      }
    }
  };

  render() {
   
      const { id_chambre,chambreData} = this.state;
      
    return (
      <div className="container-fluid">
        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <h2 className="txtcenter ">Suppression d'une chambre de culture</h2>
          <div className="composant_table ici">
            <form
              id="plantedel-form"
              onSubmit={this.handleSuiviSubmit}
              method="DEL"
            >
              <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
              <label htmlFor="id_chambre_del"> Id de la chambre à supprimer :</label><span className="">{this.state.formErrors.id_chambre}</span>
               <select value={id_chambre} name="id_chambre" onChange={this.handleChangeChambre} className="form-control col-12 col-sm-12 col-md-12 col-lg-9 col-xl-9">
                 <option id="" style={{ display: "none" }}>
                   Selectionner
                 </option>
                 {this.state.chambreData.map((chambreculture, index) => (
                   <option key={chambreculture.id_chambre} value={chambreculture.id_chambre}  >
                     {chambreculture.id_chambre}
                   </option>
                 ))}
               </select>
              </div>
             
          
              <div className="col-sm-12 mb-5 button-text-contact">
                <input
                  type="submit"
                  value={this.state.loading ? "Envoi en cours..." : "Envoyer"}
                  className="bt"
                />
              </div>
              <div
                className={this.state.isSent ? "alert alert-success" : "d-none"}
              >
                {this.state.isSent ? "modifications des données envoyé!" : ""}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LegumesDel;
