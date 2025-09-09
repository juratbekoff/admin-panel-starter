import { customToast } from "@/lib/utils";
import { useMutation } from "react-query";
import { QueryKeys } from "./queryKeys";
import { api } from "@/api";

export const useAdmin = () => {
  const loginAdmin = useMutation({
    mutationKey: [QueryKeys.AUTH],
    mutationFn: (data: any) => {
      return api.post("/admin/login", data);
    },
    onError(error: any) {
      console.log(error);
      customToast(
        "ERROR",
        error?.response?.data?.message ||
          "Something went wrong, please try again!"
      );
    },
  });

  return {
    loginAdmin,
  };
};
