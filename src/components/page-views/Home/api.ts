import { reactQueryKey } from "../../../constants";
import { API_URL } from "../../../constants/api";
import ApiBase from "../../../services/api-base";
import { useBaseQuery } from "../../../services/query/useBaseQuery";

const baseApi = new ApiBase();

const getBoughtSellingApi = async () => {
  const response = await baseApi.get(API_URL.boughtSelling);
  return response.data;
};

export const useGetBoughSelling = () => {
  return useBaseQuery([reactQueryKey.boughtSelling], getBoughtSellingApi, undefined);
};
