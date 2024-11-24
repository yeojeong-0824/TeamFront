import deleteComment from "@/api/deleteComment";
import { CustomError } from "@/types/error";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const useDelteMutation = (id: number) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (commetId:number)=> deleteComment(commetId),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['comment', id]});
      queryClient.invalidateQueries({queryKey: ['post', id]});
    },
  });

  return mutation;
};

export default useDelteMutation;