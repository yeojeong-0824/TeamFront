import axios from "axios";

const deleteUser = async () => {
  const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}members/authed`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    }
  });
  return response.data;
};

export default deleteUser;