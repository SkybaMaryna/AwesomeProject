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
} from "react-native";
import { useFonts } from "expo-font";

const RegistrationScreen = () => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isLoginFocused, setIsLoginFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("../../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("../../assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("../../assets/fonts/Roboto-Bold.ttf"),
  });

  const keyboardHide = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
  };

  const handleLoginFocus = () => {
    setIsShowKeyboard(true);
    setIsLoginFocused(true);
  };

  const handleEmailFocus = () => {
    setIsShowKeyboard(true);
    setIsEmailFocused(true);
  };

  const handlePasswordFocus = () => {
    setIsShowKeyboard(true);
    setIsPasswordFocused(true);
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/images/photoBG.jpg")}
          style={styles.imageBG}
          resizeMode="cover"
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View
              style={{ ...styles.form, marginBottom: isShowKeyboard ? 116 : 0 }}
            >
              <Image
                source={require("../../assets/images/addPhoto.png")}
                style={styles.image}
              />
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
                onFocus={handleLoginFocus}
                onBlur={() => {
                  setIsLoginFocused(false);
                }}
              ></TextInput>
              <TextInput
                style={{
                  ...styles.input,
                  marginBottom: 16,
                  borderColor: isEmailFocused ? "#FF6C00" : "#E8E8E8",
                  backgroundColor: isEmailFocused ? "#FFFFFF" : "#F6F6F6",
                }}
                placeholder="Адреса електронної пошти"
                placeholderTextColor="#BDBDBD"
                onFocus={handleEmailFocus}
                onBlur={() => {
                  setIsEmailFocused(false);
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
                  }}
                  placeholder="Пароль"
                  secureTextEntry={true}
                  placeholderTextColor="#BDBDBD"
                  onFocus={handlePasswordFocus}
                  onBlur={() => {
                    setIsPasswordFocused(false);
                  }}
                ></TextInput>
                <TouchableOpacity style={styles.inputBtn} activeOpacity={0.7}>
                  <Text style={styles.inputBtnTitle}>Показати</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.btn}
                activeOpacity={0.7}
                onPress={keyboardHide}
              >
                <Text style={styles.btnTitle}>Зареєструватися</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.7}>
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
  container: {
    flex: 1,
    justifyContent: "center",
  },
  imageBG: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "stretch",
  },
  avoidContainer: {},
  image: {
    width: 132,
    height: 120,
    position: "absolute",
    left: 132,
    top: -60,
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
  title: {
    color: "#212121",
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    letterSpacing: 0.3,
    marginTop: 92,
    marginBottom: 33,
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
  linkTitle: {
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
});

export default RegistrationScreen;
