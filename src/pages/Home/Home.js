import React from "react";
import DisplayTable from "../../components/Table/Table";
import {
  calculateFlavanoidsValues,
  calculateGammaValues,
} from "../../utils/functions";

function Home() {
  let flavanoidsValues = calculateFlavanoidsValues();
  let gammaValues = calculateGammaValues();
  const columnHeading = [
    "Measure",
    ...Object.keys(flavanoidsValues.mean).map((i) => `Class ${i}`),
  ];
  Object.keys(flavanoidsValues).forEach((key) => {
    flavanoidsValues[key].Measure = `Flavanoid ${
      key.charAt(0).toUpperCase() + key.slice(1)
    }`;
  });
  Object.keys(gammaValues).forEach((key) => {
    gammaValues[key].Measure = `Flavanoid ${
      key.charAt(0).toUpperCase() + key.slice(1)
    }`;
  });
  return (
    <div className="home">
      <h1 align="center"> Flavanoids Data </h1>
      <DisplayTable columnHeadings={columnHeading} data={flavanoidsValues} />
      <h1 align="center"> Gamma Data </h1>
      <DisplayTable columnHeadings={columnHeading} data={gammaValues} />
    </div>
  );
}

export default Home;
