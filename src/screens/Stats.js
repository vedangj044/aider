import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  Text,
} from "native-base";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
} from "react-native";
import firebase from "firebase";
import { GoogleSignin } from "react-native-google-signin";

export default class Stats extends Component {
  static navigationOptions = {
    title: "Stats",
  };

  constructor(props) {
    super(props);
    this.state = {
      calls: [],
      tab: "gre",
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    console.log(this.state.tab);
    this.gre();
  }
  gre = async () => {
    var res = [];
    firebase
      .database()
      .ref("statistics/gre")
      .on("value", (snapshot) => {
        var data = snapshot.val();
        Object.keys(data).map((key, index) => {
          let obj = {};
          obj["year"] = data[key]["year"];
          obj["score"] = data[key]["score"];
          obj["name"] = data[key]["name"];
          obj["branch"] = data[key]["branch"];
          res.push(obj);
        });
      });
    this.setState({ calls: res, loading: false });
    console.log(res);
  };
  gate = async () => {
    var res = [];
    firebase
      .database()
      .ref("statistics/gate")
      .on("value", (snapshot) => {
        var data = snapshot.val();
        Object.keys(data).map((key, index) => {
          let obj = {};
          obj["year"] = data[key]["year"];
          obj["score"] = data[key]["score"];
          obj["name"] = data[key]["name"];
          obj["branch"] = data[key]["branch"];
          res.push(obj);
        });
      });
    this.setState({ calls: res, loading: false });
    console.log(res);
  };
  placement = async () => {
    var res = [];
    firebase
      .database()
      .ref("statistics/placement")
      .on("value", (snapshot) => {
        var data = snapshot.val();
        Object.keys(data).map((key, index) => {
          let obj = {};
          obj["year"] = data[key]["year"];
          obj["score"] = data[key]["score"];
          obj["name"] = data[key]["name"];
          obj["branch"] = data[key]["branch"];
          res.push(obj);
        });
      });
    this.setState({ calls: res, loading: false });
    console.log(res);
  };

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity>
        <View style={styles.row}>
          <Image
            source={{
              uri:
                "https://www.dreamstime.com/default-avatar-profile-icon-social-media-user-vector-default-avatar-profile-icon-social-media-user-vector-portrait-image176194876",
            }}
            style={styles.pic}
          />
          <View>
            <View style={styles.nameContainer}>
              <Text
                style={styles.nameTxt}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item.name}
              </Text>
              <Text style={styles.mblTxt}>{item.score}</Text>
            </View>
            <View style={styles.msgContainer}>
              <Text style={styles.msgTxt}>{item.branch}</Text>
            </View>
            <View style={styles.msgContainer}>
              <Text style={styles.msgTxt}>{item.year}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    console.log(this.state.calls);
    return (
      <Container>
        <FlatList
          extraData={this.state}
          data={this.state.calls}
          keyExtractor={(item) => {
            return Math.random().toString();
          }}
          renderItem={this.renderItem}
        />
        <Footer>
          <FooterTab style={{ color: "#1eb8b8" }}>
            <Button active onPress={this.gre}>
              <Text>GRE</Text>
            </Button>
            <Button onPress={this.gate}>
              <Text>Gate</Text>
            </Button>
            <Button onPress={this.placement}>
              <Text>Placement</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#DCDCDC",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    padding: 10,
  },
  pic: {
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 280,
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: "600",
    color: "#222",
    fontSize: 18,
    width: 170,
  },
  mblTxt: {
    fontWeight: "200",
    fontSize: 13,
    color: "#008B8B",
  },
  msgContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  msgTxt: {
    fontWeight: "400",
    color: "#777",
    fontSize: 12,
    marginLeft: 15,
  },
});
