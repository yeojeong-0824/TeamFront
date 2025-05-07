import { SyncLoader } from "react-spinners";

const LoadingSpinner = ({
  size,
  isLoading,
}: {
  size: number;
  isLoading: boolean;
}) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <SyncLoader color="#3E6690" size={size} loading={isLoading} />
    </div>
  );
};

export default LoadingSpinner;
