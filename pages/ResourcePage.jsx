import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { Image } from "expo-image";
import Nav from "../components/Nav";
import ResourceComments from "../components/ResourceComments";

export const ResourcePage = ({ navigation, route }) => {

  const { resource } = route.params;

  return (
    <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // Adjust this offset if needed
  >
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.infoTitle}>Resource: {resource.resource_name}</Text>
        <Text style={styles.infoAuthor}>Added by User:{resource.username}</Text>
          <Text style={styles.infoDate}>Date Uploaded: {resource.created_at}</Text>
          <Text style={styles.infoDate}>Description: {resource.description}</Text>
          <Text style={styles.infoDate}>Quality: {resource.condition}%</Text>
          <Text style={styles.infoDate}>Abundance: {resource.depletion}%</Text>
          
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
      <Nav
        showSearchButton={false}
        showResourceNav={true}
        navigation={navigation}
        currentResource={resource}
      />
      <View style={styles.comments}>
        <ResourceComments resource_id={resource.resource_id} />
      </View>
    </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  info: {
    marginTop: 20,
    padding: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
  },
  infoTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  infoAuthor: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  infoDate: {
    fontSize: 14,
    color: "#888",
  },
  imageContainer: {
    height: "38%",
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor: "#0553",
    resizeMode: "contain",
  },
  comments:{
    height: "50%"
  }
});
