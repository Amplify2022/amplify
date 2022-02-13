import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import spotifyBearer from "./spotifyBearer";

const Login = () => {
  const user = useRef("");
  const userPassword = useRef("");
  const [errortext, setErrortext] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorLogin] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const tomarDatos = (e) => {
    let dataToSend = {
      username: user.current.value,
      password: userPassword.current.value,
    };
    let formBody = JSON.stringify(dataToSend);
    barLogin(formBody);
  };

  const barLogin = (formBody) => {
    fetch(
      "http://Amplify-env.eba-gfgbyjuc.us-east-1.elasticbeanstalk.com/bars/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
        console.log("respuesta", data);
        //Hide Loader
        setLoading(false);
        if (data[1] === 200) {
          if (data[0] != null) {
            console.log("response in login", data[0]);
            console.log("rut del bar", data[0].rut);
            console.log("nombre del bar", data[0].barName);

            sessionStorage.setItem("rut", data[0].rut);
            sessionStorage.setItem("barName", data[0].barName);
            sessionStorage.setItem("userName", data[0].username);
            spotifyBearer();
            dispatch({
              type: "BAR",
              payload: { rut: data[0].rut, barName: data[0].barName },
            });
            setLoading(true);
          } else {
            console.log("data empty");
          }
        } else {
          console.log("user/contrasena invalido");
          alert("Username o contrasena invalido");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const routeChange = () => {
    let path = `/register`;
    history.push(path);
  };

  if (loading) {
    return <Redirect to="/home" />;
  } else {
    return (
      <div class="loginParent">
        <div className="login">
          <div className="h3">Bienvenido a Amplify!</div>
          <div class="inputs">
            <input
              type="text"
              class="inputText"
              id="user"
              ref={user}
              placeholder="Usuario"
            />
            <input
              type="password"
              class="inputText"
              id="userPassword"
              ref={userPassword}
              placeholder="Contrasena"
            />
          </div>
          {errorLogin ? <p>Ya existe el usuario </p> : null}

          <div class="submit">
            <input
              type="button"
              value="Login"
              class="block"
              id="buttonLogin"
              onClick={tomarDatos}
              className="botonLogin"
            />
          </div>
          <div className="divo">o</div>
          <div class="submit" id="subm">
            <input
              type="button"
              value="Registro"
              class="block"
              id="buttonRegister"
              onClick={routeChange}
            />
          </div>

          <div class="forgotPass">
            <a href="/ForgotPassword" className="forgotPassword">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </div>
      </div>
    );
  }
};

export default Login;
