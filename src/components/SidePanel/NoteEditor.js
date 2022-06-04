import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { modifyNoteBg } from '../../features/panelSlice';

function NoteEditor() {
    const dispatch = useDispatch();
    const noteStatus = useSelector((state) => state.note.status);

    function onModifyNoteBg(code) {
        if (noteStatus === 'Creating' || noteStatus === 'Updating') {
            dispatch(modifyNoteBg(code));
        }
    }

    return (
        <div className='note-editor'>
            <h1 className='note-editor__title'>Note Color</h1>
            <div className='note-editor__wrapper'>
                <button className='note-editor__btn' onClick={() => onModifyNoteBg('#FFCACA')} />
                <button className='note-editor__btn' onClick={() => onModifyNoteBg('#FFD4A1')} />
                <button className='note-editor__btn' onClick={() => onModifyNoteBg('#FDFF93')} />
                <button className='note-editor__btn' onClick={() => onModifyNoteBg('#B4FFB2')} />
                <button className='note-editor__btn' onClick={() => onModifyNoteBg('#AAD6FF')} />
                <button className='note-editor__btn' onClick={() => onModifyNoteBg('#8DADFF')} />
                <button className='note-editor__btn' onClick={() => onModifyNoteBg('#E8B7FF')} />
            </div>
        </div>
    );
}


export default NoteEditor;