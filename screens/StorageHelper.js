// storageHelper.js
import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveToLocal = async (value) => {
  try {
    const data = await loadFromLocal();
    if (data) {
      const index = data.findIndex((e) => e.id === value.id);
      if (index === -1) {
        await AsyncStorage.setItem("movies", JSON.stringify([...data, value]));
      } else {
        data.splice(index, 1);
        await AsyncStorage.setItem("movies", JSON.stringify(data));
      }
    } else {
      await AsyncStorage.setItem("movies", JSON.stringify([value]));
    }
  } catch (error) {
    console.error("Failed to save to local storage", error);
  }
};

export const loadFromLocal = async () => {
  try {
    const value = await AsyncStorage.getItem("movies");
    console.log(value);
    return value ? JSON.parse(value) : [];
  } catch (error) {
    console.error("Failed to load from local storage", error);
    return [];
  }
};
