import React, { PureComponent } from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import {
  Container,
  Header,
  Content,
  Icon,
  Picker,
  Form,
  Button,
  Card,
  CardItem,
  Body,
  Accordion,
} from "native-base";
import firebase from "firebase";
import { Thumbnail } from "react-native-thumbnail-video";

const SCREEN_HEIGHT = Dimensions.get("window").height;

export default class Syllabus extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      branch: "CS",
      year: 1,
      data: "",
      subject: "Data Structure",
      loading: true,
    };
  }

  fetchData = () => {
    this.setState({ loading: true });
    var res = [];
    firebase
      .database()
      .ref(
        `syllabus/${this.state.year}/${this.state.branch}/${this.state.subject}/`
      )
      .on("value", (snapshot) => {
        var Data = snapshot.val();
        Object.keys(Data).map((key, index) => {
          let obj = {};
          obj["isVideo"] = Data[key]["isVideo"];
          obj["summary"] = Data[key]["summary"];
          obj["topic"] = Data[key]["topic"];
          res.push(obj);
        });
      });
    var slice_res = res.slice(0, 10);
    this.setState({ data: slice_res, loading: false });
    console.log(this.state.data);
  };

  onYearChange = (year) => {
    this.setState({ year });
  };

  onBranchChange = (branch) => {
    this.setState({ branch });
  };

  onSubjectChange = (subject) => {
    this.setState({ subject });
  };

  render() {
    if (this.state.loading) {
      return (
        <Container>
          <Content>
            <Form>
              <Picker
                mode="dropdown"
                placeholder="Year"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
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

              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                placeholder="Subject"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                iosIcon={
                  <Icon
                    name="arrow-dropdown-circle"
                    style={{ color: "#007aff", fontSize: 25 }}
                  />
                }
                style={{ width: undefined }}
                selectedValue={this.state.subject}
                onValueChange={this.onSubjectChange}
              >
                <Picker.Item label="Data Stucture" value="Data Structure" />
                <Picker.Item
                  label="Digital Signal Processing"
                  value="Digital Signal Processing"
                />
                <Picker.Item
                  label="Applied Mathematics"
                  value="Applied Mathematics"
                />
                <Picker.Item
                  label="Database Management System"
                  value="Database Management System"
                />
              </Picker>
              <Button
                full
                primary
                block
                onPress={this.fetchData}
                style={{
                  marginLeft: 10,
                  marginRight: 10,
                  marginTop: 10,
                  marginBottom: 10,
                }}
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
            </Form>
          </Content>
        </Container>
      );
    }
    console.log(this.state.data);
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
          <Container style={{ minHeight: 4.2 * SCREEN_HEIGHT }}>
            <Text
              style={{
                fontFamily: "sans-serif",
                fontSize: 21,
                textAlign: "center",
                marginTop: 10,
              }}
            >
              {this.state.subject}
            </Text>
            <Content padder>
              {this.state.data.map((item, i) => {
                return (
                  <Card key={i}>
                    <CardItem header bordered>
                      <Text
                        style={{
                          fontWeight: "700",
                          fontSize: 15,
                          textAlign: "center",
                        }}
                      >
                        {item.topic}
                      </Text>
                    </CardItem>
                    {item.isVideo === true ? (
                      <Thumbnail
                        url={item.summary}
                        imageHeight={175}
                        imageWidth={Dimensions.get("window").width * 0.93}
                      />
                    ) : (
                      <CardItem>
                        <Text style={{ minHeight: 200 }}>{item.summary}</Text>
                      </CardItem>
                    )}
                  </Card>
                );
              })}
            </Content>
          </Container>
        </ScrollView>
      </View>
    );
  }
}
