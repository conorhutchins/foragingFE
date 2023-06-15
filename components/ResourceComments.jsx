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
  const [submitError, setSubmitError] = useState(false);

  useEffect(() => {
    fetchCommentsByResourceId(resource_id).then((comments) => {
      setComments(comments);
    });
  }, []);
  const renderItem = ({ item }) => {
    return (
      <View style={styles.comment}>
        <Text>{item.username}</Text>
        <Text>{item.body}</Text>
        <Text>{item.created_at}</Text>
      </View>
    );
  };

  const handleSubmit = (values) => {
    const optimisticComment = {
      body: values.commentBody,
      username: user,
      created_at: Date(),
    };
    setComments((currentComments) => {
      return [optimisticComment, ...currentComments];
    });
    postComment(resource_id, values.commentBody, user).catch(() => {
      setComments((currentComments) => {
        const temporaryComments = [...currentComments];
        temporaryComments.shift();
        setSubmitError(
          "Sorry, comment not submitted. /n Please check your connection,  and/or refresh your app and try again!"
        );
        return temporaryComments;
      });
    });
  };

  return (
    <View style={styles.container}>
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
      {submitError && <Text>{submitError}</Text>}
      <FlatList
        data={comments}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        vertical
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "95%",
    height: 400,
    margin: 10,
  },
  comment: {
    flexDirection: "column",
    width: "95%",
    height: 400,
    backgroundColor: "lightgray",
    margin: 10,
    borderRadius: 20,
    padding: 15,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});
