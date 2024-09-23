import axios from "axios";
import { WriteUpdateType } from "@/types/board";

const updatePost = async (data: WriteUpdateType, id: number) => {
  const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}boards/authed/${id}`, 
    data,
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      }
    }
  );
  return response.data;
}

export default updatePost;