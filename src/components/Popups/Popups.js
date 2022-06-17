import React from 'react';
import { useSelector } from 'react-redux';
import Welcome from './Welcome.js';
import Gate from './Gate.js';
import User from './User.js';
import Alerts from './Alerts.js';

function Popups() {
    const welcomeToggle = useSelector((state) => state.popup.welcomeToggle);
    const gateToggle = useSelector((state) => state.popup.gateToggle);
    const userToggle = useSelector((state) => state.popup.userToggle);
    const alertToggle = useSelector((state) => state.popup.alertToggle);
    const alertType = useSelector((state) => state.popup.alertType);

    if (welcomeToggle || gateToggle || alertToggle || userToggle) {
        return (
            <div className='popups'>
                <Welcome toggle={welcomeToggle} />
                <Gate toggle={gateToggle} />
                <User toggle={userToggle} />
                <Alerts toggle={alertToggle} type={alertType} />
            </div>
        );
    }
}

export default Popups;