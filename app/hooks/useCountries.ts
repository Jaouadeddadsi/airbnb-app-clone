import { log } from "console";
import countries from "world-countries";

const formattedCountries = countries.map((country) => {
  return {
    value: country.cca2,
    label: country.name.common,
    flag: country.flag,
    latlng: country.latlng,
    region: country.region,
  };
});

const useCountries = () => {
  const getAll = () => formattedCountries;

  const getByValue = (value: string) => {
    const location = formattedCountries.find((country) => {
      return country.value === value;
    });
    return location;
  };

  return {
    getAll,
    getByValue,
  };
};

export default useCountries;
