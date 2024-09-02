import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import axios from "axios";
import AntDesign from "@expo/vector-icons/AntDesign";
import FavoritesContext from "./FavoritesContext";
const API_KEY = "bc71dd5dc8a1f296a9e96e5bae69102e";
const BASE_URL = "https://api.themoviedb.org/3";
const { height: screenHeight } = Dimensions.get("window");

export default function HomeScreen({ navigation }) {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const { favorites, updateFavorites } = useContext(FavoritesContext);

  useEffect(() => {
    fetchMovies();
    fetchCategories();
  }, [searchQuery, selectedCategory]);

  const fetchMovies = async () => {
    try {
      let url = `${BASE_URL}/discover/movie`;
      let params = {
        api_key: API_KEY,
        with_genres: selectedCategory,
      };

      if (searchQuery.trim()) {
        url = `${BASE_URL}/search/movie`;
        params = {
          ...params,
          query: searchQuery,
        };
      }

      const response = await axios.get(url, { params });
      setMovies(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
        params: { api_key: API_KEY },
      });
      setCategories(response.data.genres);
    } catch (error) {
      console.error(error);
    }
  };

  //!
  const toggleFavorite = async (movie) => {
    await updateFavorites(movie);
  };

  const isFavorite = (movieId) => {
    return favorites.some((fav) => fav.id === movieId);
  };

  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: "white" }}>
      {/* Search */}
      <TextInput
        style={{
          height: 40,
          padding: 8,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
          borderRadius: 8,
        }}
        placeholder="Search Movies"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      {/* Categories */}
      <FlatList
        data={categories}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedCategory(item.id)}
            style={{
              marginBottom: 10,
              marginRight: 10,
              height: 40,
              paddingVertical: 5,
              paddingHorizontal: 10,
              backgroundColor: item.id === selectedCategory ? "black" : "white",
              borderRadius: 8,
              borderWidth: 1,
              borderColor: item.id === selectedCategory ? "black" : "gray",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: item.id === selectedCategory ? "white" : "black",
                fontWeight: "bold",
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      {/* Movies */}
      <FlatList
        style={{ marginTop: 10 }}
        data={movies}
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
                height: screenHeight * 0.24, // 24% of the screen height
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
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
