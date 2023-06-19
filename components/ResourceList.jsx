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
          height: 140,
          margin: 5,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ fontSize: 20 }}>{item.resource_name}</Text>
        <Text style={{ fontSize: 20 }}> Description: {item.description}</Text>
        <Text style={{ fontSize: 20 }}> Created at: {item.created_at}</Text>
        <Text style = {{fontSize: 20}}> Distance: </Text>
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
