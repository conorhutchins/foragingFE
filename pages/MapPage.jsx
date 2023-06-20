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
  const [userLocation, setUserLocation] = useState({
    longitude: 2.7185,
    latitude: 51.1474,
  });
  const [targetLocation, setTargetLocation] = useState({
    longitude: 2.7185,
    latitude: 51.1474,
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
          setUserLocation(location.coords);
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

  if (loading) {
    return (
      <View style={styles.container}>
      <LoadingComponent/>
      </View>
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
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <View style={styles.container}>
        {toggleValue ? (
          <ResourceList
            resources={displayedResources}
            navigation={navigation}
            location={targetLocation}
            userLocation={userLocation}
          />
        ) : (
          <Map
            initialRegion={userLocation}
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
            userLocation={userLocation}
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
  },
});
