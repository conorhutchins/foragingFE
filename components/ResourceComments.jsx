import React, { useContext, useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  TextInput,
  StyleSheet,
  Button,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { fetchCommentsByResourceId, postComment } from "../utils/utils";
import { Formik } from "formik";
import { UserContext } from "../contexts/UserContext";
import LoadingComponent from "../components/LoadingComponent";

export default function ResourceComments({ resource_id }) {
  const [comments, setComments] = useState(null);
  const { user } = useContext(UserContext);
  const [submitError, setSubmitError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchCommentsByResourceId(resource_id)
      .then((comments) => {
        setComments(comments);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.comment}>
        <Text style={styles.commentText}>{item.username}</Text>
        <Text style={styles.commentBody}>{item.comment_body}</Text>
        <Text style={styles.commentDate}>{item.created_at}</Text>
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

  if (loading) {
    return <LoadingComponent />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Sorry, there was an error loading the comments</Text>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        style={styles.inputContainer}
      >
        <Formik initialValues={{ commentBody: "" }} onSubmit={handleSubmit}>
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <>
              <TextInput
                style={styles.input}
                placeholder="Comment..."
                onChangeText={handleChange("commentBody")}
                value={values.commentBody}
              />
              <Button onPress={handleSubmit} title="Submit" disabled={values.commentBody === ""} />
            </>
          )}
        </Formik>
        {submitError && <Text>{submitError}</Text>}
      </KeyboardAvoidingView>
      <FlatList
        data={comments}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  comment: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  commentText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  commentBody: {
    fontSize: 14,
    marginBottom: 5,
  },
  commentDate: {
    fontSize: 12,
    color: "#888",
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "white",
  },
});
