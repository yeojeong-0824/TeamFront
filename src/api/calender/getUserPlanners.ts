import axios from "axios";

export default async function getUserPlanners() {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}members/authed/planners`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
  return response.data;
}
