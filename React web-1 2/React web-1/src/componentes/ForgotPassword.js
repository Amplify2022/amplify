import React from "react";
import { useRef } from "react";
import { Link, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import ForgotPasswordStyle from "./ForgotPasswordStyle.css";

const ForgotPassword = () => {
  const history = useHistory();
  const user = useRef("");
  const userPassword = useRef("");
  const passwordConfirmation = useRef("");
  const email= useRef("");

  const tomarDatos = (e) => {
    let dataToSend = {
      username: user.current.value,
      password: userPassword.current.value,
      passwordConfirmation: passwordConfirmation.current.value,
      email: email.current.value,
    };
    let formBody = JSON.stringify(dataToSend);
    if (!user) {
      alert("Por favor complete el apellido");
      return;
    }
    if (!userPassword) {
      alert("Por favor complete el nombre de usuario");
      return;
    }
    if (!passwordConfirmation) {
      alert("Por favor complete la confirmacion de la contraseña");
      return;
    }
    if (!email) {
      alert("Por favor complete el email");
      return;
    }
    changePassword(formBody);
  };

  const changePassword = (formBody) => {
    fetch(
      `http://Amplify-env.eba-gfgbyjuc.us-east-1.elasticbeanstalk.com/bars/updateBarPassword`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: formBody,
      }
    )
      .then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([data, statusCode]);
      })
      .then((data, statusCode) => {
        if (data[1] === 200) {
          console.log("El password fue actualizado");
          alert("El password fue actualizado")
          changeRoute();
        } else {
          alert("verifique los datos")
        }
      });

      const changeRoute = () => {
        let path = `/`;
        history.push(path);
      };

  }

  return (
    <div class="loginParent" id="loginParent">
      <div class="registerParent">
        <div className="h3">Cambia tu contraseña aqui</div>

        <div class="inputs">
          <input
            type="username"
            class="inputText"
            id="textuser"
            ref={user}
            placeholder="Username"
          />
          <input
            type="password"
            class="inputText"
            id="textpass"
            ref={userPassword}
            placeholder="Contraseña"
          />
          <input
            type="password"
            id="textpassconf"
            class="inputText"
            ref={passwordConfirmation}
            placeholder="Repita la contraseña"
          />
          <input
            type="email"
            id="email"
            class="inputText"
            ref={email}
            placeholder="Correo Electronico"
          />
        </div>
        <div class="submit" id="subm">
          <input type="button" value="Aceptar" class="block" id="buttonLogin" onClick={tomarDatos} />
        </div>
        <div class="bottomdiv">
          <Link to="/" className="pa" id="link">
            Volve al Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
