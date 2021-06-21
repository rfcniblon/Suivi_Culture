import React, { useEffect, useState } from "react";
import axios from "axios";

const SERVER_ADDRESS = process.env.REACT_APP_SERVER_ADDRESS;

function ActiveCompte(props) {
  const [data, setData] = useState({ user_activation: [] });

  const params = props.match.params;

  async function fetchData() {
    let response = await axios("http://localhost:3001/api/activecompte/user/" + params.name);
    let user = await response.data;
    setData(user);
  }
  useEffect(() => {
    fetchData();
  }, [params.name]);

  // fonction qui verifie le isverified
  const IsVerified = () => {
    if (data.length > 0) {
      if (data[0].isverified != 0) {
        return (
          <div>
            <h2>Le compte est déjà activé</h2>
          </div>
        );
      } else {
        return TokenTest();
      }
    }
  };

  // fonction qui compare le token de la bdd et le params.token
  const TokenTest = () => {
    if (data.length > 0) {
      if (data[0].resetPasswordToken === params.token) {
        return ActiveCompte();
      } else {
        return (
          <div>
            <h2>
              Un souci à du arrivé ... , veuillez re initialisé votre demande de
              perte de mot de pass
            </h2>
            <h3>Token non valide</h3>
          </div>
        );
      }
    }
  };
  const ActiveCompte = () => {
    fetch(SERVER_ADDRESS + "/api/activecompte/" + data[0].id, {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        id: data[0].id,
      }),
    }).then((res) => {
      if (res.ok) {
        console.log("message de confirmation html");
        // message de confirmation
        // this.setState({ isSent: true }, () => {
        //   setTimeout(() => {
        //     this.setState({ isSent: false });
        //   }, 5000);
        // });
        return res.json();
      } else {
        return res.text().then((text) => {
          throw new Error(text);
        });
      }
    });
  };

  return (
    <div className="">
      <div className="">
        <h1>Activation du compte</h1>
      </div>
      <h2>Nom utilisateur</h2>
      <label>{params.name}</label>
      <a href="/login"> Login </a>
      {data.length > 0 && <span>{IsVerified()}</span>}
    </div>
  );
}

export default ActiveCompte;
