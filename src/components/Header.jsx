import React, { useState, useEffect } from "react";
import countriesData from "../data/countriesList.json";
import "./header.css";
import AsiaExpress from "./AsiaExpress";
import MoneyGram from "./MoneyGram";
import Ria from "./Ria";
import UniSteam from "./UniSteam";
import Korona from "./Korona";
import Contact from "./Contact";
import WestrenUnion from "./WesternUnion";

export default function Header() {
  const [value, setValue] = useState(100);
  const [selectedCurrency, setSelectedCurrency] = useState("usd");

  const handleInputChange = (event) => {
    const newValue = parseInt(event.target.value);
    if (!isNaN(newValue) && newValue >= 0 && newValue <= 50000) {
      setValue(newValue);
    }
  };

  const handleSliderChange = (event) => {
    const newValue = parseInt(event.target.value);
    const nearestMultiple = Math.round(newValue / 50) * 50;
    setValue(nearestMultiple);
  };

  const countries = countriesData.countries;
  const [selectedCountry, setSelectedCountry] = useState("");

  const handleCountryChange = (event) => {
    const countryName = event.target.value;
    setSelectedCountry(countryName);
  };

  const handleCurrencyChange = (event) => {
    const currencyValue = event.target.value;
    setSelectedCurrency(currencyValue);
  };

  useEffect(() => {
    setSelectedCountry(countries[0]);
  }, [countries]);

  return (
    <div className="header">
      <div className="contanier">
        <h1>Money transfers</h1>
        <div className="center">
          <div className="center__boxs">
            <div className="box">
              <h3>The country of the recipient</h3>
              <select
                className="country__list"
                onChange={handleCountryChange}
                value={selectedCountry}
              >
                {countries.map((country, index) => (
                  <option key={index} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
            <div className="box">
              <h3>Transfer amount</h3>
              <div>
                <input
                  type="number"
                  value={value}
                  onChange={handleInputChange}
                  min="0"
                  max="50000"
                />
              </div>
              <div>
                <input
                  className="slider"
                  type="range"
                  value={value}
                  onChange={handleSliderChange}
                  min="0"
                  max="50000"
                  step="50"
                />
              </div>
            </div>
            <div className="box">
              <h3>Currency</h3>
              <select
                className="currency"
                onChange={handleCurrencyChange}
                value={selectedCurrency}
              >
                <option value="usd">USD</option>
                <option value="rub">RUB</option>
                <option value="eur">EURO</option>
              </select>
            </div>
          </div>
        </div>
        <div className="bottom">
          <h2>
            Transfer amount:
            <span> {value} </span>
          </h2>
          <h2>
            The country of the recipient:
            <span>{selectedCountry}</span>
          </h2>
        </div>

        <div className="transfer__comp">
          <div className="comp__title">
            <p>Service</p>
            <p>Comission</p>
            <p>Final Amount</p>
          </div>

          <div className="comp__list">
            <MoneyGram
              selectedCountry={selectedCountry}
              selectedCurrency={selectedCurrency}
              enteredValue={value}
            />

            <Ria
              selectedCountry={selectedCountry}
              selectedCurrency={selectedCurrency}
              enteredValue={value}
            />
            <UniSteam
              selectedCountry={selectedCountry}
              selectedCurrency={selectedCurrency}
              enteredValue={value}
            />
            <Contact
              selectedCountry={selectedCountry}
              selectedCurrency={selectedCurrency}
              enteredValue={value}
            />

            <Korona
              selectedCountry={selectedCountry}
              selectedCurrency={selectedCurrency}
              enteredValue={value}
            />

            <WestrenUnion
              selectedCountry={selectedCountry}
              selectedCurrency={selectedCurrency}
              enteredValue={value}
            />
            <AsiaExpress
              selectedCountry={selectedCountry}
              selectedCurrency={selectedCurrency}
              enteredValue={value}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
