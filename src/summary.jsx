import React, { useState, useEffect } from "react";
import XLSX from "xlsx";

const Summary = ({ selectedCity, numberOfDays }) => {
  const [cityDetails, setCityDetails] = useState(null);

  useEffect(() => {
    const fetchCityDetails = async () => {
      try {
        const response = await fetch("path/to/your/file.xlsx"); // Replace with the actual path to your XLSX file
        const arrayBuffer = await response.arrayBuffer();
        const data = new Uint8Array(arrayBuffer);

        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Find the row that matches the selected city
        const cityRow = XLSX.utils.sheet_to_json(sheet, { header: 1 }).find(
          (row) => row[0] === selectedCity
        );

        // If the city is found, set its details
        if (cityRow && cityRow.length >= 2) {
          setCityDetails({
            cityName: cityRow[0],
            cityDetails: cityRow[1],
          });
        } else {
          console.warn(`Details not found for city: ${selectedCity}`);
        }
      } catch (error) {
        console.error("Error reading XLSX file:", error.message);
      }
    };

    fetchCityDetails();
  }, [selectedCity]); // Run this effect whenever selectedCity changes

  return (
    <div className="summary-container">
      <h2>Summary</h2>
      <p>Selected City: {selectedCity}</p>
      <p>Number of Days: {numberOfDays}</p>

      {cityDetails && (
        <div>
          <h3>City Details</h3>
          <p>
            <strong>{cityDetails.cityName}:</strong> {cityDetails.cityDetails}
          </p>
        </div>
      )}
    </div>
  );
};

export default Summary;
