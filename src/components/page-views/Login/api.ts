import { useBaseMutation } from "../../../services/query/useBaseMutation";
import { API_URL } from "../../../constants/api";
import ApiBase from "../../../services/api-base";
import type { LoginRequest } from "../../../types/auth";
import { ROUTER_PATHS } from "../../../constants/router-paths";
import { useNavigate } from "react-router-dom";

const baseApi = new ApiBase();

const loginApi = async (data: LoginRequest) => {
  const response = await baseApi.post(API_URL.login, data);
  return response.data;
};

export const useLogin = () => {
  const navigate = useNavigate();
  return useBaseMutation(
    async (data: LoginRequest) => {
      return await loginApi(data);
    },
    {
      onSuccess: () => {
        navigate(ROUTER_PATHS.home);
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
};
