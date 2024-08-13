import axios, { AxiosResponse } from "axios";
import { WriteUpdateType } from "@/types/board";

const writePost = async (data: WriteUpdateType): Promise<AxiosResponse> => {
    const postData = {
      ...data,
      satisfaction: 0,
      locationName: 'korea',
      formattedAddress: 'seoul',
      latitude: 37.5665,
      longitude: 126.978,
    }

    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/board/authed`, postData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      }
    });
    return response.data;
};

export default writePost;