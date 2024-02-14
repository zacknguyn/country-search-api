import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import Card from "./Card";
import { useStore } from "../store";
import { Country } from "../types";

const CountrySearch = () => {
  const [region, setRegion] = React.useState("");
  const [data, setData] = React.useState([
    {
      name: { common: "" },
      flags: { png: "" },
      capital: [""],
      population: 0,
      region: "",
    },
  ]);
  const [filteredCountries, setFilteredCountries] = useState(data);
  const [searchValue, setSearchValue] = useState("");

  const isDarkMode = useStore((state) => state.isDarkMode);

  const handleChange = (event: SelectChangeEvent) => {
    setRegion(event.target.value);
  };

  const handleTyping = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setSearchValue(e.target.value);
  };

  const filterCountries = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.value === "") {
      setFilteredCountries(data);
    } else {
      setFilteredCountries(
        filteredCountries.filter((country) =>
          country.name.common
            .toLowerCase()
            .includes(e.target.value.toLowerCase())
        )
      );
    }
  };

  useMemo(() => {
    let countries = [];

    if (region !== "") {
      countries = data.filter((country) => country.region === region);

      if (searchValue !== "") {
        setFilteredCountries(
          countries.filter((country) =>
            country.name.common
              .toLowerCase()
              .includes(searchValue.toLowerCase())
          )
        );
      } else {
        setFilteredCountries(countries);
      }
    } else if (region === "") {
      if (searchValue !== "") {
        setFilteredCountries(
          filteredCountries.filter((country) =>
            country.name.common
              .toLowerCase()
              .includes(searchValue.toLowerCase())
          )
        );
      } else {
        setFilteredCountries(data);
      }
    }
  }, [data, region, searchValue]);

  useEffect(() => {
    fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,capital,population,region"
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setFilteredCountries(data);
      });
  }, []);

  return (
    <Box sx={{ padding: "2rem" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "2rem",
        }}
      >
        <TextField
          id="outlined-basic"
          label="Search for a country"
          variant="outlined"
          sx={{
            width: "40vw",
            backgroundColor: isDarkMode ? "#2b3743" : "#ffffff",
          }}
          onChange={(e) => {
            filterCountries(e);
            handleTyping(e);
          }}
        />
        <FormControl
          sx={{
            width: "20vw",
            backgroundColor: isDarkMode ? "#2b3743" : "#ffffff",
          }}
        >
          <InputLabel id="demo-simple-select-label">
            Filter By Region
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={region}
            label="Region"
            onChange={handleChange}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Africa">Africa</MenuItem>
            <MenuItem value="Americas">Americas</MenuItem>
            <MenuItem value="Asia">Asia</MenuItem>
            <MenuItem value="Europe">Europe</MenuItem>
            <MenuItem value="Oceania">Oceania</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        {filteredCountries.map((country) => {
          return (
            <Card
              name={country.name.common}
              flag={country.flags.png}
              population={country.population}
              region={country.region}
              capital={country.capital[0]}
              key={country.name.common}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default CountrySearch;
