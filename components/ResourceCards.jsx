import React from "react";
import { View, FlatList, Text, Button } from "react-native";
import { getDistance } from "geolib";

export default function ResourceCards({ cardPress, resources, navigation, location }) {
  const viewResourceButtonPress = (resource) => {
    navigation.navigate("ResourcePage", { resource: resource });
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const distance = getDistance(
      { latitude: lat1, longitude: lon1 },
      { latitude: lat2, longitude: lon2 }
    )
    return (distance / 1000).toFixed(2);
  }

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
