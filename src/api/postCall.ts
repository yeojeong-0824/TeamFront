import axios from "axios";

const postCall = async (id: number) => {
  const response = await axios(`${process.env.NEXT_PUBLIC_API_URL}/board/${id}`, {
    headers: { 
      'Content-Type': 'application/json',
      // 해당 부분 수정했습니다
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    }
  });
  return response.data;
}

export default postCall;