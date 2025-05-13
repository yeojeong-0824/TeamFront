import deleteUser from "@/api/userApi/deleteUser";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";

export default function useDeleteUser() {
  return useMutation({
    mutationFn:() => deleteUser(),
    onSuccess: () => {
      Swal.fire({
          icon: "success",
          title: "삭제 성공",
          text: "계정 삭제가 성공하였습니다.",
          showConfirmButton: false,
          timer: 1500,
      });
    },
    onError:(error: any)=> {
      Swal.fire({
        icon: 'error',
        title: '삭제 실패',
        text: '잠시후 다시 시도해주세요.'
      });
    }
  })
};