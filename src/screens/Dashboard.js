import React, { useState, useEffect } from 'react';
import '../css/Dashboard.css'
import EmptyCard from '../components/EmptyCard';
import AddGame from '../components/AddGame';

const Dashboard = () => {
    const [addDialog, setAddDialog] = useState(false);
    const addGame = () => {
        setAddDialog(true);
    }


    return (
        <div className="dash-container">
            {addDialog ? <AddGame onClose={() => { setAddDialog(false) }} /> : null}
            <h4>Games</h4>
            <EmptyCard onClick={addGame} />
        </div>
    );
}

export default Dashboard;