import React from "react";
import { TouchableOpacity } from "react-native";

// react-navigation
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";

import Icon from "react-native-vector-icons/FontAwesome";

// importing screens
import Home from "./src/screens/Home";
import Feeds from "./src/screens/Feeds";
import Splash from "./src/screens/Splash";
import Register from "./src/screens/Register";
import Profile from "./src/screens/Profile";
import AddFeed from "./src/screens/AddFeed";
import Syllabus from "./src/screens/Syllabus";

import firebase from "firebase";

var config = {
  databaseURL: "https://aarambh-aider.firebaseio.com",
  projectId: "aarambh-aider",
};

firebase.initializeApp(config);

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const DrawerNavigator = createDrawerNavigator({
  Feeds: {
    screen: Feeds,
    navigationOptions: {
      headerShown: false,
    },
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      headerShown: false,
    },
  },
  Syllabus: {
    screen: Syllabus,
    navigationOptions: {
      headerShown: false,
    },
  },
});

const AppNavigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      headerShown: false,
    },
  },
  Register: {
    screen: Register,
    navigationOptions: {
      headerShown: false,
    },
  },
  Profile: { screen: Profile },
  Splash: { screen: Splash },
  AddFeed: { screen: AddFeed },
  Feeds: {
    screen: DrawerNavigator,
    navigationOptions: ({ navigation }) => ({
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 20 }}
          onPress={() => navigation.toggleDrawer()}
        >
          <Icon name="indent" size={25} />
        </TouchableOpacity>
      ),
    }),
  },
});

const AppSwitchNavigator = createSwitchNavigator({
  Splash: { screen: Splash },
  AppNavigator: { screen: AppNavigator },
});

const App = createAppContainer(AppSwitchNavigator);

export default App;
