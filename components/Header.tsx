
import React, { useState } from 'react';

interface HeaderProps {
  onSearch: (query: string) => void;
  onFilter: (category: string) => void;
  currentCategory: string;
}

const Header: React.FC<HeaderProps> = ({ onSearch, onFilter, currentCategory }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchVal(val);
    onSearch(val);
  };

  const menuItems = [
    { name: 'প্রচ্ছদ', filter: 'All' },
    { name: 'কবিতা', filter: 'কবিতা' },
    { name: 'গদ্য', filter: 'গদ্য' },
    { name: 'প্রবন্ধ', filter: 'প্রবন্ধ' },
    { name: 'আমার কথা', filter: 'About' }
  ];

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between py-6">
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-brand-teal text-2xl"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>

          {/* Logo */}
          <div className="flex-1 md:flex-none md:w-1/4 text-center md:text-left">
            <h1 
              onClick={() => onFilter('All')}
              className="text-3xl font-bold tracking-tight text-brand-teal serif-font cursor-pointer inline-block"
            >
              আবদুল্লাহ সাআদ
            </h1>
          </div>
          
          {/* Navigation - Desktop */}
          <nav className="hidden md:block flex-1">
            <ul className="flex justify-center gap-6 text-sm font-sans font-medium uppercase tracking-wider text-gray-600">
              {menuItems.map((item) => (
                <li key={item.filter}>
                  <button 
                    onClick={() => onFilter(item.filter)}
                    className={`hover:text-brand-teal transition-colors border-b-2 pb-1 ${
                      currentCategory === item.filter 
                        ? 'text-brand-teal border-brand-gold' 
                        : 'border-transparent'
                    }`}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Search Toggle */}
          <div className="md:w-1/4 flex justify-end items-center gap-4">
            <button 
              className={`transition-colors p-2 ${isSearchOpen ? 'text-brand-gold' : 'text-gray-400 hover:text-brand-teal'}`}
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <i className="fas fa-search text-xl"></i>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <nav className="md:hidden border-t border-gray-100 py-4 animate-fadeIn">
            <ul className="flex flex-col gap-2 text-center text-sm font-sans font-medium uppercase tracking-widest text-gray-600">
              {menuItems.map((item) => (
                <li key={item.filter}>
                  <button 
                    onClick={() => {
                      onFilter(item.filter);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`block w-full py-3 ${currentCategory === item.filter ? 'bg-brand-light text-brand-teal font-bold' : 'hover:bg-brand-light'}`}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Search Bar Overlay */}
        {isSearchOpen && (
          <div className="absolute left-0 w-full bg-white border-b border-gray-200 py-6 px-8 shadow-xl animate-fadeIn">
            <div className="max-w-3xl mx-auto flex items-center border-b-2 border-brand-teal pb-2">
              <input 
                autoFocus
                type="text" 
                value={searchVal}
                onChange={handleSearchChange}
                placeholder="লেখার শিরোনাম দিয়ে খুঁজুন..." 
                className="w-full bg-transparent border-none focus:ring-0 text-xl md:text-2xl serif-font outline-none text-gray-800"
              />
              <button 
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchVal('');
                  onSearch('');
                }}
                className="text-gray-400 hover:text-brand-teal px-4"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
