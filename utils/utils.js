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

export const postComment = (resource_id, body, username) => {
  const newComment = {
    resource_id,
    body,
    username,
  };

  console.log(newComment);
};

export const postResource = (body) => {
if(body){
  return Promise.resolve(console.log(body))

}else {
  return Promise.reject()
}

}
