import { CheckOldPassword } from "@/types/userTypes/updateInfo";
import axios from "axios";

export const checkPassword = async (password: CheckOldPassword) => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}members/authed/checkPassword`, password, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    }
  });
  return response.data;
};

