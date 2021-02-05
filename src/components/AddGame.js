import React, { useState } from 'react';
import '../css/AddGame.css';
import { AiFillCloseCircle } from 'react-icons/ai';
import CustomButton from './CustomButton';
import { addGame } from '../api/Firebase';
import { userToken } from '../State';
import { useRecoilState } from 'recoil';

const AddGame = ({ onClose }) => {
    const [name, setName] = useState('');

    const [highest, setHighest] = useState(false);
    const [lowest, setLowest] = useState(false);
    const [first, setFirst] = useState(false);
    const [last, setLast] = useState(false);

    const [user, setUser] = useRecoilState(userToken);

    const [error, setError] = useState('');

    const updateName = (e) => {
        setName(e.target.value);
        setError('');
    }

    const closeDialog = () => {
        onClose();
    }

    const selectRadioButton = num => {
        setError('');
        setHighest(false);
        setLowest(false);
        setFirst(false);
        setLast(false);
        if (num === 0) setHighest(true);
        if (num === 1) setLowest(true);
        if (num === 2) setFirst(true);
        if (num === 3) setLast(true);
    }

    const add = () => {
        if (name.trim() === '') {
            setError("Please enter a name.");
            return;
        }

        let type = 'Highest Score';

        if (lowest) type = 'Lowest Score';
        if (first) type = 'First to Score';
        if (last) type = 'Last to Score';

        const data = {
            name: name,
            type: type
        }

        //add the game
        addGame(user.uid, data, () => {
            console.log("Game successfully added");
            onClose();
        }, (error) => {
            console.log("Error:: ", error);
            setError(error.code);
        });

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

                {error !== '' ? <div className="add-error">
                    <p >{error}</p>
                </div> : null}

                <CustomButton onClick={add} className="add-button" width="80%">Add</CustomButton>
            </div>
        </div>
    );
}

export default AddGame;