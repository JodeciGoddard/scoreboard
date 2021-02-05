import React from 'react';
import '../css/FloatingButton.css';
import { BiPlus } from 'react-icons/bi';

const FloatingButton = ({ onClick }) => {

    const clicked = () => {
        onClick();
    }

    return (
        <div className="fb-container">
            <BiPlus onClick={clicked} />
        </div>
    );
}

export default FloatingButton;