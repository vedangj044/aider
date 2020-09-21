import React, { Component } from "react";
import { StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity } from "react-native";
import { Container, Header, Content, Item, Input, Thumbnail, Textarea } from 'native-base';
import {
  GoogleSignin
} from "react-native-google-signin";
import firebase from "firebase";

export default class AddFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweet: "",
      userInfo: null
    };
  }

  componentDidMount() {
    this.getCurrentUser();
  }

  getCurrentUser = async () => {
    const currentUser = await GoogleSignin.getCurrentUser();
    console.log('User Info --> ', currentUser);
    this.setState({ userInfo: currentUser });
  }

  addFeed = async () => {
    var today = new Date(); 
    var dd = today.getDate(); 
    var mm = today.getMonth() + 1; 
    var yyyy = today.getFullYear(); 
    var date = dd + '/' + mm + '/' + yyyy; 
    let userInfo=this.state.userInfo;
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
            date
          })
          .then((data) => {})
          .catch((err) => {
            console.log("error saving data", err);
          });
        this.props.navigation.navigate("Feeds");
  };

  render() {
    return (
      (this.state.userInfo==null)?<Container></Container>:
      <Container>
        <Content>
          <Item>
          <Thumbnail source={{ uri: this.state.userInfo.user.photo }} />
            <Textarea rowSpan={5} placeholder="Add your feed" 
            onChangeText={text => this.setState({tweet:text})}
            value={this.state.tweet}/>
          </Item>
          <TouchableOpacity style={styles.buttonContainer}
          onPress={this.addFeed}>
                <Text style={styles.buttonFont}>Add Feed</Text>  
        </TouchableOpacity>  
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
    marginBottom:10,
    alignSelf:'flex-start',
    position: 'absolute',
    marginTop:130
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:100,
    borderRadius:30,
    backgroundColor: "#1eb8b8",
    alignSelf:'flex-end',
  },
  buttonFont: {
    color: "#FFFFFF"
  }
});