'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import LoadingSpinner from './Loading';

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
}> = ({ setLocation, setFormattedAddress, setLatitude, setLongitude }) => {
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
    }
  };

  if (selectedPlace) {
    setLocation(selectedPlace?.name || 'N/A');
    setFormattedAddress(selectedPlace?.formatted_address || 'N/A');
    setLatitude(selectedPlace?.geometry?.location?.lat() || 0);
    setLongitude(selectedPlace?.geometry?.location?.lng() || 0);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handlePlaceCancel = () => {
    setSelectedPlace(null);
    setInputValue('');
    setLocation('');
    setFormattedAddress('');
    setLatitude(0);
    setLongitude(0);
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <LoadingSpinner size={10}/>;

  return (
    <div className='flex flex-col gap-3'>
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="지역을 입력하세요"
        className='border p-1 w-full'
      />
      {selectedPlace && (
        <div className='flex flex-col gap-1 border p-3'>
          <h3>선택된 지역 정보</h3>
          <p>이름: {selectedPlace.name || 'N/A'}</p>
          <p>주소: {selectedPlace.formatted_address || 'N/A'}</p>
          <p>위도: {selectedPlace.geometry?.location?.lat() || 'N/A'}</p>
          <p>경도: {selectedPlace.geometry?.location?.lng() || 'N/A'}</p>
          <button className='bg-red-500 p-1 text-white rounded-sm hover:bg-opacity-60' onClick={handlePlaceCancel} type='button'>지역 선택 취소하기</button>
        </div>
      )}
    </div>
  );
};

export default PlaceSearch;