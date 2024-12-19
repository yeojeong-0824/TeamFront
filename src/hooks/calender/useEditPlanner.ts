import editPlanner from "@/api/calender/editPlanner";
import { useMutation } from "@tanstack/react-query";

interface EditData {
  title: string;
  subTitle: string;
  personnel: number;
}

export default function useEditPlanner(id: number) {
  return useMutation({
    mutationFn: (data: EditData) => editPlanner(data, id),
  });
}
