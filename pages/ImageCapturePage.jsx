import React, { useState, useEffect } from "react";
import { Text ,Button, View, StyleSheet } from "react-native";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { Camera, CameraType } from "expo-camera";
import * as Location from 'expo-location';
import BackButton from "../components/BackButton";

export const ImageCapturePage = ({ navigation }) => {

  const [imageUri, setImageUri] = useState(null);
  const [location, setLocation ] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null);


  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting for Location..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = "Location Found!";
  }

  const pickImage = async () => {

    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      alert("Camera permission not granted!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
    console.log(result.assets);
  };

  const submitPress = () =>{
    navigation.navigate("AddNewResource",{image: imageUri, location: location} )
  }

  return (
    <View style={styles.container}>
<BackButton/>
      {imageUri && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUri }} style={styles.image} />
        </View>
      )}
      <View >
        <Button title="Take a photo" onPress={pickImage} />
        <Button title="Submit Photo" onPress={submitPress} disabled={!location}/>
      <Text>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-evenly",
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
    contentFit: "contain",
  },
});
