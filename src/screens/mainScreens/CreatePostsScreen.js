import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Camera } from "expo-camera";
import { FontAwesome5, Feather } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../../../firebase/config";
import { ref, uploadBytes } from "firebase/storage";

const initialState = {
  photo: null,
  title: "",
  locality: "",
};

const CreatePostsScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [postData, setPostData] = useState(initialState);
  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [isLocalityFocused, setIsLocalityFocused] = useState(false);
  const { photo, title, locality } = postData;
  const isDataFullfield = photo && title && locality ? true : false;
  const { userId, login } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access location was denied");
        } else {
          console.log("Location permission granted");
        }
      } catch (error) {
        console.error("Error requesting location permission:", error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePhoto = async () => {
    const { uri } = await camera.takePictureAsync();
    setPostData((prevState) => ({ ...prevState, photo: uri }));
  };

  const onChangePhoto = () => {
    setPostData((prevState) => ({ ...prevState, photo: null }));
  };

  const makePost = async () => {
    // const location = await Location.getCurrentPositionAsync({});
    // const coords = {
    //   latitude: location.coords.latitude,
    //   longitude: location.coords.longitude,
    // };
    await uploadPostToServer();
    navigation.navigate("DefaultScreen");
    setPostData(initialState);
  };

  // {{ postData, coords }}

  const uploadPostToServer = async () => {
    // const photo = await uploadPhotoToServer();
    const location = await Location.getCurrentPositionAsync({});
    const coords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    const createPost = await addDoc(collection(db, "posts"), {
      // photo,
      title,
      locality,
      coords,
      userId,
      login,
    });
  };

  // const uploadPhotoToServer = async () => {
  //   const response = await fetch(photo);
  //   const file = photo.response.blob();
  //   const uniquePostId = Date.now().toString();
  //   const storageRef = ref(storage, `postImage/${uniquePostId}`);
  //   await uploadBytes(storageRef, file);
  //   console.log("Uploaded a blob or file!");
  // };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.form}>
          <View style={styles.cameraContainer}>
            {photo ? (
              <Image
                source={{ uri: photo }}
                style={{ height: 240, width: 343, borderRadius: 8 }}
              />
            ) : (
              <Camera style={styles.camera} ref={setCamera}>
                <TouchableOpacity
                  style={styles.btnContainer}
                  onPress={takePhoto}
                >
                  <FontAwesome5 name="camera" size={24} color="#fff" />
                </TouchableOpacity>
              </Camera>
            )}
          </View>
          <TouchableOpacity
            onPress={onChangePhoto}
            style={{ width: 343, alignSelf: "center", marginBottom: 32 }}
          >
            <Text style={styles.text}>
              {photo ? "Редагувати фото" : "Завантажте фото"}
            </Text>
          </TouchableOpacity>

          <TextInput
            style={{
              ...styles.input,
              marginBottom: 16,
              borderColor: isTitleFocused ? "#FF6C00" : "#E8E8E8",
            }}
            placeholder="Назва..."
            placeholderTextColor="#BDBDBD"
            cursorColor={"#BDBDBD"}
            value={postData.title}
            onChangeText={(value) => {
              setPostData((prevState) => ({ ...prevState, title: value }));
            }}
            onFocus={() => setIsTitleFocused(true)}
            onBlur={() => {
              setIsTitleFocused(false);
            }}
          ></TextInput>
          <View style={styles.inputContainer}>
            <Feather
              name="map-pin"
              size={24}
              style={{
                ...styles.icon,
                color: isLocalityFocused ? "#FF6C00" : "#BDBDBD",
              }}
            />
            <TextInput
              style={{
                ...styles.input,
                paddingLeft: 28,
                borderColor: isLocalityFocused ? "#FF6C00" : "#E8E8E8",
              }}
              placeholder="Місцевість..."
              placeholderTextColor="#BDBDBD"
              cursorColor={"#BDBDBD"}
              value={postData.locality}
              onChangeText={(value) => {
                setPostData((prevState) => ({ ...prevState, locality: value }));
              }}
              onFocus={() => {
                setIsLocalityFocused(true);
              }}
              onBlur={() => {
                setIsLocalityFocused(false);
              }}
            ></TextInput>
          </View>

          <TouchableOpacity
            style={{
              ...styles.btn,
              backgroundColor: isDataFullfield ? "#FF6C00" : "#F6F6F6",
            }}
            activeOpacity={0.7}
            onPress={makePost}
            disabled={!isDataFullfield}
          >
            <Text
              style={{
                ...styles.btnTitle,
                color: isDataFullfield ? "#FFFFFF" : "#BDBDBD",
              }}
            >
              Опублікувати
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    width: 60,
    height: 60,
    backgroundColor: "rgba(255, 255, 255, 0.30)",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    borderRadius: 100,
    width: 343,
    paddingHorizontal: 32,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  btnTitle: {
    justifyContent: "center",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  cameraContainer: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    marginTop: 32,
    marginBottom: 8,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "transparent",
  },
  camera: {
    width: 343,
    height: 240,
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    alignItems: "center",
  },
  input: {
    width: 343,
    height: 50,
    borderBottomWidth: 1,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#212121",
  },
  inputContainer: {
    marginBottom: 32,
    position: "relative",
  },
  icon: {
    position: "absolute",
    bottom: 13,
  },
  text: {
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
});

export default CreatePostsScreen;
