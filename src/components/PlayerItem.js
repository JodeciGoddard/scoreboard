import React from 'react';
import '../css/PlayerItem.css';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { BiPlus } from 'react-icons/bi';

const PlayerItem = ({ data, onRemove, onAdd }) => {

    const remove = () => {
        if (window.confirm("Are you sure you wish to delete this player?")) {
            onRemove(data.id);
        }
    }

    const add = () => {
        onAdd(data.id);
    }

    return (
        <div className="player-container">
            <div className="player-name">
                <h4>{data.name}</h4>

                <BiPlus className="player-icon" onClick={add} />
                <RiDeleteBin6Line className="player-icon" onClick={remove} />


            </div>
            <div className="player-cs">
                <p>Total Score: {data.score}</p>
                <p>Position: 1st</p>
            </div>

            <div className="player-rounds">
                <h4>Rounds</h4>
                <div className="player-scores">
                    {data.rounds && data.rounds.map((score, index) => {
                        return (
                            <div className="player-list">
                                <h4>RND {index + 1}</h4>
                                <p>{score}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default PlayerItem;