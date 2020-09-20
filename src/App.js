import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styles from "./App.module.css";
import { Home, Login } from "./Components";
import PrivateRoute from "./Auth/PrivateRoute";

const App = () => {
  return (
    <div className={styles.container}>
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
