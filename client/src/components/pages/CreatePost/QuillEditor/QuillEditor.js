import React, { useRef } from 'react';
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';

const QuillEditor = ({
  handleChange,
  content,
  placeholder
}) => {
  const reactQuill = useRef(null);

  const modules = {
    // syntax: true,
    toolbar: {
      container: '#toolbar'
    }
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'link',
    'code-block',
    'blockquote',
    'clean'
  ];

  return (
    <div>
      <div id="toolbar">
        <select
          className="ql-header"
          defaultValue=""
          onChange={event => event.persist()}
        >
          <option value="1" />
          <option value="2" />
          <option value="" />
        </select>
        <button className="ql-bold" />
        <button className="ql-italic" />
        <button className="ql-underline" />
        <button className="ql-strike" />
        <button className="ql-link" />
        <button className="ql-code-block" />
        <button className="ql-blockquote" />
        <button className="ql-clean" />
      </div>
      <ReactQuill
        ref={reactQuill}
        theme="snow"
        modules={modules}
        formats={formats}
        placeholder={placeholder ? placeholder : ''}
        value={content}
        onChange={handleChange}
      />
    </div>
  );
};

export default QuillEditor;
