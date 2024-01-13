import React, { useState } from "react";
import TinderCard from "react-tinder-card";
import Result from "./result";
import "./components/cardstack.css";

const CardStack = () => {
  const characters = [
    {
      name: "Card 1",
      image: "../data/travel_tags_images/historical-sites.jpg",
    },
    {
      name: "Card 2",
      image: "../data/travel_tags_images/museum.jpg",
    },
    {
      name: "Card 3",
      image: "../data/travel_tags_images/art-gallery.jpg",
    },
    {
      name: "Card 4",
      image: "../data/travel_tags_images/pilgrimage.png",
    },
    {
      name: "Card 5",
      image: "../data/travel_tags_images/beaches.jpg",
    },
    {
      name: "Card 6",
      image: "../data/travel_tags_images/hiking.png",
    },
    {
      name: "Card 7",
      image: "../data/travel_tags_images/greenery.jpg",
    },
    {
      name: "Card 8",
      image: "../data/travel_tags_images/mountains.jpg",
    },
    {
      name: "Card 9",
      image: "../data/travel_tags_images/shopping.jpg",
    },
    {
      name: "Card 10",
      image: "../data/travel_tags_images/nightlife.jpg",
    },
    {
      name: "Card 11",
      image: "../data/travel_tags_images/urban.jpg",
    },
    {
      name: "Card 12",
      image: "../data/travel_tags_images/desert.jpg",
    },
    {
      name: "Card 13",
      image: "../data/travel_tags_images/adventure.jpg",
    },
    {
      name: "Card 14",
      image: "../data/travel_tags_images/cultural-experience.jpg",
    },
    {
      name: "Card 15",
      image: "../data/travel_tags_images/waterfalls.jpg",
    },
    {
      name: "Card 16",
      image: "../data/travel_tags_images/caves.jpg",
    },
    {
      name: "Card 17",
      image: "../data/travel_tags_images/Wildlife_experience.jpg",
    },
    {
      name: "Card 18",
      image: "../data/travel_tags_images/skiing.jpg",
    },
    {
      name: "Card 19",
      image: "../data/travel_tags_images/scuba_diving.jpg",
    },
    {
      name: "Card 20",
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
                  boxShadow: "5px 10px 18px #888888",
                  borderRadius: 10,
                  height: 300,
                }}
              >
                {/* <h3>{character.name}</h3> */}
              </div>
            </TinderCard>
          )
      )}
      {currentCardIndex < characters.length && (
        <div className="button-container">
          <button className="dislike-button" onClick={handleDislike}>
            Dislike
          </button>
          <button className="like-button" onClick={handleLike}>
            Like
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
