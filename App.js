import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import MovieDetailsScreen from "./screens/MovieDetailsScreen";
import FavoriteScreen from "./screens/FavoriteScreen";
import { FavoritesProvider } from "./screens/FavoritesContext";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function HomeDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="favorite" component={FavoriteScreen} />
    </Drawer.Navigator>
  );
}

function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeDrawer"
        component={HomeDrawer}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </FavoritesProvider>
  );
}
