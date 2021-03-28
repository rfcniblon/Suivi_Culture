import React, { Component } from 'react';
import { Fragment } from 'react';
import Recaptcha from 'react-google-invisible-recaptcha';

const SERVER_ADDRESS = process.env.REACT_APP_SERVER_ADDRESS;

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      isSent: false,
      loading: false,
      formErrors: {
        email: '',
      },
      emailvalid: false,
      formvalid: false,
      captcha: false,
      contactData: [],
    };
  }

  // rentre les données dans le state
  handleChangeContact = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  // vérifie les données entrées
  validateField(fielname, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailvalid = this.state.emailvalid;

    switch (fielname) {
      case 'email':
        emailvalid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailvalid ? '' : '* email non valide.';
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        emailvalid: emailvalid
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formvalid:
        this.state.emailvalid 
    });
  }

  //début fonction
  handleContactSubmit = event => {
    event.preventDefault();
    //errors
    let fieldValidationError = this.state.formErrors;

    fieldValidationError.email = this.state.emailvalid
      ? ''
      : '* email non valide.';

    this.setState({ formErrors: fieldValidationError });

    // execution du captcha
    this.recaptcha.execute();

  };

  // le captcha appelle cette fonction après vérification, on exécute onFetch('envoie de mail)
  onResolved = () => {
    this.setState({ captcha: true }, this.onFetch);
  };


  // envoi de mail
  onFetch = () => { 
       
    if (
      this.state.emailvalid
    ) {
      const { email } = this.state;
    
      if (this.state.captcha) {
        this.setState({ loading: true });
        fetch(SERVER_ADDRESS + '/api/forgotpassword', {
          method: 'POST',
          headers: new Headers({
            'Content-Type': 'application/json'
          }),
          body: JSON.stringify({
            email: email,
          })
        }).then(res => {
          if (res.ok) {
            // message de confirmation
            this.setState({ isSent: true }, () => {
              setTimeout(() => {
                this.setState({ isSent: false });
              }, 5000);
            });

            // Reset

            this.setState({ loading: false });
            this.setState({ captcha: false });
            this.setState({ email: '' });
            return res.json();
          } else {
            return res.text().then(text => {
              throw new Error(text);
            });
          }
        });
      }
    }
  };

  //fin fonction

  render() {
    const { email } = this.state;
    return (
      <Fragment>
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
                      <form onSubmit={this.handleContactSubmit}>
                          <h2 className="pt-2 txtcenter">
                              Mot de passe perdu ?
                            </h2>
                       <div className="pt-2 offset-2 column col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                      
                            <div className="">
                              <label className="">
                                Email</label> 
                                <span>{this.state.formErrors.email}</span>
                              
                              <input
                              placeholder="Veuillez entrer votre email"
                                type="text"
                                name="email"
                                value={email}
                                onChange={this.handleChangeContact}
                                className="form-control col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 input_login"
                              />
                            </div>
                        
                         
                        
                       
                       
                          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 txtcenter">
                            <input
                              type="submit"
                              value={
                                this.state.loading
                                  ? 'Envoi en cours...'
                                  : 'Envoyer'
                              }
                              className=" mt-6 bt col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6"
                            />
                          </div>
                       
                        <Recaptcha
                          ref={ref => (this.recaptcha = ref)}
                          sitekey="6LeowMMZAAAAAMeuD3KboeL6ZMpn0VGQzQYWC2N0"
                          onResolved={this.onResolved}
                        />
                        <div
                          className={
                            this.state.isSent ? 'alert alert-success' : 'd-none'
                          }
                        >
                          {this.state.isSent ? 'Email avec liens reset password envoyé!' : ''}
                        </div>
                       </div>  
                      </form>
                    </div>
          
      </Fragment>
    );
  }
}

export default ForgotPassword;
