import updateUserPassword from "@/api/userApi/updateUserPassword";
import { UpdateUserPassword } from "@/types/userTypes/updateInfo";
import { useMutation } from "@tanstack/react-query";

const useUpdateUserPassword = () => {
  return useMutation({
    mutationFn:(updatePasswordData: UpdateUserPassword)=> updateUserPassword(updatePasswordData),
  });
};

export default useUpdateUserPassword;
