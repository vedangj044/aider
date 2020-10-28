import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import firebase from "firebase";
import { GoogleSignin } from "react-native-google-signin";

export default class Profile extends Component {
  static navigationOptions = {
    title: "Profile",
  };

  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
      data: null,
    };
  }
  componentDidMount() {
    this.getCurrentUser();
  }

  getCurrentUser = async () => {
    const currentUser = await GoogleSignin.getCurrentUser();
    this.setState({ userInfo: currentUser });
    var data = [];
    firebase
      .database()
      .ref(`Users/${this.state.userInfo.user.id}`)
      .on("value", function (snapshot) {
        data = snapshot.val();
      });

    this.setState({ data: data });
  };

  render() {
    const name = this.props.navigation.getParam("name", "John Doe");
    const email = this.props.navigation.getParam("email", "john@gmail.com");
    const photo = this.props.navigation.getParam("photo", "photo");
    const bio = this.props.navigation.getParam("bio", "Django Developer");
    const branch = this.props.navigation.getParam("branch", "IT");

    var year = this.props.navigation.getParam("year", 1);
    if (year == 1) year = "First Year";
    else if (year == 2) year = "Second Year";
    else if (year == 3) year = "Third Year";
    else year = "Fourth Year";

    return this.state.userInfo == null ? (
      <View style={styles.container}></View>
    ) : (
      <View style={styles.container}>
        <View style={styles.header}></View>
        <Image style={styles.avatar} source={{ uri: photo }} />
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.email}>@{email}</Text>

            <Text style={styles.info}>{bio}</Text>

            <Text style={styles.info}>
              {year} {branch}
            </Text>

            <TouchableOpacity style={styles.buttonContainer}>
              <Text style={styles.buttonFont}>Feeds by</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer}>
              <Text style={styles.buttonFont}>Reputation</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#3F51B5",
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 130,
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  email: {
    fontSize: 11,
    color: "blue",
    fontWeight: "400",
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600",
  },
  info: {
    fontSize: 16,
    color: "#3F51B5",
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 30,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#3F51B5",
  },
  buttonFont: {
    color: "#FFFFFF",
  },
});
