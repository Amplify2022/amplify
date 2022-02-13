import { useRef, useState, Button, useEffect } from "react";
import { Link } from "react-router-dom";
import Geocode from "react-geocode";
import { useHistory } from "react-router-dom";
import { confirm } from "react-confirm-box";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";


const UpdateUser = () => {
  const history = useHistory();
  const [userNameFetch, setUserNameFetch] = useState("");
  const [barNameFetch, setBarNameFetch] = useState("");
  const [userFirstNameFetch, setUserFirstNameFetch] = useState("");
  const [userLastNameFetch, setUserLastNameFetch] = useState("");
  const [userEmailFetch, setUserEmailFetch] = useState("");
  const [userPhoneFetch, setUserPhoneFetch] = useState("");
  const [userAddressFetch, setUserAddressFetch] = useState("");
  const [userRutFetch, setUserRutFetch] = useState("");
  const [userGenderFetch, setUserGenderFetch] = useState("");
  const [userProfilePicFetch, setUserProfilePicFetch] = useState("");
  const [userPasswordFetch, setUserPasswordFetch] = useState("");
  const [userPasswordConfirmationFetch, setUserPasswordConfirmationFetch] = useState("");


  useEffect(() => {
    fetch(
      `http://Amplify-env.eba-gfgbyjuc.us-east-1.elasticbeanstalk.com/bars/findByUsername/${sessionStorage.getItem(
        "userName"
      )}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    )
      .then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([data, statusCode]);
      })
      .then((data) => {
        if (data[1] === 200) {
          console.log("obtuve el user", data[0]);
          setUserNameFetch(data[0].username);
          setBarNameFetch(data[0].barName);
          setUserFirstNameFetch(data[0].firstName);
          setUserLastNameFetch(data[0].lastName);
          setUserEmailFetch(data[0].email);
          setUserPhoneFetch(data[0].phone);
          setUserAddressFetch(data[0].address);
          setUserGenderFetch(data[0].musicGender);
          setUserRutFetch(data[0].rut);
          setUserProfilePicFetch(data[0].profilePic);
          setUserPasswordFetch(data[0].password);
          setUserLongitude(data[0].latitude);
          setUserLatitude(data[0].latitude);
          setUserPasswordConfirmationFetch(data[0].passwordConfirmation);
          setUserProfilePicFetch(data[0].profilePic);
        } else {
          console.log("no obtuve el user");
        }
      });
  }, []);

  const userName = useRef("");
  const barName = useRef("");
  const userFirstName = useRef("");
  const userLastName = useRef("");
  const userEmail = useRef("");
  const userPhone = useRef("");
  const userAddress = useRef("");
  const userGender = useRef("");
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
    if (!barName) {
      alert("Por favor complete el nombre del bar");
      return;
    }
    if (!userAddress) {
      alert("Por favor complete la dirección");
      return;
    }
    if (!userGender) {
      alert("Por favor complete el genero favorito");
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
    update(formBody);
  };

  const update = (formBody) => {
    fetch(
        `http://Amplify-env.eba-gfgbyjuc.us-east-1.elasticbeanstalk.com/bars/update`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: formBody,
      }
    )
      .then((response) => {
        const statusCode = response.status;
        const data = response.json();
        setLoading(true);
        return Promise.all([data, statusCode]);
      })
      .then((data, statusCode) => {
        console.log("respuesta", data);
        alert("Los datos han sido actualizados")
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

  const eliminarCuenta = () => {
    let username = sessionStorage.getItem("userName");
    fetch(
        `http://Amplify-env.eba-gfgbyjuc.us-east-1.elasticbeanstalk.com/bars/delete/` + username,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }
      }
    )
      .then((response) => {
        const statusCode = response.status;
        const data = response.json();
        setLoading(true);
        return Promise.all([data, statusCode]);
      })
      .then((data) => {
        alert("El usuario fue eliminado corretamente");
        console.log("Se elimino al usuario correctamente", data);
        return <Redirect to= "/"/>
      })
      .catch((error, data) => {
        alert("Hubo un problema. ", data[0].message);
        return <Redirect to="/"/>
      });
  };


  function handleChange(e) {
    if (e.target.id == "userName") {
      setUserNameFetch(e.target.value);
    }
    if (e.target.id == "barName") {
      setBarNameFetch(e.target.value);
    }
    if (e.target.id == "userFirstName") {
      setUserFirstNameFetch(e.target.value);
    }
    if (e.target.id == "userLastName") {
      setUserLastNameFetch(e.target.value);
    }
    if (e.target.id == "userEmail") {
      setUserEmailFetch(e.target.value);
    }
    if (e.target.id == "userPhone") {
      setUserPhoneFetch(e.target.value);
    }
    if (e.target.id == "userAddress") {
      setUserAddressFetch(e.target.value);
    }
    if (e.target.id == "userGender") {
      setUserGenderFetch(e.target.value);
    }
    if (e.target.id == "userRut") {
      setUserRutFetch(e.target.value);
    }
    if (e.target.id == "userPassword") {
      setUserPasswordFetch(e.target.value);
    }
    if (e.target.id == "userConfirmationPassword") {
        setUserPasswordConfirmationFetch(e.target.value);
      }
  }


  const submit = async () => {
    const result = await confirm("Esta seguro que desea eliminar su cuenta?");
    console.log("El result es:" , result);
    if (result) {
      eliminarCuenta();
      return;
    }
    return;
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

  const returnHome = () =>{ 
    let path = `/home`; 
    history.push(path);
  }

  return (
    <div className="loginParent">
      <div className="registerParent">
        <h1 style={{fontSize: 24}}>Actualiza tus datos</h1>
        <h2 style={{fontSize: 18}}>(Recorda validar la direccion)</h2>
        <div className="form">
          <div className="formElement">
            <div className="reg">
              <label htmlFor="userName">Username: </label>
            </div>
            <input
              type="text"
              className="textForm"
              id="userName"
              ref={userName}
              value={userNameFetch}
              onChange={handleChange}
            />
          </div>
          <div className="formElement">
            <div className="reg">
              <label htmlFor="barName">Nombre del Bar: </label>
            </div>
            <input
              type="text"
              className="textForm"
              id="barName"
              ref={barName}
              value={barNameFetch}
              onChange={handleChange}
            />
          </div>
          <div className="formElement">
            <div className="reg">
              <label htmlFor="userFirstName">Nombre: </label>
            </div>
            <input
              type="text"
              className="textForm"
              id="userFirstName"
              ref={userFirstName}
              value={userFirstNameFetch}
              onChange={handleChange}
            />
          </div>
          <div className="formElement">
            <div className="reg">
              <label htmlFor="userLastName">Apellido: </label>
            </div>
            <input
              type="text"
              className="textForm"
              id="userLastName"
              ref={userLastName}
              value={userLastNameFetch}
              onChange={handleChange}
            />
          </div>
          <div className="formElement">
            <div className="reg">
              <label htmlFor="userAddress">Dirección: </label>
            </div>
            <input
              type="text"
              className="textForm"
              id="userAddress"
              ref={userAddress}
              value={userAddressFetch}
              onChange={handleChange}
            />
            <input
              value="Validar"
              type="button"
              id="addressValidation"
              onClick={addressValidation}
            />
          </div>
          <div className="formElement">
            <div className="reg">
              <label htmlFor="userPhone">Teléfono: </label>
            </div>
            <input
              className="textForm"
              type="text"
              id="userPhone"
              ref={userPhone}
              value={userPhoneFetch}
              onChange={handleChange}
            />
          </div>
          <div className="formElement">
            <div className="reg">
              <label htmlFor="userRut">RUT: </label>
            </div>
            <input
              type="text"
              className="textForm"
              id="userRut"
              ref={userRut}
              value={userRutFetch}
              onChange={handleChange}
            />
          </div>
          <div className="formElement">
            <div className="reg">
              <label htmlFor="userEmail">Email: </label>
            </div>
            <input
              type="text"
              className="textForm"
              id="userEmail"
              ref={userEmail}
              value={userEmailFetch}
              onChange={handleChange}
            />
          </div>
          <div className="formElement">
            <div className="reg">
              <label htmlFor="userEmail">Genero musical: </label>
            </div>
            <input
              type="text"
              className="textForm"
              id="userGender"
              ref={userGender}
              value={userGenderFetch}
              onChange={handleChange}
            />
          </div>
          <div className="formElement">
            <div className="reg">
              <label htmlFor="userPassword">Contraseña: </label>
            </div>
            <input
              type="password"
              className="textForm"
              id="userPassword"
              ref={userPassword}
              value={userPasswordFetch}
              onChange={handleChange}
            />
          </div>
          <div className="formElement">
            <div className="reg">
              <label htmlFor="userConfirmationPassword">
                Repetir Contraseña:{" "}
              </label>
            </div>
            <input
              type="password"
              className="textForm"
              id="userConfirmationPassword"
              ref={userConfirmationPassword}
              value={userPasswordFetch}
              onChange={handleChange}
            />
          </div>
          <div className="formElement">
            <div className="reg">
              <label htmlFor="userProfilePic">Foto: </label>
            </div>
            <input
              type="file"
              alt="Imagen"
              className="textForm"
              id="userProfilePic"
              onChange={(e) => convert2base64(e)}
              accept="image/"
            />
          </div>
        </div>
        {errorLogin ? <p>Ya existe el usuario </p> : null}
        <div className="actionContainer">
          <div className="completeForm">
            <input
              type="button"
              value="Actualizar"
              onClick={tomarDatos}
              className="botonRegistro"
            />
          </div>
          <div className="returnHomeDiv">
          <input
              type="button"
              value="Volver al inicio"
              onClick={returnHome}
              className="botonRegistro"
              id="returnHome"
            />
          </div>
        </div>
        <div>
        <input
              type="button"
              value="Dar de baja mi cuenta"
              onClick={() => submit()}
              className="deleteButton"
            />
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
