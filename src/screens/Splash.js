import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

export default class Splash extends Component {
  navigateToHome = async () => {
    const TIME = 2000; // Duration of splash screen visibility
    const wait = (time) => new Promise((resolve) => setTimeout(resolve, time));
    return wait(TIME).then(() => this.props.navigation.navigate("Home"));
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 48, color: "#1eb8b8" }}>A i d e r</Text>
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
