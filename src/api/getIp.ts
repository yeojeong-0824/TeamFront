import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const getIp = async () => {
  const response = await axios('https://geolocation-db.com/json/');
  return response.data;
};

export default function useGetIp() {
  return useQuery({
    queryKey: ['getIp'],
    queryFn: getIp,
  });
};