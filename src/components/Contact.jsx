import React from "react";
import contactData from "../data/en.json"; // Update the path to your JSON file
import "./header.css"

export default function Contact({ selectedCountry, selectedCurrency, enteredValue }) {
  const contactInfo = contactData[3];

  const isUsdOrEurSelected = selectedCurrency === "usd" || selectedCurrency === "eur";
  const tarifInfo = contactInfo.tarifs.find((tarif) =>
    tarif.countrys.some((country) => country.country === selectedCountry)
  );

  let tarifName = "The selected country is not served";
  let commission = "";
  let totalValue = enteredValue;

  if (tarifInfo && isUsdOrEurSelected) {
    tarifName = tarifInfo.tarif_name;

    // Find the commission information for the selected country and tariff
    const selectedCountryCommission = tarifInfo.countrys.find(
      (country) => country.country === selectedCountry && country.currency === selectedCurrency
    );

    if (selectedCountryCommission && selectedCountryCommission.comission_type === "procent") {
      const commissionPercentage = parseFloat(selectedCountryCommission.comission);
      const commissionValue = (commissionPercentage / 100) * enteredValue;
      totalValue = enteredValue + commissionValue;
      commission = ` ${commissionPercentage}%`;
    } else if (selectedCountryCommission && selectedCountryCommission.comission_type === "fixed") {
      commission = ` ${selectedCountryCommission.comission}$`;
      totalValue = enteredValue + parseFloat(selectedCountryCommission.comission);
    }
  }

  if (selectedCurrency === "rub") {
    tarifName = "The selected country is not served";
    commission = "";
    totalValue = enteredValue;
  }

  return (
    <div className="list" >
      <img src={contactInfo.logo} alt={contactInfo.company_name} />
      {tarifInfo || selectedCurrency === "rub" ? (
        <>
          {selectedCurrency !== "rub" ? <p> {commission}</p> : null}
          {selectedCurrency !== "rub" ? <p>  {totalValue}$</p> : null}
        </>
      ) : null}
      <p>{tarifName}</p>
    </div>
  );
}
