import "../src/bootstrap.min.css";
import "./estilos.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./componentes/Login";
import NoEncontrado from "./componentes/NoEncontrado";
import AuthHandler from "./componentes/AuthHandler";
import Register from "./componentes/Register";
import ForgotPassword from "./componentes/ForgotPassword";
import UpdateUser from "./componentes/UpdateUser";

const App = () => {
  return (
    <Provider store={store} className="App">
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/home" component={AuthHandler} />
            <Route path="/ForgotPassword" component={ForgotPassword} />
            <Route path="/UpdateUser" component={UpdateUser} />
            <Route component={NoEncontrado} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

export default App;