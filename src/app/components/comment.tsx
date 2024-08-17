'use client';

const Comment = ({boardId}: {boardId: number}) => {
  
  return (
    <div className="flex flex-col mx-auto max-w-[800px] p-3 border">
      <div className="flex flex-col gap-1">
        <textarea className="max-w-[800px] min-h-[80px] border p-2" 
        placeholder="댓글을 작성해보세요" 
        />
        <div className="flex gap-1 justify-end">
          <button className="text-blue-500 p-1">작성</button>
          <button className="text-red-500 p-1">취소</button>
        </div>
      </div>

      <div>
        <div className="flex flex-col gap-1 border p-2 mt-5">
          <h3 className="font-bold">nickname</h3>
          <p>comment</p>
          <div className="flex gap-1 justify-end">
            <button className="text-blue-500 p-1">수정</button>
            <button className="text-red-500 p-1">삭제</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comment;