import { getToken } from "./getToken";
import jwt_decode from "jwt-decode";

export function getUserInfo() {
  const token = getToken();
  let userObj = {};

  if (token) {
    let decodedToken = jwt_decode(token);
    userObj["id"] = decodedToken.user_id;
    userObj["username"] = decodedToken.username;
    let groups = decodedToken.groups;
    
    let roles = {};
    if (groups?.length > 0) {
      groups?.forEach((role) => {
        roles = { ...roles, [role.name]: true };
      });
    }
    userObj["roles"] = roles;

    return userObj;
  }
  return userObj;
}
