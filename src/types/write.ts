export type SetLocalData = {
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  setFormattedAddress: React.Dispatch<React.SetStateAction<string>>;
  setLatitude: React.Dispatch<React.SetStateAction<number>>;
  setLongitude: React.Dispatch<React.SetStateAction<number>>;
};