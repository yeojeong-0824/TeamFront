import axios from "axios";

interface PlannerData {
  title: string;
  subTitle: string;
  personnel: number;
}

export default async function postPlanner(plannerData: PlannerData) {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}planners/authed`,
    plannerData,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
  return response.data;
}
