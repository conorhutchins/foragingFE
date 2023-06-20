import React from "react";
import { View, FlatList, Text, Button } from "react-native";
import { getDistance } from "geolib";

export default function ResourceList({ resources, navigation, location }) {
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

  const renderItem = ({ item }) => {
    const coords = item.location.split(',');
    const lat = Number(coords[0])
    const long= Number(coords[1])
    return (
      <View
        style={{
          width: "100%",
          height: 140,
          margin: 5,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
       
        <Text style={{ fontSize: 20 }}>{item.resource_name}</Text>
        <Text style={{ fontSize: 20 }}> Description: {item.description}</Text>
        <Text style={{ fontSize: 20 }}> Created at: {item.created_at}</Text>
        <Text style={{fontSize: 20}}>Distance: {`${calculateDistance(location.latitude, location.longitude, lat, long)} km`}</Text>
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
