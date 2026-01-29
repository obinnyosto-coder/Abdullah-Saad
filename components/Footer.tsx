
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* About Column */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white serif-font tracking-tight">আবদুল্লাহ সাআদ</h2>
            <p className="text-sm leading-relaxed font-sans text-gray-400">
              একটি ব্যক্তিগত সাহিত্যের প্ল্যাটফর্ম যেখানে প্রতিটি শব্দের পেছনে রয়েছে এক একটি গল্প। আমরা বিশ্বাস করি সাহিত্যের মধ্য দিয়ে মানুষের মনস্তত্ত্ব এবং আধুনিক সমাজবাস্তবতা আরও গভীরভাবে অনুভব করা সম্ভব।
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand-gold hover:text-white transition-all"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand-gold hover:text-white transition-all"><i className="fab fa-instagram"></i></a>
              <a href="#" className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand-gold hover:text-white transition-all"><i className="fab fa-youtube"></i></a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white serif-font">দ্রুত লিঙ্ক</h3>
            <ul className="space-y-3 font-sans text-sm text-gray-400 uppercase tracking-widest">
              <li><a href="#" className="hover:text-brand-gold transition-colors">আমাদের সম্পর্কে</a></li>
              <li><a href="#" className="hover:text-brand-gold transition-colors">পোস্ট আর্কাইভ</a></li>
              <li><a href="#" className="hover:text-brand-gold transition-colors">প্রাইভেসি পলিসি</a></li>
              <li><a href="#" className="hover:text-brand-gold transition-colors">শর্তাবলি</a></li>
              <li><a href="#" className="hover:text-brand-gold transition-colors">যোগাযোগ</a></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white serif-font">নিউজলেটার সাবস্ক্রাইব</h3>
            <p className="text-sm font-sans text-gray-400">নতুন লেখার আপডেট পেতে আপনার ইমেইল দিয়ে সংযুক্ত থাকুন।</p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="আপনার ইমেইল ঠিকানা..." 
                className="bg-gray-800 border-none px-4 py-3 text-sm focus:ring-2 focus:ring-brand-gold text-white outline-none rounded-sm"
              />
              <button className="bg-brand-teal text-white py-3 uppercase tracking-widest text-xs font-bold hover:bg-teal-900 transition-all shadow-lg">সাবস্ক্রাইব করুন</button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-xs font-sans text-gray-500 uppercase tracking-widest">
            &copy; {new Date().getFullYear()} আব্দুল্লাহ সাআদ. সর্বস্বত্ব সংরক্ষিত।
          </p>
          <div className="text-xs font-sans text-gray-500 uppercase tracking-widest flex items-center gap-2">
            নির্মাণে: <span className="text-white font-bold">আবদুল্লাহ সাআদ ক্রিয়েটিভ</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
