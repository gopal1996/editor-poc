import React from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export const Ckeditor5Build = () => {
    const handlingDragDrop = (event) => {
        const draggedValue = event.target.dataset["value"]
        event.dataTransfer.effectAllowed = 'move'
        event.dataTransfer.dropEffect = 'move';
        event.dataTransfer.setData('text/plain', draggedValue)
    }

    return (
        <div className="wrapper">
            <div className="flow-field">
                <ul className="flow-field--list" onDragStart={handlingDragDrop}>
                    <li data-value="{{requestor_email}}" className="flow-field--item" contentEditable="false" draggable="true">Requestor Email</li>
                    <li data-value="{{created_by}}" className="flow-field--item" draggable="true">Created By</li>
                    <li data-value="{{created_at}}" className="flow-field--item" draggable="true">Created At</li>
                    <li data-value="{{requestor_name}}" className="flow-field--item" draggable="true">Requestor Name</li>
                </ul>
            </div>
            <div className="editor-wrapper">
            <CKEditor
                    editor={ ClassicEditor }
                    data="<p>Hello from CKEditor 5!</p>"
                    config={{
                        allowedContent: true,
                        height: 500
                    }}
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />
            </div>
        </div>
    )
}


export const Ckeditor5Editor = () => {
    const handlingDragDrop = (event) => {
        const draggedValue = event.target.dataset["value"]
        event.dataTransfer.setData('text/html', draggedValue)
    }

    return (
        <>
            <div className="flow-field">
                <ul className="flow-field--list" onDragStart={handlingDragDrop}>
                    <li data-value="{{requestor_email}}" className="flow-field--item" draggable="true">Requestor Email</li>
                    <li data-value="{{created_by}}" className="flow-field--item" draggable="true">Created By</li>
                    <li data-value="{{created_at}}" className="flow-field--item" draggable="true">Created At</li>
                    <li data-value="{{requestor_name}}" className="flow-field--item" draggable="true">Requestor Name</li>
                </ul>
            </div>
            <div className="editor-wrapper">

            </div>
        </>
    )
}

