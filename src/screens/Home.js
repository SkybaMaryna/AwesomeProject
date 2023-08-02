import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity } from "react-native";
import Feather from "@expo/vector-icons/Feather";

import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
import PostsScreen from "./PostsScreen";

const MainTab = createBottomTabNavigator();

const Home = () => {
  const handleLogout = () => {};
  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#fff",
          height: 83,
          borderTopColor: "rgba(0, 0, 0, 0.30)",
          borderTopWidth: 1,
        },
      }}
    >
      <MainTab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather
              name="grid"
              size={24}
              color={focused ? "#FF6C00" : "#212121"}
            />
          ),
          tabBarItemStyle: {
            width: 24,
            height: 24,
            top: 17,
            flexGrow: 2,
          },
          headerTitle: "Публікації",
          headerTitleAlign: "center",
          headerStyle: {
            height: 88,
          },
          headerTitleStyle: {
            color: "#212121",
            fontFamily: "Roboto-Medium",
            fontSize: 17,
            marginRight: -16,
          },
          headerRight: () => (
            <TouchableOpacity onPress={handleLogout}>
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
          headerRightContainerStyle: {
            paddingRight: 16,
          }
        }}
      />
      <MainTab.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather name="plus" size={24} color="#fff" />
          ),
          tabBarItemStyle: {
            width: 70,
            height: 40,
            backgroundColor: "#FF6C00",
            borderRadius: 50,
            top: 9,
          },
          headerTitle: "Створити публікацію",
          headerTitleAlign: "center",
          headerStyle: {
            height: 88,
          },
          headerTitleStyle: {
            color: "#212121",
            fontFamily: "Roboto-Medium",
            fontSize: 17,
          },
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Feather
              name="user"
              size={24}
              color={focused ? "#FF6C00" : "#212121"}
            />
          ),
          tabBarItemStyle: {
            width: 24,
            height: 24,
            top: 17,
            flexGrow: 2,
          },
          headerShown: false,
        }}
      />
    </MainTab.Navigator>
  );
};

export default Home;
