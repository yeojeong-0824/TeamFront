import updateUserPassword from "@/api/userApi/updateUserPassword";
import { UpdateUserPassword } from "@/types/userTypes/updateInfo";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";

const useUpdateUserPassword = () => {
  return useMutation({
    mutationFn:(updatePasswordData: UpdateUserPassword)=> updateUserPassword(updatePasswordData),
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "비밀번호 수정 실패",
        text: "비밀번호 값을 확인해주세요.",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });
};

export default useUpdateUserPassword;
