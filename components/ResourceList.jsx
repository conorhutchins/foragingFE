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

export default function ResourceList({
  resources,
  navigation,
  location,
  userLocation,
}) {
  const viewResourceButtonPress = (resource) => {
    navigation.navigate("ResourcePage", { resource: resource });
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const distance = getDistance(
      { latitude: lat1, longitude: lon1 },
      { latitude: lat2, longitude: lon2 }
    );
    return (distance / 1000).toFixed(2);
  };

  const sortedResources = [];
  resources.forEach((item) => {
    const coords = item.location.split(",");
    const lat = Number(coords[0]);
    const long = Number(coords[1]);
    const distance = calculateDistance(
      userLocation.latitude,
      userLocation.longitude,
      lat,
      long
    );
    item.distance = distance;
    sortedResources.push(item);
  });

  sortedResources.sort();

  const renderItem = ({ item }) => {
    const coords = item.location.split(",");
    const lat = Number(coords[0]);
    const long = Number(coords[1]);
    return (
      <View style={styles.card}>
        <Text style={styles.resourceName}>{item.resource_name}</Text>
        <Text style={styles.description}> {item.description}</Text>
        <TouchableOpacity
          style={styles.viewButton}
          onPress={() => {
            viewResourceButtonPress(item);
          }}
        >
          <Text style={styles.buttonText}>View resource</Text>
        </TouchableOpacity>
        <Text style={styles.createdDate}>{dateFormatter(item.created_at)}</Text>
        <Text style={styles.distance}>
          {`${calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            lat,
            long
          )} km`}
        </Text>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={sortedResources}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        vertical
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "90%",
    marginTop: 25,
    height: 160,
    margin: 10,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#36d346",
    borderRadius: 25,
    marginBottom: 5,
    padding: 10,
    alignSelf: "center",
  },
  resourceName: {
    textAlign: "center",
    marginBottom: 5,
    fontWeight: "bold",
    fontSize: 22,
  },
  description: {
    fontSize: 18,
    marginBottom: 5,
    textAlign: "center",
  },
  viewButton: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 10,
    width: "50%",
    borderRadius: 10,
  },
  buttonText: {
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
  },
  createdDate: {
    fontSize: 15,
    marginTop: 5,
    marginBottom: 5,
    textAlign: "center",
  },
  distance: {
    marginBottom: 5,
    fontSize: 15,
    textAlign: "center",
  },
});
