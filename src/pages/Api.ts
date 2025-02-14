import { useState, useEffect } from "react";
interface CountryAPIResponse {
  country_iso2: string;
  country_display: string;
}
interface StateAPIResponse {
  state_name: string;
}
interface Country {
  name: string;
  code: string;
}
interface State {
  name: string;
  code: string;
}

export const useCountries = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://api.fr.stg.shipglobal.in/api/v1/location/countries"
        );
        const result = await response.json();
        if (result.data?.countries) {
          const formattedCountries = result.data.countries.map(
            (country: CountryAPIResponse) => ({
              code: country.country_iso2,
              name: country.country_display,
            })
          );
          setCountries(formattedCountries);
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);
  return { countries };
};

export const useStates = (countryCode: string) => {
  const [states, setStates] = useState<State[]>([]);
  useEffect(() => {
    if (!countryCode) return;
    const fetchStates = async () => {
      try {
        const response = await fetch(
          "https://api.fr.stg.shipglobal.in/api/v1/location/states",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ state_country_code: countryCode }),
          }
        );
        const result = await response.json();
        if (result.data?.states) {
          const formattedStates = result.data.states.map(
            (state: StateAPIResponse) => ({
              code: state.state_name,
              name: state.state_name,
            })
          );
          setStates(formattedStates);
        }
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };
    fetchStates();
  }, [countryCode]);
  return { states };
};
