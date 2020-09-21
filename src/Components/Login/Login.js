import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import styles from "./Login.module.css";
import firebase from "../../Auth/Firebase";
import { Paper, TextField, Button, LinearProgress } from "@material-ui/core";
import { AuthContext } from "../../Auth/Auth";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  //   const { currentUser } = useContext(AuthContext);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(email, pass)
        .then(() => {
          history.push("/");
        });
    } catch (e) {
      alert(e);
    }
  };

  //   if (!currentUser) {
  //     history.push("/");
  //   }

  return (
    <div className={styles.container}>
      <Paper className={styles.formContainer}>
        <h3>Login</h3>
        <form className={styles.loginForm} onSubmit={onSubmit}>
          <TextField
            required
            autoFocus
            className={styles.inputField}
            size="small"
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
            label="Username"
          />
          <TextField
            required
            className={styles.inputField}
            size="small"
            value={pass}
            type="password"
            onChange={(e) => setPass(e.target.value)}
            variant="outlined"
            label="Password"
          />
          <div className={styles.submitBtn}>
            <p onClick={() => alert("This won't work bro :) ")}>
              Forgot Password?
            </p>
            <Button type="submit" className={styles.btn} variant="contained">
              Login
            </Button>
          </div>
        </form>
      </Paper>
    </div>
  );
};

export default withRouter(Login);
