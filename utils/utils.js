import axios from "axios";

const foragingAPI = axios.create({
  baseURL: "https://u08cns9a09.execute-api.us-east-1.amazonaws.com",
});

export const fetchItems = (params) => {
  return foragingAPI.get("/api/resources").then((data) => {
    const resources = data.data.spots.Items;
    return resources;
  });
};

export const fetchCommentsByResourceId = (resource_id) => {
  return foragingAPI
    .get(`/api/resources/${resource_id}/comments`)
    .then((data) => {
      const comments = data.data.comments.Items;
      return comments;
    });
};

export const postResource = (formData) => {
  return foragingAPI
    .post("/api/resources", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((response) =>
      console.log(
        response.data,
        "<<<<<<<<<<<<<<<server response POST RESROUCES"
      )
    )
    .catch((error) => console.log(error, "<<<<<<<<<<<<<<<<<<<server error"));
};

export const postComment = (resource_id, formData) => {
  return foragingAPI
    .post(`/api/resources/${resource_id}/comments`, formData)
    .then(() => {
      console.log("Comment posted");
    });
};

export const removeComment = (comment_id) => {
  return foragingAPI.delete(`/api/comments/${comment_id}`).then(() => {
    console.log("Comment deleted");
  });
};
