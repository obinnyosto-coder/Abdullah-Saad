
import React, { useState, useEffect } from 'react';

const TopBar: React.FC = () => {
  const [time, setTime] = useState(new Date().toLocaleDateString('bn-BD', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }));

  return (
    <div className="bg-brand-teal text-white py-1.5 px-4 md:px-8 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex justify-between items-center text-[10px] md:text-xs uppercase tracking-widest font-sans">
        <div className="flex gap-4 items-center">
          <a href="#" className="hover:text-brand-gold transition-colors"><i className="fab fa-facebook-f"></i></a>
          <a href="#" className="hover:text-brand-gold transition-colors"><i className="fab fa-twitter"></i></a>
          <a href="#" className="hover:text-brand-gold transition-colors"><i className="fab fa-instagram"></i></a>
          <a href="#" className="hover:text-brand-gold transition-colors"><i className="fab fa-linkedin-in"></i></a>
        </div>
        <div className="hidden sm:block">
          {time}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
