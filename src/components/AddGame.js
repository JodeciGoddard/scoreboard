import React, { useState } from 'react';
import '../css/AddGame.css';
import { AiFillCloseCircle } from 'react-icons/ai';
import CustomButton from './CustomButton';

const AddGame = ({ onClose }) => {
    const [name, setName] = useState('');

    const [highest, setHighest] = useState(false);
    const [lowest, setLowest] = useState(false);
    const [first, setFirst] = useState(false);
    const [last, setLast] = useState(false);

    const updateName = (e) => {
        setName(e.target.value);
    }

    const closeDialog = () => {
        onClose();
    }

    const selectRadioButton = num => {
        setHighest(false);
        setLowest(false);
        setFirst(false);
        setLast(false);
        if (num === 0) setHighest(true);
        if (num === 1) setLowest(true);
        if (num === 2) setFirst(true);
        if (num === 3) setLast(true);
    }

    return (
        <div className="add-container">
            <div className="add-card">
                <AiFillCloseCircle className="add-close" onClick={closeDialog} />
                <h4>Add Game</h4>
                <label htmlFor="name">Name</label>
                <input id="name" type="text" placeholder="Name" value={name} onChange={updateName} />

                <div className="add-radio-group">
                    <h4>Type</h4>
                    <div className="add-radio" onClick={() => { selectRadioButton(0) }}>
                        Highest Score
                        <div className="radio-button">
                            {highest ? <div className="selected"></div> : null}
                        </div>
                    </div>
                    <div className="add-radio" onClick={() => { selectRadioButton(1) }}>
                        Lowest Score
                        <div className="radio-button">
                            {lowest ? <div className="selected"></div> : null}
                        </div>
                    </div>
                    <div className="add-radio" onClick={() => { selectRadioButton(2) }}>
                        First to Score
                        <div className="radio-button">
                            {first ? <div className="selected"></div> : null}
                        </div>
                    </div>
                    <div className="add-radio" onClick={() => { selectRadioButton(3) }}>
                        Last to Score
                        <div className="radio-button">
                            {last ? <div className="selected"></div> : null}
                        </div>
                    </div>
                </div>

                <CustomButton className="add-button" width="80%">Add</CustomButton>
            </div>
        </div>
    );
}

export default AddGame;