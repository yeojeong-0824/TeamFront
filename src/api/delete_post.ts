import axios from "axios"

const post_delete = async (id: number)=> {
  const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}board/delete/${id}`);
  console.log(response);
  return response.data;
}

export default post_delete;