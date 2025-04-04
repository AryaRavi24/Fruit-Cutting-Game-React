import React, { useState } from 'react'
import Navigation from '../component/Navigation'

function Home() {

    const [isGameStart, setGameStart] = useState(false);

    function gameStart(){
        setGameStart(true);
    }

  return (
    <>
    <div className="w-screen h-screen">
        <img src="/bg3.jpg" alt="" className="w-full h-full" />
        <div className="w-3/4 h-screen absolute top-1/2 -translate-1/2 left-1/2">
          <div className="bg-amber-600 p-1 w-[500px] mx-auto mt-3 rounded-lg"><h1 className="text-center text-4xl text-brown-600 font py-2 shdow-lg">Fruit Fallout</h1></div>
            <div className="w-3/4 h-3/4 absolute top-1/2 -translate-1/2 left-1/2 bg-red-900 overflow-hidden rounded-lg">
              <img src="/wood-bg2.jpg" alt="" className="h-full rounded-lg" />
              {
                    isGameStart? <Navigation  /> : <button className="bg-lime-900 p-1 w-[200px] rounded-lg absolute top-1/2 left-1/2 -translate-1/2 text-3xl text-white py-3 shadow-lg shadow-zinc-800" onClick={gameStart}>Start Game</button>
              }
              
            </div>

        </div>

      </div>
    </>
  )
}

export default Home