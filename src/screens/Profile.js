import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

export default class Profile extends Component {
  static navigationOptions = {
    title: "Profile",
  };

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      img_link: "",
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Profile Screen</Text>
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
