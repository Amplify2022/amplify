import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyAQgOOl7DctWsD2sMFZ9MczoF-OkN6UY-A");
Geocode.setLanguage("en");
Geocode.setRegion("uy");
Geocode.setLocationType("ROOFTOP");

const Register = () => {
  const userName = useRef("");
  const barName = useRef("");
  const userFirstName = useRef("");
  const userLastName = useRef("");
  const userEmail = useRef("");
  const userPhone = useRef("");
  const userAddress = useRef("");
  const userGender= useRef("");
  const [userLatitude, setUserLatitude] = useState("");
  const [userLongitude, setUserLongitude] = useState("");
  const userRut = useRef("");
  const [userProfilePic, setUserProfilePic] = useState("");
  const userPassword = useRef("");
  const userConfirmationPassword = useRef("");
  const [loading, setLoading] = useState(false);
  const [errorLogin] = useState(false);
  const [validateAddress, setAddressValidation] = useState(false);

  const tomarDatos = (e) => {
    let dataToSend = {
      userType: "BAR",
      firstName: userFirstName.current.value,
      lastName: userLastName.current.value,
      username: userName.current.value,
      password: userPassword.current.value,
      passwordConfirmation: userConfirmationPassword.current.value,
      email: userEmail.current.value,
      barName: barName.current.value,
      address: userAddress.current.value,
      phone: userPhone.current.value,
      rut: userRut.current.value,
      profilePic: userProfilePic,
      latitude: userLatitude,
      longitude: userLongitude,
      musicGender: userGender.current.value,
    };
    let formBody = JSON.stringify(dataToSend);

    if (!userFirstName) {
      alert("Por favor complete el nombre");
      return;
    }
    if (!userLastName) {
      alert("Por favor complete el apellido");
      return;
    }
    if (!userName) {
      alert("Por favor complete el nombre de usuario");
      return;
    }
    if (!userPassword) {
      alert("Por favor complete la contraseña");
      return;
    }
    if (!userConfirmationPassword) {
      alert("Por favor complete la confirmacion de la contraseña");
      return;
    }
    if (!userEmail) {
      alert("Por favor complete el email");
      return;
    }
    if (!userGender) {
      alert("Por favor complete el genero favorito");
      return;
    }
    if (!barName) {
      alert("Por favor complete el nombre del bar");
      return;
    }
    if (!userAddress) {
      alert("Por favor complete la dirección");
      return;
    }
    if (!userPhone) {
      alert("Por favor complete el teléfono");
      return;
    }
    if (!userRut) {
      alert("Por favor complete el número de RUT");
      return;
    }
    if (!userProfilePic) {
      alert("Por favor seleccione una imágen");
      return;
    }
    if (validateAddress == false) {
      alert("Por favor valide la dirección");
      return;
    }
    registration(formBody);
  };

  const registration = (formBody) => {
    fetch(
      "http://Amplify-env.eba-gfgbyjuc.us-east-1.elasticbeanstalk.com/bars/save",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: formBody,
      }
    )
      .then((response) => {
        console.log("--------------------------");
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([data, statusCode]);
      })
      .then((data, statusCode) => {
        setLoading(true);
        alert("Se ha registrado con exito")
        console.log("respuesta", data);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const addressValidation = (e) => {
    Geocode.fromAddress(userAddress.current.value).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log("latitude", lat, "logitude", lng);
        setUserLatitude(lat);
        setUserLongitude(lng);
        setAddressValidation(true);
      },
      (error) => {
        console.error(error);
        alert("Por favor ingrese una direccion valida");
      }
    );
  };


  const convert2base64 = (e) => {
    console.log("LLEGUÉ");
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setUserProfilePic(reader.result.toString());
      console.log("imagen del usuario", userProfilePic);
    };
    reader.readAsDataURL(file);
  };



  if (loading) {
    return <Redirect to="/" />;
  } else {
    return (
      <div class="loginParent">
        <div class="registerParent">
          <h4>Completa el siguiente formulario con los datos tu bar</h4>
          <h7>(Recorda validar la direccion)</h7>
          <div class="form">
            <div class="formElement">
              <div class="reg">
                <label htmlFor="userName">Username: </label>
              </div>
              <input
                type="text"
                class="textForm"
                id="userName"
                ref={userName}
              />
            </div>
            <div class="formElement">
              <div class="reg">
                <label htmlFor="barName">Nombre del Bar: </label>
              </div>
              <input type="text" class="textForm" id="barName" ref={barName} />
            </div>
            <div class="formElement">
              <div class="reg">
                <label htmlFor="userFirstName">Nombre: </label>
              </div>
              <input
                type="text"
                class="textForm"
                id="userFirstName"
                ref={userFirstName}
              />
            </div>
            <div class="formElement">
              <div class="reg">
                <label htmlFor="userLastName">Apellido: </label>
              </div>
              <input
                type="text"
                class="textForm"
                id="userLastName"
                ref={userLastName}
              />
            </div>
            <div class="formElement">
              <div class="reg">
                <label htmlFor="userAddress">Dirección: </label>
              </div>
              <input
                type="text"
                class="textForm"
                id="userAddress"
                ref={userAddress}
              />
              <input
                value="Validar"
                type="button"
                id="addressValidation"
                onClick={addressValidation}
              />
            </div>
            <div class="formElement">
              <div class="reg">
                <label htmlFor="userPhone">Teléfono: </label>
              </div>
              <input
                class="textForm"
                type="text"
                id="userPhone"
                ref={userPhone}
              />
            </div>
            <div class="formElement">
              <div class="reg">
                <label htmlFor="userRut">RUT: </label>
              </div>
              <input type="text" class="textForm" id="userRut" ref={userRut} />
            </div>
            <div class="formElement">
              <div class="reg">
                <label htmlFor="userEmail">Email: </label>
              </div>
              <input
                type="text"
                class="textForm"
                id="userEmail"
                ref={userEmail}
              />
            </div>
            <div class="formElement">
              <div class="reg">
                <label htmlFor="userEmail">Genero musical </label>
              </div>
              <input
                type="text"
                class="textForm"
                id="userGender"
                ref={userGender}
              />
            </div>
            <div class="formElement">
              <div class="reg">
                <label htmlFor="userPassword">Contraseña: </label>
              </div>
              <input
                type="password"
                class="textForm"
                id="userPassword"
                ref={userPassword}
              />
            </div>
            <div class="formElement">
              <div class="reg">
                <label htmlFor="userConfirmationPassword">
                  Repetir Contraseña:{" "}
                </label>
              </div>
              <input
                type="password"
                class="textForm"
                id="userConfirmationPassword"
                ref={userConfirmationPassword}
              />
            </div>
            <div class="formElement">
              <div class="reg">
                <label htmlFor="userProfilePic">Foto: </label>
              </div>
              <input
                type="file"
                alt="Imagen"
                class="textForm"
                id="userProfilePic"
                onChange={(e) => convert2base64(e)}
                accept="image/"
              />
            </div>
          </div>
          {errorLogin ? <p>Ya existe el usuario </p> : null}
          <div className="actionsContainer">
            <div class="completeForm">
              <input
                type="button"
                value="Registrate"
                onClick={tomarDatos}
                className="botonRegistro"
              />
            </div>
            <Link to="/" className="pa">
              Volve al Login
            </Link>
          </div>
        </div>
      </div>
    );
  }
};

export default Register;
