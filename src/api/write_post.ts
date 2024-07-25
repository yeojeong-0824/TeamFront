import axios, { AxiosResponse } from "axios";
import { write_update_type } from "@/types/board";

const write_post = async (data:write_update_type): Promise<AxiosResponse> => {
    const post_data = {
      ...data,
      satisfaction: 0,
      city: "Seoul",
      country: "Korea",
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