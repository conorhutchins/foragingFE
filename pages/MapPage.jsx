import React from "react";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { fetchItems } from "../utils/utils";
import Map from "../components/Map";
import Nav from "../components/Nav";
import ResourceCards from "../components/ResourceCards";
import { SearchBox } from "../components/SearchBox";
import { ResourcesContext } from "../contexts/ResourcesContext";

export default function MapPage({ navigation }) {
  const [targetLocation, setTargetlocation] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const { displayedResources, setDisplayedResources } =
    useContext(ResourcesContext);

  useEffect(() => {
    if (!displayedResources) {
      fetchItems().then((items) => {
        setDisplayedResources(items);
      });
    }
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
