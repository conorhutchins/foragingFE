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
import { fetchCommentsByResourceId, postComment, removeComment } from "../utils/utils";
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

  const deleteComment = (comment_id) => {
    removeComment(comment_id).catch((err) => {
      // console.log(err)
    })
  }

  const renderItem = ({ item }) => {
    // console.log(item)
    return (
      <View style={styles.comment}>
        <Text style={styles.commentText}>User: {item.username}</Text>
        <Text style={styles.comment_body}>Comment: {item.comment_body}</Text>
        <Text style={styles.commentDate}>Date commented: {item.created_at}</Text>
        {user === item.username && (
        <Button
            onPress={() => deleteComment(item.comment_id)}
            title={"Delete comment"} 
            />
        )}
      </View>
    );
  };

  const handleSubmit = (values) => {
    const optimisticComment = {
      comment_body: values.comment_body,
      username: user,
      created_at: Date(),
    };
    setComments((currentComments) => {
      return [optimisticComment, ...currentComments];
    });

    const formData = {
      resource_id: resource_id,
      comment_body: values.comment_body,
      username: user
    }
    // formData.append("resource_id", resource_id);
    // formData.append("comment_body", values.comment_body);
    // formData.append("username", user);

    postComment(resource_id, formData).catch(() => {
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
  // console.log(comments, "<<<<<< COMMENTS")
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        style={styles.inputContainer}
      >
        <Formik initialValues={{ comment_body: "" }} onSubmit={handleSubmit}>
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <>
              <TextInput
                style={styles.input}
                placeholder="Comment..."
                onChangeText={handleChange("comment_body")}
                value={values.comment_body}
              />
              <Button
                onPress={handleSubmit}
                title="Submit"
                disabled={values.comment_body === ""}
              />
            </>
          )}
        </Formik>
        {submitError && <Text>{submitError}</Text>}
      </KeyboardAvoidingView>
        <FlatList
          data={comments}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        >
        </FlatList>
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
  comment_body: {
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
