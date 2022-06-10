import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { 
    modifyNoteColor,
    modifyNoteStyle,
    modifyNoteTag
} from '../../features/panelSlice';

function NoteEditor() {
    const dispatch = useDispatch();
    const editorBtn = 'editor__btn';
    const editorBtnActive = 'editor__btn active';
    const noteStatus = useSelector((state) => state.note.status);
    const noteColor = useSelector((state) => state.panel.noteColor);
    const noteStyle = useSelector((state) => state.panel.noteStyle);
    const noteTag = useSelector((state) => state.panel.noteTag);

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
                <button className={noteColor === '#FFCACA' ? editorBtnActive : editorBtn} onClick={() => onModifyNoteColor('#FFCACA')} />
                <button className={noteColor === '#FFD4A1' ? editorBtnActive : editorBtn} onClick={() => onModifyNoteColor('#FFD4A1')} />
                <button className={noteColor === '#FDFF93' ? editorBtnActive : editorBtn} onClick={() => onModifyNoteColor('#FDFF93')} />
                <button className={noteColor === '#B4FFB2' ? editorBtnActive : editorBtn} onClick={() => onModifyNoteColor('#B4FFB2')} />
                <button className={noteColor === '#AAD6FF' ? editorBtnActive : editorBtn} onClick={() => onModifyNoteColor('#AAD6FF')} />
                <button className={noteColor === '#8DADFF' ? editorBtnActive : editorBtn} onClick={() => onModifyNoteColor('#8DADFF')} />
                <button className={noteColor === '#E8B7FF' ? editorBtnActive : editorBtn} onClick={() => onModifyNoteColor('#E8B7FF')} />
            </div>
            <h1 className='editor__sub-title'>Style</h1>
            <div className='editor__wrapper noteStyle'>
                <button className={noteStyle === 'blank' ? editorBtnActive : editorBtn} onClick={() => onModifyNoteStyle('blank')}>Blank</button>
                <button className={noteStyle === 'solid' ? editorBtnActive : editorBtn} onClick={() => onModifyNoteStyle('solid')}>Solid</button>
                <button className={noteStyle === 'dashed' ? editorBtnActive : editorBtn} onClick={() => onModifyNoteStyle('dashed')}>Dashed</button>
            </div>
            <h1 className='editor__sub-title'>Tag</h1>
            <div className='editor__wrapper noteTag'>
                <button className={noteTag === 'none' ? editorBtnActive : editorBtn} onClick={() => onModifyNoteTag('none')}><i className='bx bx-x'></i></button>
                <button className={noteTag === 'yellow' ? editorBtnActive : editorBtn} onClick={() => onModifyNoteTag('yellow')} />
                <button className={noteTag === 'pink' ? editorBtnActive : editorBtn} onClick={() => onModifyNoteTag('pink')} />
                <button className={noteTag === 'green' ? editorBtnActive : editorBtn} onClick={() => onModifyNoteTag('green')} />
                <button className={noteTag === 'blue' ? editorBtnActive : editorBtn} onClick={() => onModifyNoteTag('blue')} />
                <button className={noteTag === 'gray' ? editorBtnActive : editorBtn} onClick={() => onModifyNoteTag('gray')} />
            </div>
        </div>
    );
}

export default NoteEditor;