import React, { Fragment } from "react";

const SERVER_ADDRESS = process.env.REACT_APP_SERVER_ADDRESS;

class LegumesPut extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id_legumes: "",
      name:'',
      legumesData:[],
      isSent: false,
      loading: false,
      formErrors: {
        id_legumes: "",
       name: "",
      },
      // id_chambrevalid: false,
      namevalid: false,
      formvalid: false,
      chambrecultureData: [],
      captcha: true,
    };
  }

  componentDidMount = () => {
    // const id = sessionStorage.getItem("idcheck");
    const token = "Bearer " + localStorage.getItem("token");
    fetch(SERVER_ADDRESS + "/api/legumes", {
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
        this.setState({ legumesData: data });
      });
    };

  // rentre les données dans le state
  handleChangeChambre = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    // const fk_id_plante = event.target.fk_id_plante;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  // vérifie les données entrées
  validateField(fielname, value) {
    let fieldValidationErrors = this.state.formErrors;
    // let id_chambrevalid = this.state.id_chambrevalid;
   
    let namevalid = this.state.namevalid;

    switch (fielname) {
      case "name":
        namevalid = value.length > 0;

        fieldValidationErrors.name = namevalid
          ? ""
          : "* Champ requis.";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        namevalid: namevalid,
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formvalid:
        // this.state.id_legumesvalid &&
        this.state.namevalid,
    });
  }

  //début fonction
  handleSuiviSubmit = (event) => {
    event.preventDefault();
    //errors

    let fieldValidationError = this.state.formErrors;

    fieldValidationError.name = this.state.namevalid
      ? ""
      : "* champs requis";
    this.setState({ formErrors: fieldValidationError });

    // execution du captcha
    // this.recaptcha.execute();
    this.onFetch();
  };

  // envoi des données
  onFetch = () => {
    if (
     
      this.state.namevalid
    ) {
      // const { quantite, origine, sexe, fk_id_plante } = this.state;
      if (this.state.captcha) {
        const bearerToken = "Bearer " + localStorage.getItem("token");
        this.setState({ loading: true });
        console.log(this.state.id_chambre);
        fetch(SERVER_ADDRESS + "/api/legumes/" + this.state.id_legumes, {
          method: "PUT",
          headers: new Headers({
            "Content-Type": "application/json",
            authorization: bearerToken,
          }),
          body: JSON.stringify({
            id_legumes: this.state.id_legumes,
            name: this.state.name,
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
            this.setState({ id_legumes: "" });
            this.setState({ name: "" });
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
    const {
      id_legumes
    } = this.state;

    return (
      <Fragment>
        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <h2 className="txtcenter ">Modification d'un legume</h2>
          <div className="composant_table ici">
            <form
              id="planteput-form"
              onSubmit={this.handleSuiviSubmit}
              method="PUT"
            >
              <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <label htmlFor="id_chambre">Id de la chambre de culture :</label>
                <span className="">{this.state.formErrors.id_chambre}</span>
               {/*  <input
                  type="text"
                  className="form-control"
                  name="id_chambre"
                  value={id_chambre}
                  title="input_variete"
                  placeholder="id de la chambre de culture "
                  onChange={this.handleChangeChambre}
                /> */}
                 <select
                  value={id_legumes}
                  onChange={this.handleChangeChambre}
                  className="form-control"
                  name="id_chambre"
                >
                  <option id="" style={{ display: "none" }}>
                    Selectionner
                  </option>
                  {this.state.legumesData.map((legumes, index) => (
                    <option key={index} value={legumes.id_legumes}>
                      {legumes.name}
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
      </Fragment>
    );
  }
}

export default LegumesPut;
