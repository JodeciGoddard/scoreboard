import React, { useState, useEffect } from 'react';
import '../css/Game.css'
import { useParams } from 'react-router-dom';
import CustomButton from '../components/CustomButton';
import { getDB } from '../api/Firebase';
import { useRecoilState } from 'recoil';
import { userToken } from '../State';
import PlayerItem from '../components/PlayerItem';
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';
import ScoreOverlay from '../components/ScoreOverlay';

const Game = () => {

    const [name, setName] = useState('');
    const [initScore, setInitScore] = useState(0);
    const [players, setPlayers] = useState([]);
    const [gameType, setGameType] = useState('');
    const [leader, setLeader] = useState('');

    const [update, setUpdate] = useState(false);
    const [user, setUser] = useRecoilState(userToken);

    const [expanded, setExpanded] = useState(true);
    const [showInfo, setShowInfo] = useState(false);
    const [overlay, setOverlay] = useState(-1);

    let { id } = useParams();

    const toggleExpanded = () => {
        setExpanded(!expanded);
    }

    const toggleInfo = () => {
        setShowInfo(!showInfo);
    }

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
                if (data.players) setPlayers(data.players);
                if (data.type) setGameType(data.type);
                if (data.leader) setLeader(data.leader);

                if (data.players.length > 0) {
                    setExpanded(false);
                }
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

            calculateLeader();

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
        if (!players || players.length <= 0) {
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

    const removePlayer = (id) => {
        for (let i = 0; i < players.length; i++) {
            if (players[i].id === id) {
                let newarray = [...players];
                newarray.splice(i, 1);
                setPlayers(newarray);
                setUpdate(true);
            }
        }
    }

    const addRound = (id, score) => {
        //get the right player
        let nPlayer = {};
        let i = 0;
        for (i = 0; i < players.length; i++) {
            if (players[i].id === id) {
                nPlayer = { ...players[i] }
                break;
            }
        }

        //add the rounds
        let rounds = [];
        if (nPlayer.rounds) {
            nPlayer.rounds.push(parseInt(score));
        } else {
            rounds = [parseInt(score)];
            nPlayer = { ...nPlayer, rounds: rounds };
        }


        //calculate the players score
        let total = parseInt(nPlayer.score);
        total += parseInt(score);

        nPlayer = { ...nPlayer, score: total }

        let newPlayers = [...players];
        newPlayers[i] = nPlayer;

        setPlayers(newPlayers);
        setUpdate(true);

    }

    const calculateLeader = () => {
        if (!players || players.length <= 0) {
            setLeader('none');
            return;
        }

        let newLeader;
        for (let i = 0; i < players.length; i++) {
            if (i === 0) {
                newLeader = players[i];
                continue;
            }
            if (gameType === 'Highest Score' || gameType === 'First to Score') {
                if (players[i].score > newLeader.score) newLeader = players[i];
                continue;
            }

            if (gameType === 'Lowest Score' || gameType === 'Last to Score') {
                if (players[i].score < newLeader.score) newLeader = players[i];
                continue;
            }
        }

        console.log("leader changed");
        setLeader(newLeader);
    }

    return (
        <div className="game-container">

            {overlay >= 0 ? <ScoreOverlay id={overlay} onClose={() => { setOverlay(-1) }} getScore={addRound} /> : null}

            <div className="game-card">
                <div className="game-card-heading">
                    <h3>Add Player</h3>
                    {expanded ? <AiFillMinusCircle className="game-icon" onClick={toggleExpanded} /> : <AiFillPlusCircle className="game-icon" onClick={toggleExpanded} />}
                </div>
                <input type="text" placeholder="Player name" onChange={updateName} value={name} className={expanded ? "" : "hide-item"} />
                <input type="number" placeholder="initial score" onChange={updateInitScore} value={initScore} className={expanded ? "" : "hide-item"} />
                <CustomButton className={expanded ? "add-btn" : "add-btn hide-item"} width="50%" onClick={addPlayer}>Add</CustomButton>
            </div>

            <div className="game-card">
                <div className="game-card-heading">
                    <h3>Game Info</h3>
                    {showInfo ? <AiFillMinusCircle className="game-icon" onClick={toggleInfo} /> : <AiFillPlusCircle className="game-icon" onClick={toggleInfo} />}
                </div>
                <div className="game-info">
                    <p className={showInfo ? "" : "hide-item"}>Game Type: <span>{gameType}</span></p>
                    <p className={showInfo ? "" : "hide-item"}>Game Leader: <span>{leader === 'none' ? 'none' : leader.name}</span> </p>
                </div>

            </div>

            {players && players.map(item => {
                return (
                    <PlayerItem key={item.id} data={item} onRemove={removePlayer} onAdd={setOverlay} />
                );
            })}
        </div>
    );
}

export default Game;