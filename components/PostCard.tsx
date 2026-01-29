
import React from 'react';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
  onReadMore: (post: Post) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onReadMore }) => {
  return (
    <article className="group mb-12 animate-fadeIn bg-white">
      <div 
        className="relative overflow-hidden mb-6 aspect-video cursor-pointer"
        onClick={() => onReadMore(post)}
      >
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-brand-teal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <span className="text-white bg-brand-teal px-4 py-2 text-xs font-bold uppercase tracking-widest">পাঠ করুন</span>
        </div>
      </div>
      <div className="space-y-3">
        <span className="text-brand-gold font-sans uppercase tracking-widest text-[10px] font-bold">
          {post.category}
        </span>
        <h3 
          className="text-2xl md:text-3xl text-gray-900 serif-font font-bold leading-tight group-hover:text-brand-teal transition-colors cursor-pointer"
          onClick={() => onReadMore(post)}
        >
          {post.title}
        </h3>
        <p className="text-gray-600 leading-relaxed font-sans font-normal line-clamp-3">
          {post.excerpt}
        </p>
        <div className="flex justify-between items-center pt-2">
          <div className="flex items-center gap-2 text-[11px] text-gray-400 font-sans uppercase tracking-widest">
            <span>{post.date}</span>
            <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
            <span>৫ মিনিট পাঠ</span>
          </div>
          <button 
            onClick={() => onReadMore(post)}
            className="text-brand-teal font-sans uppercase tracking-widest text-[10px] font-bold border-b-2 border-brand-teal/30 hover:border-brand-gold transition-all pb-0.5"
          >
            আরও পড়ুন
          </button>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
