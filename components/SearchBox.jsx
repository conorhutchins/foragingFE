import { useState } from "react";
import { fetchItems } from "../utils/utils";
import { TextInput, Button, StyleSheet } from "react-native";
import { Formik } from "formik";
import { Picker } from "@react-native-picker/picker";

export const SearchBox = ({ setShowSearch }) => {
  const [sortValue, setSortValue] = useState("location");

  const handleSubmit = (values) => {
    params = {
      params: {
        sort_by: sortValue,
        search: values.searchTerm,
      },
    };
    fetchItems(params);
    setShowSearch(false);
  };

  return (
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
