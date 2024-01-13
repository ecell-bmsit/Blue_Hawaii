import React, { useState, useEffect } from "react";
import "./components/result.css";

const Result = ({ cardStatusList }) => {
  const [inputTags, setInputTags] = useState(cardStatusList);
  const [recommendedCities, setRecommendedCities] = useState([]);

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

  return (
    <div className="result-container">
      {recommendedCities.length > 0 && (
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
                    <a href={`#${city}`} className="city-link">
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
