import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../assets/images/photoBG.jpg")}
        style={styles.imageBG}
        resizeMode="cover"
      ></ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  imageBG: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "stretch",
  },
});

export default ProfileScreen;
