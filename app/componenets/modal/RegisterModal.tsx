"use client";

import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Button from "../Button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const schema = yup.object({
  email: yup.string().email().required(),
  name: yup.string().required(),
  password: yup.string().required(),
});

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const [isLoading, setIsloading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  // back to it
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsloading(true);
    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("Account created successfuly");
        reset();
      })
      .catch(() => {
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setIsloading(false);
      });
  };

  const bodyContent = (
    <div className="mb-8 flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create an account!" />
      <Input
        id="email"
        label="Email"
        register={register}
        errors={errors}
        required
        disabled={isLoading}
      />
      <Input
        id="name"
        label="Name"
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
        Alread have an account?
        <span
          className="
              text-black
              cursor-pointer
              inline-block
              ps-2
            "
        >
          Login
        </span>
      </div>
    </div>
  );

  return (
    <>
      {registerModal.isOpen && (
        <Modal
          label="Register"
          actionLabel="Continue"
          action={handleSubmit(onSubmit)}
          onClose={registerModal.onClose}
          body={bodyContent}
          footer={footerContent}
          isOpen={registerModal.isOpen}
        />
      )}
    </>
  );
};

export default RegisterModal;
