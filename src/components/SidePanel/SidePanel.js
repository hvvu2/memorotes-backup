import React from 'react';
import { useSelector } from 'react-redux';

function SidePanel() {
    const panelToggle = useSelector((state) => state.panel.panelToggle);

    if (panelToggle) {
        return (
            <section className='side-panel'>
                
            </section>
        );
    }
}

export default SidePanel;