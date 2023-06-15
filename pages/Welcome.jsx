import { useState, useContext, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { UserContext } from "../contexts/UserContext";
import { Formik } from "formik";

export default function Welcome({ navigation }) {
  
  const { user, setUser } = useContext(UserContext);

  const handleSubmit = (values) => {
    if (values.username.trim() === "") {
      Alert.alert("Invalid Input", "Username cannot be empty");
      return;
    }
    setUser(values.username);
    navigation.navigate("MapPage");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Some things to note from the Devs</Text>
      <Text style={styles.subLabel}>- Do not use this app to find food.</Text>
      <Text style={styles.subLabel}>- Do not travel to the places listed.</Text>
      <Text style={styles.subLabel}>- Do not eat any food you find when you don't travel there.</Text>
  
      <Text style={styles.label}>Please enter your username:</Text>
      <Formik initialValues={{ username: "" }} onSubmit={handleSubmit}>
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Enter your username"
              onChangeText={handleChange("username")}
              // onBlur={handleBlur('username')}
              value={values.username}
            />
            <View style={styles.button}>
              <Button color="white" onPress={handleSubmit} title="Submit" />
            </View>
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  label: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
  subLabel: {
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  button: {
    backgroundColor: "#007BFF",
    borderRadius: 5,
  }
});
