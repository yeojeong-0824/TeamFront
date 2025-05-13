import useCheckPassword from "@/hooks/userHooks/useCheckPassword";
import { ErrorMessage } from "@hookform/error-message";
import { Input, Button } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { passwordV } from "../validationRules";
import { CheckOldPassword } from "@/types/userTypes/updateInfo";
import { useRouter } from "next/navigation";
import { FiArrowRight } from "react-icons/fi";

const CheckPasswordModal = ({
  setCheckKey,
}: {
  setCheckKey: (data: boolean) => void;
}) => {
  const router = useRouter();
  const { mutate, isPending } = useCheckPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckOldPassword>({
    mode: "onChange", // 입력 값이 변경될 때마다 유효성 검사
    reValidateMode: "onChange", // 입력 값이 변경될 때마다 유효성 검사
  });

  const checkPassword = (password: { password: string }) => {
    if (!password) return;

    mutate(password, {
      onSuccess: () => {
        setCheckKey(true);
      },
    });
  };

  const errorStyle = "text-sm text-red-500 font-semibold";
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <div className="mb-4">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl sm:text-2xl text-gray-800 font-semibold">
              비밀번호 확인
            </h3>
            <FiArrowRight
              className="w-6 h-6 ml-2 hover:opacity-75 cursor-pointer"
              onClick={() => router.back()}
            />
          </div>
          <form
            onSubmit={handleSubmit(checkPassword)}
            className="flex flex-col gap-5 mt-5"
          >
            {/* 비밀번호 입력&에러메세지 */}
            <Input
              type="password"
              variant="underlined"
              label="비밀번호"
              {...register("password", passwordV)}
            />
            <ErrorMessage
              errors={errors}
              name="password"
              render={({ message }) => <p className={errorStyle}>{message}</p>}
            />
            <Button
              color="primary"
              variant="bordered"
              type="submit"
              isLoading={isPending}
            >
              비밀번호 확인
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckPasswordModal;
