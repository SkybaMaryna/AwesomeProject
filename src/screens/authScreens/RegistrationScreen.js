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
import { useDispatch } from "react-redux";
import { useKeyboardVisible } from "../../hooks/useKeyboardVisible";
import { authSignUpUser } from "../../../redux/auth/authOperations";

const initialState = {
  login: "",
  email: "",
  password: "",
};

const RegistrationScreen = ({navigation}) => {
  const [isLoginFocused, setIsLoginFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [registerData, setRegisterData] = useState(initialState);

  const isKeyboardVisible = useKeyboardVisible();

  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(authSignUpUser(registerData));
    setRegisterData(initialState);
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
              <Image
                source={require("../../../assets/images/addPhoto.png")}
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
  container: {
    flex: 1,
    justifyContent: "center",
  },
  imageBG: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "stretch",
  },
  avoidContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
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
