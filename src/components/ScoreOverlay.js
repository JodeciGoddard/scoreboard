import React, { useState } from 'react';
import '../css/ScoreOverlay.css';
import CustomButton from '../components/CustomButton';

const ScoreOverlay = ({ id, onClose, getScore }) => {

    const [score, setScore] = useState(0);

    const updateScore = (e) => {
        setScore(e.target.value);
    }

    const handleClick = (e) => {
        onClose();
    }

    const handleCardClick = (e) => {
        e.stopPropagation();
    }

    const returnScore = () => {
        getScore(id, score);
        onClose();
    }

    return (
        <div className="overlay-container" onClick={handleClick}>
            <div className="overlay-card" onClick={handleCardClick}>
                <h3>Select a Score</h3>
                <input readOnly type="text" placeholder="select a round" />
                <label htmlFor="score">Round Score</label>
                <input id="score" type="number" onChange={updateScore} value={score} />
                <CustomButton onClick={returnScore} className="overlay-btn">Save</CustomButton>
            </div>
        </div>
    );
}

export default ScoreOverlay;