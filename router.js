import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "./src/screens/authScreens/LoginScreen";
import RegistrationScreen from "./src/screens/authScreens/RegistrationScreen";
import Home from "./src/screens/mainScreens/Home";

const AuthStack = createStackNavigator();

const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator initialRouteName="Login">
        <AuthStack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />
        <AuthStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
};

export default useRoute;
