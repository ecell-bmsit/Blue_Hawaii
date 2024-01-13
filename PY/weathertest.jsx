import React, { useEffect, useState } from 'react';

const WeatherApp = () => {
    const [weatherInfo, setWeatherInfo] = useState(null);
    const apiKey = 'd2622d3d84cde3d2b57325f720cc33cc';
    const city = 'Bengaluru';

    useEffect(() => {
        // Make a request to the OpenWeatherMap API
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Extract relevant information from the API response
                const temperature = data.main.temp;
                const description = data.weather[0].description;
                const celcius = temperature - 273.15;

                // Update the weather information
                setWeatherInfo({
                    city,
                    temperature: celcius.toFixed(2),
                });
            })
            .catch(error => {
                console.log('Error:', error);
                setWeatherInfo(null);
            });
    }, []);

    return (
        <div>
            {weatherInfo ? (
                <>
                    <h2>{weatherInfo.city}</h2>
                    <p>Temperature: {weatherInfo.temperature} °C</p>
                </>
            ) : (
                <p>An error occurred.</p>
            )}
        </div>
    );
};

export default WeatherApp;
