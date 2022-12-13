import { catchError, getToken } from "../utils/helper";
import client from "./client";

export const addImage = (url) => {
  const token = getToken();
  try {
    return fetch(`/api/users/addImage/6396a61241a1852015174838`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(url),
    });
  } catch (err) {
    return catchError(err);
  }
};
