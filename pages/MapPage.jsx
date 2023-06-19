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

export default function MapPage({ navigation }) {
  const [toggleValue, setToggleValue] = useState(false);
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
    <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // Adjust this offset if needed
  >
    <View style={styles.container}> 
      {toggleValue ? <ResourceList
      resources={displayedResources}
      navigation={navigation}
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
