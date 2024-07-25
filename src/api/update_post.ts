import axios from "axios";
import { write_update_type } from "@/types/board";

const update_post = async (data: write_update_type, id: number) => {
  const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}board/update/${id}`, 
    {
      ...data,
      satisfaction: 0,
      country: 'KR',
      city: 'Seoul',
    },
  );
  return response.data;
}

export default update_post;