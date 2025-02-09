import axios from "axios";

export default async function postImages(image: Blob) {
  const formData = new FormData();
  formData.append("image", image);

  const response = axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}boards/authed/images`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem("accessToken"),
      },
      withCredentials: true,
    }
  );
  return response;
}
