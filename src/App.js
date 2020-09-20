import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styles from "./App.module.css";
import { Home, Login } from "./Components";
import PrivateRoute from "./Auth/PrivateRoute";
import { AuthProvider } from "./Auth/Auth";

const App = () => {
  return (
    <div className={styles.container}>
      <AuthProvider>
        <Router basename={process.env.PUBLIC_URL}>
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute exact path="/syllabus" component={Home} />
            <PrivateRoute exact path="/questions" component={Home} />
            <PrivateRoute exact path="/data" component={Home} />

            <Route path="/login" component={Login} />
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
};

export default App;
