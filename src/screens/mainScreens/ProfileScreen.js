import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Feather from "@expo/vector-icons/Feather";
import Post from "../../components/Post";
import { authSignOutUser } from "../../../redux/auth/authOperations";
import { getPostsById } from "../../services/database";

const ProfileScreen = ({ navigation }) => {
  const [userPosts, setUserPosts] = useState([]);
  const { userId, login } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    getUserPosts(userId);
  }, []);

  const getUserPosts = async (userId) => {
    const snapshot = await getPostsById(userId);
    setUserPosts(snapshot?.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const handleLogout = () => {
    dispatch(authSignOutUser());
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../assets/images/photoBG.jpg")}
        style={styles.imageBG}
        resizeMode="cover"
      >
        <View style={styles.postsContainer}>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
            <Feather name="log-out" size={24} color="#BDBDBD" />
          </TouchableOpacity>
          <Image
            source={require("../../../assets/images/addPhoto.png")}
            style={styles.image}
          />
          <Text style={styles.userName}>{login}</Text>
          <View style={styles.commentsContainer}>
            <FlatList
              data={userPosts}
              keyExtractor={(item) => item.id}
              renderItem={({
                item: { coords, photo, title, locality, id },
              }) => (
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
        </View>
      </ImageBackground>
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
  image: {
    width: 132,
    height: 120,
    position: "absolute",
    left: 132,
    top: -60,
  },
  logoutBtn: { position: "absolute", top: 22, right: 16 },
  postsContainer: {
    width: "auto",
    height: 549,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: "#FFFFFF",
    position: "relative",
    alignItems: "center",
    position: "relative",
  },
  postImage: {
    width: 343,
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
  },
  userName: {
    marginTop: 92,
    color: "#212121",
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    marginBottom: 33,
  },
});

export default ProfileScreen;
