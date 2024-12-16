import updateUserInfo from "@/api/userApi/updateUserInfo";
import { UpdateUserInfo } from "@/types/userTypes/updateInfo";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";

const useUpdateUserInfo = () => {
  return useMutation({
    mutationFn:(updateData: UpdateUserInfo) => updateUserInfo(updateData),
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "회원정보 수정 실패",
        text: "입력 값을 확인해주세요.",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });
};

export default useUpdateUserInfo;
