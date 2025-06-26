import { redirect } from "react-router-dom";
import { ROUTER_PATHS } from "../constants/router-paths";
import { storage } from "../utils/storage";

export const publicLoader = () => {
  const headers = storage.getHeaders();
  if (headers) return redirect(ROUTER_PATHS.home);
  return null;
};
