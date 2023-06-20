import React, { useState, useEffect } from "react";
import { Text ,Button, View, StyleSheet } from "react-native";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { Camera, CameraType } from "expo-camera";
import * as Location from 'expo-location';
import BackButton from "../components/BackButton";
import LoadingComponent from "../components/LoadingComponent";

export const ImageCapturePage = ({ navigation }) => {

  const [imageUri, setImageUri] = useState(null);
  const [location, setLocation ] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    (async () => {
      setLoading(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      setLoading(false);
    })();
  }, []);

  const pickImage = async () => {
    setLoading(true);
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      alert("Camera permission not granted!");
      setLoading(false);
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      // base64: true,
      // quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0]);
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }
    setLoading(false);
  };

  const submitPress = () =>{
    navigation.navigate("AddNewResource",{image: imageUri, location: location} )
  }

  if (loading) {
    return <LoadingComponent size='large' color='#0000ff' />;
  }

  return (
    <View style={styles.container}>
      <BackButton/>
      {imageUri && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: imageUri.uri }} style={styles.image} />
        </View>
      )}
      <View >
        <Button title="Take a photo" onPress={pickImage} />
        <Button title="Submit Photo" onPress={submitPress} disabled={location === null}/>
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
