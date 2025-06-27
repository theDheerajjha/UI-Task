import React from 'react';
import './PostEditor.css';

interface PostEditorProps {
  value: string;
  onChange: (v: string) => void;
  onPublish: () => void;
  disabled?: boolean;
  publishing?: boolean;
  onOtherAction: () => void;
  onEditorClick?: () => void;
}

const PostEditor: React.FC<PostEditorProps> = ({ value, onChange, onPublish, disabled, publishing, onOtherAction, onEditorClick }) => (
  <div className="post-editor">
    <div className="post-editor-toolbar">
      <select className="post-editor-select" onClick={onOtherAction}>
        <option>Paragraph</option>
      </select>
      <button type="button" className="post-editor-toolbar-button" onClick={onOtherAction}>B</button>
      <button type="button" className="post-editor-toolbar-button italic" onClick={onOtherAction}>I</button>
      <button type="button" className="post-editor-toolbar-button underline" onClick={onOtherAction}>U</button>
      <button type="button" className="post-editor-toolbar-button" onClick={onOtherAction}>•</button>
      <button type="button" className="post-editor-toolbar-button" onClick={onOtherAction}>1.</button>
      <button type="button" className="post-editor-toolbar-button" onClick={onOtherAction}>99</button>
      <button type="button" className="post-editor-toolbar-button" onClick={onOtherAction}>{'<>'}</button>
      <button type="button" className="post-editor-toolbar-button delete" onClick={onOtherAction}>🗑️</button>
    </div>
    <textarea
      className="post-editor-textarea"
      placeholder="How are you feeling today?"
      value={value}
      onChange={e => onChange(e.target.value)}
      onClick={onEditorClick}
      disabled={disabled}
    />
    <div className="post-editor-actions">
      <button type="button" className="post-editor-action-button" onClick={onOtherAction}>+</button>
      <button type="button" className="post-editor-action-button" onClick={onOtherAction}>🙂</button>
      <button type="button" className="post-editor-action-button" onClick={onOtherAction}>💬</button>
      <button
        type="button"
        className="post-editor-publish-button"
        onClick={onPublish}
        disabled={publishing || !value.trim()}
      >
        {publishing ? 'Publishing...' : <span className="post-editor-publish-icon">➤</span>}
      </button>
    </div>
  </div>
);

export default PostEditor; 