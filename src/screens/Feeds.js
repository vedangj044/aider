import React, { Component } from "react";
import { View, StyleSheet, ScrollView, Dimensions } from "react-native";
import firebase from "firebase";
import {
  Container,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Button,
} from "native-base";
import Icon from "react-native-vector-icons/MaterialIcons";

export default class Feeds extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    var res = [];
    firebase
      .database()
      .ref("Feeds/")
      .on("value", (snapshot) => {
        var data = snapshot.val();
        Object.keys(data).map((key, index) => {
          let obj = {};
          obj["feed"] = data[key]["feed"];
          obj["photo"] = data[key]["photo"];
          obj["name"] = data[key]["name"];
          res.push(obj);
        });
      });
    this.setState({ data: res, loading: false });
  }

  render() {
    let { loading, data } = this.state;
    if (loading) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    }

    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ScrollView
          contentContainerStyle={{ paddingBottom: data.length * 100 }}
        >
          <Container>
            {data.map((item, i) => {
              return (
                <Card style={{ flex: 0, padding: 10 }} key={i}>
                  <CardItem>
                    <Left>
                      <Thumbnail source={{ uri: item.photo }} />
                      <Body>
                        <Text>{item.name}</Text>
                        <Text style={{ color: "#D3D3D3" }}>15 April, 2200</Text>
                      </Body>
                    </Left>
                  </CardItem>
                  <CardItem>
                    <Body>
                      <Text>{item.feed}</Text>
                    </Body>
                  </CardItem>
                </Card>
              );
            })}
            <Icon
              onPress={() => this.props.navigation.navigate("AddFeed")}
              name="chat"
              size={40}
              style={styles.icon}
            />
          </Container>
        </ScrollView>
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

  icon: {
    position: "absolute",
    bottom: 60,
    right: 40,
  },
});
