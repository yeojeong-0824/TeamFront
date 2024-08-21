'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';

const libraries: ["places"] = ["places"];

interface PlaceResult {
  name?: string;
  formatted_address?: string;
  geometry?: {
    location?: {
      lat: () => number;
      lng: () => number;
    };
  };
}

const PlaceSearch: React.FC<{
  setLocation: (location: string) => void;
  setFormattedAddress: (address: string) => void;
  setLatitude: (latitude: number) => void;
  setLongitude: (longitude: number) => void;
}> = ({setLocation, setFormattedAddress, setLatitude, setLongitude}) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string,
    libraries,
  });

  const [inputValue, setInputValue] = useState<string>('');
  const [selectedPlace, setSelectedPlace] = useState<PlaceResult | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isLoaded && !loadError && inputRef.current) {
      autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current, {
        types: ['(regions)'],
        fields: ['name', 'formatted_address', 'geometry'],
      });

      autocompleteRef.current.addListener('place_changed', handlePlaceSelect);
    }
  }, [isLoaded, loadError]);

  const handlePlaceSelect = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      setSelectedPlace(place as PlaceResult);
      console.log('Selected Place:', place);
    }
  };

  if(selectedPlace) {
          setLocation(selectedPlace?.name || 'N/A');
      setFormattedAddress(selectedPlace?.formatted_address || 'N/A');
      setLatitude(selectedPlace?.geometry?.location?.lat() || 0);
      setLongitude(selectedPlace?.geometry?.location?.lng() || 0);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handlePlaceSelect();
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="지역을 입력하세요"
        />
        <button type="submit">검색</button>
      </form>
      {selectedPlace && (
        <div>
          <h3>선택된 지역 정보:</h3>
          <p>이름: {selectedPlace.name || 'N/A'}</p>
          <p>주소: {selectedPlace.formatted_address || 'N/A'}</p>
          <p>위도: {selectedPlace.geometry?.location?.lat() || 'N/A'}</p>
          <p>경도: {selectedPlace.geometry?.location?.lng() || 'N/A'}</p>
        </div>
      )}
    </div>
  );
};

export default PlaceSearch;