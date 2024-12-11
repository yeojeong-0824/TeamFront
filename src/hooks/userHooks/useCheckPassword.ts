import { checkPassword } from "@/api/userApi/checkPassword";
import { CheckOldPassword } from "@/types/userTypes/updateInfo";
import { useMutation } from "@tanstack/react-query";

const useCheckPassword = () => {
  return useMutation({
    mutationFn:(password: CheckOldPassword)=> checkPassword(password),
  });
};

export default useCheckPassword;
