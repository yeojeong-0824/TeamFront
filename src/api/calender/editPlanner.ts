import axios from "axios";

interface EditData {
  title: string;
  subTitle: string;
  personnel: number;
}

export default async function aditPlanner(data: EditData, id: number) {
  const response = await axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}planners/authed/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
  return response.data;
}
