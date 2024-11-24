import axios from "axios";

const sendEmail = async (email: string) => {
  const response = await axios(`${process.env.NEXT_PUBLIC_API_URL}members/emailAuthed/${email}`);
  return response.data;
};

export default sendEmail;