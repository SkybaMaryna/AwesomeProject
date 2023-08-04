import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Feather } from "@expo/vector-icons";

const Post = ({ photo, title, locality, coords, navigation }) => {
  return (
    <View
      style={{
        marginBottom: 32,
      }}
    >
      <Image source={{ uri: photo }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <View style={styles.infoContainer}>
        <View style={styles.countContainer}>
          <Feather
            name="message-circle"
            size={24}
            color="#BDBDBD"
            onPress={() => navigation.navigate("Comments")}
          />

          <Text style={styles.count}>0</Text>
        </View>
        <View style={styles.localityContainer}>
          <Feather
            name="map-pin"
            size={24}
            color="#BDBDBD"
            onPress={() => navigation.navigate("Map", { coords })}
          />
          <Text style={{ textDecorationLine: "underline" }}>{locality}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  count: {
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  countContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  image: {
    width: 343,
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 49,
  },
  localityContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  title: {
    color: "#212121",
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    marginBottom: 8,
  },
});

export default Post;
