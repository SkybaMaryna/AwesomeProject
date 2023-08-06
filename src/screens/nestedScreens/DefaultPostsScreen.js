import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/config";

import Post from "../../components/Post";

const DefaultPostsScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    getAllPost();
  }, []);

  const getAllPost = async () => {
    try {
      const snapshot = await getDocs(collection(db, "posts"));
      // snapshot.forEach((doc) => console.log(`${doc.id} =>`, doc.data()));
      setPosts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { coords, photo, title, locality, id } }) => (
          <Post
            // photo={photo}
            title={title}
            locality={locality}
            coords={coords}
            navigation={navigation}
            postId={id}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

export default DefaultPostsScreen;
