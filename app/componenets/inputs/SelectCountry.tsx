"use client";

import Select from "react-select";

import useCountries from "@/app/hooks/useCountries";
import { useState } from "react";

const SelectCountry = () => {
  const { getAll } = useCountries();
  const options = getAll();

  const [value, setValue] = useState();

  return (
    <Select
      value={value}
      onChange={(value) => {
        setValue(value);
      }}
      options={options}
      placeholder="Anywhere"
      styles={{
        control: (styles) => ({
          ...styles,
          height: "70px",
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
