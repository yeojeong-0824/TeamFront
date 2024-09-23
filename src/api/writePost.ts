import axios, { AxiosResponse } from "axios";
import { WriteUpdateType } from "@/types/board";

const writePost = async (data: WriteUpdateType): Promise<AxiosResponse> => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}boards/authed`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      }
    });
    return response.data;
};

export default writePost;