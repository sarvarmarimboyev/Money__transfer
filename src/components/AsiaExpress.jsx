  // import React from "react";
  // import countriesData from "../data/test.json";

  // function AsiaExpress({ selectedCountry, transferAmount }) {
  //   const countryData = countriesData.tarifs[0].countrys.find(
  //     (country) => country.country === selectedCountry
  //   );

  //   let commissionAmount = 0;

  //   if (countryData) {
  //     const commissionType = countryData.comission_type;
  //     const minPrice = parseFloat(countryData.price_min);
  //     const maxPrice = parseFloat(countryData.price_max);
  //     const commissionRate = parseFloat(countryData.comission);

  //     if (transferAmount >= minPrice && transferAmount <= maxPrice) {
  //       if (commissionType === "procent") {
  //         commissionAmount = (transferAmount * commissionRate) / 100;
  //       } else if (commissionType === "fixed") {
  //         commissionAmount = commissionRate;
  //       }
  //     }
  //   }
  //   return (
  //     <div className="asia-express">
  //       <div
  //         style={{
  //           display: "flex",
  //           alignItems: "center",
  //           gap: "70px",
  //         }}
  //       >
  //         <img
  //           src="https://sqb.uz/upload/iblock/157/1574dc055fd058aa124f2ea26b98ead6.png"
  //           alt="Asia ekspress"
  //         />
  //         <p>1.4 %</p>

  //            {commissionAmount > 0 ? (
  //         <>
  //           <p>Commission Amount: {commissionAmount.toFixed(1)}</p>
  //           <p>{countryData.tarif}</p>
  //         </>
  //       ) : (
  //         <p>The selected country is not served</p>
  //       )}
  //       </div>

    
  //     </div>
  //   );
  // }

  // export default AsiaExpress;






  import React from "react";
import asiaExpressData from "../data/en.json"; // Update the path to your JSON file
import "./header.css"
export default function AsiaExpress({ selectedCountry, selectedCurrency, enteredValue }) {
  const asiaExpressInfo = asiaExpressData[6];

  const isUsdOrEurSelected = selectedCurrency === "usd" || selectedCurrency === "eur";
  const tarifInfo = asiaExpressInfo.tarifs.find((tarif) =>
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
    <div className="list" style={{borderBottom:"1px solid #dad6d6",paddingBottom:"20px"}}   >
      <img src={asiaExpressInfo.logo} alt={asiaExpressInfo.company_name} />
      {tarifInfo || selectedCurrency === "rub" ? (
        <>
          {selectedCurrency !== "rub" ? <p>{commission}</p> : null}
          {selectedCurrency !== "rub" ? <p>  {totalValue}$</p> : null}
        </>
      ) : null}
      <p>{tarifName}</p>
    </div>
  );
}
