import React from "react";
import { useEffect, useState } from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { fetchItems } from "../utils/utils";
import Map from "../components/Map";
import Nav from "../components/Nav";
import ResourceCards from "../components/ResourceCards";
import { SearchBox } from "../components/SearchBox";

export default function MapPage({ navigation }) {
  const [displayedResources, setDisplayedResources] = useState([]);
  const [targetLocation, setTargetlocation] = useState(null);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    StatusBar.setHidden(true);
    StatusBar.setBarStyle("light-content");

    const items = fetchItems();
    setDisplayedResources(items);
    return () => {
      StatusBar.setHidden(false);
      StatusBar.setBarStyle("default");
    };
  }, []);

  const cardPress = (location) => {
    setTargetlocation(location);
  };

  return (
    <View style={styles.container}>
      <Map
        targetLocation={targetLocation}
        displayedResources={displayedResources}
      />
      <Nav setShowSearch={setShowSearch} />
      {showSearch ? (
        <SearchBox setShowSearch={setShowSearch} />
      ) : (
        <ResourceCards
          resources={displayedResources}
          cardPress={cardPress}
          navigation={navigation}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
