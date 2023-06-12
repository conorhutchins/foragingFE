import React from "react";
import { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import { fetchItems } from "../utils/utils";

export default function Map() {
  const [displayedResources, setDisplayedResources] = useState([]);

  useEffect(() => {
    const items = fetchItems();
    setDisplayedResources(items);
  }, []);

//   const onRegionChange = (region) => {
//     console.log(region);
//   };


  return (
    <View style={styles.container}>
      <MapView
        // onRegionChange={onRegionChange}
        mapType="satellite"
        showsUserLocation={true}
        style={styles.map}
        initialRegion={{
          latitude: 50.82906244129774,
          latitudeDelta: 0.0712773011969503,
          longitude: -0.15489586013351736,
          longitudeDelta: 0.07019293563021733,
        }}
      >
        <Marker
          coordinate={{
            latitude: 50.82998419421786,
            longitude: -0.15759806528483825,
          }}
          title={"test marker"}
        />
        {displayedResources.map((resource, index) => {
          return (
            <Marker
              key={index}
              coordinate={resource.location}
              title={resource.resource_name}
              description={resource.description}
            />
          );
        })}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
