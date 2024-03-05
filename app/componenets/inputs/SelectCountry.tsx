"use client";

import Select from "react-select";
import { useState } from "react";

import useCountries from "@/app/hooks/useCountries";

export type CountryType = {
  value: string;
  label: string;
  flag: string;
  latlng: [number, number];
  region: string;
};

interface SelectCountryProps {
  locationValue: string;
  onChange: (value: string | undefined) => void;
  disabled?: boolean;
}

const SelectCountry: React.FC<SelectCountryProps> = ({
  locationValue,
  onChange,
  disabled = false,
}) => {
  const { getAll, getByValue } = useCountries();
  const options = getAll();
  const value = getByValue(locationValue);

  return (
    <Select
      value={value}
      onChange={(country) => {
        onChange(country?.value);
      }}
      options={options}
      isClearable={true}
      isDisabled={disabled}
      placeholder="Anywhere"
      styles={{
        control: (styles) => ({
          ...styles,
          height: "60px",
        }),
      }}
      theme={(theme) => ({
        ...theme,
        borderRadius: 5,
        colors: {
          ...theme.colors,
          primary25: "#fecdd3",
          primary: "black",
        },
      })}
      formatOptionLabel={(option) => (
        <div className="flex flex-row gap-3">
          <div className="">{option?.flag}</div>
          <div className="font-semibold">
            {option?.label},
            <span className="text-neutral-400 inline-block ps-1">
              {option?.region}
            </span>
          </div>
        </div>
      )}
    />
  );
};

export default SelectCountry;
