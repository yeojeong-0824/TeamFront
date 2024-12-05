import useCheckPassword from "@/hooks/userHooks/useCheckPassword";
import { ErrorMessage } from "@hookform/error-message";
import { Input, Button } from "@nextui-org/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { passwordV } from "../validationRules";
import { CheckOldPassword } from "@/types/userTypes/updateInfo";
import { useRouter } from "next/navigation";
import { FiArrowRight } from "react-icons/fi";

const CheckPasswordModal = ({ checkKey, setCheckKey }: { checkKey: string; setCheckKey: (data: string) => void;}) => {
  const router = useRouter();

  const { mutate, isPending } = useCheckPassword();
  const [oldPassword, setOldPassword] = useState("");

  const {register, handleSubmit, formState: { errors }, getValues, trigger, setValue,} = useForm<CheckOldPassword>({
    mode: "onChange", // 입력 값이 변경될 때마다 유효성 검사
    reValidateMode: "onChange", // 입력 값이 변경될 때마다 유효성 검사
  });
  
  if (checkKey) return null;

  const oldPasswordData: CheckOldPassword = {
    password: oldPassword,
  };

  const checkPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!oldPasswordData.password) return;
    mutate(oldPasswordData, {
      onSuccess: (response) => {
        setCheckKey(response.key);
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

  const errorStyle = "text-sm text-red-500 font-semibold";
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <div className="mb-4">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl sm:text-2xl text-gray-800 font-semibold">비밀번호 확인</h3>
            <FiArrowRight className="w-6 h-6 ml-2" onClick={() => router.back()}/>
          </div>
          <form onSubmit={ checkPassword } className="flex flex-col gap-5 mt-5">
            {/* 비밀번호 입력&에러메세지 */}
            <Input
              type="password"
              variant="underlined"
              label="비밀번호"
              {...register("password", {
                ...passwordV,
                onChange: (e) => setOldPassword(e.target.value),
              })}
            />
            <ErrorMessage
              errors={errors}
              name="password"
              render={({ message }) => <p className={errorStyle}>{message}</p>}
            />
            <Button color="primary" variant="bordered" type="submit">
              비밀번호 확인
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckPasswordModal;
