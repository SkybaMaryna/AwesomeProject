import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Button,
} from "react-native";
import { useDispatch } from "react-redux";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useKeyboardVisible } from "../../hooks/useKeyboardVisible";
import { authSignUpUser } from "../../../redux/auth/authOperations";
import { selectAvatar } from "../../helpers/selectAvatar";
import { uploadAvatarToServer } from "../../services/database";
import { uriToBlob } from "../../helpers/uriToBlob";

const initialState = {
  login: "",
  email: "",
  password: "",
};

const RegistrationScreen = ({ navigation }) => {
  const [isLoginFocused, setIsLoginFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [registerData, setRegisterData] = useState(initialState);
  const [avatarURI, setAvatarURI] = useState("");

  const isKeyboardVisible = useKeyboardVisible();

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    const avatarURL = await uploadAvatar();
    dispatch(authSignUpUser({ ...registerData, avatarURL }));
    setRegisterData(initialState);
    setAvatarURI("");
  };

  const addAvatar = async () => {
    const result = await selectAvatar();
    setAvatarURI(result.assets[0].uri);
  };

  const uploadAvatar = async () => {
    const file = await uriToBlob(avatarURI);
    return await uploadAvatarToServer(file);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../../assets/images/photoBG.jpg")}
          style={styles.imageBG}
          resizeMode="cover"
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={styles.avoidContainer}
          >
            <View
              style={{
                ...styles.form,
                marginBottom: isKeyboardVisible ? 116 : 0,
              }}
            >
              {avatarURI && (
                <View style={styles.avatarContainer}>
                  <Image source={{ uri: avatarURI }} style={styles.avatar} />
                  <TouchableOpacity style={styles.delBtn} activeOpacity={0.7}>
                    <AntDesign
                      name="closecircleo"
                      size={25}
                      color="#BDBDBD"
                      style={styles.delIcon}
                      onPress={() => setAvatarURI("")}
                    />
                  </TouchableOpacity>
                </View>
              )}

              {!avatarURI && (
                <View style={styles.default}>
                  <TouchableOpacity
                    style={styles.addBtn}
                    activeOpacity={0.7}
                    onPress={addAvatar}
                  >
                    <EvilIcons
                      name="plus"
                      size={25}
                      color="#FF6C00"
                      style={styles.addIcon}
                    />
                  </TouchableOpacity>
                </View>
              )}
              <Text style={styles.title}>Реєстрація</Text>
              <TextInput
                style={{
                  ...styles.input,
                  marginBottom: 16,
                  borderColor: isLoginFocused ? "#FF6C00" : "#E8E8E8",
                  backgroundColor: isLoginFocused ? "#FFFFFF" : "#F6F6F6",
                }}
                placeholder="Логін"
                placeholderTextColor="#BDBDBD"
                cursorColor={"#BDBDBD"}
                value={registerData.login}
                onFocus={() => setIsLoginFocused(true)}
                onBlur={() => {
                  setIsLoginFocused(false);
                }}
                onChangeText={(value) => {
                  setRegisterData((prevState) => ({
                    ...prevState,
                    login: value,
                  }));
                }}
              ></TextInput>
              <TextInput
                style={{
                  ...styles.input,
                  marginBottom: 16,
                  borderColor: isEmailFocused ? "#FF6C00" : "#E8E8E8",
                  backgroundColor: isEmailFocused ? "#FFFFFF" : "#F6F6F6",
                }}
                autoComplete="email"
                placeholder="Адреса електронної пошти"
                placeholderTextColor="#BDBDBD"
                cursorColor={"#BDBDBD"}
                value={registerData.email}
                onFocus={() => setIsEmailFocused(true)}
                onBlur={() => {
                  setIsEmailFocused(false);
                }}
                onChangeText={(value) => {
                  setRegisterData((prevState) => ({
                    ...prevState,
                    email: value,
                  }));
                }}
              ></TextInput>
              <View>
                <TextInput
                  style={{
                    ...styles.input,
                    marginBottom: 43,
                    position: "relative",
                    borderColor: isPasswordFocused ? "#FF6C00" : "#E8E8E8",
                    backgroundColor: isPasswordFocused ? "#FFFFFF" : "#F6F6F6",
                    paddingEnd: 95,
                  }}
                  autoComplete="password"
                  placeholder="Пароль"
                  secureTextEntry={isPasswordShown ? false : true}
                  placeholderTextColor="#BDBDBD"
                  cursorColor={"#BDBDBD"}
                  value={registerData.password}
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => {
                    setIsPasswordFocused(false);
                  }}
                  onChangeText={(value) => {
                    setRegisterData((prevState) => ({
                      ...prevState,
                      password: value,
                    }));
                  }}
                ></TextInput>
                <TouchableOpacity
                  style={styles.inputBtn}
                  activeOpacity={0.7}
                  onPress={() => setIsPasswordShown(!isPasswordShown)}
                >
                  <Text style={styles.inputBtnTitle}>
                    {isPasswordShown ? "Сховати" : "Показати"}
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.btn}
                activeOpacity={0.7}
                onPress={handleSubmit}
              >
                <Text style={styles.btnTitle}>Зареєструватися</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={styles.linkTitle}>Вже є акаунт? Увійти</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  addIcon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  addBtn: {
    position: "absolute",
    top: 80,
    right: -12,
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  avoidContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  avatarContainer: {
    position: "absolute",
    width: 120,
    height: 120,
    left: 128,
    top: -60,
    borderRadius: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  btn: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    width: 343,
    paddingHorizontal: 32,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  btnTitle: {
    color: "#FFFFFF",
    justifyContent: "center",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  default: {
    width: 120,
    height: 120,
    position: "absolute",
    left: 128,
    top: -60,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  delBtn: {
    position: "absolute",
    top: 80,
    right: -12,
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    width: "auto",
    height: 549,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: "#FFFFFF",
    position: "relative",
    alignItems: "center",
  },
  imageBG: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "stretch",
  },
  input: {
    width: 343,
    height: 50,
    borderWidth: 1,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderRadius: 8,
    padding: 16,
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  inputBtn: {
    position: "absolute",
    right: 16,
    top: 13,
  },
  inputBtnTitle: {
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  linkTitle: {
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  title: {
    color: "#212121",
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    letterSpacing: 0.3,
    marginTop: 92,
    marginBottom: 33,
  },
});

export default RegistrationScreen;
