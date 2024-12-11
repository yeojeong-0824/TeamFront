import CheckMyActivityBoardWrapper from './boards/page';
import CheckMyActivityCommentWrapper from './comments/page';

function CheckMyActivity() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-1 min-h-[1300px]">
      <div className="p-10 mt-10 sm:p-20 bg-white text-left shadow-md rounded-lg w-1/2">
        <CheckMyActivityBoardWrapper/>
      </div>
    </div>
  )
}

export default CheckMyActivity