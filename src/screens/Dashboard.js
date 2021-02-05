import React, { useState, useEffect } from 'react';
import '../css/Dashboard.css'
import EmptyCard from '../components/EmptyCard';
import AddGame from '../components/AddGame';
import { getDB } from '../api/Firebase';
import { userToken } from '../State';
import { useRecoilState } from 'recoil';
import GameItem from '../components/GameItem';
import FloatingButton from '../components/FloatingButton';


const Dashboard = () => {
    const [addDialog, setAddDialog] = useState(false);
    const [games, setGames] = useState([]);

    const [user, setUser] = useRecoilState(userToken);


    useEffect(() => {
        const unsubscribe = getDB().collection('users')
            .doc(user.uid).collection('games')
            .onSnapshot(snapshot => {
                if (snapshot.size) {
                    let list = [];

                    snapshot.forEach(doc => {
                        list.push({
                            ...doc.data(),
                            id: doc.id
                        });
                    });

                    setGames(list);

                } else {
                    // empty
                }
            });

        return () => {
            unsubscribe();
        }
    }, []);

    const addGame = () => {
        setAddDialog(true);
    }

    const gameDelete = (id) => {
        if (games.length == 1) {
            setGames([]);
        }
        const db = getDB();
        db.collection('users').doc(user.uid).collection('games').doc(id).delete();
    }


    return (
        <div className="dash-container">
            {addDialog ? <AddGame onClose={() => { setAddDialog(false) }} /> : null}
            <h4>Games</h4>
            {games.length <= 0 ? <EmptyCard onClick={addGame} /> : null}

            {games.map(item => {
                return <GameItem key={item.id} data={item} onDelete={gameDelete} />
            })}

            <FloatingButton onClick={() => { setAddDialog(true) }} />

        </div>
    );
}

export default Dashboard;