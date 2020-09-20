import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

export default class Home extends Component {
  static navigationOptions = {
    title: "Home",
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 25 }}>Home Screen</Text>
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
