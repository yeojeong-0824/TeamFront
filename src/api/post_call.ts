import axios from "axios";

const post_call = async (id: number) => {
  const response = await axios(`http://34.47.116.238/board/${id}`, {
    headers: { 
      'Content-Type': 'application/json',
    }
  });
  console.log(response);
  return response.data;
}

export default post_call;