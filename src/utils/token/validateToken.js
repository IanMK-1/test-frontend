import jwt_decode from "jwt-decode";
import { getToken } from "./getToken";

export function checkTokenValidity() {
  let token = getToken();
  if (token) {
    let decodedToken = jwt_decode(token);
    let currentDate = new Date();
    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
}
