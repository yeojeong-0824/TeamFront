import { checkPassword } from "@/api/userApi/checkPassword";
import { CheckOldPassword } from "@/types/userTypes/updateInfo";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";

const useCheckPassword = () => {
  return useMutation({
    mutationFn:(password: CheckOldPassword)=> checkPassword(password),
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "비밀번호 확인 성공",
        text: "회원 정보 수정을 진행해주세요.",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "비밀번호 확인 실패",
        text: "비밀번호가 일치하지 않습니다.",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });
};

export default useCheckPassword;
