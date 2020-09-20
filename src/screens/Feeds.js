import React, { Component } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import firebase from "firebase";

export default class Feeds extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: -1,
    };
  }

  componentDidMount() {
    var data = [];
    firebase
      .database()
      .ref("Feeds/")
      .on("value", function (snapshot) {
        data = snapshot.val();
      });
    // this.setState({ data });
    console.log(data);
  }

  add_feed = (feed) => {
    firebase
      .database()
      .push({ feed })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Feeds</Text>
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
