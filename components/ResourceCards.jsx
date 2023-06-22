import React from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { getDistance } from "geolib";
import { dateFormatter } from "../utils/utils";

export default function ResourceCards({
  setShowSearch,
  cardPress,
  resources,
  navigation,
  location,
  userLocation,
}) {
  const viewResourceButtonPress = (resource) => {
    setShowSearch = false;
    navigation.navigate("ResourcePage", { resource: resource });
  };
  const resourcesLength = resources.length;
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const radius = 6371;

    const lat1Rad = toRadians(lat1);
    const lon1Rad = toRadians(lon1);
    const lat2Rad = toRadians(lat2);
    const lon2Rad = toRadians(lon2);

    // Difference between the latitudes and longitudes
    const deltaLat = lat2Rad - lat1Rad;
    const deltaLon = lon2Rad - lon1Rad;

    // Haversine formula
    const a =
      Math.sin(deltaLat / 2) ** 2 +
      Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(deltaLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Calculate the distance
    const distance = radius * c;
    return distance.toFixed(2);
  };

  function toRadians(degrees) {
    return (degrees * Math.PI) / 180;
  }

  const renderItem = ({ item }) => {
    const coords = item.location.split(",");
    const lat = coords[0];
    const long = coords[1];
    const resourceLocation = {
      latitude: lat,
      longitude: long,
    };

    return (
      <View
        style={{
          width: 200,
          height: 200,
          backgroundColor: "#36d346",
          margin: 10,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.info}>
          <Text style={styles.title}>{item.resource_name}</Text>
          <Text style={styles.infoText}>{item.description.slice(0, 20)}...</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            cardPress(resourceLocation);
          }}
        >
          <Text style={styles.buttonText}>Show on map</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            viewResourceButtonPress(item);
          }}
        >
          <Text style={styles.buttonText}>View resource</Text>
        </TouchableOpacity>
        <Text style={styles.infoText}>{dateFormatter(item.created_at)}</Text>
        <Text style={styles.infoText}>{`${calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          lat,
          long
        )} km`}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {resourcesLength === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.infoText}>
            No resources found from search criteria
          </Text>
        </View>
      ) : (
        <FlatList
          data={resources}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    height: 200,
    margin: 10,
    borderRadius: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    marginBottom: 5,
    marginTop: 10,
    fontWeight: "bold",
    color: "black",
  },
  info: {
    textAlign: "center",
  },
  infoText: {
    fontSize: 15,
    textAlign: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 10,
    margin: 5,
    width: "75%",
    borderRadius: 10,
  },
  buttonText: {
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
  },
});
