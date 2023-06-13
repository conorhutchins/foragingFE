import { useState, useContext, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { UserContext } from "../contexts/UserContext";
import { Formik } from "formik";

export default function Welcome({ navigation }) {
  const { user, setUser } = useContext(UserContext);

  const handleSubmit = (values) => {
    setUser(values.username);
    navigation.navigate("MapPage");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        By entering your username you agreeing to not use this app to find food,
        not to travel to the places listed and not to eat any food you find when
        you don't travel there! By order of the Devs
      </Text>
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
            <Button onPress={handleSubmit} title="Submit" />
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
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});
