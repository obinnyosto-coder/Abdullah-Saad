
import React from 'react';
import { CATEGORIES, MOCK_POSTS } from '../constants';

interface SidebarProps {
  onCategoryClick: (category: string) => void;
  adBannerUrl: string;
}

const Sidebar: React.FC<SidebarProps> = ({ onCategoryClick, adBannerUrl }) => {
  return (
    <aside className="space-y-12 sticky top-24">
      {/* Author Widget */}
      <div className="bg-white p-6 border-t-4 border-brand-teal shadow-sm text-center">
        <div className="mb-4 inline-block">
          <img 
            src="https://picsum.photos/seed/author/150/150" 
            alt="আবদুল্লাহ সাআদ" 
            className="w-24 h-24 rounded-full border-4 border-brand-light object-cover mx-auto"
          />
        </div>
        <h3 className="text-xl font-bold serif-font mb-2 text-brand-teal">আবদুল্লাহ সাআদ</h3>
        <p className="text-sm text-gray-600 font-sans leading-relaxed mb-4">
          সাহিত্যপ্রেমী, ভ্রমনপিপাসু এবং একজন স্বপ্নদ্রষ্টা। গদ্য ও কবিতার আধুনিক ভাষা নিয়ে কাজ করছি। বাংলা সাহিত্যের শেকড় থেকে আগামীর পথে আমার এই ছোট্ট আয়োজন।
        </p>
        <div className="flex justify-center gap-4 text-brand-teal text-lg">
          <a href="#" className="hover:text-brand-gold transition-colors"><i className="fab fa-facebook-f"></i></a>
          <a href="#" className="hover:text-brand-gold transition-colors"><i className="fab fa-twitter"></i></a>
          <a href="#" className="hover:text-brand-gold transition-colors"><i className="fab fa-instagram"></i></a>
        </div>
      </div>

      {/* Dynamic Ad Space */}
      <div className="bg-gray-100 h-[280px] flex items-center justify-center border border-dashed border-gray-300 relative group cursor-pointer overflow-hidden">
        <img src={adBannerUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt="Ad" />
        <span className="absolute bottom-2 right-2 text-[8px] uppercase text-gray-400 bg-white/50 px-1">Advertisement</span>
      </div>

      {/* Categories Widget */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold serif-font border-b border-gray-200 pb-2 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-brand-gold rounded-full"></span>
          বিভাগসমূহ
        </h3>
        <ul className="space-y-3 font-sans">
          {CATEGORIES.map((cat, idx) => (
            <li key={idx}>
              <button 
                onClick={() => onCategoryClick(cat.name)}
                className="w-full flex justify-between items-center group cursor-pointer"
              >
                <span className="text-gray-700 group-hover:text-brand-teal group-hover:font-bold transition-all">{cat.name}</span>
                <span className="bg-brand-light text-brand-teal text-[10px] px-2 py-0.5 rounded-full font-bold group-hover:bg-brand-gold group-hover:text-white transition-colors">{cat.count}</span>
              </button>
            </li>
          ))}
          <li>
            <button 
              onClick={() => onCategoryClick('All')}
              className="w-full text-center py-2 text-xs uppercase tracking-widest text-brand-teal font-bold hover:bg-brand-light mt-2"
            >
              সবগুলো দেখুন
            </button>
          </li>
        </ul>
      </div>

      {/* Popular Posts */}
      <div className="space-y-6">
        <h3 className="text-lg font-bold serif-font border-b border-gray-200 pb-2 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-brand-gold rounded-full"></span>
          জনপ্রিয় লেখা
        </h3>
        {MOCK_POSTS.slice(0, 3).map((post, idx) => (
          <div key={idx} className="flex gap-4 group cursor-pointer">
            <div className="w-20 h-20 flex-shrink-0 overflow-hidden">
              <img src={post.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform" alt="" />
            </div>
            <div className="space-y-1">
              <span className="text-brand-gold text-[9px] uppercase font-bold tracking-widest">{post.category}</span>
              <h4 className="text-sm font-bold serif-font leading-tight group-hover:text-brand-teal transition-colors">
                {post.title}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
