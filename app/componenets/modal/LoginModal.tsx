"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import useRegisterModal from "@/app/hooks/useRegisterModal";

import useLoginModal from "@/app/hooks/userLoginModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Button from "../Button";

type FormValues = {
  email: string;
  password: string;
};

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const LoginModal = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setIsLoading(true);
    try {
      const { email, password } = data;
      signIn("credentials", { email, password });
      toast.success("Logged In");
      reset();
      loginModal.onClose();
    } catch (error) {
      toast.error("Something went wrong! try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div className="mb-8 flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account" />
      <Input
        id="email"
        label="Email"
        register={register}
        errors={errors}
        required
        disabled={isLoading}
      />
      <Input
        id="password"
        label="Password"
        type="password"
        register={register}
        errors={errors}
        required
        disabled={isLoading}
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4">
      <Button
        actionLabel="Continue with Google"
        action={() => {}}
        icon={FcGoogle}
        outline
      />
      <Button
        actionLabel="Continue with Github"
        action={() => {}}
        icon={FaGithub}
        outline
      />
      <div className="text-neutral-500 text-center mt-4">
        Don't have an account?
        <span
          onClick={() => {
            loginModal.onClose()
            registerModal.onOpen()
          }}
          className="
              text-black
              cursor-pointer
              inline-block
              ps-2
            "
        >
          register
        </span>
      </div>
    </div>
  );

  return (
    <>
      {loginModal.isOpen && (
        <Modal
          label="Login"
          actionLabel="Continue"
          action={handleSubmit(onSubmit)}
          onClose={loginModal.onClose}
          body={bodyContent}
          footer={footerContent}
          isOpen={loginModal.isOpen}
        />
      )}
    </>
  );
};

export default LoginModal;
