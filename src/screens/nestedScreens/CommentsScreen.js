import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { formatDate } from "../../helpers/formatDate";
import { addCommentToServer, getComments } from "../../services/database";

const CommentsScreen = ({ route }) => {
  const { postId, photo } = route.params;
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const { login } = useSelector((state) => state.auth);
  const [contentSize, setContentSize] = useState({ height: 50 });

  useEffect(() => {
    getAllComments(postId);
  }, []);

  const getAllComments = async (postId) => {
    const snapshot = await getComments(postId);
    setAllComments(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const handleContentSizeChange = (e) => {
    setContentSize({ height: e.nativeEvent.contentSize.height });
  };

  const addComment = async () => {
    await addCommentToServer(comment, login, postId);
    setComment("");
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: photo }} style={styles.image} />

      <View style={styles.commentsContainer}>
        <FlatList
          data={allComments}
          keyExtractor={(item) => item.id}
          renderItem={({ item: { login, comment, createdAt } }) => (
            <View style={styles.commentContainer}>
              <Text style={styles.login}>{login}</Text>
              <View style={styles.comment}>
                <Text style={styles.text}>{comment}</Text>
                <Text style={styles.date}>{formatDate(createdAt)}</Text>
              </View>
            </View>
          )}
        />
      </View>

      <View>
        <TextInput
          style={{
            ...styles.input,
            height: Math.max(50, contentSize.height),
          }}
          placeholder="Коментувати..."
          placeholderTextColor="#BDBDBD"
          cursorColor={"#BDBDBD"}
          multiline={true}
          onContentSizeChange={handleContentSizeChange}
          value={comment}
          onChangeText={setComment}
        ></TextInput>
        <TouchableOpacity
          style={{ ...styles.inputBtn, top: contentSize.height / 2 - 17 }}
          activeOpacity={0.7}
          onPress={addComment}
        >
          <AntDesign name="arrowup" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  commentContainer: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 24,
    justifyContent: "flex-start",
  },
  comment: {
    width: 299,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    padding: 16,
  },
  date: {
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    textAlign: "right",
  },
  image: {
    width: 343,
    height: 240,
    borderRadius: 32,
    marginBottom: 32,
  },
  input: {
    width: 343,
    borderWidth: 1,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderRadius: 50,
    padding: 16,
    paddingEnd: 50,
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    position: "relative",
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  inputBtn: {
    width: 34,
    height: 34,
    borderRadius: 50,
    backgroundColor: "#FF6C00",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 8,
  },
  text: {
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 13,
  },
});

export default CommentsScreen;
