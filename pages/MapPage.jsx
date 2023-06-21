import React from "react";
import { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { fetchItems } from "../utils/utils";
import Map from "../components/Map";
import Nav from "../components/Nav";
import ResourceCards from "../components/ResourceCards";
import { SearchBox } from "../components/SearchBox";
import { ResourcesContext } from "../contexts/ResourcesContext";
import ResourceList from "../components/ResourceList";
import * as Location from "expo-location";
import BackButton from "../components/BackButton";
import LoadingComponent from "../components/LoadingComponent";

export default function MapPage({ navigation }) {
  const [toggleValue, setToggleValue] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [userLocation, setUserLocation] = useState({
  //   longitude: -2.23817336417579, 
  //   latitude: 53.47221030598573
  // });
  const [targetLocation, setTargetLocation] = useState({
    longitude: -2.23817336417579, 
    latitude: 53.47221030598573
  });
  const [showSearch, setShowSearch] = useState(false);
  const { displayedResources, setDisplayedResources } =
    useContext(ResourcesContext);

  useEffect(() => {
    const fetchDataAndLocation = async () => {
      try {
        if (!displayedResources) {
          const items = await fetchItems();
          setDisplayedResources(items);

          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== "granted") {
            alert("Location permission not granted!");
            return;
          }

          const location = await Location.getCurrentPositionAsync({});
          // setUserLocation(location.coords);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDataAndLocation();
  }, []);

  const cardPress = (location) => {
    setTargetLocation(location);
  };

  const containerStyles = toggleValue
    ? styles.listContainer
    : styles.container;
  
  if (loading) {
    return (
      // <View style={styles.container}>
      <LoadingComponent/>
      // </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <BackButton />
        <Text>Error: {error}</Text>
      </View>
    );
  }
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#36d346"}}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      
      <View style={containerStyles}>
        {toggleValue ? (
          <ResourceList
            resources={displayedResources}
            navigation={navigation}
            location={targetLocation}
            userLocation={{ longitude: -2.23817336417579, 
              latitude: 53.47221030598573}}
          />
        ) : (
          <Map
            initialRegion={{ longitude: -2.23817336417579, 
              latitude: 53.47221030598573}}
            targetLocation={targetLocation}
            displayedResources={displayedResources}
            navigation={navigation}
          />
        )}

        <Nav
          setShowSearch={setShowSearch}
          navigation={navigation}
          toggleValue={toggleValue}
          setToggleValue={setToggleValue}
        />
        {showSearch ? (
          <SearchBox setShowSearch={setShowSearch} />
        ) : !toggleValue ? (
          <ResourceCards
            resources={displayedResources}
            cardPress={cardPress}
            navigation={navigation}
            location={targetLocation}
            userLocation={{ longitude: -2.23817336417579, 
              latitude: 53.47221030598573}}
          />
        ) : null}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#36d346",
  },
  listContainer: {
    flex: 1,
    backgroundColor: "#36d346",
    marginTop: 80,
  },
});
