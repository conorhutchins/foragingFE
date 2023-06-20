import React from "react";
import { View, FlatList, Text, Button } from "react-native";

export default function ResourceCards({ cardPress, resources, navigation, location }) {
  const viewResourceButtonPress = (resource) => {
    navigation.navigate("ResourcePage", { resource: resource });
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance.toFixed(2); // Distance in kilometers to 2 decimal places

  }

  const toRadians = (degrees) => {
    return (degrees * Math.PI) / 180;
  };
  const renderItem = ({ item }) => {
    const coords = item.location.split(',');
    const lat = coords[0]
    const long = coords[1]
    const resourceLocation = {
      latitude: lat,
      longitude: long,
    };
    return (
      <View
        style={{
          width: 200,
          height: 200,
          backgroundColor: "lightgray",
          margin: 10,
        }}
      >
        <Text>{item.resource_name}</Text>
        <Text>{item.description}</Text>
        <Text>{item.created_at}</Text>
        <Text>{`${calculateDistance(location.latitude, location.longitude, lat, long)} km`}</Text>
        <Button
          onPress={() => {
            cardPress(resourceLocation);
          }}
          title="Show on map"
        />
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
    <FlatList
      data={resources}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      horizontal
    />
  );
}
