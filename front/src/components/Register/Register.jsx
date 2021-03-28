import React, { Fragment } from "react";

const SERVER_ADDRESS = process.env.REACT_APP_SERVER_ADDRESS;

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      password: "",
      email: "",
      confirm_mdp:"",
      isSent: false,
      loading: false,
      formErrors: { 
        name: "",
        password: "",
        email: "",
      },
      namevalid: false,
      passwordvalid: false,
      emailvalid: false,
      formvalid: false,
      registerData: [],
      captcha: true,
    };
  }
  // rentre les données dans le state
  handleChangePlante = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };


// on fait une fonction pour verifier que les
// -- champs mot de pass sont identiques  ok
// -- on affiche un message dans le html nok

  checkPass = () => {

if(this.state.password == this.state.confirm_mdp)
{
console.log("ok")
// message password ok
}
else
{
console.log("nok")
// message " les deux mot de pass ne correspondent pas !"
}
  };




  // vérifie les données entrées
  validateField(fielname, value) {
    let fieldValidationErrors = this.state.formErrors;
   let namevalid = this.state.namevalid;
    let passwordvalid = this.state.passwordvalid;
    let emailvalid = this.state.emailvalid;
   
    switch (fielname) {
      case "name":
        namevalid = value.length > 0;
        fieldValidationErrors.name = namevalid ? "" : "* Champ requis.";
        break;
      case "password":
        passwordvalid = value.length > 0;
        fieldValidationErrors.password = passwordvalid ? "" : "* Champ requis.";
        break;
      case "email":
        emailvalid = value.length > 0;
        fieldValidationErrors.email = emailvalid ? "" : "* Champ requis.";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
         namevalid: namevalid,
         passwordvalid: passwordvalid,
        emailvalid: emailvalid,
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formvalid:
       this.state.namevalid &&
        this.state.passwordvalid &&
        this.state.emailvalid,
    });
  }

  //début fonction
  handleRegisterSubmit = (event) => {
    event.preventDefault();
    //errors
    let fieldValidationError = this.state.formErrors;

    fieldValidationError.name = this.state.namevalid ? "" : "* Champ requis.";
    fieldValidationError.password = this.state.passwordvalid ? "" : "* Champ requis.";
    fieldValidationError.email = this.state.emailvalid ? "" : "* champ requis.";

    this.setState({ formErrors: fieldValidationError });

    // execution du captcha
    // this.recaptcha.execute();
    this.onFetch();
  };

onFetchToken = () =>{
    if (
        this.state.namevalid &&
        this.state.passwordvalid &&
        this.state.emailvalid
      ) {
        // const { name, password, email, confirm_mdp } = this.state;
        if (this.state.captcha) {
          this.setState({ loading: true });
          fetch(SERVER_ADDRESS + "/api/register", {
            method: "POST",
            headers: new Headers({
              "Content-Type": "application/json",
            }),
            body: JSON.stringify({
              name: this.state.name,
              password: this.state.password,
              email: this.state.email,
            }),
          }).then((res) => {
            if (res.ok) {
              // message de confirmation
              this.setState({ isSent: true }, () => {
                setTimeout(() => {
                  this.setState({ isSent: false });
                }, 5000);
              });

              return res.json();
            } else {
              return res.text().then((text) => {
                throw new Error(text);
              });
            }
          });
        }
      }
}

  // envoi des données
  onFetch = () => {
    if (
      this.state.namevalid &&
      this.state.passwordvalid &&
      this.state.emailvalid
    ) {
      // const { name, password, email, confirm_mdp } = this.state;
      if (this.state.captcha) {
        this.setState({ loading: true });
        fetch(SERVER_ADDRESS + "/api/register", {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json",
          }),
          body: JSON.stringify({
            name: this.state.name,
            password: this.state.password,
            email: this.state.email,
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
            this.setState({ name: "" });
            this.setState({ password: "" });
            this.setState({ email: "" });
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
    const { name, password, confirm_mdp, email } = this.state;

    return (
      <Fragment>
        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <h2 className=" pt-2 txtcenter ">S'inscrire</h2>
          <div className="composant_table ici">
            <form
              id="planteadd-form"
              onSubmit={this.handleRegisterSubmit}
              method="POST"
            >
              <div className="pt-2 offset-3 column col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <label htmlFor="name">Pseudo :</label>
                <span className="">{this.state.formErrors.name}</span>
                <input
                  type="text"
                  className="form-control col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 input_login"
                  name="name"
                  value={name}
                  title="input_name"
                  placeholder="Entrer un Pseudo"
                  onChange={this.handleChangePlante}
                  required
                />
              </div>
              <div className="pt-2 offset-3 column col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <label htmlFor="password">Mot de pass :</label>
                <span className="">{this.state.formErrors.password}</span>
                <input
                  type="password"
                  className="form-control col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 input_login"
                  name="password"
                  value={password}
                  title="input_password"
                  placeholder="Entrer un mot de pass"
                  onChange={this.handleChangePlante}
                  required
                />
              </div>

              <div className="pt-2 offset-3 column col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <label htmlFor="confirm_mdp">Confirmation du mot de pass :</label>
                <span className="">{this.state.formErrors.confirm_mdp}</span>
                <input
                  type="password"
                  className="form-control col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 input_login"
                  name="confirm_mdp"
                  value={confirm_mdp}
                  title="input_confirm_mdp"
                  placeholder="confirm mot de pass "
                  onChange={this.handleChangePlante}
                  onBlur={this.checkPass}
                  required
                />
              </div>
              <div className="pt-2 offset-3 column col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <label htmlFor="email">Email :</label>
                <span className="">{this.state.formErrors.email}</span>
                <input
                  type="email"
                  className="form-control col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 input_login"
                  name="email"
                  value={email}
                  title="input_email"
                  placeholder="adresse email"
                  onChange={this.handleChangePlante}
                  required
                />
              </div>
              <div className="pt-2 offset-4 column col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4 txtcenter">
                <input
                  type="submit"
                  value={this.state.loading ? "Envoi des données en cours..." : "Envoyer"}
                  className="bt"
                />
              </div>
              <div
                className={this.state.isSent ? "alert alert-success" : "d-none"}
              >
                {this.state.isSent ? "Un email viens de vous être envoyer pour activer votre compte !" : ""}
              </div>
            </form>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Register;
