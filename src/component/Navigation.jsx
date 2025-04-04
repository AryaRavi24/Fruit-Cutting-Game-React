import React, { useEffect, useState } from 'react';
import {fruitDetails} from '../data';
import heartImg from "../assets/images/heart.png";
import { Link } from 'react-router-dom';


function Navigation() {
  const [fruits, setFruits] = useState([]);
  const [score, setScore] = useState(0);
  const [heartCount, setHeartCount] = useState(3);
  const [gameOver, setGameOver] = useState(false); 
  const [missedCount, setMissedCount] = useState(3);

  const getRandomPosition = () => Math.floor(Math.random() * 80) + 10;
  const getRandomSpeed = () => (Math.random() * 3 + 3).toFixed(2);

  useEffect(() => {
    if (gameOver) return; 

    const dropFruit = () => {
      if (fruits.length < 2) {
        const randomFruit = fruitDetails[Math.floor(Math.random() * fruitDetails.length)];

        const newFruit = {
          ...randomFruit,
          id: Date.now() + Math.random(),
          left: `${getRandomPosition()}%`,
          duration: `${getRandomSpeed()}s`,
        };

        setFruits((prevFruits) => [...prevFruits, newFruit]);

        setTimeout(() => {
            setFruits((prevFruits) => {
              const fruitStillThere = prevFruits.find((fruit) => fruit.id === newFruit.id);

                if(fruitStillThere && fruitStillThere.fruitName !== "bomb"){
                    if(heartCount > 1){
                        setHeartCount((prev)=> prev - 1)
                    }else{
                        setHeartCount(0);
                        setGameOver(true);
                    }
                }
              
  
              return prevFruits.filter((fruit) => fruit.id !== newFruit.id);
            });
          }, parseFloat(newFruit.duration) * 1000);
      }
    };

    const intervalId = setInterval(dropFruit, 1000);
    return () => clearInterval(intervalId);
  }, [fruits, gameOver]); 

  const handleSlice = (fruitId) => {
    setFruits((prevFruits) => {
      const clickedFruit = prevFruits.find((fruit) => fruit.id === fruitId);
      if (!clickedFruit) return prevFruits;

      if (clickedFruit.fruitName === "bomb") {
        if (heartCount > 1) {
          setHeartCount((prevCount) => prevCount - 1);
        } else {
          setHeartCount(0);
          setGameOver(true); 
        }
      } else {
        setScore((prevScore) => prevScore + 1);
      }

      return prevFruits.filter((fruit) => fruit.id !== fruitId);
    });
  };

  return (
    <>
      <div className="absolute top-2 w-full px-4 flex justify-between">
          {
            gameOver ? "" : <div className="flex gap-3 items-center font-bold text-lg text-amber-600"><img src="../src/assets/images/score.png" alt="score" className="w-9" /><h1>{score}</h1></div>
          }    
        
        <div className="flex">
          {Array(heartCount).fill(0).map((_, index) => (
            <img key={index} src={heartImg} alt="heart" className="w-10 h-10" />
          ))}
        </div>
      </div>

      {gameOver ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center  bg-opacity-60 text-white text-4xl font-bold z-50">
            <h1 className="">Game Over 💣</h1>
            <h1 className=" ">Your final score is : {score}</h1>
            <Link to='/' onClick={() => {setScore(0); setHeartCount(3);setGameOver(false);setFruits([]);}} className='bg-lime-900 py-3 w-[200px] rounded-lg text-xl text-center mt-3 shadow-lg shadow-zinc-800'>Restart Game</Link>
        </div>
        
      ) : (
        <div className="w-full h-full absolute top-0 px-1">
          {fruits.map((fruit) => (
            <img
              key={fruit.id}
              src={fruit.fruitImage}
              alt={fruit.fruitName}
              className="w-18 falling-object cursor-pointer"
              style={{
                left: fruit.left,
                animationDuration: fruit.duration,
              }}
              onClick={() => handleSlice(fruit.id)}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default Navigation;
