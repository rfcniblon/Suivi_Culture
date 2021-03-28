import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import './components/Scss/style.css';
import Login from './components/Login/Login';
import AdminPage from './components/Admin/Admi';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import Register from './components/Register/Register';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
      redirectToAdminPage: false,
    };
  }

  // fonction pour mettre à jour isLogged et redirectToAdminPage dans le state de App.js,
  // cette fonction est passée en props au composant LoginPage pour que ce même composant puisse déclencher cette fonction
  updateLogin = () => {
    this.setState({
      isLogged: true,
      redirectToAdminPage: true
    });

  };

  render() {
    const { isLogged, redirectToAdminPage } = this.state;
    return (
      <>
        {redirectToAdminPage && <Redirect to="/admin" />}
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route path="/forgotpassword" component={ForgotPassword}/>
          <Route exact path="/" component={() => <Login updateFunction={this.updateLogin} />} />
          {isLogged ? <Route exact path="/admin" component={AdminPage} /> : <Redirect to="/" />}  
 
        </Switch>
      </>
    )
  }
}

export default App;
