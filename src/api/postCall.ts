import axios from "axios";

const postCall = async (id: number) => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/board/${id}`, {
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    }
  });
  return response.data;
}

export default postCall;