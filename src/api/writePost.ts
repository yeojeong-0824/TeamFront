import axios, { AxiosResponse } from "axios";
import { WriteUpdateType } from "@/types/board";

const writePost = async (data: WriteUpdateType): Promise<AxiosResponse> => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/board/authed`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      }
    });
    console.log(response);
    console.log(data);
    return response.data;
};

export default writePost;