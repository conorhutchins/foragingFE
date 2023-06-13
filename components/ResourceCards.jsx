import React from "react";
import { View, FlatList, Text, Button } from "react-native";

export default function ResourceCards({ cardPress, resources, navigation }) {
  const viewResourceButtonPress = (resource) => {
    navigation.navigate("ResourcePage", { resource: resource });
  };
  const renderItem = ({ item }) => {
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
        <Button
          onPress={() => {
            cardPress(item.location);
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
