'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { ParamsId } from "@/types/post";
import { WriteUpdateType } from "@/types/board";
import usePost from "@/hooks/usePost";
import useUpdatePost from "@/hooks/useUpdatePost";
import PlaceSearch from "@/app/components/PlaceSearch";

const Update = ({ params }: { params: ParamsId }) => {
  const router = useRouter();
  const { id } = params;
  const { data } = usePost(id);
  const [location, setLocation] = useState<string>("");
  const [formattedAddress, setFormattedAddress] = useState<string>("");
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const updateMutation = useUpdatePost(id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { defaultValues },
  } = useForm<WriteUpdateType>({
    defaultValues: {
      title: "",
      body: "",
    },
  });

  useEffect(() => {
    reset({
      title: data?.title,
      body: data?.body,
    });
  }, [data, reset]);

  const onSubmitForm = (data: WriteUpdateType) => {
    if (
      data.title === defaultValues?.title &&
      data.body === defaultValues?.body  
    ) {
      Swal.fire({
      icon: "warning",
      title: "게시글에 변경사항이 없습니다",
      showConfirmButton: false,
      timer: 1000,
      });
      return;
    }
    const locationData = {
      ...data,
      locationName: location,
      formattedAddress,
      latitude,
      longitude,
    };
    updateMutation.mutate(locationData);
  };

  const onInvalid = (errors: any) => {
    Swal.fire({
      icon: "error",
      title: "Failed to update post",
      text: errors.title?.message || errors.body?.message,
    });
  };

  const handleCancel = () => router.back();

  return (
    <div className="p-2">
      <form
        className="flex flex-col gap-3 justify-between max-w-[800px] min-h-[400px] mx-auto mt-40 border p-3"
        onSubmit={handleSubmit(onSubmitForm, onInvalid)}
      >
        <PlaceSearch
          setLocation={setLocation}
          setFormattedAddress={setFormattedAddress}
          setLatitude={setLatitude}
          setLongitude={setLongitude}
        />
        <input
          type="text"
          placeholder="title"
          className="border p-3 text-2xl"
          {...register("title", {
            required: "Please enter a title",
            maxLength: { value: 20, message: "Title must be 20 characters or less" },
          })}
        />
        <textarea
          placeholder="content"
          className="flex-grow p-3 border min-h-[300px]"
          {...register("body", {
            required: "Please enter the content",
          })}
          autoComplete="off"
        />
        <button className="text-white bg-blue-500 rounded-sm p-1">Update</button>
        <button
          type="button"
          className="text-white bg-red-500 rounded-sm p-1"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default Update;