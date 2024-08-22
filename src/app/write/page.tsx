'use client';

import useWritePost from "@/hooks/useWritePost";
import { WriteUpdateType } from "@/types/board";
import { useState } from "react";
import { useForm } from "react-hook-form";
import PlaceSearch from "../components/PlaceSearch";
import { useRouter } from "next/navigation";

const Write = () => {
  const { register, handleSubmit } = useForm<WriteUpdateType>();
  const writeMutation = useWritePost();
  const [location, setLocation] = useState<string>('');
  const [formattedAddress, setFormattedAddress] = useState<string>('');
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const router = useRouter();

  const onSubmitForm = (data: WriteUpdateType) => {
    if (data.title === '' || data.body === '') return;
    const locationData = {
      ...data,
      locationName: location,
      formattedAddress,
      latitude,
      longitude
    }
    writeMutation.mutate(locationData);
  };

  if (writeMutation.isPending) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-blue-500 text-2xl text-center font-bold">
          Loading...
        </p>
      </div>
    )
  };

  const handleCancel = () => {
    router.back();
  };

  const btnS = 'text-white rounded-sm p-1 hover:bg-opacity-60';

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="flex flex-col gap-3 min-w-[600px] max-h-[800px] border p-3" onSubmit={handleSubmit(onSubmitForm)}>
        <h1 className="text-xl text-blue-500 font-bold">Write Post</h1>
        <PlaceSearch setLocation={setLocation} 
        setFormattedAddress={setFormattedAddress}
        setLatitude={setLatitude}
        setLongitude={setLongitude} />
        <input type="text" placeholder="title" className="p-1 border" {...register('title')} />
        <textarea placeholder="content" className="p-1 border min-h-[300px]" {...register('body')} autoComplete="off" />
        <button className={`${btnS} bg-blue-500`}>submit</button>
        <button className={`${btnS} bg-red-500`} type="button" onClick={handleCancel}>cancel</button>
      </form>
    </div>
  )
}

export default Write;
