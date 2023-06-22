import { useState, useContext } from "react";
import { fetchItems } from "../utils/utils";
import {
  TextInput,
  Text,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import { Picker } from "@react-native-picker/picker";
import { ResourcesContext } from "../contexts/ResourcesContext";

export const SearchBox = ({ setShowSearch, userLocation }) => {
  const [sortValue, setSortValue] = useState("location");
  const { setDisplayedResources } = useContext(ResourcesContext);

  const handleSubmit = (values) => {
    const params = {
      userLocation,
      sort_by: sortValue,
      search: values.searchTerm,
    };

    fetchItems(params).then((items) => {
      setDisplayedResources(items);
    });
    setShowSearch(false);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0} // Adjust this offset if needed
    >
      <Formik initialValues={{ searchTerm: "" }} onSubmit={handleSubmit}>
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Search"
              onChangeText={handleChange("searchTerm")}
              // onBlur={handleBlur('username')}
              value={values.searchTerm}
            />
            <Picker
              selectedValue={sortValue}
              onValueChange={(itemValue) => setSortValue(itemValue)}
            >
              <Picker.Item label="Location" value="location" />
              <Picker.Item label="Most recent" value="created_at" />
            </Picker>
            <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit}
              >
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
          </>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 25,
    width: "67%",
    alignSelf: "center",
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.4,
    elevation: 2,
  },
  buttonText: {
    color: "#492c03",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  }
});
