import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";

export default function Map({ targetLocation, displayedResources }) {
  const showResources = () => {
    return displayedResources.map((resource, index) => {
      return (
        <Marker
          key={index}
          coordinate={resource.location}
          title={resource.resource_name}
          description={resource.description}
        />
      );
    });
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
});
