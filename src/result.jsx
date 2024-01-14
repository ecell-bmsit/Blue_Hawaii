import React, { useState, useEffect } from "react";
import "./components/result.css";
import Summary from "./summary.jsx"; // Import the new Summary component

const Result = ({ cardStatusList }) => {
  const [inputTags, setInputTags] = useState(cardStatusList);
  const [recommendedCities, setRecommendedCities] = useState([]);
  const [tableVisible, setTableVisible] = useState(true);
  const [selectedCity, setSelectedCity] = useState(null);
  const [numberOfDays, setNumberOfDays] = useState(null);

  const handleRecommendation = async () => {
    try {
      const response = await fetch("http://localhost:7860/recommend_cities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input_tags: inputTags }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch recommendations");
      }

      const data = await response.json();
      setRecommendedCities(data.recommended_cities);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    handleRecommendation();
  }, [inputTags]);

  const handleCityClick = (city) => {
    console.log("Clicked city:", city);
    setTableVisible(false); 

    let numberOfDays;

    do {
      const numberOfDaysInput = prompt("Enter the number of days in the itinerary (max 5):", "1");

      if (numberOfDaysInput === null) {
        // User clicked Cancel
        return;
      }

      numberOfDays = parseInt(numberOfDaysInput, 10);

      if (isNaN(numberOfDays) || numberOfDays < 1 || numberOfDays > 5) {
        alert("Invalid input. Please enter a valid number between 1 and 5.");
      }
    } while (isNaN(numberOfDays) || numberOfDays < 1 || numberOfDays > 5);

    // Set the selected city and number of days
    setSelectedCity(city);
    setNumberOfDays(numberOfDays);
  };

  return (
    <div className="result-container">
      {recommendedCities.length > 0 && tableVisible && (
        <div>
          <h2>Recommended Cities:</h2>
          <table className="centered-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>City</th>
              </tr>
            </thead>
            <tbody>
              {recommendedCities.slice(0, 10).map((city, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <a
                      href={`#${city}`}
                      className="city-link"
                      onClick={() => handleCityClick(city)}
                    >
                      {city}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedCity && numberOfDays && (
        <Summary city={selectedCity} numberOfDays={numberOfDays} cardStatusList={cardStatusList} />
      )}
    </div>
  );
};

export default Result;
