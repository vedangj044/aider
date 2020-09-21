import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "react-native-google-signin";
import firebase from "firebase";

export default class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
      gettingLoginStatus: true,
    };
  }

  componentDidMount() {
    GoogleSignin.configure({
      webClientId: '297471107724-0p0b9gb59k7sh3kem58j3hhkcj8cgsjd.apps.googleusercontent.com',
    });
  }

  _signIn = async () => {
    //Prompts a modal to let the user sign in into your application.
    try {
      await GoogleSignin.hasPlayServices({
        //Check if device has Google Play Services installed.
        //Always resolves to true on iOS.
        showPlayServicesUpdateDialog: true,
      });
      var userInfo = await GoogleSignin.signIn();
      this.setState({ userInfo: userInfo });

      if (userInfo !== null) {
        // Add to Firebase
        let name = userInfo.user.name;
        let email = userInfo.user.email;
        let profile = userInfo.user.photo;
        let id = userInfo.user.id;
        firebase
          .database()
          .ref(`Users/${id}`)
          .set({
            name,
            email,
            profile,
          })
          .then((data) => {})
          .catch((err) => {
            console.log("error saving data", err);
          });
        this.props.navigation.navigate("Home");
      }
    } catch (error) {
      console.log("Message", error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("User Cancelled the Login Flow");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("Signing In");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("Play Services Not Available or Outdated");
      } else {
        console.log("Some Other Error Happened");
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <GoogleSigninButton
          style={{ width: 192, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={this._signIn}
          //   disabled={this.state.isSigninInProgress}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
