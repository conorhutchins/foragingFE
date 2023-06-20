import { Formik, Form, Field, ErrorMessage } from "formik";
import { Image } from "expo-image";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Slider from "@react-native-community/slider";
import { postResource } from "../utils/utils";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import BackButton from "../components/BackButton";

export const AddNewResource = ({ route }) => {
  const [submitError, setSubmitError] = useState(null);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const abundanceValues = ["depleted", "low", "medium", "high", "abundant"];
  const { image, location } = route.params;

  const { user: username } = useContext(UserContext);

  const handleBlur = (field, values) => {
    setTouched((touched) => ({ ...touched, [field]: true }));
    if (!values[field]) {
      setErrors((errors) => ({
        ...errors,
        [field]: "This is a required field",
      }));
    } else {
      setErrors((errors) => ({ ...errors, [field]: null }));
    }
  };

  const handleSlidersBlur = (field, values) => {
    setTouched((touched) => ({ ...touched, [field]: true }));
    if (values[field] === 0) {
      setErrors((errors) => ({
        ...errors,
        [field]: "Please provide a rating",
      }));
    } else {
      setErrors((errors) => ({ ...errors, [field]: null }));
    }
  };

  const handleSubmit = ({
    resource_name,
    description,
    condition,
    depletion,
  }) => {
    console.log(image.uri);
    const formData = new FormData();
    formData.append("image", {
      uri: image.uri,
      type: "image/jpeg",
      name: "appImage.jpeg",
    });
    formData.append("resource_name", resource_name);
    formData.append("description", description);
    formData.append("condition", condition);
    formData.append("depletion", depletion);
    formData.append("username", username);
    formData.append("latitude", location.coords.latitude);
    formData.append("longitude", location.coords.longitude);
    formData.append("created_at", new Date(location.timestamp).toUTCString());
    postResource(formData).catch(() => {
      setSubmitError(
        "Sorry resource was not submitted, please restart the app and try again!"
      );
    });
  };

  // const validateValues = (values) => {
  //   const errors = {};
  //   if (!values.resource_name || !values.description) {
  //     errors.resource_name = "This is a required field";
  //   }
  //   return errors;
  // };

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
            condition: 0,
            depletion: 0,
          }}
          onSubmit={handleSubmit}
          // validate={validateValues}
        >
          {({ handleChange, handleSubmit, values, setFieldValue }) => (
            <>
              {touched.resource_name && errors.resource_name && (
                <Text style={styles.error}>{errors.resource_name}</Text>
              )}
              <Text>Name of Forageable resource</Text>
              <TextInput
                style={styles.input}
                placeholder="Name"
                onChangeText={handleChange("resource_name")}
                value={values.resource_name}
                onBlur={() => handleBlur("resource_name", values)}
              />
              {touched.description && errors.description && (
                <Text style={styles.error}>{errors.description}</Text>
              )}
              <Text>Notes about the Forageable resource</Text>
              <TextInput
                style={styles.notes_input}
                placeholder="Notes"
                onChangeText={handleChange("description")}
                value={values.description}
                onBlur={() => handleBlur("description", values)}
              />
              {touched.condition && errors.condition && (
                <Text style={styles.error}>{errors.condition}</Text>
              )}
              <Text>Quality: {values.condition}%</Text>
              <Slider
                style={styles.slider}
                value={values.condition}
                minimumValue={0}
                maximumValue={100}
                onValueChange={(value) => {
                  setFieldValue("condition", value);
                }}
                // onSlidingComplete={()=> handleSlidersBlur("condition", values)}
                step={1}
              />
              {touched.depletion && errors.depletion && (
                <Text style={styles.error}>{errors.depletion}</Text>
              )}
              <Text>Abundance: {abundanceValues[values.depletion]}</Text>
              <Slider
                style={styles.slider}
                value={values.depletion}
                minimumValue={0}
                maximumValue={4}
                onValueChange={(value) => {
                  setFieldValue("depletion", value);
                }}
                // onSlidingComplete={()=> handleSlidersBlur("depletion", values)}
                step={1}
              />
              {submitError && <Text style={styles.error}>{submitError}</Text>}
              <Button
                onPress={handleSubmit}
                title="Submit"
                disabled={!values.resource_name || !values.description}
              />
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
    color: "#f44336",
  },
});
