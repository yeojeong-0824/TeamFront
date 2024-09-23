import axios from "axios";

type EmailConfirmData = {
  email: string;
  key: string;
};

const emailConfirm = async (emailData: EmailConfirmData) => {
  const {email, key} = emailData;

  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}members/emailAuthed/${email}`, {
    key
  });
  return response.data;
};

export default emailConfirm;