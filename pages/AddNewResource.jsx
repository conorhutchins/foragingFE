import { Formik } from "formik";
import { Image } from "expo-image";
import { View, StyleSheet, Text, TextInput, Button } from "react-native";
import Slider from "@react-native-community/slider";
import { postResource } from "../utils/utils";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import BackButton from "../components/BackButton";

export const AddNewResource = ({ route }) => {
  const [submitError, setSubmitError] = useState(null)

  const abundanceValues = ["depleted", "low", "medium", "high", "abundant"];
  const {image, location} = route.params

  const{user: username} = useContext(UserContext)
  



  const handleSubmit = ({resource_name,
    description,
    condition,
    depletion}) => {

    const body = { 
      resource_name,
      description,
      condition,
      depletion,
      username,
      location:{
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      },
      image,
      created_at: new Date(location.timestamp).toUTCString()


    }


  
    postResource(body).catch(()=>{
      setSubmitError("Sorry resource was not submitted, please restart the app and try again!")

    })
  };


  return (
    <View style={styles.container}>
      <BackButton />
      <View style={styles.title}>
        <Text>Add new resource</Text>
      </View>
      <View style={styles.imageContainer}>
      <Image source={{ uri: image }} style={styles.image} />
      </View>
      <View style={styles.formContainer}>
        <Formik
          initialValues={{
            resource_name: "",
            description: "",
            condition: 50,
            depletion: 3,
          }}
          onSubmit={handleSubmit}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            setFieldValue,
          }) => (
            <>
            <Text>Name of Forageable resource</Text>
              <TextInput
                style={styles.input}
                placeholder="Name"
                onChangeText={handleChange("resource_name")}
                value={values.resource_name}
              />
              <Text>Notes about Forageable resource?</Text>
              <TextInput
                style={styles.notes_input}
                placeholder="Notes"
                onChangeText={handleChange("description")}
                value={values.description}
              />
              <Text>Quality: {values.condition}%</Text>
              <Slider
                style={styles.slider}
                value={values.condition}
                minimumValue={0}
                maximumValue={100}
                onValueChange={(value) => {
                  setFieldValue("condition", value);
                }}
                step={1}
              />
              <Text>Abundance: {abundanceValues[values.depletion]}</Text>
              <Slider
                style={styles.slider}
                value={values.depletion}
                minimumValue={0}
                maximumValue={4}
                onValueChange={(value) => {
                  setFieldValue("depletion", value);
                }}
                step={1}
              />
              {submitError && <Text style={styles.error} >{submitError}</Text>}
              <Button onPress={handleSubmit} title="Submit" />
            </>
          )}
        </Formik>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  notes_input: {
    height: 200,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  title: {
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    marginTop: 30,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  formContainer: {
    flex: 1,
  },
  imageContainer: {
    margin: 30,
    height: "30%",
    backgroundColor: "#fff",
  },
  slider: { width: 200, height: 40 },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor: "#0553",
    contentFit: "contain",
  },
  error: {
color: '#f44336'
  }
});
