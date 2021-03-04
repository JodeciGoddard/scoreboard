import React from 'react';
import '../css/Game.css'
import { useParams } from 'react-router-dom';

const Game = () => {

    let { id } = useParams();

    return (
        <div className="game-container">
            <div className="game-player">

            </div>
        </div>
    );
}

export default Game;