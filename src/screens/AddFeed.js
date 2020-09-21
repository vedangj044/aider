import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import {
  Container,
  Header,
  Content,
  Item,
  Input,
  Thumbnail,
  Textarea,
  Card,
  CardItem,
  Left,
  Body,
  Picker,
  Icon,
  Button,
} from "native-base";
import { GoogleSignin } from "react-native-google-signin";
import firebase from "firebase";

export default class AddFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweet: "Codagon on 27 Sept",
      userInfo: null,
      year: 1,
      branch: "CS",
      bio: "Django Developer",
    };
  }

  componentDidMount() {
    this.getCurrentUser();
  }

  getCurrentUser = async () => {
    const currentUser = await GoogleSignin.getCurrentUser();
    console.log("User Info --> ", currentUser);
    this.setState({ userInfo: currentUser });
  };

  onYearChange = (year) => {
    this.setState({ year: year });
    console.log(this.state.year);
  };

  onBranchChange = (branch) => {
    this.setState({ branch });
  };

  bioChange = (bio) => {
    this.setState({ bio });
  };

  feedChange = (tweet) => {
    this.setState({ tweet });
  };

  addFeed = () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    var date = dd + "/" + mm + "/" + yyyy;
    let userInfo = this.state.userInfo;
    let name = userInfo.user.name;
    let email = userInfo.user.email;
    let photo = userInfo.user.photo;
    let id = userInfo.user.id;
    let feed = this.state.tweet;

    firebase
      .database()
      .ref("Feeds/")
      .push({
        feed,
        name,
        photo,
        date,
      })
      .then((data) => {})
      .catch((err) => {
        console.log("error saving data", err);
      });
    this.props.navigation.navigate("Feeds");
  };

  addUserData = () => {
    let bio = this.state.bio;
    let branch = this.state.branch;
    let year = this.state.year;
    let name = this.state.userInfo.user.name;
    let photo = this.state.userInfo.user.photo;
    let email = this.state.userInfo.user.email;
    firebase
      .database()
      .ref("/Users")
      .push({ name, photo, email, branch, year, bio })
      .then((data) => console.log("User Data Pushed"))
      .catch((err) => console.log(err));
  };

  pushData = () => {
    this.addUserData();
    this.addFeed();
  };
  render() {
    return this.state.userInfo == null ? (
      <Container></Container>
    ) : (
      <Container>
        <Content>
          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={{ uri: this.state.userInfo.user.photo }} />
                <Body>
                  <Text>{this.state.userInfo.user.name}</Text>
                  <Text note style={{ color: "blue" }}>
                    @{this.state.userInfo.user.email}
                  </Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Item regular>
                <Input
                  onChangeText={(value) => this.feedChange(value)}
                  placeholder="What's on your mind?"
                />
              </Item>
            </CardItem>
            <CardItem>
              <Item regular>
                <Input
                  onChangeText={(value) => this.bioChange(value)}
                  placeholder="Your Curriculum Vitae"
                />
              </Item>
            </CardItem>
          </Card>
          <Card>
            <Picker
              mode="dropdown"
              placeholder="Year"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              onValueChange={this.onYearChange}
              iosIcon={
                <Icon
                  name="arrow-dropdown-circle"
                  style={{ color: "#007aff", fontSize: 25 }}
                />
              }
              style={{ width: undefined }}
              selectedValue={this.state.year}
              onValueChange={this.onYearChange}
            >
              <Picker.Item label="First Year" value="1" />
              <Picker.Item label="Sophomore Year" value="2" />
              <Picker.Item label="Pre-Final Year" value="3" />
              <Picker.Item label="Final Year" value="4" />
            </Picker>

            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              placeholder="Branch"
              placeholderStyle={{ color: "#bfc6ea" }}
              placeholderIconColor="#007aff"
              iosIcon={
                <Icon
                  name="arrow-dropdown-circle"
                  style={{ color: "#007aff", fontSize: 25 }}
                />
              }
              style={{ width: undefined }}
              selectedValue={this.state.branch}
              onValueChange={this.onBranchChange}
            >
              <Picker.Item label="Computer Science" value="CS" />
              <Picker.Item label="Information Technology" value="IT" />
              <Picker.Item label="Electrical Engineering" value="EE" />
              <Picker.Item label="Mechanical Engineering" value="ME" />
            </Picker>
          </Card>
          <Button
            full
            primary
            block
            onPress={this.addUserData}
            style={{ marginTop: 30, marginLeft: 20, marginRight: 30 }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 18,
                fontFamily: "Arial",
                color: "#fff",
              }}
            >
              Submit
            </Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  avatar: {
    width: 65,
    height: 65,
    borderRadius: 33,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "flex-start",
    position: "absolute",
    marginTop: 130,
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 100,
    borderRadius: 30,
    backgroundColor: "#1eb8b8",
    alignSelf: "flex-end",
  },
  buttonFont: {
    color: "#FFFFFF",
  },
});
