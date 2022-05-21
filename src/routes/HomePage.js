import React from 'react';
import Navbar from '../components/Navbar/Navbar.js';
import DisplayBoard from '../components/DisplayBoard/DisplayBoard.js';
// import SidePanel from '../components/SidePanel/SidePanel.js';
import Popups from '../components/Popups/Popups.js';

function HomePage() {
    return (
        <div className='home'>
            <Navbar />
            <DisplayBoard />
            {/* <SidePanel /> */}
            <Popups />
        </div>
    );
}

export default HomePage;