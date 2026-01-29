
import React from 'react';
import { MOCK_POSTS } from '../constants';
import { Post } from '../types';

interface HeroProps {
  onReadMore: (post: Post) => void;
}

const Hero: React.FC<HeroProps> = ({ onReadMore }) => {
  const featured = MOCK_POSTS[0];
  
  return (
    <section className="bg-brand-light py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-white shadow-xl overflow-hidden rounded-sm">
          <div className="relative h-[300px] lg:h-[500px]">
            <img 
              src={featured.image} 
              alt={featured.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-brand-gold text-white px-4 py-1 text-xs font-sans uppercase tracking-widest">
              সর্বশেষ ফিচার
            </div>
          </div>
          <div className="p-8 md:p-12 space-y-6">
            <span className="text-brand-gold font-sans uppercase tracking-[0.2em] text-xs font-bold block">
              {featured.category}
            </span>
            <h2 
              onClick={() => onReadMore(featured)}
              className="text-4xl md:text-5xl lg:text-6xl text-brand-teal leading-tight serif-font font-bold cursor-pointer hover:underline decoration-brand-gold/30"
            >
              {featured.title}
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed font-sans font-light italic">
              "{featured.excerpt}"
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-500 font-sans tracking-wide">
               <span>লিখেছেন: {featured.author}</span>
               <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
               <span>{featured.date}</span>
            </div>
            <button 
              onClick={() => onReadMore(featured)}
              className="bg-brand-teal text-white px-8 py-3 rounded-none uppercase tracking-widest text-xs font-bold hover:bg-teal-900 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              পুরোটা পড়ুন
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
