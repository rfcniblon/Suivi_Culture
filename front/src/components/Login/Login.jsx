import React, { Fragment } from "react";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import Register from "../Register/Register";

const SERVER_ADDRESS = process.env.REACT_APP_SERVER_ADDRESS;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  handleChange = (event) => {
    switch (event.target.name) {
      case "username":
        this.setState({ username: event.target.value });
        break;
      case "password":
        this.setState({ password: event.target.value });
        break;
      default:
        break;
    }
  };

  handleFormSubmit = () => {
    const { username, password } = this.state;

    fetch(SERVER_ADDRESS + "/api/login", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({ name: username, password: password }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.text().then((text) => {
            throw new Error(text);
          });
        }
      })
      .then((data) => {
        // const client = "client";
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", username);
        this.props.updateFunction();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  render() {
    const { username, password } = this.state;
    return (
      <Fragment>
      <div className="container-fluid">
    <section id="tabs" className="project-tab">
      <div className="container">
        <div className="row">
          <div className="pt-2 offset-3 column col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
            <nav className="centrage_verti">
              <div
                className="nav nav-tabs nav-fill"
                id="nav-tab"
                role="tablist"
              >
                 <a
                  className="nav-item nav-link active"
                  id="nav-home-tab"
                  data-toggle="tab"
                  href="#nav-home"
                  role="tab"
                  aria-controls="nav-home"
                  aria-selected="true"
                >
                  Se connecter
                </a> 
                 <a
                  className="nav-item nav-link"
                  id="nav-profile-tab"
                  data-toggle="tab"
                  href="#nav-profile"
                  role="tab"
                  aria-controls="nav-profile"
                  aria-selected="false"
                >
                  S'inscrire
                </a> 
                  <a
                    className="nav-item nav-link"
                    id="nav-forgot-tab"
                    data-toggle="tab"
                    href="#nav-forgot"
                    role="tab"
                    aria-controls="nav-forgot"
                    aria-selected="false"
                  >
                   Mot de pass perdu ?
                 </a> 
              </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
              <div
                className="tab-pane fade show active"
                id="nav-home"
                role="tabpanel"
                aria-labelledby="nav-home-tab"
              >
 <div>
        {/* <section className="container-fluid"> */}
          <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 ">
            <form>
              <h2 className="pt-2 txtcenter">Se connecter</h2>

              <div className="pt-2 offset-4 column col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                <div className="">
                  <label className="">Username: </label>
                  <input
                    className="form-control col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 input_login"
                    name="username"
                    value={username}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="">
                  <label className="">Password: </label>
                  <input
                    className="form-control col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 input_login"
                    type="password"
                    name="password"
                    value={password}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 txtcenter">
                <button
                  className="bt"
                  type="button"
                  onClick={this.handleFormSubmit}
                >
                  Se connecter
                </button>
              </div>
            </form>
          </div>
      </div>
              </div>
              <div
                className="tab-pane fade"
                id="nav-profile"
                role="tabpanel"
                aria-labelledby="nav-profile-tab"
              >
              <Register/>
              </div>
              <div
                className="tab-pane fade"
                id="nav-forgot"
                role="tabpanel"
                aria-labelledby="nav-forgot-tab"
              >
              <ForgotPassword/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</Fragment>
     
    
    );
  }
}

export default Login;
