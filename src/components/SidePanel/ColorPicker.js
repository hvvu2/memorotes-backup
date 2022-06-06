import React, { useState } from 'react';
import { CustomPicker } from 'react-color';

function Slider() {
    return <div className='color-picker__slider'></div>;
}

function Cursor() {
    return <div className='color-picker__cursor'></div>;
}

function ColorPicker() {
    const [hex, setHex] = useState('#FFFFFF');

    return (
        <div className='color-picker'>
        </div>
    );
}

export default ColorPicker;