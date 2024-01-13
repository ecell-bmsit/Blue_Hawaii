import React, { useState } from "react";
import TinderCard from "react-tinder-card";
import Result from "./result";
import "./components/cardstack.css";

const CardStack = () => {
  const characters = [
    {
      name: "Card 1",
      image:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Fphotos%2Fbeautiful-scenery&psig=AOvVaw2DL0oO9UzkwSyaW_PcWVfd&ust=1705224134831000&source=images&cd=vfe&ved=0CBMQjRxqFwoTCIDdzpeF2oMDFQAAAAAdAAAAABAE",
    },
    {
      name: "Card 2",
      image:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpicjumbo.com%2Fbeautiful-nature-scenery%2F&psig=AOvVaw061kxQfl7iFAOGFNy98kRS&ust=1705224195796000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCKCt5aaF2oMDFQAAAAAdAAAAABAD",
    },
    {
      name: "Card 3",
      image:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpicjumbo.com%2Fbeautiful-nature-scenery%2F&psig=AOvVaw061kxQfl7iFAOGFNy98kRS&ust=1705224195796000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCKCt5aaF2oMDFQAAAAAdAAAAABAD",
    },
    {
      name: "Card 4",
      image:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpicjumbo.com%2Fbeautiful-nature-scenery%2F&psig=AOvVaw061kxQfl7iFAOGFNy98kRS&ust=1705224195796000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCKCt5aaF2oMDFQAAAAAdAAAAABAD",
    },
    {
      name: "Card 5",
      image:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpicjumbo.com%2Fbeautiful-nature-scenery%2F&psig=AOvVaw061kxQfl7iFAOGFNy98kRS&ust=1705224195796000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCKCt5aaF2oMDFQAAAAAdAAAAABAD",
    },
    {
      name: "Card 6",
      image:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpicjumbo.com%2Fbeautiful-nature-scenery%2F&psig=AOvVaw061kxQfl7iFAOGFNy98kRS&ust=1705224195796000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCKCt5aaF2oMDFQAAAAAdAAAAABAD",
    },
    {
      name: "Card 7",
      image:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpicjumbo.com%2Fbeautiful-nature-scenery%2F&psig=AOvVaw061kxQfl7iFAOGFNy98kRS&ust=1705224195796000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCKCt5aaF2oMDFQAAAAAdAAAAABAD",
    },
    {
      name: "Card 8",
      image:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpicjumbo.com%2Fbeautiful-nature-scenery%2F&psig=AOvVaw061kxQfl7iFAOGFNy98kRS&ust=1705224195796000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCKCt5aaF2oMDFQAAAAAdAAAAABAD",
    },
    {
      name: "Card 9",
      image:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpicjumbo.com%2Fbeautiful-nature-scenery%2F&psig=AOvVaw061kxQfl7iFAOGFNy98kRS&ust=1705224195796000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCKCt5aaF2oMDFQAAAAAdAAAAABAD",
    },
    {
      name: "Card 10",
      image:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpicjumbo.com%2Fbeautiful-nature-scenery%2F&psig=AOvVaw061kxQfl7iFAOGFNy98kRS&ust=1705224195796000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCKCt5aaF2oMDFQAAAAAdAAAAABAD",
    },
    {
      name: "Card 11",
      image:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpicjumbo.com%2Fbeautiful-nature-scenery%2F&psig=AOvVaw061kxQfl7iFAOGFNy98kRS&ust=1705224195796000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCKCt5aaF2oMDFQAAAAAdAAAAABAD",
    },
    {
      name: "Card 12",
      image:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpicjumbo.com%2Fbeautiful-nature-scenery%2F&psig=AOvVaw061kxQfl7iFAOGFNy98kRS&ust=1705224195796000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCKCt5aaF2oMDFQAAAAAdAAAAABAD",
    },
    {
      name: "Card 13",
      image:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpicjumbo.com%2Fbeautiful-nature-scenery%2F&psig=AOvVaw061kxQfl7iFAOGFNy98kRS&ust=1705224195796000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCKCt5aaF2oMDFQAAAAAdAAAAABAD",
    },
    {
      name: "Card 14",
      image:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpicjumbo.com%2Fbeautiful-nature-scenery%2F&psig=AOvVaw061kxQfl7iFAOGFNy98kRS&ust=1705224195796000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCKCt5aaF2oMDFQAAAAAdAAAAABAD",
    },
    {
      name: "Card 15",
      image:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpicjumbo.com%2Fbeautiful-nature-scenery%2F&psig=AOvVaw061kxQfl7iFAOGFNy98kRS&ust=1705224195796000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCKCt5aaF2oMDFQAAAAAdAAAAABAD",
    },
    {
      name: "Card 16",
      image:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpicjumbo.com%2Fbeautiful-nature-scenery%2F&psig=AOvVaw061kxQfl7iFAOGFNy98kRS&ust=1705224195796000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCKCt5aaF2oMDFQAAAAAdAAAAABAD",
    },
    {
      name: "Card 17",
      image:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpicjumbo.com%2Fbeautiful-nature-scenery%2F&psig=AOvVaw061kxQfl7iFAOGFNy98kRS&ust=1705224195796000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCKCt5aaF2oMDFQAAAAAdAAAAABAD",
    },
    {
      name: "Card 18",
      image:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpicjumbo.com%2Fbeautiful-nature-scenery%2F&psig=AOvVaw061kxQfl7iFAOGFNy98kRS&ust=1705224195796000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCKCt5aaF2oMDFQAAAAAdAAAAABAD",
    },
    {
      name: "Card 19",
      image:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpicjumbo.com%2Fbeautiful-nature-scenery%2F&psig=AOvVaw061kxQfl7iFAOGFNy98kRS&ust=1705224195796000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCKCt5aaF2oMDFQAAAAAdAAAAABAD",
    },
    {
      name: "Card 20",
      image:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpicjumbo.com%2Fbeautiful-nature-scenery%2F&psig=AOvVaw061kxQfl7iFAOGFNy98kRS&ust=1705224195796000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCKCt5aaF2oMDFQAAAAAdAAAAABAD",
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
                <h3>{character.name}</h3>
              </div>
            </TinderCard>
          )
      )}
      <div className="button-container">
        <button className="dislike-button" onClick={handleDislike}>
          Dislike
        </button>
        <button className="like-button" onClick={handleLike}>
          Like
        </button>
      </div>
      {currentCardIndex === 20 && <Result cardStatusList={cardStatusList} />}
    </div>
  );
};

export default CardStack;
