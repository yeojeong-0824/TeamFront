import { ChangeEvent } from "react";
import { FieldValues, Validate } from "react-hook-form";

export interface ISellForm {
  id: string;
  label?: string;
  type: string;
  inputType?: "text" | "password";
  required?: string;
  placeholder?: string;
  pattern?: {
    value: RegExp;
    message: string;
  };
  validate?:
    | Validate<any, FieldValues>
    | Record<string, Validate<any, FieldValues>>;
  selectItems?: {
    name: string;
    id: number;
    image?: string;
    disabled?: boolean;
  }[];
  selectWithoutId?: string[];
  tels?: {
    id: number;
    country: string;
    tel: string;
    image: string;
  }[];
  rightText?: string;
  secondInput?: ISellFormInput;
  step?: number;
  endpoint?: string;
  category?: string;
  choiceItem?: {
    name: string;
    id: number;
  }[];
  rightButton?: boolean;
  isSplit?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  disabled?: boolean;
  title?: string;
  isPassword?: boolean;
  readOnly?: boolean;
  isLoading?: boolean;
}

export interface ISellFormInput {
  label?: string;
  type: string;
  id: string;
  required?: string;
  rightText?: string;
  placeholder?: string;
  selectItems?: {
    name: string;
    id: number;
  }[];
  secondInput?: ISellFormInput;
  selectWithoutId?: string[];
  endpoint?: string;
  isSplit?: boolean;
  disabled?: boolean;
}
