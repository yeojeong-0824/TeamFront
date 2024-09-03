'use client';

const ErrorShow = ({error}: {error: string | undefined}) => {
  return (
    <div className="flex flex-col items-center gap-3 mt-32">
      <p className="text-2xl font-bold text-red-500">
        에러가 발생했습니다
      </p>
      <p className="text-lg text-gray-500">
        {error}
      </p>
      <button className="ml-2 font-bold text-blue-500 hover:text-blue-600" 
        onClick={() => window.location.reload()}>
          새로고침
      </button>
    </div>
  )
};

export default ErrorShow;