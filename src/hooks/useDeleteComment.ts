import deleteComment from "@/api/deleteComment";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

const useDelteMutation = (id: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (commetId: number) => deleteComment(commetId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comment", id] });
      queryClient.invalidateQueries({ queryKey: ["post", id] });
      queryClient.invalidateQueries({ queryKey: ["refetchComments", id] });
    },
  });

  return mutation;
};

export default useDelteMutation;
