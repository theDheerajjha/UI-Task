import React, { useState, useEffect } from 'react';
import './Feed.css';
import { useAuth } from '../../context/AuthContext';
import PostEditor from '../../components/PostEditor/PostEditor';
import PostCard from '../../components/PostCard/PostCard';

interface Post {
  id: number;
  author: string;
  avatar?: string;
  content: string;
  emoji?: string;
  createdAt: string;
}

interface FeedProps {
  onShowAuthModal: (open: boolean) => void;
  setAuthModalMode: (mode: 'signin' | 'signup') => void;
}

const initialPosts: Post[] = [
  {
    id: 1,
    author: 'Theresa Webb',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    emoji: '😊',
    createdAt: '5 mins ago',
  },
  {
    id: 2,
    author: 'John Doe',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    emoji: '👍',
    createdAt: '5 mins ago',
  },
  {
    id: 3,
    author: 'Jane Doe',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    emoji: '💀',
    createdAt: '5 mins ago',
  },
];

const Feed: React.FC<FeedProps> = ({ onShowAuthModal, setAuthModalMode }) => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>(() => {
    const stored = localStorage.getItem('posts');
    return stored ? JSON.parse(stored) : initialPosts;
  });
  const [input, setInput] = useState('');
  const [publishing, setPublishing] = useState(false);

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  const handlePublish = () => {
    if (!user) {
      setAuthModalMode('signin');
      onShowAuthModal(true);
      return;
    }
    if (!input.trim()) return;
    setPublishing(true);
    setTimeout(() => {
      setPosts([
        {
          id: Date.now(),
          author: user.username,
          content: input,
          createdAt: 'just now',
        },
        ...posts,
      ]);
      setInput('');
      setPublishing(false);
    }, 500);
  };

  const handlePostAction = () => {
    if (!user) {
      setAuthModalMode('signin');
      onShowAuthModal(true);
      return;
    }
    alert('Function not implemented');
  };

  const handleEditorClick = () => {
    if (!user) {
      setAuthModalMode('signin');
      onShowAuthModal(true);
    }
  };

  return (
    <div className="feed-container">
      <main className="feed-main">
        <PostEditor
          value={input}
          onChange={setInput}
          onPublish={handlePublish}
          disabled={!user}
          publishing={publishing}
          onOtherAction={handlePostAction}
          onEditorClick={handleEditorClick}
        />
        <div className="feed-posts-container">
          {posts.map(post => (
            <PostCard
              key={post.id}
              author={post.author}
              avatar={post.avatar}
              emoji={post.emoji}
              content={post.content}
              createdAt={post.createdAt}
              onAction={handlePostAction}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Feed; 