import React from "react";
import { View, FlatList, Text, Button } from "react-native";

export default function ResourceList({ resources, navigation }) {
  const viewResourceButtonPress = (resource) => {
    navigation.navigate("ResourcePage", { resource: resource });
  };
  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          width: "100%",
          height: "50%",
          margin: 10,
        }}
      >
        <Text>{item.resource_name}</Text>
        <Text> Distance: </Text>
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
