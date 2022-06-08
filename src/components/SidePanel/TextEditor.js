import React from 'react';
import { useDispatch } from 'react-redux'
import {
    modifyDateColor,
    modifyTitleColor,
    modifyTitleWeight,
    modifyTitleStyle,
    modifyTitleDeco,
    modifyTitleAlign,
    modifyContentColor,
    modifyContentWeight,
    modifyContentStyle,
    modifyContentDeco,
    modifyContentAlign
} from '../../features/panelSlice';

function TextEditor() {
    const dispatch = useDispatch();

    function onModifyDateColor(code) {
        dispatch(modifyDateColor(code));
    }

    function onModifyTitleColor(code) {
        dispatch(modifyTitleColor(code));
    }

    function onModifyTitleAlign(type) {
        dispatch(modifyTitleAlign(type));
    }

    function onModifyContentColor(code) {
        dispatch(modifyContentColor(code));
    }

    function onModifyContentAlign(type) {
        dispatch(modifyContentAlign(type));
    }

    return (
        <div className='editor'>
            <h1 className='editor__title'>Text</h1>
            <h1 className='editor__sub-title'>Date Color</h1>
            <div className='editor__wrapper dateColor'>
                <button className='editor__btn' onClick={() => onModifyDateColor('#505050')} />
                <button className='editor__btn' onClick={() => onModifyDateColor('#777777')} />
                <button className='editor__btn' onClick={() => onModifyDateColor('#FFF7EC')} />
                <button className='editor__btn' onClick={() => onModifyDateColor('#78574C')} />
                <button className='editor__btn' onClick={() => onModifyDateColor('#AE9288')} />
            </div>
            <h1 className='editor__sub-title'>Title Color</h1>
            <div className='editor__wrapper titleColor'>
                <button className='editor__btn' onClick={() => onModifyTitleColor('#505050')} />
                <button className='editor__btn' onClick={() => onModifyTitleColor('#777777')} />
                <button className='editor__btn' onClick={() => onModifyTitleColor('#FFF7EC')} />
                <button className='editor__btn' onClick={() => onModifyTitleColor('#78574C')} />
                <button className='editor__btn' onClick={() => onModifyTitleColor('#AE9288')} />
            </div>
            <h1 className='editor__sub-title'>Title Style</h1>
            <div className='editor__wrapper titleStyle'>
                <button className='editor__btn' onClick={() => dispatch(modifyTitleWeight())}><i className='bx bx-bold'></i></button>
                <button className='editor__btn' onClick={() => dispatch(modifyTitleStyle())}><i className='bx bx-italic'></i></button>
                <button className='editor__btn' onClick={() => dispatch(modifyTitleDeco())}><i className='bx bx-underline' ></i></button>
                <button className='editor__btn' onClick={() => onModifyTitleAlign('left')}><i className='bx bx-align-left'></i></button>
                <button className='editor__btn' onClick={() => onModifyTitleAlign('center')}><i className='bx bx-align-middle'></i></button>
                <button className='editor__btn' onClick={() => onModifyTitleAlign('right')}><i className='bx bx-align-right'></i></button>
            </div>
            <h1 className='editor__sub-title'>Content Color</h1>
            <div className='editor__wrapper contentColor'>
                <button className='editor__btn' onClick={() => onModifyContentColor('#505050')} />
                <button className='editor__btn' onClick={() => onModifyContentColor('#777777')} />
                <button className='editor__btn' onClick={() => onModifyContentColor('#FFF7EC')} />
                <button className='editor__btn' onClick={() => onModifyContentColor('#78574C')} />
                <button className='editor__btn' onClick={() => onModifyContentColor('#AE9288')} />
            </div>
            <h1 className='editor__sub-title'>Content Style</h1>
            <div className='editor__wrapper contentStyle'>
                <button className='editor__btn' onClick={() => dispatch(modifyContentWeight())}><i className='bx bx-bold'></i></button>
                <button className='editor__btn' onClick={() => dispatch(modifyContentStyle())}><i className='bx bx-italic'></i></button>
                <button className='editor__btn' onClick={() => dispatch(modifyContentDeco())}><i className='bx bx-underline' ></i></button>
                <button className='editor__btn' onClick={() => onModifyContentAlign('left')}><i className='bx bx-align-left'></i></button>
                <button className='editor__btn' onClick={() => onModifyContentAlign('center')}><i className='bx bx-align-middle'></i></button>
                <button className='editor__btn' onClick={() => onModifyContentAlign('right')}><i className='bx bx-align-right'></i></button>
            </div>
        </div>
    );
};

export default TextEditor;