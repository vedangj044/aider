import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
export default class Splash extends Component {
  async componentDidMount() {
    const data = await this.navigateToHome();
    if (data !== null) {
      this.props.navigation.navigate("Home");
    }
  }

  navigateToHome = async () => {
    const TIME = 2000; // Duration of splash screen visibility
    const wait = (time) => new Promise((resolve) => setTimeout(resolve, time));
    return wait(TIME).then(() => this.props.navigation.navigate("Home"));
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 25 }}>Aider</Text>
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
