import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";

// screens
import Home from "./src/screens/Home";
import Splash from "./src/screens/Splash";

const HomeNavigator = createStackNavigator({
  Home: {
    screen: Home,
  },
});

const AppSwitchNavigator = createSwitchNavigator({
  Splash: { screen: Splash },
  Home: { screen: HomeNavigator },
});

const App = createAppContainer(AppSwitchNavigator);

export default App;
