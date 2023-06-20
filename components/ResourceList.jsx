import React from "react";
import { View, FlatList, Text, Button } from "react-native";
import { getDistance } from "geolib";

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
  }


  //   const R = 6371; // Radius of the Earth in kilometers
  //   const dLat = toRadians(lat2 - lat1);
  //   const dLon = toRadians(lon2 - lon1);
  //   const a =
  //     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
  //     Math.cos(toRadians(lat1)) *
  //       Math.cos(toRadians(lat2)) *
  //       Math.sin(dLon / 2) *
  //       Math.sin(dLon / 2);
  //   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  //   const distance = R * c;

  //   return distance.toFixed(2); // Distance in kilometers to 2 decimal places
  // };
  


  const renderItem = ({ item }) => {
    const coords = item.location.split(",");
    const lat = Number(coords[0]);
    const long = Number(coords[1]);
    return (
      <View
        style={{
          width: "100%",
          height: 140,
          margin: 5,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 20 }}>{item.resource_name}</Text>
        <Text style={{ fontSize: 20 }}> Description: {item.description}</Text>
        <Text style={{ fontSize: 20 }}> Created at: {item.created_at}</Text>
        <Text style={{ fontSize: 20 }}>
          Distance:{" "}
          {`${calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            lat,
            long
          )} km`}
        </Text>
        <Button
          onPress={() => {
            viewResourceButtonPress(item);
          }}
          title="View resource"
        />
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={resources}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        vertical
      />
    </View>
  );
}
