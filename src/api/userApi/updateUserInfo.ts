import { UpdateUserInfo } from "@/types/userTypes/updateInfo";
import axios from "axios";

const updateUserInfo = async (updateData: UpdateUserInfo) => {
  const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}members/authed`, updateData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    }
  });
  return response.data;
};

export default updateUserInfo;