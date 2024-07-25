import axios from "axios";

const post_call = async (id: number) => {
  const response = await axios(`${process.env.NEXT_PUBLIC_API_URL}board/${id}`, {
    headers: { 
      'Content-Type': 'application/json',
    }
  });
  console.log(response);
  return response.data;
}

export default post_call;