import { SyncLoader } from "react-spinners";

const LoadingSpinner = ({
  size,
  mt,
  isLoading,
}: {
  size: number;
  mt?: number;
  isLoading: boolean;
}) => {
  if (!isLoading) return null;

  return (
    <div
      className={"hidden sm:flex justify-center"}
      style={{ marginTop: `${mt}px` }}
    >
      <SyncLoader color="#3E6690" size={size} loading={isLoading} />
    </div>
  );
};

export default LoadingSpinner;
