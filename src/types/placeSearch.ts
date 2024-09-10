export type PlaceSearchType = React.FC<{
  setLocalData: {
    setLocation: React.Dispatch<React.SetStateAction<string>>;
    setFormattedAddress: React.Dispatch<React.SetStateAction<string>>;
    setLatitude: React.Dispatch<React.SetStateAction<number>>;
    setLongitude: React.Dispatch<React.SetStateAction<number>>;
  }
  updateData: {
    avgScore: number;
    body: string;
    commentCount: number;
    formattedAddress: string;
    id: number;
    latitude: number;
    locationName: string;
    longitude: number;
    title: string;
    view: number;
  };
}>;

export interface PlaceResult {
  name?: string;
  formatted_address?: string;
  geometry?: {
    location?: {
      lat: () => number;
      lng: () => number;
    };
  };
};

