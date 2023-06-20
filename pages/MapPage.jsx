import React from "react";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, View, StatusBar, FlatList, KeyboardAvoidingView, Platform } from "react-native";
import { fetchItems } from "../utils/utils";
import Map from "../components/Map";
import Nav from "../components/Nav";
import ResourceCards from "../components/ResourceCards";
import { SearchBox } from "../components/SearchBox";
import { ResourcesContext } from "../contexts/ResourcesContext";
import ResourceList from "../components/ResourceList";
import * as Location from 'expo-location';

export default function MapPage({ navigation }) {
  const [toggleValue, setToggleValue] = useState(false);
  const [targetLocation, setTargetLocation] = useState({ longtitue: 2.7185, latitude: 51.1474});
  const [showSearch, setShowSearch] = useState(false);
  const { displayedResources, setDisplayedResources } =
    useContext(ResourcesContext);

  useEffect(() => {
    const fetchDataAndLocation = async () => {
      if (!displayedResources) {
        const items = await fetchItems();
        setDisplayedResources(items);
        console.log(displayedResources);
        
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          alert('Location permission not granted!');
          return;
        }
        
        const location = await Location.getCurrentPositionAsync({});
        setTargetLocation(location.coords);
        console.log(targetLocation);
      }
    };

    fetchDataAndLocation();
  }, []);

  const cardPress = (location) => {
    setTargetLocation(location);
  };

  return (
    <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // Adjust this offset if needed
  >
    <View style={styles.container}> 
      {toggleValue ? <ResourceList
      resources={displayedResources}
      navigation={navigation} location={targetLocation}
      />: 
      <Map
        targetLocation={targetLocation}
        displayedResources={displayedResources}
    />}
      
      <Nav setShowSearch={setShowSearch} navigation={navigation} toggleValue={toggleValue}  setToggleValue={setToggleValue} />
      {showSearch ? (
        <SearchBox setShowSearch={setShowSearch} />
      ) : !toggleValue ? (
        <ResourceCards
          resources={displayedResources}
          cardPress={cardPress}
          navigation={navigation}
          location={targetLocation}
        />
      ) : null}
      </View>
      </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  justifyContent: 'center',
  },
});
