import React, { createContext, useState, useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
import firebase from "./Firebase";
import styles from "../Components/common.css";

export const AuthContext = createContext(null);

const AuthProvider = () => {
  return <div></div>;
};

export default AuthProvider;
