import React, { useContext, useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  dateFormatter,
  fetchCommentsByResourceId,
  postComment,
  removeComment,
} from "../utils/utils";
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
  }, [resource_id]);

  const deleteComment = (comment_id) => {
    removeComment(comment_id).catch((err) => {});
  };

  const renderItem = ({ item }) => {
    // console.log(item)
    return (
      <View style={styles.comment}>
        <Text style={styles.commentText}>User: {item.username}</Text>
        <Text style={styles.comment_body}>Comment: {item.comment_body}</Text>
        <Text style={styles.commentDate}>
          Date commented: {dateFormatter(item.created_at)}s
        </Text>
        {user === item.username && (
          <TouchableOpacity
            onPress={() => deleteComment(item.comment_id)}
            style={styles.deleteButton}
          >
            <Text style={styles.deleteButtonText}>Delete comment</Text>
          </TouchableOpacity>
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
      username: user,
    };

    postComment(resource_id, formData).catch(() => {
      setComments((currentComments) => {
        const temporaryComments = [...currentComments];
        temporaryComments.shift();
        setSubmitError(
          "Sorry, comment not submitted.\nPlease check your connection and/or refresh your app and try again!"
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
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        style={styles.inputContainer}
      >
        <Formik initialValues={{ comment_body: "" }} onSubmit={handleSubmit}>
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <>
              <TextInput
                style={styles.input}
                placeholder="Add your comment..."
                onChangeText={handleChange("comment_body")}
                value={values.comment_body}
              />
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
                disabled={values.comment_body === ""}
              >
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
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
    backgroundColor: "#9f3c41",
  },
  comment: {
    width: "100%",
    alignSelf: "center",
    alignContent: "center",
    backgroundColor: "#36d346",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  commentText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    alignSelf: "center",
  },
  comment_body: {
    fontSize: 14,
    marginBottom: 5,
    alignSelf: "center",
  },
  commentDate: {
    fontSize: 12,
    alignSelf: "center",
  },
  deleteButton: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  deleteButtonText: {
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
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
  submitButton: {
    alignSelf: "center",
    width: "75%",
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 10,
  },
  submitButtonText: {
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
  },
});
