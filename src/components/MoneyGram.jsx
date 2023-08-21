// MoneyGram.js (Example, modify other components similarly)
import React from "react";
import moneyGramData from "../data/en.json"; // Update the path to your JSON file
import "./header.css"

export default function MoneyGram({ selectedCountry, selectedCurrency, enteredValue }) {
  const moneyGramInfo = moneyGramData[0];

  const isRubSelected = selectedCountry === "rub" || selectedCurrency === "rub" || selectedCurrency === "eur";
  const tarifInfo = moneyGramInfo.tarifs.find((tarif) =>
    tarif.countrys.some((country) => country.country === selectedCountry)
  );

  let tarifName = "The selected country is not served";
  let commission = 0;
  let totalValue = enteredValue;

  if (tarifInfo && !isRubSelected) {
    tarifName = tarifInfo.tarif_name;

    // Find the commission information for the selected country and tariff
    const selectedCountryCommission = tarifInfo.countrys.find(
      (country) => country.country === selectedCountry
    );

    if (selectedCountryCommission) {
      commission = parseFloat(selectedCountryCommission.comission);
    }
  }

  if (selectedCurrency === "rub") {
    tarifName = "The selected country is not served";
    commission = 0;
    totalValue = enteredValue;
  }

  return (
    <div className="list" >
      <img src={moneyGramInfo.logo} alt={moneyGramInfo.company_name} />
      {tarifInfo || selectedCurrency === "rub" ? (
        <>
          {selectedCurrency !== "rub" ? <p> {commission}</p> : null}
          {selectedCurrency !== "rub" ? <p> {totalValue}$</p> : null}
        </>
      ) : null}
      <p>{tarifName}</p>
    </div>
  );
}
