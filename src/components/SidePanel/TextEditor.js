import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
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
    const editorBtn = 'editor__btn';
    const editorBtnActive = 'editor__btn active';
    const noteStatus = useSelector((state) => state.note.status);
    const dateColor = useSelector((state) => state.panel.dateColor);
    const titleColor = useSelector((state) => state.panel.titleColor);
    const titleWeight = useSelector((state) => state.panel.titleWeight);
    const titleStyle = useSelector((state) => state.panel.titleStyle);
    const titleDeco = useSelector((state) => state.panel.titleDeco);
    const titleAlign = useSelector((state) => state.panel.titleAlign);
    const contentColor = useSelector((state) => state.panel.contentColor);
    const contentWeight = useSelector((state) => state.panel.contentWeight);
    const contentStyle = useSelector((state) => state.panel.contentStyle);
    const contentDeco = useSelector((state) => state.panel.contentDeco);
    const contentAlign = useSelector((state) => state.panel.contentAlign);

    function onModifyDateColor(code) {
        if (noteStatus === 'Creating' || noteStatus === 'Updating') {
            dispatch(modifyDateColor(code));
        }
    }

    function onModifyTitleColor(code) {
        if (noteStatus === 'Creating' || noteStatus === 'Updating') {
            dispatch(modifyTitleColor(code));
        }
    }

    function onModifyTitleAlign(type) {
        if (noteStatus === 'Creating' || noteStatus === 'Updating') {
            dispatch(modifyTitleAlign(type));
        }
    }

    function onModifyContentColor(code) {
        if (noteStatus === 'Creating' || noteStatus === 'Updating') {
            dispatch(modifyContentColor(code));
        }
    }

    function onModifyContentAlign(type) {
        if (noteStatus === 'Creating' || noteStatus === 'Updating') {
            dispatch(modifyContentAlign(type));
        }
    }

    return (
        <div className='editor'>
            <h1 className='editor__title'>Text</h1>
            <h1 className='editor__sub-title'>Date Color</h1>
            <div className='editor__wrapper dateColor'>
                <button className={dateColor === '#505050' ? editorBtnActive : editorBtn} onClick={() => onModifyDateColor('#505050')} />
                <button className={dateColor === '#777777' ? editorBtnActive : editorBtn} onClick={() => onModifyDateColor('#777777')} />
                <button className={dateColor === '#FFF7EC' ? editorBtnActive : editorBtn} onClick={() => onModifyDateColor('#FFF7EC')} />
                <button className={dateColor === '#78574C' ? editorBtnActive : editorBtn} onClick={() => onModifyDateColor('#78574C')} />
                <button className={dateColor === '#AE9288' ? editorBtnActive : editorBtn} onClick={() => onModifyDateColor('#AE9288')} />
            </div>
            <h1 className='editor__sub-title'>Title Color</h1>
            <div className='editor__wrapper titleColor'>
                <button className={titleColor === '#505050' ? editorBtnActive : editorBtn} onClick={() => onModifyTitleColor('#505050')} />
                <button className={titleColor === '#777777' ? editorBtnActive : editorBtn} onClick={() => onModifyTitleColor('#777777')} />
                <button className={titleColor === '#FFF7EC' ? editorBtnActive : editorBtn} onClick={() => onModifyTitleColor('#FFF7EC')} />
                <button className={titleColor === '#78574C' ? editorBtnActive : editorBtn} onClick={() => onModifyTitleColor('#78574C')} />
                <button className={titleColor === '#AE9288' ? editorBtnActive : editorBtn} onClick={() => onModifyTitleColor('#AE9288')} />
            </div>
            <h1 className='editor__sub-title'>Title Style</h1>
            <div className='editor__wrapper titleStyle'>
                <button className={titleWeight === 'bold' ? editorBtnActive : editorBtn} onClick={() => dispatch(modifyTitleWeight())}><i className='bx bx-bold'></i></button>
                <button className={titleStyle === 'italic' ? editorBtnActive : editorBtn} onClick={() => dispatch(modifyTitleStyle())}><i className='bx bx-italic'></i></button>
                <button className={titleDeco === 'underline' ? editorBtnActive : editorBtn} onClick={() => dispatch(modifyTitleDeco())}><i className='bx bx-underline' ></i></button>
                <button className={titleAlign === 'left' ? editorBtnActive : editorBtn} onClick={() => onModifyTitleAlign('left')}><i className='bx bx-align-left'></i></button>
                <button className={titleAlign === 'center' ? editorBtnActive : editorBtn} onClick={() => onModifyTitleAlign('center')}><i className='bx bx-align-middle'></i></button>
                <button className={titleAlign === 'right' ? editorBtnActive : editorBtn} onClick={() => onModifyTitleAlign('right')}><i className='bx bx-align-right'></i></button>
            </div>
            <h1 className='editor__sub-title'>Content Color</h1>
            <div className='editor__wrapper contentColor'>
                <button className={contentColor === '#505050' ? editorBtnActive : editorBtn} onClick={() => onModifyContentColor('#505050')} />
                <button className={contentColor === '#777777' ? editorBtnActive : editorBtn} onClick={() => onModifyContentColor('#777777')} />
                <button className={contentColor === '#FFF7EC' ? editorBtnActive : editorBtn} onClick={() => onModifyContentColor('#FFF7EC')} />
                <button className={contentColor === '#78574C' ? editorBtnActive : editorBtn} onClick={() => onModifyContentColor('#78574C')} />
                <button className={contentColor === '#AE9288' ? editorBtnActive : editorBtn} onClick={() => onModifyContentColor('#AE9288')} />
            </div>
            <h1 className='editor__sub-title'>Content Style</h1>
            <div className='editor__wrapper contentStyle'>
                <button className={contentWeight === 'bold' ? editorBtnActive : editorBtn} onClick={() => dispatch(modifyContentWeight())}><i className='bx bx-bold'></i></button>
                <button className={contentStyle === 'italic' ? editorBtnActive : editorBtn} onClick={() => dispatch(modifyContentStyle())}><i className='bx bx-italic'></i></button>
                <button className={contentDeco === 'underline' ? editorBtnActive : editorBtn} onClick={() => dispatch(modifyContentDeco())}><i className='bx bx-underline' ></i></button>
                <button className={contentAlign === 'left' ? editorBtnActive : editorBtn} onClick={() => onModifyContentAlign('left')}><i className='bx bx-align-left'></i></button>
                <button className={contentAlign === 'center' ? editorBtnActive : editorBtn} onClick={() => onModifyContentAlign('center')}><i className='bx bx-align-middle'></i></button>
                <button className={contentAlign === 'right' ? editorBtnActive : editorBtn} onClick={() => onModifyContentAlign('right')}><i className='bx bx-align-right'></i></button>
            </div>
        </div>
    );
};

export default TextEditor;