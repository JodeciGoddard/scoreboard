import React from 'react';
import '../css/GameItem.css';
import { RiDeleteBin6Line } from 'react-icons/ri';

const GameItem = ({ data, onDelete, onClick }) => {

    const remove = (e) => {
        var answer = window.confirm("Are you sure you wish to delete?")
        if (answer) {
            onDelete(data.id);
        } else {
            return;
        }

        e.stopPropagation()
    }

    return (
        <div className="g-container" onClick={() => { onClick(data.id) }}>
            <div className="g-header">
                <h3>{data.name}</h3>
                <RiDeleteBin6Line className="g-delete" onClick={remove} />
            </div>

            <div>
                <p>Type: {data.type}</p>
                <p>Players: {data.players ? data.players.length : 0}</p>
                <p>Leader: {data.leader ? data.leader.name : "None"}</p>

                <p className="g-timestamp">{data.timestamp}</p>
            </div>
        </div>
    );
}

export default GameItem;