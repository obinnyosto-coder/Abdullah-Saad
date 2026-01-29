
import React from 'react';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
  onViewPost: (id: number) => void;
  featured?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, onViewPost, featured }) => {
  if (featured) {
    return (
      <article className="group animate-fadeIn bg-white shadow-xl overflow-hidden rounded-sm border border-gray-100 grid grid-cols-1 md:grid-cols-2">
        <div 
          className="relative h-[300px] md:h-full overflow-hidden cursor-pointer"
          onClick={() => onViewPost(post.id)}
        >
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4 bg-brand-gold text-white px-4 py-1 text-[10px] uppercase tracking-widest font-bold">
            ফিচারড লেখা
          </div>
        </div>
        <div className="p-8 md:p-12 space-y-6 flex flex-col justify-center">
          <span className="text-brand-gold font-bold uppercase tracking-widest text-xs">
            {post.category}
          </span>
          <h3 
            className="text-4xl md:text-5xl text-gray-900 serif-content font-bold leading-tight group-hover:text-brand-teal transition-colors cursor-pointer"
            onClick={() => onViewPost(post.id)}
          >
            {post.title}
          </h3>
          <p className="text-gray-600 leading-relaxed font-normal line-clamp-3 text-xl">
            {post.excerpt}
          </p>
          <div className="flex justify-between items-center pt-4 border-t border-gray-50">
            <div className="text-[11px] text-gray-400 uppercase tracking-widest">
              <span>{post.date}</span>
            </div>
            <button 
              onClick={() => onViewPost(post.id)}
              className="bg-brand-teal text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-brand-gold transition-all"
            >
              আরও পড়ুন
            </button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group animate-fadeIn bg-white border-b border-gray-50 pb-12">
      <div 
        className="relative overflow-hidden mb-6 aspect-video cursor-pointer rounded-sm"
        onClick={() => onViewPost(post.id)}
      >
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-brand-teal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <span className="text-white bg-brand-teal px-4 py-2 text-xs font-bold uppercase tracking-widest">পাঠ করুন</span>
        </div>
      </div>
      <div className="space-y-4">
        <span className="text-brand-gold font-bold uppercase tracking-widest text-[10px]">
          {post.category}
        </span>
        <h3 
          className="text-3xl md:text-4xl text-gray-900 serif-content font-bold leading-tight group-hover:text-brand-teal transition-colors cursor-pointer"
          onClick={() => onViewPost(post.id)}
        >
          {post.title}
        </h3>
        <p className="text-gray-600 leading-relaxed font-normal line-clamp-3 text-lg md:text-xl">
          {post.excerpt}
        </p>
        <div className="flex justify-between items-center pt-2">
          <div className="flex items-center gap-3 text-[11px] text-gray-400 uppercase tracking-widest">
            <span>{post.date}</span>
            <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
            <span>৫ মিনিট পাঠ</span>
          </div>
          <button 
            onClick={() => onViewPost(post.id)}
            className="text-brand-teal font-bold uppercase tracking-widest text-[10px] border-b-2 border-brand-teal/30 hover:border-brand-gold transition-all pb-0.5"
          >
            পুরোটা পড়ুন
          </button>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
