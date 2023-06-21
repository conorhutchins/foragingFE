import React from "react";
import { View, FlatList, Text, Button, StyleSheet } from "react-native";
import { getDistance } from "geolib";

export default function ResourceCards({ cardPress, resources, navigation, location, userLocation }) {
  const viewResourceButtonPress = (resource) => {
    navigation.navigate("ResourcePage", { resource: resource });
  };

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
    const a = Math.sin(deltaLat/2) ** 2 + Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(deltaLon/2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  
    // Calculate the distance
    const distance = radius * c;
    return distance.toFixed(2);
  }
  
  function toRadians(degrees) {
    return degrees * Math.PI / 180;
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
          backgroundColor: "#fff68f",
          margin: 10,
          borderRadius: 20,
        }}
      >
        <View style = {styles.info}>
        <Text style = {styles.title}>{item.resource_name}</Text>
        
        <Text style = {styles.info}>{item.description}</Text>
        
          </View>
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
        <Text style = {styles.info}>{item.created_at}</Text>
        <Text style = {styles.info}>{`${calculateDistance(userLocation.latitude, userLocation.longitude, lat, long)} km`}</Text>
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
const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 22,
    marginBottom: 10,
    marginTop: 10,
    fontWeight: 'bold',
    // backgroundColor: '#35bb42',
    // width: "67%",
    // alignSelf: "center",
    // borderRadius: 50,
  },
  info: {
    textAlign: 'center',
    fontSize: 15,
  }

});
