import React, { Component } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import firebase from "firebase";
import {
  Container,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Button,
} from "native-base";
import Icon from "react-native-vector-icons/AntDesign";

const SCREEN_HEIGHT = Dimensions.get("window").height - 150;

export default class Feeds extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
      poll: [],
      fetching: false,
    };
    this._isMounted = true;
  }

  fetchPollData = () => {
    this.setState({ loading: true });
    var poll = [];
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
          this.setState({ poll });
        });
      });
    this.setState({ loading: false });
  };

  sortByKey = (obj, key) => {
    return obj.sort(function (a, b) {
      var x = a[key];
      var y = b[key];
      return x > y ? -1 : x < y ? 1 : 0;
    });
  };

  fetchFeedData = () => {
    this.setState({ loading: true });
    let feeds = [];
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
          obj["date"] = data[key]["date"];
          obj["timestamp"] = data[key]["timestamp"];
          obj["bio"] = data[key]["bio"];
          obj["branch"] = data[key]["branch"];
          obj["year"] = data[key]["year"];
          obj["email"] = data[key]["email"];

          feeds.push(obj);
          this.sortByKey(feeds, "timestamp");
          if (this._isMounted) {
            this.setState({ data: feeds });
          }
        });
      });
    this.setState({ loading: false });
  };

  componentDidMount() {
    this._isMounted = true;

    this.setState({ loading: true });
    this.fetchPollData();
    this.fetchFeedData();
    this.setState({ loading: false });
  }

  componentWillUnmount() {
    this._isMounted = false;
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
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("Profile2", {
              name: item.name,
              email: item.email,
              photo: item.photo,
              year: item.year,
              branch: item.branch,
              bio: item.bio,
            })
          }
        >
          <CardItem>
            <Left>
              <Thumbnail source={{ uri: item.photo }} />
              <Body>
                <Text>{item.name}</Text>
                <Text style={{ color: "#D3D3D3" }}>{item.date}</Text>
              </Body>
            </Left>
          </CardItem>
        </TouchableOpacity>
        <CardItem>
          <Body>
            <Text>{item.feed}</Text>
          </Body>
        </CardItem>
      </Card>
    );
  };

  onRefresh = () => {
    this.setState({ fetching: true });
    this.fetchFeedData();
    this.setState({ fetching: false });
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
        <View>
          <FlatList
            horizontal={true}
            data={poll}
            extraData={this.state}
            renderItem={this._renderItem}
            keyExtractor={(item) => item.$t}
          />
        </View>

        <Container>
          <FlatList
            data={data}
            extraData={this.state}
            renderItem={this.renderData}
            onRefresh={() => this.onRefresh()}
            refreshing={this.state.fetching}
            keyExtractor={(item) => item.$t}
          />
          <Icon
            onPress={() => this.props.navigation.navigate("AddFeed")}
            name="pluscircle"
            size={50}
            style={styles.icon}
          />
        </Container>
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
    top: SCREEN_HEIGHT,
    right: 35,
    color: "#3F51B5",
  },
});
