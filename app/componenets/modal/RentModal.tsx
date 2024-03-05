"use client";

import dynamic from "next/dynamic";
import { useCallback, useMemo, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";

import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";
import { useForm } from "react-hook-form";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryBox from "../CategoryBox";
import SelectCountry from "../inputs/SelectCountry";
import useCountries from "@/app/hooks/useCountries";
import Counter from "../inputs/Counter";
import { LuImagePlus } from "react-icons/lu";
import Image from "next/image";

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
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);

  const rentModal = useRentModal();
  const { getByValue } = useCountries();

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
  const locationValue = watch("locationValue");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

  const onChangeLocationValue = (value: string | undefined) => {
    if (value) {
      setCustomValue("locationValue", value);
    }
  };

  const latlong = useMemo(() => {
    return getByValue(locationValue)?.latlng;
  }, [locationValue]);

  const Map = useMemo(
    () =>
      dynamic(() => import("@/app/componenets/Map"), {
        ssr: false,
      }),
    [latlong]
  );

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
        <SelectCountry
          locationValue={locationValue}
          onChange={onChangeLocationValue}
          disabled={isLoading}
        />
        <div>
          <Map center={latlong} />
        </div>
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8 mb-8">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenities do you have?"
        />
        <Counter
          title="Guests"
          subtitle="How many guests do you allow?"
          value={guestCount}
          onChange={(guests) => {
            setCustomValue("guestCount", guests);
          }}
        />
        <hr />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you have?"
          value={roomCount}
          onChange={(rooms) => {
            setCustomValue("roomCount", rooms);
          }}
        />
        <hr />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
          value={bathroomCount}
          onChange={(bathrooms) => {
            setCustomValue("bathroomCount", bathrooms);
          }}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGE) {
    bodyContent = (
      <div className="flex flex-col gap-8 mb-8">
        <Heading
          title="Add a photo of your place?"
          subtitle="Show guests what your place looks like!"
        />
        <CldUploadWidget
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRSET}
          onSuccess={(result: any, { widget }) => {
            setCustomValue("imageSrc", result?.info?.secure_url);
            widget.close();
          }}
        >
          {({ open }) => {
            return (
              <div
                onClick={() => open()}
                className="
                    w-full
                    border-2
                    rounded-lg
                    border-dashed
                    cursor-pointer
                    h-[250px]
                    relative
                    hover:opacity-80
                  "
              >
                {imageSrc ? (
                  <Image
                    alt="image"
                    src={imageSrc}
                    fill
                    className="object-cover rounded-lg"
                  />
                ) : (
                  <div
                    className="
                  flex
                  justify-center
                  items-center
                  h-full
                "
                  >
                    <div
                      className="
                  flex
                  flex-col
                  items-center
                  gap-4
                  text-neutral-700
                  "
                    >
                      <LuImagePlus size={50} />
                      <div className="text-lg font-semibold">
                        Click to upload
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          }}
        </CldUploadWidget>
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
