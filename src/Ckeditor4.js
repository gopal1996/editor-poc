import React from 'react'
import CKEditor from 'ckeditor4-react';

const Ckeditor4 = () => {
    const handlingDragDrop = (event) => {
        const draggedValue = event.target.dataset["value"]
        event.dataTransfer.setData('text/html', draggedValue)
    }

    return (
        <div className="wrapper">
            <div className="flow-field">
                <ul className="flow-field--list" onDragStart={handlingDragDrop}>
                    <li data-value="{{requestor_email}}" className="flow-field--item" draggable="true">Requestor Email</li>
                    <li data-value="{{created_by}}" className="flow-field--item" draggable="true">Created By</li>
                    <li data-value="{{created_at}}" className="flow-field--item" draggable="true">Created At</li>
                    <li data-value="{{requestor_name}}" className="flow-field--item" draggable="true">Requestor Name</li>
                </ul>
            </div>
            <div className="editor-wrapper">
                <CKEditor
                        data="This is a CKEditor 4 WYSIWYG editor instance created by ️⚛️ React."
                        config={{
                            toolbar: [
                                [ 'Source' ],
                                [ 'Styles', 'Format', 'Font', 'FontSize', 'Image', 'uploadimage','uploadwidget','filetools','filebrowser' ],
                                [ 'Bold', 'Italic', 'dialog', 'dialogui', 'table', 'tabletools', 'tabletoolstoolbar' ],
                                [ 'PasteFromWord','pastetools','clipboard', 'Undo', 'Redo' ],
                                [ 'About' ]
                            ],
                            allowedContent: true,
                            height: 500,
                            width: 800,
                            filebrowserImageUploadUrl: "http://localhost:5000/upload"
                        }}
                        
                />
            </div>
        </div>
    )
}

export default Ckeditor4
