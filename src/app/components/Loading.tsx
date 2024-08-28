import { SyncLoader } from "react-spinners";

const LoadingSpinner = ({size, mt}: {size:number, mt?:number}) => {
  return (
    <div className={`flex justify-center mt-${mt}`}>
      <SyncLoader color="#3E6690" size={size}/>
    </div>
  );
};

export default LoadingSpinner;