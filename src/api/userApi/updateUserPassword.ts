import { UpdateUserPassword } from "@/types/userTypes/updateInfo";
import axios from "axios";

const updateUserPassword = async (updatePasswordData: UpdateUserPassword) => {
  console.log(updatePasswordData)
  const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}members/authed/password`, updatePasswordData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    }
  });
  return response.data;
};

export default updateUserPassword;