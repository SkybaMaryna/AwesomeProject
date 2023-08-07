import * as ImagePicker from "expo-image-picker";

export const selectAvatar = async () => {
  try {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      console.log("Немає доступу до галереї");
      return;
    }

    return await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1, 
    });
  } catch (error) {
    console.log("Помилка: ", error.message);
  }
};
