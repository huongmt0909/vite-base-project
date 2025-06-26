import Label from "../../atoms/Label";
import Input from "../../atoms/Input";
import type { InputHTMLAttributes } from "react";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import { regex } from "../../../constants/regex";

interface FormFieldProps {
  label: string;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  required?: boolean;
  isEmail?: boolean;
  isPassword?: boolean;
  minLength?: number;
  maxLength?: number;
  name: string;
  specialRules?: any;
}

const FormField = ({ label, inputProps, required, isEmail, isPassword, minLength, maxLength, name, specialRules }: FormFieldProps) => {
  const { t } = useTranslation("components");
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const getRules = () => {
    let rules: any = {};

    if (required) {
      rules.required = t("formField.required", { field: label });
    }

    if (isEmail) {
      rules.pattern = {
        value: regex.email,
        message: t("formField.email", { field: label }),
      };
    }

    if (isPassword) {
      rules.pattern = {
        value: regex.password,
        message: t("formField.password", { field: label }),
      };
    }

    if (minLength) {
      rules.minLength = {
        value: minLength,
        message: t("formField.minLength", { field: label }),
      };
    }

    if (maxLength) {
      rules.maxLength = {
        value: maxLength,
        message: t("formField.maxLength", { field: label }),
      };
    }

    if (specialRules) {
      rules = { ...rules, ...specialRules };
    }
    return rules;
  };
  return (
    <div>
      <Label>{label}</Label>
      <Input {...inputProps} {...register(name, getRules())} />
      {errors?.[name] && <div>{errors[name]?.message as string}</div>}
    </div>
  );
};

export default FormField;
