import React, { PureComponent } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Button,
} from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import Icon from "react-native-vector-icons/AntDesign";
import firebase from "firebase";

export default class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      images: [
        "https://firebasestorage.googleapis.com/v0/b/aarambh-aider.appspot.com/o/images%2Fan1.png?alt=media",
        "https://firebasestorage.googleapis.com/v0/b/aarambh-aider.appspot.com/o/images%2Fan2.png?alt=media",
        "https://firebasestorage.googleapis.com/v0/b/aarambh-aider.appspot.com/o/images%2Fstory1.png?alt=media",
        "https://firebasestorage.googleapis.com/v0/b/aarambh-aider.appspot.com/o/images%2Fstory2.png?alt=media",
        "https://firebasestorage.googleapis.com/v0/b/aarambh-aider.appspot.com/o/images%2Fstory3.png?alt=media",
      ],
      showImages: [],
      loading: true,
    };
  }

  componentDidMount() {
    let res = [];
    let to_show = {};
    this.setState({ loading: true });
    firebase
      .database()
      .ref("announcement")
      .on("value", (snapshot) => {
        res = snapshot.val();
        Object.keys(res).map((key, index) => {
          to_show[key] = 1;
        });
      });

    firebase
      .database()
      .ref("poll")
      .on("value", (snapshot) => {
        res = snapshot.val();
        Object.keys(res).map((key, index) => {
          to_show[key] = 1;
        });
      });
    var showImages = [];
    if (to_show["an1"] === 1) {
      showImages.push(this.state.images[0]);
    }
    if (to_show["an2"] === 1) {
      showImages.push(this.state.images[1]);
    }
    if (to_show["story1"] === 1) {
      showImages.push(this.state.images[2]);
    }
    if (to_show["story2"] === 1) {
      showImages.push(this.state.images[3]);
    }
    if (to_show["story3"] === 1) {
      showImages.push(this.state.images[4]);
    }
    this.setState({ showImages, loading: false });
  }

  render() {
    if (!this.state.loading) {
      <View>
        <Text>Loading</Text>
      </View>;
    }

    return (
      <View style={styles.container}>
        <SliderBox
          images={this.state.showImages}
          sliderBoxHeight={Dimensions.get("window").height}
          dotColor="#fff"
          inactiveDotColor="#90A4AE"
          paginationBoxVerticalPadding={20}
          autoplay
          circleLoop
        />
        <View style={styles.feed}>
          <Icon
            onPress={() => this.props.navigation.navigate("Feeds")}
            name="upcircle"
            size={48}
            color="#fff"
          />
        </View>
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

  feed: {
    position: "absolute",
    right: 30,
    bottom: 30,
  },
});
