"use client";

const ErrorShow = ({ error }: { error: string | undefined }) => {
  return (
    <div className="flex flex-col items-center gap-3 mt-32">
      <p className="text-xl font-bold text-red-500">
        에러가 발생했습니다 다시 시도해주세요
      </p>
      <p className="text-lg text-gray-500">{error}</p>
    </div>
  );
};

export default ErrorShow;
