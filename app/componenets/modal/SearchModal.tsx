"use client";

import dynamic from "next/dynamic";
import { useCallback, useMemo, useState } from "react";
import qs from "query-string";

import useSearchModal from "@/app/hooks/useSearchModal";
import Modal from "./Modal";
import Heading from "../Heading";
import SelectCountry from "../inputs/SelectCountry";
import useCountries from "@/app/hooks/useCountries";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";
import { Range } from "react-date-range";
import { useRouter, useSearchParams } from "next/navigation";
import { formatISO } from "date-fns";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const initialRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

const SearchModal = () => {
  const [step, setStep] = useState(STEPS.LOCATION);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const params = useSearchParams();

  const searchModal = useSearchModal();
  const { getByValue } = useCountries();

  const [locationValue, setLocationValue] = useState("");
  const [range, setRange] = useState<Range>(initialRange);
  const [guests, setGuests] = useState(1);
  const [rooms, setRooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return "Search";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined;
    }
    return "Back";
  }, [step]);

  const onNext = () => setStep((value) => value + 1);
  const onBack = () => setStep((value) => value - 1);
  // work here
  const action = useCallback(() => {
    if (step !== STEPS.INFO) {
      return onNext();
    }

    let currentQuery = {}
    if (params) {
      currentQuery = qs.parse(params.toString()); 
    }

    const query: any = {
      ...currentQuery,
      locationValue,
      guestCount: guests,
      roomCount: rooms,
      bathroomCount: bathrooms,
    };
    if (range.startDate) {
      query.startDate = formatISO(range.startDate)
    }
    if (range.endDate) {
      query.endDate = formatISO(range.endDate)
    }
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: query,
      },
      { skipEmptyString: true, skipNull: true }
    );
    router.push(url);
    setStep(STEPS.LOCATION)
    searchModal.onClose();
  }, [step, locationValue, guests, rooms, bathrooms, range]);

  const onChangeLocationValue = (value: string | undefined) => {
    if (value) {
      setLocationValue(value);
    }
  };
  const onChangeDate = useCallback(
    (item: any) => {
      setRange(item.selection);
    },
    [setRange]
  );

  const latlong = useMemo(() => {
    return getByValue(locationValue)?.latlng;
  }, [locationValue, getByValue]);

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
        title="Where do you wanna go?"
        subtitle="Fond the perfect place"
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

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8 mb-8">
        <Heading
          title="When do you plan to go?"
          subtitle="Make sure everyone is free!"
        />
        <Calendar range={range} onChange={onChangeDate} disabledDates={[]} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8 mb-8">
        <Heading title="More information" subtitle="Find your perfect place!" />
        <Counter
          title="Guests"
          subtitle="How many guests are coming?"
          value={guests}
          onChange={(value) => {
            setGuests(value);
          }}
        />
        <hr />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you need?"
          value={rooms}
          onChange={(value) => {
            setRooms(value);
          }}
        />
        <hr />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you need?"
          value={bathrooms}
          onChange={(value) => {
            setBathrooms(value);
          }}
        />
      </div>
    );
  }

  return (
    <>
      {searchModal.isOpen && (
        <Modal
          label="Filters"
          actionLabel={actionLabel}
          action={action}
          onClose={searchModal.onClose}
          isOpen={searchModal.isOpen}
          secondaryAction={onBack}
          secondaryActionLabel={secondaryActionLabel}
          body={bodyContent}
        />
      )}
    </>
  );
};

export default SearchModal;
