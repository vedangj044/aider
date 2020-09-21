import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
export default class Splash extends Component {
  async componentDidMount() {
    const data = await this.navigateToHome();
    if (data !== null) {
      this.props.navigation.navigate("Register");
    }
  }
  navigateToHome = async () => {
    // Splash screen will remain visible for 1 second
    const wait = (time) => new Promise((resolve) => setTimeout(resolve, time));
    return wait(1000).then(() => this.props.navigation.navigate("Home"));
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
