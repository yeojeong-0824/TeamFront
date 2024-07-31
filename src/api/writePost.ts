import axios, { AxiosResponse } from "axios";
import { WriteUpdateType } from "@/types/board";

const writePost = async (data: WriteUpdateType): Promise<AxiosResponse> => {
    const postData = {
      ...data,
      satisfaction: 0,
      country: 'korea',
      city: 'seoul',
    }

    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/board`, postData, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    console.log(response);
    return response.data;
};

export default writePost;