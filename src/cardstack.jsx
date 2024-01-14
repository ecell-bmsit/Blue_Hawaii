import React, { useState } from "react";
import TinderCard from "react-tinder-card";
import Result from "./result";
import "./components/cardstack.css";

const CardStack = () => {
  const characters = [
    {
      name: "Historical Sites",
      image: "../data/travel_tags_images/historical-sites.jpg",
    },
    {
      name: "Museum",
      image: "../data/travel_tags_images/museum.jpg",
    },
    {
      name: "Art Gallery",
      image: "../data/travel_tags_images/art-gallery.jpg",
    },
    {
      name: "Pilgrimage",
      image: "../data/travel_tags_images/pilgrimage.png",
    },
    {
      name: "Beaches",
      image: "../data/travel_tags_images/beaches.jpg",
    },
    {
      name: "Hiking",
      image: "../data/travel_tags_images/hiking.png",
    },
    {
      name: "Greenery",
      image: "../data/travel_tags_images/greenery.jpg",
    },
    {
      name: "Mountains",
      image: "../data/travel_tags_images/mountains.jpg",
    },
    {
      name: "Shopping",
      image: "../data/travel_tags_images/shopping.jpg",
    },
    {
      name: "Nightlife",
      image: "../data/travel_tags_images/nightlife.jpg",
    },
    {
      name: "Urban",
      image: "../data/travel_tags_images/urban.jpg",
    },
    {
      name: "Desert",
      image: "../data/travel_tags_images/desert.jpg",
    },
    {
      name: "Adventure",
      image: "../data/travel_tags_images/adventure.jpg",
    },
    {
      name: "Cultural Experience",
      image: "../data/travel_tags_images/cultural-experience.jpg",
    },
    {
      name: "Waterfalls",
      image: "../data/travel_tags_images/waterfalls.jpg",
    },
    {
      name: "Caves",
      image: "../data/travel_tags_images/caves.jpg",
    },
    {
      name: "Wildlife Experience",
      image: "../data/travel_tags_images/Wildlife_experience.jpg",
    },
    {
      name: "Skiing",
      image: "../data/travel_tags_images/skiing.jpg",
    },
    {
      name: "Scuba Diving",
      image: "../data/travel_tags_images/scuba_diving.jpg",
    },
    {
      name: "Water Activities",
      image: "../data/travel_tags_images/water_activities.jpg",
    },
  ];

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [cardStatusList, setCardStatusList] = useState([]);

  const swiped = (direction) => {
    console.log(`Swiped ${direction}`);
    setCurrentCardIndex((prevIndex) => prevIndex + 1);

    if (direction === "right") {
      setCardStatusList((prevList) => [...prevList, 1]);
    } else if (direction === "left") {
      setCardStatusList((prevList) => [...prevList, 0]);
    }
  };

  const handleLike = () => {
    if (currentCardIndex < characters.length) {
      setCardStatusList((prevList) => [...prevList, 1]);
      setCurrentCardIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleDislike = () => {
    if (currentCardIndex < characters.length) {
      setCardStatusList((prevList) => [...prevList, 0]);
      setCurrentCardIndex((prevIndex) => prevIndex + 1);
    }
  };

  const outOfFrame = (name) => {
    console.log(`${name} left the screen!`);
  };

  return (
    <div className="card-stack">
      {characters.map(
        (character, index) =>
          index === currentCardIndex && (
            <TinderCard
              key={character.name}
              className="swipe"
              onSwipe={(dir) => swiped(dir)}
              onCardLeftScreen={() => outOfFrame(character.name)}
              preventSwipe={["up", "down"]}
            >
              <div
                className="tinder-card"
                style={{
                  backgroundImage:
                    index === currentCardIndex
                      ? `url(${character.image})`
                      : "none",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundColor: "transparent",
                  borderRadius: 10,
                  height: 500,
                  width: 500
                }}
              >
                <h3 style={{ textShadow: '0 0 4px black' }}>{character.name}</h3>
              </div>
            </TinderCard>
          )
      )}
      {currentCardIndex < characters.length && (
        <div className="button-container">
          <button className="dislike-button" onClick={handleDislike} style={{color:'black', backgroundColor:'white', width:'200px'}}>
            <b>Dislike</b>
          </button>
          <button className="like-button" onClick={handleLike} style={{color:'black', backgroundColor:'white', width:'200px'}}>
          <b>Like</b>
          </button>
        </div>
      )}
      {currentCardIndex === characters.length && (
        <Result cardStatusList={cardStatusList} />
      )}
    </div>
  );
};

export default CardStack;
