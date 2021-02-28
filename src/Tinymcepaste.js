import React, {useState} from 'react'
import { cleanDocx } from '@prezly/docx-cleaner'
import { Editor } from '@tinymce/tinymce-react';

const TinymcePaste = () => {
    const [data, setData] = useState("<p>This is the initial content of the editor</p>")

    const handleEditorChange = (content, editor) => {
      setData(content)
    }

    const handlingDragDrop = (event) => {
        // event.dataTransfer.dropEffect = 'copy';
        const draggedValue = event.target.dataset["value"]
        // event.dataTransfer.effectAllowed = 'move'
        event.dataTransfer.setData('text/plain', draggedValue)
    }

    const pasteTextHandler = (content, editor) => {
      editor.dom.bind(editor.getBody(), 'paste', function(evt) {
        let g = evt.clipboardData || window.clipboardData;

        let html = g.getData('text/html');
        let rtf = g.getData('text/rtf');
        
        try {
          const cleanHtml = cleanDocx(html, rtf)
          console.log(cleanHtml)

          var m;
          let imageList = [];
          var re = /<img[^>]+src="([^">]+)"/g

          while(m = re.exec(cleanHtml)) {
            imageList.push(m[1])
          }

          if(imageList.length > 0) {
            let editorData = editor.getContent();

            var n;
            let localFile = [];
            while(n = re.exec(editorData)) {
              localFile.push(n[1])
            }

            for(let i=0; i< imageList.length; i++) {
              editorData = editorData.replace(localFile[i], imageList[i])
            }

            editor.setContent(editorData)
          }

        } catch(err) {
          console.error(err)
        }
      })
    }

    

    const handleSubmit = event => {
      const bodydata = new FormData()
      bodydata.append("desc", data)

      fetch("http://localhost:5000/pdf", {
        method: 'POST',
        body: bodydata
      })
      .then(res => res.json())
      .then(out => console.log(out))
    }

    function image_upload_handler (blobInfo, success, failure, progress) {
        var xhr, formData;
      
        xhr = new XMLHttpRequest();
        xhr.withCredentials = false;
        xhr.open('POST', 'http://localhost:5000/upload');
      
        xhr.upload.onprogress = function (e) {
          progress(e.loaded / e.total * 100);
        };
      
        xhr.onload = function() {
          var json;
      
          if (xhr.status === 403) {
            failure('HTTP Error: ' + xhr.status, { remove: true });
            return;
          }
      
          if (xhr.status < 200 || xhr.status >= 300) {
            failure('HTTP Error: ' + xhr.status);
            return;
          }
      
          json = JSON.parse(xhr.responseText);
      
          if (!json || typeof json.location != 'string') {
            failure('Invalid JSON: ' + xhr.responseText);
            return;
          }
      
          success(json.location);
        };
      
        xhr.onerror = function () {
          failure('Image upload failed due to a XHR Transport error. Code: ' + xhr.status);
        };
      
        formData = new FormData();
        formData.append('file', blobInfo.blob(), blobInfo.filename());
      
        xhr.send(formData);
      };

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
                <Editor
                    apiKey="ppe8bocqidi6k504raaby1y8j4ue3c0l7wgvcuujgopdzsuh"
                    initialValue={data}
                    init={{
                    width: 800,
                    height: 500,
                    menubar: false,
                    plugins: [
                        'autolink lists link image print preview anchor',
                        'code',
                        'paste',
                        'table'
                    ],
                    toolbar:
                        'bold italic | alignleft alignright aligncenter alignjustify | bullist numlist | image code table tabledelete | tableprops tablerowprops tablecellprops | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol',
                    paste_data_images: true,
                    automatic_uploads: true,
                    paste_enable_default_filters: false,	
                    paste_remove_styles_if_webkit: false,
                    images_upload_handler: image_upload_handler,
                    }}
                    // paste_word_valid_elements: 'b,strong,i,em,h1,h2,h3,h4,table,th,td,p,img',
                    // paste_retain_style_properties: 'all'
                    onEditorChange={handleEditorChange}
                    onInit={pasteTextHandler}
                />

                <button onClick={handleSubmit}>Send data to server</button>
            </div>
        </div>
    )
}

export default TinymcePaste
