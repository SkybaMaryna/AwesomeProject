import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import Post from "../../components/Post";
import { getPosts } from "../../services/database";

const DefaultPostsScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAllPost();
  }, []);

  const getAllPost = async () => {
    const snapshot = await getPosts();
    setPosts(snapshot?.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { coords, photo, title, locality, id } }) => (
          <Post
            photo={photo}
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
