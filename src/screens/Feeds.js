import React, { PureComponent } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";
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
  Radio,
  Right,
} from "native-base";
import Icon from "react-native-vector-icons/MaterialIcons";

const SCREEN_HEIGHT = Dimensions.get("window").height;

export default class Feeds extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
      poll: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    var poll = [];
    var feeds = [];
    firebase
      .database()
      .ref("poll")
      .on("value", (snapshot) => {
        let data = snapshot.val();
        Object.keys(data).map((key, index) => {
          let obj = {};
          obj["cnt1"] = data[key]["option1"]["count"];
          obj["cnt2"] = data[key]["option2"]["count"];
          obj["question"] = data[key]["answer"];
          obj["option1"] = data[key]["option1"]["value"];
          obj["option2"] = data[key]["option2"]["value"];
          poll.push(obj);
        });
      });

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
          feeds.push(obj);
        });
      });

    this.setState({ data: feeds, loading: false, poll: poll });
  }

  _renderItem = ({ item }) => {
    return (
      <Card key={Math.random().toString()}>
        <CardItem>
          <Body>
            <Text>{item.question}</Text>
          </Body>
        </CardItem>
        <CardItem>
          <Button
            full
            primary
            block
            onPress={this.fetchData}
            style={{
              marginLeft: 10,
              marginRight: 10,
              marginTop: 10,
              width: Dimensions.get("window").width - 50,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 15,
                fontFamily: "Arial",
                color: "#fff",
              }}
            >
              {item.option1}
            </Text>
          </Button>
        </CardItem>
        <CardItem>
          <Button
            full
            primary
            block
            onPress={this.fetchData}
            style={{
              marginLeft: 10,
              marginRight: 10,
              marginTop: 10,
              width: Dimensions.get("window").width - 50,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 15,
                fontFamily: "Arial",
                color: "#fff",
              }}
            >
              {item.option2}
            </Text>
          </Button>
        </CardItem>
      </Card>
    );
  };

  renderData = ({ item }) => {
    return (
      <Card key={Math.random().toString()} style={{ flex: 0, padding: 10 }}>
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
  };

  render() {
    let { loading, data, poll } = this.state;
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
          <FlatList
            horizontal={true}
            data={this.state.poll}
            extraData={this.state}
            renderItem={this._renderItem}
            keyExtractor={(item) => item.$t}
          />
          <Container>
            <FlatList
              data={this.state.data}
              extraData={this.state}
              renderItem={this.renderData}
              keyExtractor={(item) => item.$t}
            />
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
    top: 350,
    right: 40,
  },
});
