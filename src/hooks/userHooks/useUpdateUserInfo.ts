import updateUserInfo from "@/api/userApi/updateUserInfo";
import { UpdateUserInfo } from "@/types/userTypes/updateInfo";
import { useMutation } from "@tanstack/react-query";

const useUpdateUserInfo = () => {
  return useMutation({
    mutationFn:(updateData: UpdateUserInfo)=> updateUserInfo(updateData),
  });
};

export default useUpdateUserInfo;
