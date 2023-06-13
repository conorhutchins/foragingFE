import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "./pages/Welcome";
import MapPage from "./pages/MapPage";
import { UserContext } from "./contexts/UserContext";
import { useState, useEffect } from "react";
import { ResourcePage } from "./pages/ResourcePage";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState("Chris");

  return (
    <NavigationContainer>
      <UserContext.Provider value={{ user, setUser }}>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen
            name="MapPage"
            component={MapPage}
            options={{ title: null }}
          />
          <Stack.Screen
            name="ResourcePage"
            component={ResourcePage}
            options={{ title: null }}
          />
        </Stack.Navigator>
      </UserContext.Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
