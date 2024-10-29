import axios from "axios";

export const accessCheck = async () => {
  const response = await axios(`${process.env.NEXT_PUBLIC_API_URL}token/access`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    }
  });
  return response;
};

