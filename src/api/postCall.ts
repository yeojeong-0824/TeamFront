import axios from "axios";

const postCall = async (id: number) => {
  const response = await axios(`${process.env.NEXT_PUBLIC_API_URL}/board/${id}`, {
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
}

export default postCall;