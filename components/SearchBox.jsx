import { useState, useContext } from "react";
import { fetchItems } from "../utils/utils";
import { TextInput, Button, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { Formik } from "formik";
import { Picker } from "@react-native-picker/picker";
import { ResourcesContext } from "../contexts/ResourcesContext";

export const SearchBox = ({ setShowSearch }) => {
  const [sortValue, setSortValue] = useState("location");
  const { setDisplayedResources } = useContext(ResourcesContext);

  const handleSubmit = (values) => {
    params = {
      params: {
        sort_by: sortValue,
        search: values.searchTerm,
      },
    };
    fetchItems(params).then((items) => {
      setDisplayedResources(items);
    });
    setShowSearch(false);
  };

  return (
    <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // Adjust this offset if needed
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
          <Button onPress={handleSubmit} title="Submit" />
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
});
