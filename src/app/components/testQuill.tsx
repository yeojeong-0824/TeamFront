"use client";

import React, { forwardRef, ForwardedRef } from "react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import ReactQuill from "react-quill";
import LoadingSpinner from "./Loading";
import {
  Control,
  Controller,
  FieldValues,
  UseFormWatch,
} from "react-hook-form";
import { ISellForm } from "@/types/ISellForm";

interface ForwardedQuillComponent extends ReactQuillProps {
  forwardedRef: React.Ref<ReactQuill>;
}

const QuillNoSSRWrapper = dynamic(
  async () => {
    const { default: QuillComponent } = await import("react-quill");
    const Quill = ({ forwardedRef, ...props }: ForwardedQuillComponent) => (
      <Controller
        name={props.item.id}
        control={props.control}
        rules={{ required: props.item.required }}
        render={({ field }) => {
          return (
            <QuillComponent
              ref={forwardedRef}
              {...props}
              onChange={field.onChange}
              value={props.watch(props.item.id) || ""}
              className={props.className}
            />
          );
        }}
      />
    );
    return Quill;
  },
  { loading: () => <LoadingSpinner size={15} mt={400} isLoading />, ssr: false }
);

interface ReactQuillProps {
  className?: string;
  modules?: any;
  placeholder: string;
  control: Control<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  item: ISellForm;
}

export default QuillNoSSRWrapper;
