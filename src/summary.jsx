import React, { useEffect, useState } from "react";
import Papa from "papaparse";

const Summary = ({ city, numberOfDays }) => {
  const [cityData, setCityData] = useState(null);

  useEffect(() => {
    // Replace 'your-csv-file.csv' with the actual path to your CSV file
    Papa.parse("/path/to/your-csv-file.csv", {
      download: true,
      header: true,
      complete: (result) => {
        // Assuming your CSV file has 'City' in the first column and 'SecondColumn' in the second column
        const selectedCityData = result.data.find((row) => row.City === city);

        if (selectedCityData) {
          setCityData(selectedCityData.SecondColumn);
        } else {
          // Handle the case when the city is not found in the CSV
          console.error(`Data for ${city} not found in the CSV file`);
          setCityData(null);
        }
      },
    });
  }, [city]);

  return (
    <div className="summary-container">
      <h2>Summary</h2>
      <p>Selected City: {city}</p>
      <p>Number of Days: {numberOfDays}</p>
      {cityData !== null ? (
        <p>Second Column Data: {cityData}</p>
      ) : (
        <p>Data not available</p>
      )}
    </div>
  );
};

export default Summary;
