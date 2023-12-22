import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Components/AuthProvider";
import useAxios from "./useAxios";

const useUser = () => {
  const axiosInstance = useAxios();
  const { user: cUser } = useContext(AuthContext);
  const {
    data: user,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [cUser?.email, "user"],
    queryFn: async ({ queryKey }) => {
      const responce = await axiosInstance.get(
        `/get-user?email=${queryKey[0]}`
      );
      return responce.data;
    },
    enabled: cUser?.email ? true : false,
  });
  return { user, isLoading, refetch };
};

export default useUser;
