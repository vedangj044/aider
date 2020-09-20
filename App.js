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

const DrawerNavigator = createDrawerNavigator({
  Feeds: {
    screen: Feeds,
    navigationOptions: {
      headerShown: false,
    },
  },
});

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        headerShown: false,
      },
    },
    Register: { screen: Register },
    Profile: { screen: Profile },
    Splash: { screen: Splash },
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
  },
  {
    initialRouteName: "Home",
  }
);

const AppSwitchNavigator = createSwitchNavigator({
  // Splash: { screen: Splash },
  Register: { screen: Register },
  AppNavigator: { screen: AppNavigator },
});

const App = createAppContainer(AppSwitchNavigator);

export default App;
