import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { 
    modifyNoteColor,
    modifyNoteStyle,
    modifyNoteTag
} from '../../features/panelSlice';

function NoteEditor() {
    const dispatch = useDispatch();
    const noteStatus = useSelector((state) => state.note.status);

    function onModifyNoteColor(code) {
        if (noteStatus === 'Creating' || noteStatus === 'Updating') {
            dispatch(modifyNoteColor(code));
        }
    }

    function onModifyNoteStyle(type) {
        if (noteStatus === 'Creating' || noteStatus === 'Updating') {
            dispatch(modifyNoteStyle(type));
        }
    }

    function onModifyNoteTag(code) {
        if (noteStatus === 'Creating' || noteStatus === 'Updating') {
            dispatch(modifyNoteTag(code));
        }
    }

    return (
        <div className='editor'>
            <h1 className='editor__title'>Note</h1>
            <h1 className='editor__sub-title'>Color</h1>
            <div className='editor__wrapper noteColor'>
                <button className='editor__btn' onClick={() => onModifyNoteColor('#FFCACA')} />
                <button className='editor__btn' onClick={() => onModifyNoteColor('#FFD4A1')} />
                <button className='editor__btn' onClick={() => onModifyNoteColor('#FDFF93')} />
                <button className='editor__btn' onClick={() => onModifyNoteColor('#B4FFB2')} />
                <button className='editor__btn' onClick={() => onModifyNoteColor('#AAD6FF')} />
                <button className='editor__btn' onClick={() => onModifyNoteColor('#8DADFF')} />
                <button className='editor__btn' onClick={() => onModifyNoteColor('#E8B7FF')} />
            </div>
            <h1 className='editor__sub-title'>Style</h1>
            <div className='editor__wrapper noteStyle'>
                <button className='editor__btn' onClick={() => onModifyNoteStyle(null)}>Blank</button>
                <button className='editor__btn' onClick={() => onModifyNoteStyle('solid')}>Solid</button>
                <button className='editor__btn' onClick={() => onModifyNoteStyle('dashed')}>Dashed</button>
            </div>
            <h1 className='editor__sub-title'>Tag</h1>
            <div className='editor__wrapper noteTag'>
                <button className='editor__btn' onClick={() => onModifyNoteTag(null)}>Ｘ</button>
                <button className='editor__btn' onClick={() => onModifyNoteTag('yellow')} />
                <button className='editor__btn' onClick={() => onModifyNoteTag('pink')} />
                <button className='editor__btn' onClick={() => onModifyNoteTag('green')} />
                <button className='editor__btn' onClick={() => onModifyNoteTag('blue')} />
                <button className='editor__btn' onClick={() => onModifyNoteTag('gray')} />
            </div>
        </div>
    );
}

export default NoteEditor;