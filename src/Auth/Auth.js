import React, { createContext, useState, useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
import firebase from "./Firebase";
import styles from "../Components/common.css";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const [pending, setPending] = useState(true);

  useEffect(() => {
    const fetchUser = async (email) => {
      const db = firebase.firestore();
      const userRef = db.collection("users").where("email", "==", email);
      const data = await userRef.get();
      setUserDetails(data);
    };

    const userAuth = firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setPending(false);
      if (user) fetchUser(user.email);
    });
    return userAuth;
  }, [currentUser, userDetails]);

  if (pending) {
    return (
      <div className={styles.container}>
        <CircularProgress className={styles.circularProgress} />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ currentUser, userDetails }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
