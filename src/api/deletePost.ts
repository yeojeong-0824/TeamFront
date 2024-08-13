import axios from "axios";

const deletePost = async (id: number)=> {
  const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/board/delete/${id}`, {
    headers: {
      "Content-Type": "application/json",
    }
  });
  console.log(response);
  return response.data;
}

export default deletePost;