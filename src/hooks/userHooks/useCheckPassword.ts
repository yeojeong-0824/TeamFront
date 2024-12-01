import { checkPassword } from "@/api/userApi/checkPassword";
import { useMutation } from "@tanstack/react-query";

type CheckPassword = {
  password: string;
};

const useCheckPassword = () => {
  return useMutation({
    mutationFn:(password: CheckPassword)=> checkPassword(password),
  });
};

export default useCheckPassword;
