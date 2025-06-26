import { redirect } from "react-router-dom";
import { ROUTER_PATHS } from "../constants/router-paths";
import { storage } from "../utils/storage";

export const authLoader = () => {
  const headers = storage.getHeaders();
  if (!headers) return redirect(ROUTER_PATHS.login);
  return null;
};
