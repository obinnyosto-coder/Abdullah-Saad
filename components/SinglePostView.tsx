
import React, { useEffect } from 'react';
import { Post } from '../types';

interface SinglePostViewProps {
  post: Post;
  onBack: () => void;
}

const SinglePostView: React.FC<SinglePostViewProps> = ({ post, onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [post]);

  return (
    <article className="animate-fadeIn pb-20 relative">
      {/* Back Button */}
      <div className="mb-6">
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-brand-teal hover:text-brand-gold transition-colors font-bold uppercase tracking-widest text-xs"
        >
          <span className="w-8 h-8 rounded-full border border-current flex items-center justify-center group-hover:bg-brand-gold group-hover:text-white group-hover:border-brand-gold transition-all">
            <i className="fas fa-arrow-left"></i>
          </span>
          ফিরে যান
        </button>
      </div>

      {/* Featured Image */}
      <div className="w-full aspect-video md:aspect-[21/9] overflow-hidden mb-10 md:mb-16 rounded-sm shadow-sm">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-3xl mx-auto px-4">
        {/* Meta */}
        <div className="flex items-center gap-4 mb-6">
          <span className="bg-brand-gold text-white px-3 py-1 text-[10px] uppercase tracking-widest font-bold">
            {post.category}
          </span>
          <span className="text-gray-400 text-xs font-medium">{post.date}</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8 serif-content text-gray-900">
          {post.title}
        </h1>

        {/* Author Info */}
        <div className="flex items-center gap-4 py-8 border-t border-b border-gray-100 mb-12">
          <img 
            src="https://picsum.photos/seed/author/100/100" 
            className="w-12 h-12 rounded-full object-cover" 
            alt={post.author} 
          />
          <div>
            <p className="text-sm font-bold text-gray-800 uppercase tracking-wide">লিখেছেন: {post.author}</p>
            <p className="text-xs text-gray-400">সাহিত্যিক ও প্রাবন্ধিক</p>
          </div>
          <div className="ml-auto flex gap-4 text-gray-400">
             <button className="hover:text-brand-teal transition-colors"><i className="fab fa-facebook-f"></i></button>
             <button className="hover:text-brand-teal transition-colors"><i className="fab fa-twitter"></i></button>
             <button className="hover:text-brand-teal transition-colors"><i className="fas fa-bookmark"></i></button>
          </div>
        </div>

        {/* Content - Respecting scoped typography variables */}
        <div 
          className="max-w-none text-gray-800 leading-relaxed space-y-8 serif-content"
          style={{ fontSize: 'var(--article-font-size, 20px)' }}
        >
          {post.content.split('\n\n').map((paragraph, idx) => (
            <p key={idx}>
              {paragraph}
            </p>
          ))}
        </div>

        {/* Footer Back Button */}
        <div className="mt-20 pt-10 border-t border-gray-100 text-center">
          <button 
            onClick={onBack}
            className="text-brand-teal font-bold border-b-2 border-brand-teal pb-1 hover:text-brand-gold hover:border-brand-gold transition-all uppercase tracking-widest text-xs"
          >
            প্রচ্ছদে ফিরে যান
          </button>
        </div>
      </div>
    </article>
  );
};

export default SinglePostView;
