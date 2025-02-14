import axios from "axios";

const filterPlanner = async (start: number, end: number) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}members/authed/locations?start=${start}&end=${end}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
  return response.data;
};

export default filterPlanner;
