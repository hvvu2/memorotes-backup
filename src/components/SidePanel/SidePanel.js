import React from 'react';
import { useSelector } from 'react-redux';
import NoteEditor from './NoteEditor.js';
import TextEditor from './TextEditor.js';

function SidePanel() {
    const panelToggle = useSelector((state) => state.panel.panelToggle);

    if (panelToggle) {
        return (
            <section className='side-panel'>
                <NoteEditor />
                <div className='divider'></div>
                <TextEditor />
            </section>
        );
    }
}

export default SidePanel;