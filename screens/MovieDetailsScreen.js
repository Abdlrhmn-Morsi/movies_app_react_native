import React, { useState, useEffect } from "react";
import { Dimensions, Text, Image, ScrollView } from "react-native";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
const { height: screenHeight } = Dimensions.get("window");

const API_KEY = "bc71dd5dc8a1f296a9e96e5bae69102e";
const BASE_URL = "https://api.themoviedb.org/3";

export default function MovieDetailsScreen() {
  const route = useRoute();
  const { movieId } = route.params;
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    fetchMovieDetails();
  }, []);

  const fetchMovieDetails = async () => {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
      params: { api_key: API_KEY },
    });
    setMovieDetails(response.data);
  };

  if (!movieDetails) return null;

  return (
    <ScrollView style={{ flex: 1, padding: 10 }}>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`,
        }}
        style={{
          borderRadius: 8,
          width: "100%",
          height: screenHeight * 0.5,
        }}
      />
      <Text style={{ fontSize: 24, fontWeight: "bold", marginVertical: 10 }}>
        {movieDetails.title}
      </Text>
      <Text>{movieDetails.overview}</Text>
    </ScrollView>
  );
}
