import MapView, { Marker, Callout } from "react-native-maps";
import { StyleSheet, View, Linking, Text } from "react-native";

export default function Map({ targetLocation, displayedResources }) {
  const viewResourceButtonPress = (resource) => {
    navigation.navigate("ResourcePage", { resource: resource });
  };

  const showResources = () => {
    if (displayedResources) {
      return displayedResources.map((resource, index) => {
        console.log(resource, "<-- resource in map");
        const coords = resource.location.split(",");
        const lat = Number(coords[0]);
        const long = Number(coords[1]);
        const resourceLocation = {
          latitude: lat,
          longitude: long,
        };
        return (
          <Marker
            key={index}
            coordinate={resourceLocation}
            title={resource.resource_name}
            description={resource.description}
          >
            <Callout>
            <View style={styles.markerPopup}>
                <Text>{resource.resource_name}</Text>
                <Text>{resource.description}</Text>
                <Text
                  onPress={() => {
                    viewResourceButtonPress(resource);
                  }}
                >
                  View Resource
                </Text>
              </View>
            </Callout>
          </Marker>
        );
      });
    }
  };
  const initialRegion = {
    latitude: 50.82906244129774,
    latitudeDelta: 0.01512773011969503,
    longitude: -0.15489586013351736,
    longitudeDelta: 0.015019293563021733,
  };

  return (
    <MapView
      //   onRegionChange={onRegionChange}
      mapType="satellite"
      showsUserLocation={true}
      style={styles.map}
      region={
        targetLocation
          ? {
              ...initialRegion,
              latitude: targetLocation.latitude,
              longitude: targetLocation.longitude,
            }
          : initialRegion
      }
    >
      {showResources()}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "65%",
  },
  markerPopup: {
      width: 200,  // Adjust the width to your desired size
      height: 50, // Adjust the height to your desired size
      backgroundColor: 'white',
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
});
