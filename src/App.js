import React from 'react'
import './App.css'
// import Ckeditor4 from './Ckeditor4';
// import { Ckeditor5Build, Ckeditor5Editor } from './Ckeditor5';

import Tinymce from './Tinymce';
import TinymcePaste from './Tinymcepaste';

const style = {
    textAlign: "center"
}

const App = () => {

    return (
        <section className="main">
            <div className="container">
                <h3 style={style}>TinyMce Demo</h3>
                <div className="github" style={{margin: "0 auto"}}>
                    <ul>
                        <li>Github Stars - 9.1k</li>
                        <li>Github Open Issue - 556</li>
                        <li>Recent Commit - 3 days ago</li>
                        <li><a href="https://github.com/tinymce/tinymce">Github Link</a></li>
                    </ul>
                </div>
                <Tinymce />
                <hr/>
                <h3 style={style}>TinyMce Paste Demo</h3>
                <div className="github" style={{margin: "0 auto"}}>
                    <ul>
                        <li>Github Stars - 9.1k</li>
                        <li>Github Open Issue - 556</li>
                        <li>Recent Commit - 3 days ago</li>
                        <li><a href="https://github.com/tinymce/tinymce">Github Link</a></li>
                    </ul>
                </div>
                <TinymcePaste />
                <hr/>
                {/* <h3 style={style}>Ckeditor 4 Demo</h3>
                <div className="github" style={{margin: "0 auto"}}>
                    <ul>
                        <li>Github Stars - 5.3k</li>
                        <li>Github Open Issue - 1078</li>
                        <li>Recent Commit - 19 days ago</li>
                        <li><a href="https://github.com/ckeditor/ckeditor4">Github Link</a></li>
                    </ul>
                </div> */}
                {/* <Ckeditor4 />
                <hr/>
                <h3 style={style}>Ckeditor 5 Ready to use version Demo</h3>
                <div className="github" style={{margin: "0 auto"}}>
                    <ul>
                        <li>Github Stars - 4.3k</li>
                        <li>Github Open Issue - 1683</li>
                        <li>Recent Commit - 3 days ago</li>
                        <li><a href="https://github.com/ckeditor/ckeditor5">Github Link</a></li>
                    </ul>
                </div>
                <Ckeditor5Build /> */}
                {/* <Ckeditor5Editor /> */}
            </div>
        </section>
    )
}

export default App
