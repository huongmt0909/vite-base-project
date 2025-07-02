import { useTranslation } from "react-i18next";
import FormField from "../../molecules/FormField";
import { FormProvider, useForm } from "react-hook-form";
import Button from "../../atoms/Button";
import { useLogin } from "./api";
import type { LoginRequest } from "../../../types/auth";

const LoginPageView = () => {
  const { t } = useTranslation("auth");
  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const { mutate: login, isPending } = useLogin();

  const onSubmit = (data: LoginRequest) => {
    login({
      email: data.email,
      password: data.password,
    });
  };
  return (
    <div>
      <h1>{t("login")}</h1>

      <FormProvider {...methods}>
        <form>
          <FormField label={t("email")} required name="email" />
          <FormField label={t("password")} name="password" />
          <Button type="button" onClick={methods.handleSubmit(onSubmit)} disabled={isPending}>
            {t("login")}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default LoginPageView;
