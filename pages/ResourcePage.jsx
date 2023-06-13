import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import Nav from "../components/Nav";
import ResourceComments from "../components/ResourceComments";

export const ResourcePage = ({ route }) => {
  const { resource } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text>{resource.resource_name}</Text>
        <Text>{resource.username}</Text>
        <Text>{resource.created_at}</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={resource.img_url}
          //   placeholder={blurhash}
          contentFit="scale-down"
          transition={1000}
        />
      </View>
      <Nav showSearchButton={false} showResourceNav={true} />
      <View>
        <ResourceComments resource_id={resource.resource_id} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 10,
  },
  imageContainer: {
    height: "50%",
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor: "#0553",
    resizeMode: "contain",
  },
});
