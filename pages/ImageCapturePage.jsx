import React, { useState, useEffect } from "react";
import { Text ,Button, View, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { Camera, CameraType } from "expo-camera";
import * as Location from 'expo-location';
import BackButton from "../components/BackButton";
import LoadingComponent from "../components/LoadingComponent";
import Logo from "../components/Logo";

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

  const submitPress = () => {
    if (location === null) {
      alert("Please allow location services");
      return;
    }
    navigation.navigate("AddNewResource", { image: imageUri, location: location })
    
  }

  
  const buttonStyling = location 
  ? styles.buttonText
  : styles.disabledButtonText;


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
        
      <TouchableOpacity
                  style={styles.button}
                  onPress={pickImage}
                >
                  <Text style={styles.buttonText}>Take a photo</Text>
        </TouchableOpacity>
        <TouchableOpacity
                  style={styles.button}
            onPress={submitPress}
              disabled={location === null}
          
                >
                  <Text style={buttonStyling}>Submit</Text>
                </TouchableOpacity>


        {/* <Button title="Take a photo" onPress={pickImage} /> 
        <Button title="Submit Photo" onPress={submitPress} disabled={location === null}/> */}
      </View>
      <View style={styles.logo}>
          <Image
            source={require("../assets/logo.png")}
            style={{ width: 300, height: 300, alignSelf: "center" }}
          />

</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    flex: 1,
    backgroundColor: "#fff68f",
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
  button: {
    backgroundColor: "#fff68f",
    padding: 8,
    borderRadius: 25,
    width: "67%",
    alignSelf: "center",
  },
  buttonText: {
    color: "#492c03",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  disabledButtonText: {
      color: "grey",
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
    },
});
