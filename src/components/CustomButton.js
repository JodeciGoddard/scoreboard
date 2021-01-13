import React, { Children } from 'react';
import '../css/CustomButton.css';

const CustomButton = ({ children, width, onClick, className }) => {

    const clicked = () => {
        onClick();
    }


    return (
        <div className={"button-container" + " " + className} style={{ width: width }} onClick={clicked} >
            {children}
        </div>
    );
}

export default CustomButton;