import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "./pages/Welcome";
import Map from "./pages/Map";
import { UserContext } from "./contexts/UserContext";
import { useState, useEffect } from "react";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState("Chris");

  
  
  return (
    <NavigationContainer>
      <UserContext.Provider value={{ user, setUser }}>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{ title: "Foraging App" }}
          />
           <Stack.Screen
            name="Map"
            component={Map}
            options={{ title: "Foraging App" }}
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
