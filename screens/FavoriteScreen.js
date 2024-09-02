import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import FavoritesContext from "./FavoritesContext";
import { AntDesign } from "@expo/vector-icons";

const { height: screenHeight } = Dimensions.get("window");

const FavoriteScreen = ({ navigation }) => {
  const { favorites, updateFavorites } = useContext(FavoritesContext);

  const toggleFavorite = async (movie) => {
    await updateFavorites(movie);
  };

  const isFavorite = (movieId) => {
    return favorites.some((fav) => fav.id === movieId);
  };

  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: "white" }}>
      <FlatList
        style={{ marginTop: 10 }}
        data={favorites}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("MovieDetails", { movieId: item.id })
            }
          >
            <View
              style={{
                marginBottom: 20,
                backgroundColor: "#fff",
                borderRadius: 10,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 5,
                width: "100%",
                height: screenHeight * 0.24,
                overflow: "hidden",
                position: "relative",
              }}
            >
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                }}
                style={{
                  height: "100%",
                  width: "100%",
                  resizeMode: "cover",
                }}
              />
              <TouchableOpacity
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  borderRadius: 20,
                  padding: 5,
                }}
                onPress={() => toggleFavorite(item)}
              >
                <AntDesign
                  name="heart"
                  size={24}
                  color={isFavorite(item.id) ? "red" : "black"}
                />
              </TouchableOpacity>
              <View
                style={{
                  position: "absolute",
                  bottom: 10,
                  left: 10,
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: 16,
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 5,
                  }}
                >
                  {item.title}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => {
          return item.id;
        }}
      />
    </View>
  );
};

export default FavoriteScreen;
