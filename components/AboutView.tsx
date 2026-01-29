
import React from 'react';
import { SiteSettings } from '../types';

interface AboutViewProps {
  settings: SiteSettings;
}

const AboutView: React.FC<AboutViewProps> = ({ settings }) => {
  return (
    <div className="animate-fadeIn pb-20">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-white shadow-2xl overflow-hidden rounded-sm border border-gray-100 mt-10 md:mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative h-[400px] lg:h-auto">
              <img 
                src={settings.heroImageUrl} 
                className="w-full h-full object-cover" 
                alt={settings.siteName} 
              />
              <div className="absolute inset-0 bg-brand-teal/10"></div>
            </div>
            <div className="p-8 md:p-16 space-y-8 flex flex-col justify-center">
              <div>
                <span className="text-brand-gold font-sans uppercase tracking-[0.3em] text-xs font-bold block mb-4">
                  লেখকের কথা
                </span>
                <h2 className="text-4xl md:text-6xl font-bold leading-tight serif-content text-brand-teal mb-4">
                  {settings.heroTitle}
                </h2>
                <p className="text-gray-600 text-2xl font-medium italic border-l-4 border-brand-gold pl-6 mb-8">
                  "{settings.heroSubtitle}"
                </p>
              </div>
              
              <div className="prose prose-lg text-gray-500 leading-relaxed text-xl serif-content">
                {settings.heroDescription.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>

              <div className="pt-8 border-t border-gray-100 flex gap-6 text-2xl text-brand-teal">
                <a href="#" className="hover:text-brand-gold transition-colors"><i className="fab fa-facebook"></i></a>
                <a href="#" className="hover:text-brand-gold transition-colors"><i className="fab fa-twitter"></i></a>
                <a href="#" className="hover:text-brand-gold transition-colors"><i className="fab fa-instagram"></i></a>
                <a href="#" className="hover:text-brand-gold transition-colors"><i className="fab fa-linkedin"></i></a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-brand-light p-10 rounded-sm text-center">
            <h4 className="text-4xl font-bold text-brand-teal mb-2">৫০০+</h4>
            <p className="text-gray-400 text-sm uppercase tracking-widest font-bold">প্রকাশিত লেখা</p>
          </div>
          <div className="bg-brand-light p-10 rounded-sm text-center">
            <h4 className="text-4xl font-bold text-brand-teal mb-2">১০+</h4>
            <p className="text-gray-400 text-sm uppercase tracking-widest font-bold">সাহিত্য পুরস্কার</p>
          </div>
          <div className="bg-brand-light p-10 rounded-sm text-center">
            <h4 className="text-4xl font-bold text-brand-teal mb-2">২৫</h4>
            <p className="text-gray-400 text-sm uppercase tracking-widest font-bold">বছরের সাধনা</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutView;
