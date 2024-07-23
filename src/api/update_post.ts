import axios, { AxiosResponse } from "axios";
import { write_type } from "@/types/board";

const update_post = async (data: write_type, id: number): Promise<AxiosResponse> => {
  const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}board/update/${id}`, 
    {...data, satisfaction: 0},
  );
  return response.data;
}

export default update_post;