import React from 'react';
import './PostCard.css';

interface PostCardProps {
  author: string;
  avatar?: string;
  emoji?: string;
  content: string;
  createdAt: string;
  onAction?: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ author, avatar, emoji, content, createdAt, onAction }) => (
  <div className="post-card">
    <div className="post-card-content-area">
      <div className="post-card-header">
        {avatar && <img src={avatar} alt={author} className="post-card-avatar" />}
        <div className="post-card-author-info">
          <div className="post-card-author">{author}</div>
          <div className="post-card-time">{createdAt}</div>
        </div>
      </div>
      <div className="post-card-content">
        {emoji} <span className="post-card-text">{content}</span>
      </div>
    </div>
    <div className="post-card-actions-area">
      <div className="post-card-actions">
        <button type="button" className="post-card-action-button" onClick={onAction}>♡</button>
        <button type="button" className="post-card-action-button" onClick={onAction}>💬</button>
        <button type="button" className="post-card-action-button" onClick={onAction}>🔗</button>
      </div>
    </div>
  </div>
);

export default PostCard; 