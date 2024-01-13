import React, { useState, useEffect } from "react";

const Result = ({ cardStatusList }) => {
  const [inputTags, setInputTags] = useState(cardStatusList);
  const [recommendedCities, setRecommendedCities] = useState([]);
  console.log(cardStatusList);

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
    <div>
      {recommendedCities.length > 0 && (
        <div>
          <h2>Recommended Cities:</h2>
          <ol>
            {recommendedCities.slice(0, 10).map((city, index) => (
              <li key={index}>{city}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default Result;
