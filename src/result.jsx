import React, { useState, useEffect } from "react";
import "./components/result.css";

const Result = ({ cardStatusList }) => {
  const [inputTags, setInputTags] = useState(cardStatusList);
  const [recommendedCities, setRecommendedCities] = useState([]);
  const [tableVisible, setTableVisible] = useState(true);

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
    // Add additional logic here if needed
    setTableVisible(false); // Hide the table after clicking on a city

    let numberOfDays;

    do {
      // Use the prompt function to show an alert box and get user input
      const numberOfDaysInput = prompt("Enter the number of days in the itinerary (max 7):", "1");

      if (numberOfDaysInput === null) {
        // User clicked Cancel
        return;
      }

      numberOfDays = parseInt(numberOfDaysInput, 10);

      if (isNaN(numberOfDays) || numberOfDays < 1 || numberOfDays > 7) {
        // Handle invalid input
        alert("Invalid input. Please enter a valid number between 1 and 7.");
      }
    } while (isNaN(numberOfDays) || numberOfDays < 1 || numberOfDays > 7);

    // Handle the entered number of days
    console.log("Number of days in the itinerary:", numberOfDays);
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
    </div>
  );
};

export default Result;
