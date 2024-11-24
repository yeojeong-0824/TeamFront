import axios from "axios";

const postCall = async (id: number) => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}boards/${id}`, {
    headers: { 
      'Content-Type': 'application/json',
    }
  });
  return response.data;
}

export default postCall;