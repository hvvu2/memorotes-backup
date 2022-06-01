import React from 'react';
import Navbar from '../components/Navbar/Navbar.js';
import SidePanel from '../components/SidePanel/SidePanel.js';
import DisplayBoard from '../components/DisplayBoard/DisplayBoard.js';
import Popups from '../components/Popups/Popups.js';

function HomePage() {
    return (
        <div className='home'>
            <Navbar />
            <SidePanel />
            <DisplayBoard />
            <Popups />
        </div>
    );
}

export default HomePage;