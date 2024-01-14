import React, { useEffect, useState } from "react";
import "./components/Summary.css";

const Summary = ({ city, numberOfDays, cardStatusList }) => {
  const [cityData, setCityData] = useState({
    description: null,
    imageUrl: null,
  });
  const [inputTags, setInputTags] = useState(cardStatusList);
  const [createItineraryResult, setCreateItineraryResult] = useState(null);

  const handleCreateItinerary = async () => {
    try {
      const response = await fetch('http://localhost:7860/create_itinerary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          place_name: city,
          num_days: numberOfDays,
          input_tags: inputTags,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setCreateItineraryResult(result);

      // Display itinerary information
      console.log("Itinerary Result:", result);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  useEffect(() => {
    const imageUrl = `../data/place_images/${city.toLowerCase()}.png`;

    fetch("../data/place_bio/bio.json")
      .then((response) => response.json())
      .then((data) => {
        const selectedCityData = data.find(
          (item) => item.City.trim() === city.trim()
        );

        if (selectedCityData) {
          setCityData({
            description: selectedCityData.Description,
            imageUrl: imageUrl,
          });
        } else {
          console.error(`Data for ${city} not found in the JSON file`);
          setCityData({
            description: null,
            imageUrl: null,
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching JSON data:", error);
        setCityData({
          description: null,
          imageUrl: null,
        });
      });
  }, [city]);

  return (
    <div style={{ display: "flex" }}>
      <div
        className="summary-container"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "150vh",
          padding: "20px",
          display: "flex",
          alignItems: "center",
        }}
      >
        {cityData.imageUrl !== null && (
          <img
            src={cityData.imageUrl}
            alt={`${city} Image`}
            style={{ maxWidth: "45%", marginRight: "20px" }}
          />
        )}
        <div style={{ fontSize: "14px" }}>
          <h2>Summary</h2>
          {cityData.description !== null ? (
            <p>Description: {cityData.description}</p>
          ) : (
            <p>Data not available</p>
          )}
        </div>
        <button onClick={handleCreateItinerary}>Create Itinerary</button>
        {createItineraryResult && (
          <div>
            <h2>Create Itinerary Result:</h2>
            <pre>{JSON.stringify(createItineraryResult, null, 2)}</pre>
          </div>
        )}
      </div>

      {/* Iframe on the right side of the screen outside the container */}
      <div style={{ position: "fixed", right: 0, top: 0, paddingRight: 0, fontSize: "14px" }}>
        <iframe
          src="https://akxy4321-travelmate.hf.space"
          style={{ height: "100vh", width: "80vh" }}
        ></iframe>
      </div>
    </div>
  );
};

export default Summary;