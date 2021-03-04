import React, { useState, useEffect } from 'react';
import '../css/Game.css'
import { useParams } from 'react-router-dom';
import CustomButton from '../components/CustomButton';
import { getDB } from '../api/Firebase';
import { useRecoilState } from 'recoil';
import { userToken } from '../State';
import PlayerItem from '../components/PlayerItem';

const Game = () => {

    const [name, setName] = useState('');
    const [initScore, setInitScore] = useState(0);
    const [players, setPlayers] = useState([]);
    const [gameType, setGameType] = useState('');
    const [leader, setLeader] = useState('');

    const [update, setUpdate] = useState(false);
    const [user, setUser] = useRecoilState(userToken);

    let { id } = useParams();



    const updateName = (e) => {
        setName(e.target.value);
    }

    const updateInitScore = (e) => {
        setInitScore(e.target.value);
    }

    useEffect(() => {
        //current game info
        const db = getDB();

        let ref = db.collection('users').doc(user.uid).collection('games').doc(id);

        ref.get().then(doc => {
            if (doc.exists) {
                let data = doc.data();
                setPlayers(data.players);
                setGameType(data.type);
                setLeader(data.leader);
            } else {
                console.log("User id: ", user.uid);
                console.log("game not found id:", id);
            }
        }).catch(error => {
            console.log("game error: ", error);
        });

    }, []);

    useEffect(() => {
        if (update) {
            let data = {
                leader: leader,
                players: players
            }

            let db = getDB();
            let ref = db.collection('users').doc(user.uid).collection('games').doc(id);

            ref.update(data).then(() => {
                console.log('update successful');
            }).catch(error => {
                console.log("update failed: ", error);
            })

            setUpdate(false);
        }
    }, [update]);

    const addPlayer = () => {
        if (name.trim() === '') return;
        let is = initScore ? initScore : 0;

        let player = {
            name: name,
            score: is,
            id: getPlayerID(),
        }

        setPlayers([...players, player]);
        setUpdate(true);
        setName('');
    }

    const getPlayerID = () => {
        if (players.length <= 0) {
            return 0;
        }

        let highest = players[0].id;
        for (let i = 0; i < players.length; i++) {
            if (players[i].id > highest) {
                highest = players[i].id;
            }
        }

        return highest + 1;

    }

    return (
        <div className="game-container">
            <div className="game-card">
                <h3>Add Player</h3>
                <input type="text" placeholder="Player name" onChange={updateName} value={name} />
                <input type="number" placeholder="initial score" onChange={updateInitScore} value={initScore} />
                <CustomButton className="add-btn" width="50%" onClick={addPlayer}>Add</CustomButton>
            </div>

            {players.map(item => {
                return (
                    <PlayerItem key={item.id} />
                );
            })}
        </div>
    );
}

export default Game;