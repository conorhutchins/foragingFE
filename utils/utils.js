import axios from "axios";

const foragingAPI = axios.create({
  baseURL: "https://vgk9m0b765.execute-api.eu-west-1.amazonaws.com"
});


export const fetchItems = (params) => {
  return foragingAPI.get("/api/resources").then((data) => {
    const resources = data.data.spots.Items;
    return resources;
    
  })
};

export const fetchCommentsByResourceId = (resource_id) => {
  console.log(resource_id);
  return foragingAPI.get(`/api/resources/${resource_id}/comments`)
    .then((data) => {
  const comments = data.data.comments.Items;
      return comments;
    })
};

export const postResource = (formData) => {
  console.log("request made");
  // console.log(formData, "<<<<<<<<< form data");
  return foragingAPI
      .post("/api/resources", formData, {
          headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) =>
          console.log(response.data, "<<<<<<<<<<<<<<<server response")
      )
      .catch((error) =>
          console.log(error, "<<<<<<<<<<<<<<<<<<<server error")
      );
};

