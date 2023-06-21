import { useState, useContext, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, KeyboardAvoidingView, TouchableOpacity, Image } from "react-native";
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
    <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // Adjust this offset if needed
  >
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Nourish & Gather</Text>
        </View>
        <Image source={require('../assets/logo.png')} style={{ width: 250, height: 250, alignSelf: 'center', marginTop: 100, marginBottom: 50}} />
      <View style={styles.warning}>
      <Text style={styles.label}>Some things to note from the Devs</Text>
      <Text style={styles.subLabel}>- Do not use this app to find food -</Text>
      <Text style={styles.subLabel}>- Do not travel to the places listed -</Text>
      <Text style={styles.subLabel}>- Do not eat any food you find when you don't travel there -</Text>
      </View>
      <Text style={styles.usernameLabel}>Choose your username</Text>
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
            <TouchableOpacity style={styles.button}>
           <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
      </View>
      </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  title: {
    position: 'absolute',
    top: 100,
    alignSelf: 'center',
  },
  titleText: {
    textAlign: 'center',
    fontSize: 45,
    fontWeight: "bold",
    color: '#fff68f',
    

  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor:"#35bb42",
  },
  label: {
    marginBottom: 8,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
    color: '#492c03',
  },
  subLabel: {
    marginBottom: 8,
    textAlign: 'center',
    fontSize: 13,
    color: '#492c03',
  },
  usernameLabel: {
    marginBottom: 8,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 22,
    color: '#492c03',
  },
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 100,
    paddingHorizontal: 8,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 15,
    textAlign: 'center',
    marginTop: 10,
    width: "67%",
    alignSelf: 'center', // Align the button horizontally in the center
    justifyContent: 'center', // Align the button vertically in the cente
  },
  warning: {
    marginBottom: 20,
  },

  button: {
    backgroundColor: '#fff68f',
    padding: 8,
    borderRadius: 25,
    width: "67%",
    alignSelf: 'center', // Align the button horizontally in the center
    justifyContent: 'center', // Align the button vertically in the center
  },
  buttonText: {
    color: '#492c03',
    fontSize: 20, // Change this value to adjust the font size
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

