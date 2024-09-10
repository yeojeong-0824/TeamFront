'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import LoadingSpinner from './Loading';
import ErrorShow from './Error';
import { PlaceSearchType, PlaceResult } from '@/types/placeSearch';

const libraries: ["places"] = ["places"];

const PlaceSearch: PlaceSearchType = ({ setLocalData = { setLocation: () => { }, setFormattedAddress: () => { }, setLatitude: () => { }, setLongitude: () => { } }, updateData }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string,
    libraries,
  });

  const [inputValue, setInputValue] = useState<string>('');
  const [selectedPlace, setSelectedPlace] = useState<PlaceResult | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { setLocation, setFormattedAddress, setLatitude, setLongitude } = setLocalData;
  const [placeClear, setPlaceClear] = useState<boolean>(false);

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

    if (updateData.formattedAddress !== '') {
      setInputValue(updateData.formattedAddress);
      setLocation(updateData.locationName);
      setFormattedAddress(updateData.formattedAddress);
      setLatitude(updateData.latitude);
      setLongitude(updateData.longitude);
    } else {
      setInputValue('');
      setLocation('');
      setFormattedAddress('');
      setLatitude(0);
      setLongitude(0);
    }
  };

  const handlePlaceClear = () => {
    setPlaceClear(true);
    setSelectedPlace(null);
    setInputValue('');
    setLocation('');
    setFormattedAddress('');
    setLatitude(0);
    setLongitude(0);
  };

  return (
    <>
      <LoadingSpinner size={10} isLoading={!isLoaded} />
      {loadError && <ErrorShow error='지도를 불러오는데 실패했습니다.' />}
      <div className='flex flex-col gap-3'>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="지역을 입력해주세요."
          className='w-full p-1.5 sm:p-2 border rounded-md text-sm sm:text-base'
          id='local-search'
        />
        {selectedPlace ? (
          <div className='flex flex-col gap-1 p-2'>
            <h3>선택된 지역 정보</h3>
            <p className='text-sm sm:text-medium'>이름: {selectedPlace.name || 'N/A'}</p>
            <p className='text-sm sm:text-medium'>주소: {selectedPlace.formatted_address || 'N/A'}</p>
            <div className='flex justify-end'>
              <button className='p-1 px-3 sm:p-2 sm:px-6 border text-gray-900 hover:bg-gray-100 rounded-lg text-sm sm:text-medium' onClick={handlePlaceCancel} type='button'>지역 선택 취소하기</button>
            </div>
          </div>
        ) : (
          <div className={`flex flex-col gap-1 p-2 ${!updateData?.formattedAddress || placeClear ? 'hidden' : 'block'}`}>
            <h3>기존 게시글 지역 정보</h3>
            <p className='text-sm sm:text-medium'>이름: {updateData?.locationName || 'N/A'}</p>
            <p className='text-sm sm:text-medium'>주소: {updateData?.formattedAddress || 'N/A'}</p>
            <div className='flex justify-end'>
              <button className='p-1 px-3 sm:p-2 sm:px-6 border text-gray-900 hover:bg-gray-100 rounded-lg text-sm sm:text-medium' onClick={handlePlaceClear} type='button'>기존 게시글 지역 삭제</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PlaceSearch;