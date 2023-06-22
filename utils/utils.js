import axios from "axios";
import { getDistance } from "geolib";

const foragingAPI = axios.create({
  baseURL: "https://u08cns9a09.execute-api.us-east-1.amazonaws.com",
});

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const distance = getDistance(
    { latitude: lat1, longitude: lon1 },
    { latitude: lat2, longitude: lon2 }
  );

  return (distance / 1000).toFixed(2);
};

export const fetchItems = (params) => {
  console.log(params?.sort_by);
  return foragingAPI.get("/api/resources").then((data) => {
    const resources = data.data.spots.Items;
    let filteredResources = [...resources];

    if (params?.search) {
      const searchQuery = params.search.toLowerCase();
      filteredResources = resources.filter((resource) => {
        const resourceName = resource.resource_name.toLowerCase();
        return resourceName.includes(searchQuery);
      });
    }

    if (params?.sort_by === "location") {
      const { latitude, longitude } = params.userLocation;

      filteredResources = filteredResources.map((resource) => {
        const coords = resource.location.split(",");
        const lat = Number(coords[0]);
        const long = Number(coords[1]);
        const distance = calculateDistance(latitude, longitude, lat, long);
        return { ...resource, distance };
      });

      filteredResources.sort((a, b) => a.distance - b.distance);
    } else if (params?.sort_by === "created_at") {
      filteredResources.sort((a, b) => a.created_at - b.created_at);
    }

    return filteredResources;
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

export const dateFormatter = (date) => {
  const newDate = new Date(+date);
  const options = { timeStyle: "short", dateStyle: "short" };
  const formattedDate = newDate.toLocaleString("en-GB", options);
  return formattedDate;
};
