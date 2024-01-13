import React, { useState, useEffect  } from 'react';
import TinderCard from 'react-tinder-card';

import './components/cardstack.css';

const CardStack = () => {
  const characters = [
    // Your data for cards
    { name: 'Card 1', image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Fphotos%2Fbeautiful-scenery&psig=AOvVaw2DL0oO9UzkwSyaW_PcWVfd&ust=1705224134831000&source=images&cd=vfe&ved=0CBMQjRxqFwoTCIDdzpeF2oMDFQAAAAAdAAAAABAE' },
    { name: 'Card 2', image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fpicjumbo.com%2Fbeautiful-nature-scenery%2F&psig=AOvVaw061kxQfl7iFAOGFNy98kRS&ust=1705224195796000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCKCt5aaF2oMDFQAAAAAdAAAAABAD' },
    // Add more cards as needed
  ];

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [cardStatusList, setCardStatusList] = useState([]);
  const [allCardsSwiped, setAllCardsSwiped] = useState(false);
  
  const swiped = (direction) => {
    console.log(`Swiped ${direction}`);
    // Handle swipe action as needed
    setCurrentCardIndex((prevIndex) => prevIndex + 1);
  };

  const handleLike = () => {
    // Trigger a right swipe (like)
    if (currentCardIndex < characters.length) {
      setCardStatusList((prevList) => [
        ...prevList,
        { [characters[currentCardIndex].name]: 1 },
      ]);
      setCurrentCardIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleDislike = () => {
    // Trigger a left swipe (dislike)
    if (currentCardIndex < characters.length) {
      setCardStatusList((prevList) => [
        ...prevList,
        { [characters[currentCardIndex].name]: 0 },
      ]);
      setCurrentCardIndex((prevIndex) => prevIndex + 1);
    }
  };

  const outOfFrame = (name) => {
    console.log(`${name} left the screen!`);
  };

  const exportToCsv = () => {
    const csvContent = cardStatusList.map(status => {
      const values = Object.values(status);
      return values.join(',');
    }).join('\n');
  
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement('a');
  
    // Set the href to the relative path of the "downloads" folder
    a.href = `../PY/data/input.csv`;
  
    a.download = 'input.csv';
    a.click();
  };
  
  
  useEffect(() => {
    if (currentCardIndex === characters.length) {
      setAllCardsSwiped(true);
      exportToCsv();
    }
  }, [currentCardIndex, characters.length]);

  return (
    <div className="card-stack">
      {characters.map((character, index) => (
        index === currentCardIndex && (
            <TinderCard
            key={character.name}
            className="swipe"
            onSwipe={(dir) => swiped(dir)}
            onCardLeftScreen={() => outOfFrame(character.name)}
            preventSwipe={['up', 'down']}
        >
            <div
                className="tinder-card"
                style={{
                    backgroundImage: index === currentCardIndex ? `url(${character.image})` : 'none',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundColor: 'transparent',
                    boxShadow: '5px 10px 18px #888888',
                    borderRadius: 10,
                    height: 300,
                }}
            >
                <h3>{character.name}</h3>
            </div>
        </TinderCard>
        
        )
      ))}
      <div className="button-container">
                <button className="dislike-button" onClick={handleDislike}>
                    Dislike
                </button>
                <button className="like-button" onClick={handleLike}>
                    Like
                </button>
            </div>
      <div>
        <h3>Liked/Disliked Status:</h3>
        <ul>
          {cardStatusList.map((status, index) => (
            <li key={index}>{JSON.stringify(status)}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CardStack;
