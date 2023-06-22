import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image,
} from "react-native";
import Slider from "@react-native-community/slider";
import { postResource } from "../utils/utils";
import { UserContext } from "../contexts/UserContext";
import { ResourcesContext } from "../contexts/ResourcesContext";
import BackButton from "../components/BackButton";
import { fetchItems } from "../utils/utils";
import { Formik } from "formik";

export const AddNewResource = ({ route, navigation }) => {
  const [submitError, setSubmitError] = useState(null);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const { setDisplayedResources } = useContext(ResourcesContext);

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
    postResource(formData)
      .then(() => {
        return fetchItems();
      })
      .then((Items) => {
        setDisplayedResources(Items);
        navigation.navigate("MapPage");
      })
      .catch(() => {
        setSubmitError(
          "Sorry resource was not submitted, please restart the app and try again!"
        );
      });
  };

  return (
    <View style={styles.container}>
      <BackButton />
      <View style={styles.title}>
        <Text>Add new resource</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image.uri }} style={styles.image} />
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
        >
          {({ handleChange, handleSubmit, values, setFieldValue }) => (
            <>
              {touched.resource_name && errors.resource_name && (
                <Text style={styles.error}>{errors.resource_name}</Text>
              )}
              <Text style={styles.inputLabel}>Name of Forageable resource</Text>
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
              <Text style={styles.inputLabel}>Notes about the Forageable resource</Text>
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
              <Text style={styles.inputLabel}>Quality: {values.condition}%</Text>
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
              {touched.depletion && errors.depletion && (
                <Text style={styles.error}>{errors.depletion}</Text>
              )}
              <Text style={styles.inputLabel}>Abundance: {abundanceValues[values.depletion]}</Text>
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
              {submitError && <Text style={styles.error}>{submitError}</Text>}
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
                disabled={!values.resource_name || !values.description}
              >
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
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
    backgroundColor: "#36d346",
  },
  input: {
    height: 50,
    borderColor: "#9f3c41",
    borderWidth: 2,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: "#ebf1ff",
    textAlign: "center", // Center align the text horizontally
  },
  notes_input: {
    height: 100,
    borderColor: "gray",
    backgroundColor: "#ebf1ff",
    borderColor: "#9f3c41",
    borderWidth: 2,
    marginBottom: 16,
    paddingHorizontal: 8,
    textAlignVertical: "top", // Align the text at the top
    textAlign: "center", // Center align the text horizontally
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
  slider: { width: 200, height: "15%", marginBottom: 16, alignSelf: "center" },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor: "#36d346",
    contentFit: "contain",
  },
  error: {
    color: "#f44336",
  },
  submitButton: {
    backgroundColor: "#fff68f",
    padding: 8,
    borderRadius: 25,
    alignSelf: "center",
    width: "67%",
    marginBottom: 16,
  },
  buttonText: {
    color: "#492c03",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  inputLabel: {
    textAlign: "center",
    marginBottom: 8,
    fontWeight: "bold",
  },
});
