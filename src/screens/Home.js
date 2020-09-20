import React, { Component } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { SliderBox } from "react-native-image-slider-box";

const SCREEN_HEIGHT = Math.round(Dimensions.get("window").height);
const SCREEN_WIDTH = Math.round(Dimensions.get("window").width);

export default class Home extends Component {
  state = {
    images: [
      "https://picsum.photos/200/300",
      "https://picsum.photos/id/237/200/300",
      "https://picsum.photos/seed/picsum/200/300",
    ],
  };

  render() {
    return (
      <View style={styles.container}>
        <SliderBox
          images={this.state.images}
          sliderBoxHeight={Dimensions.get("window").height}
          onCurrentImagePressed={(index) =>
            console.warn(`image ${index} pressed`)
          }
          dotColor="#FFEE58"
          inactiveDotColor="#90A4AE"
          paginationBoxVerticalPadding={20}
          autoplay
          circleLoop
        />
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
