'use client';

const ErrorShow = ({error}: {error: any}) => {
  return (
    <div className="flex flex-col gap-3 items-center mt-32">
      <p className="text-red-500 text-2xl font-bold">
        에러가 발생했습니다
      </p>
      <p className="text-gray-500 text-lg">
        {error}
      </p>
      <button className="ml-2 text-blue-500 font-bold hover:text-blue-600" 
        onClick={() => window.location.reload()}>
          새로고침
      </button>
    </div>
  )
};

export default ErrorShow;