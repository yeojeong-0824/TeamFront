import axios from "axios";
import { SignupRequest } from "@/types/userTypes/signup";

const signup = async (signupData: SignupRequest) => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}members`, signupData);
  return response.data;
};

export default signup;