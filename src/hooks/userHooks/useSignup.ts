import signup from "@/api/userApi/signup";
import { useMutation } from "@tanstack/react-query";
import { SignupRequest } from "@/types/userTypes/signup";

const useSignup = () => {
  return useMutation({
    mutationFn:(signupData: SignupRequest)=> signup(signupData),
  });
};

export default useSignup;
