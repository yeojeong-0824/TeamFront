import axios from "axios";
import { WriteUpdateType } from "@/types/board";

const updatePost = async (data: WriteUpdateType, id: number) => {
  const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/board/update/${id}`, 
    {
      ...data,
      satisfaction: 0,
      country: 'korea',
      city: 'seoul',
    },
    {
      headers: {
        'Content-Type': 'application/json',
      }
    }
  );
  return response.data;
}

export default updatePost;