// FavoritesContext.js
import React, { createContext, useState, useEffect } from "react";
import { loadFromLocal, saveToLocal } from "./StorageHelper";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchFavorites();
  }, []);
  const fetchFavorites = async () => {
    const savedFavorites = await loadFromLocal();
    setFavorites(savedFavorites);
  };

  const updateFavorites = async (movie) => {
    if (favorites.some((fav) => fav.id === movie.id)) {
      var data = favorites.filter((fav) => fav.id !== movie.id);
      setFavorites(data);
      await saveToLocal(data);
    } else {
      var data = [...favorites, movie];
      setFavorites(data);
      await saveToLocal(data);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, updateFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContext;
