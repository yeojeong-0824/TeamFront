import axios, { AxiosResponse } from "axios";
import { write_type } from "@/types/board";

const write_post = async (data:write_type): Promise<AxiosResponse> => {
    const post_data = {
      ...data,
      memberName: 'kor8240',
      satisfaction: 0,
    }

    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}board`, post_data, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    console.log(response);
    return response.data;
}

export default write_post;