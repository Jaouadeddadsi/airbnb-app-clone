"use client";

import { useCallback, useMemo, useState } from "react";

import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";
import { useForm } from "react-hook-form";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryBox from "../CategoryBox";
import SelectCountry from "../inputs/SelectCountry";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGE = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

type FormValues = {
  title: string;
  description: string;
  imageSrc: string;
  category: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  locationValue: string;
  price: number;
};

const RentModal = () => {
  const rentModal = useRentModal();
  const [step, setStep] = useState(STEPS.CATEGORY);

  console.log(step);

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }
    return "Next";
  }, [step]);

  const secondaryAction = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [step]);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, [setStep]);

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, [setStep]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      title: "",
      description: "",
      imageSrc: "",
      category: "",
      roomCount: 1,
      guestCount: 1,
      bathroomCount: 1,
      locationValue: "",
      price: 1,
    },
  });

  const setCustomValue = (name: any, value: any) =>
    setValue(name, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });

  const categoryValue = watch("category");

  let bodyContent = (
    <div className="flex flex-col gap-8 mb-8">
      <Heading
        title="Which of these categories best describes your place"
        subtitle="Pick a category"
      />
      <div
        className="
          grid
          grid-cols-2
          gap-4
          max-h-[50vh]
          overflow-auto
          px-2
        "
      >
        {categories.map((category) => (
          <div
            onClick={() => {
              setCustomValue("category", category.label);
            }}
            key={category.label}
            className={`
                p-4
                w-full
                border-2
                rounded-lg
                cursor-pointer
                flex
                justify-start
                ${
                  category.label === categoryValue
                    ? "border-black"
                    : "border-neutral-200"
                }
              `}
          >
            <CategoryBox label={category.label} icon={category.icon} />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8 mb-8">
        <Heading
          title="Whre is your place located?"
          subtitle="Help guests find you"
        />
        <SelectCountry />
      </div>
    );
  }

  return (
    <>
      {rentModal.isOpen && (
        <Modal
          label="Airbnb your home!"
          actionLabel={actionLabel}
          action={onNext}
          onClose={rentModal.onClose}
          isOpen={rentModal.isOpen}
          secondaryActionLabel={secondaryAction}
          secondaryAction={onBack}
          body={bodyContent}
        />
      )}
    </>
  );
};

export default RentModal;
