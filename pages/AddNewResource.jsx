import { Formik } from "formik";
import { Image } from "expo-image";
import { View, StyleSheet, Text, TextInput, Button } from "react-native";
import Slider from "@react-native-community/slider";

export const AddNewResource = () => {
  const handleSubmit = () => {};
  const abundanceValues = ["depleted", "low", "medium", "high", "abundant"];

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text>Add new resource</Text>
      </View>
      <View style={styles.imageContainer}>
        <Text>Image goes here</Text>
      </View>
      <View style={styles.formContainer}>
        <Formik
          initialValues={{
            resourceName: "",
            resourceNotes: "",
            qualityValue: 50,
            abundanceValue: 3,
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
              <TextInput
                style={styles.input}
                placeholder="Name"
                onChangeText={handleChange("resourceName")}
                value={values.resourceName}
              />
              <TextInput
                style={styles.input}
                placeholder="Notes"
                onChangeText={handleChange("resourceNotes")}
                value={values.resourceNotes}
              />
              <Text>Quality: {values.qualityValue}%</Text>
              <Slider
                style={styles.slider}
                value={values.qualityValue}
                minimumValue={0}
                maximumValue={100}
                onValueChange={(value) => {
                  setFieldValue("qualityValue", value);
                }}
                step={1}
              />
              <Text>Abundance: {abundanceValues[values.abundanceValue]}</Text>
              <Slider
                style={styles.slider}
                value={values.abundanceValue}
                minimumValue={0}
                maximumValue={4}
                onValueChange={(value) => {
                  setFieldValue("abundanceValue", value);
                }}
                step={1}
              />
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
    height: "50%",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  slider: { width: 200, height: 40 },
});
