import React, { useContext, useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  TextInput,
  StyleSheet,
  Button,
} from "react-native";
import { fetchCommentsByResourceId, postComment } from "../utils/utils";
import { Formik } from "formik";
import { UserContext } from "../contexts/UserContext";

export default function ResourceComments({ resource_id }) {
  const [comments, setComments] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const comments = fetchCommentsByResourceId(resource_id);
    setComments(comments);
  }, []);
  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          width: 200,
          height: 200,
          backgroundColor: "lightgray",
          margin: 10,
        }}
      >
        <Text>{item.username}</Text>
        <Text>{item.body}</Text>
        <Text>{item.created_at}</Text>
      </View>
    );
  };

  const handleSubmit = (values) => {
    postComment(resource_id, values.commentBody, user);
  };

  return (
    <View>
      <Formik initialValues={{ commentBody: "" }} onSubmit={handleSubmit}>
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Comment..."
              onChangeText={handleChange("commentBody")}
              // onBlur={handleBlur('username')}
              value={values.commentBody}
            />
            <Button onPress={handleSubmit} title="Submit" />
          </>
        )}
      </Formik>
      <FlatList
        data={comments}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});
