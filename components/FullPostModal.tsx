
import React, { useEffect } from 'react';
import { Post } from '../types';

interface FullPostModalProps {
  post: Post | null;
  onClose: () => void;
}

const FullPostModal: React.FC<FullPostModalProps> = ({ post, onClose }) => {
  useEffect(() => {
    if (post) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [post]);

  if (!post) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-brand-dark/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="absolute inset-0" 
        onClick={onClose}
      ></div>
      
      <div className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl rounded-sm animate-slideUp">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="fixed top-6 right-6 md:top-10 md:right-10 z-[110] bg-brand-gold text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-brand-teal transition-colors"
        >
          <i className="fas fa-times"></i>
        </button>

        {/* Modal Header Image */}
        <div className="h-[250px] md:h-[400px] w-full relative">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="bg-brand-gold text-white px-3 py-1 text-[10px] uppercase tracking-widest font-bold mb-2 inline-block">
              {post.category}
            </span>
            <h2 className="text-3xl md:text-4xl serif-font font-bold leading-tight">
              {post.title}
            </h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-12">
          <div className="flex items-center gap-4 text-xs text-gray-400 font-sans uppercase tracking-widest mb-8 border-b border-gray-100 pb-4">
            <span>লিখেছেন: {post.author}</span>
            <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
            <span>{post.date}</span>
          </div>
          
          <div className="prose prose-lg max-w-none text-gray-700 serif-font leading-[1.8] space-y-6">
            <p className="font-bold text-xl text-brand-teal italic">{post.excerpt}</p>
            {post.content.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          
          {/* Share Section */}
          <div className="mt-16 pt-8 border-t border-gray-100 flex items-center justify-between">
             <span className="text-xs uppercase tracking-widest font-bold text-gray-400">লেখাটি শেয়ার করুন:</span>
             <div className="flex gap-4 text-brand-teal">
                <a href="#" className="hover:text-brand-gold"><i className="fab fa-facebook-f"></i></a>
                <a href="#" className="hover:text-brand-gold"><i className="fab fa-twitter"></i></a>
                <a href="#" className="hover:text-brand-gold"><i className="fab fa-whatsapp"></i></a>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullPostModal;
