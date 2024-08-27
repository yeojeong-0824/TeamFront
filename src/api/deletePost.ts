import axios from "axios";

const deletePost = async (id: number)=> {
const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/board/authed/delete/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    }
  });
  return response.data;
}

export default deletePost;