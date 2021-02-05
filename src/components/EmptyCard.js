import React from 'react';
import '../css/EmptyCard.css';
import { BiPlus } from 'react-icons/bi';

const EmptyCard = ({ onClick }) => {
    const add = () => {
        onClick();
    }
    return (
        <div className="ecard-container" onClick={add}>
            <div className="ecard-icon-container">
                <BiPlus className="ecard-icon" />
            </div>
        </div>
    );
}

export default EmptyCard;