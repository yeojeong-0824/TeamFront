"use client";

import { useState } from "react";
import CheckPasswordModal from "../components/CheckPasswordModal";
import { Button } from "@nextui-org/react";
import useDeleteUser from "@/hooks/userHooks/useDeleteUser";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export default function DeleteUserCall() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [checkKey, setCheckKey] = useState(false);

  const { mutate, isPending } = useDeleteUser();

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(undefined, {
      onSuccess: () => {
        localStorage.removeItem("accessToken");
        queryClient.resetQueries({ queryKey: ["accessCheck"] });
        router.back();
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-1">
      <div>
        <CheckPasswordModal setCheckKey={setCheckKey} />
      </div>
      <div className="p-10 mt-10 sm:p-20 bg-white text-center shadow-md rounded-lg w-1/4">
        <h2 className="text-2xl font-semibold text-gray-800 mt-2">계정 삭제</h2>
        <p className="text-gray-600 mt-1">계정 삭제를 계속 진행하시겠습니까?</p>
        <form onSubmit={submit} className="flex flex-col gap-5 mt-5">
          <Button color="primary" variant="bordered" type="submit">
            계정 삭제
          </Button>
        </form>
      </div>
    </div>
  );
}
