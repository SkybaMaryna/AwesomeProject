import React from "react";
import { Text, View, StyleSheet } from "react-native";
import LoginScreen from "./src/components/LoginScreen";
import RegistrationScreen from "./src/components/RegistrationScreen";

const App = () => {
  return (
      <RegistrationScreen/>
      // <LoginScreen/>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   text: {
//     color: "#000",
//   },
// });

export default App;
