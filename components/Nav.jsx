import { useState, useContext, useEffect } from "react";
import { Button, View, StyleSheet, Switch } from "react-native";
import { ResourcesContext } from "../contexts/ResourcesContext";
import { useRoute } from "@react-navigation/native";

export default function Nav({
  setShowSearch,
  showResourceNav = false,
  showSearchButton = true,
  navigation,
  currentResource,
  toggleValue,
  setToggleValue,
}) {
  const route = useRoute();
  const { displayedResources, setDisplayedResources } =
    useContext(ResourcesContext);
  const [nextResource, setNextResource] = useState();
  const [previousResource, setPreviousResource] = useState();

  useEffect(() => {
    if (displayedResources) {
      const previousValue = displayedResources.find((element, index, array) => {
        return currentResource === array[index + 1];
      });
      const nextValue = displayedResources.find((element, index, array) => {
        return currentResource === array[index - 1];
      });
      setNextResource(nextValue);
      setPreviousResource(previousValue);
    }
  }, [currentResource]);

  const searchPress = () => {
    setShowSearch(true);
  };

  const backToMapPress = () => {
    navigation.navigate("MapPage");
  };

  const previousResourcePress = () => {
    navigation.navigate("ResourcePage", { resource: previousResource });
  };

  const nextResourcePress = () => {
    navigation.navigate("ResourcePage", { resource: nextResource });
  };

  const addPagePress = () => {
    navigation.navigate("ImageCapturePage");
  };

  return (
    <View>
      {showResourceNav && (
        <View style={styles.container}>
          <Button
            title={
              previousResource ? `PRV ${previousResource.resource_name}` : "PRV"
            }
            onPress={previousResourcePress}
            disabled={!previousResource}
          />
          <Button
            title={nextResource ? `${nextResource.resource_name} NXT` : "NXT"}
            onPress={nextResourcePress}
            disabled={!nextResource}
          />
        </View>
      )}
      <View style={styles.container}>
        {showSearchButton && (
          <Button
            onPress={searchPress}
            title="Search"
            color="#841584"
            accessibilityLabel="search"
          />
        )}
        {!showSearchButton && (
          <Button
            onPress={backToMapPress}
            title="Back to map"
            color="#841584"
            accessibilityLabel="back to map"
          />
        )}
        <Button
          title="Add"
          color="#841584"
          accessibilityLabel="Add"
          onPress={addPagePress}
        />
        <Button
          title="Catalogue"
          color="#841584"
          accessibilityLabel="catalogue"
        />
       {route.name === "MapPage" && (
          <Switch
            value={toggleValue}
            onValueChange={setToggleValue}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 10, // optional, adds horizontal padding to buttons
  },
});
