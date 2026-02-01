
import React, { useState, useMemo, useEffect } from 'react';
import TopBar from './components/TopBar';
import Header from './components/Header';
import PostCard from './components/PostCard';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import SinglePostView from './components/SinglePostView';
import AboutView from './components/AboutView';
import BackToTop from './components/BackToTop';
import ReadingSettings from './components/ReadingSettings';
import AdminDashboard from './components/AdminDashboard';
import { MOCK_POSTS, DEFAULT_SETTINGS } from './constants';
import { Post, SiteSettings } from './types';

const App: React.FC = () => {
  const STORAGE_KEY = 'abdullahsaad_posts_v5';
  const SETTINGS_KEY = 'abdullahsaad_settings_v5';
  const READ_SETTINGS_KEY = 'abdullahsaad_reader_v5';

  // State with Hardcoded Fallbacks for Fail-Safe Boot
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginPassword, setLoginPassword] = useState('');
  
  const [posts, setPosts] = useState<Post[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return MOCK_POSTS;
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : MOCK_POSTS;
    } catch (e) {
      console.warn("Storage recovery failed, using default posts.");
      return MOCK_POSTS;
    }
  });

  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_KEY);
      if (!saved) return DEFAULT_SETTINGS;
      const parsed = JSON.parse(saved);
      return parsed && parsed.siteName ? parsed : DEFAULT_SETTINGS;
    } catch (e) {
      console.warn("Storage recovery failed, using default settings.");
      return DEFAULT_SETTINGS;
    }
  });

  const [readingSettings, setReadingSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(READ_SETTINGS_KEY);
      return saved ? JSON.parse(saved) : { fontSize: 20, fontFamily: 'serif-content' };
    } catch (e) {
      return { fontSize: 20, fontFamily: 'serif-content' };
    }
  });

  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState<'home' | 'about'>('home');
  const [currentPostId, setCurrentPostId] = useState<number | null>(null);

  // Sync with URL & Persistence
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const postId = params.get('post');
    const page = params.get('page');
    if (postId) setCurrentPostId(parseInt(postId));
    if (page === 'about') setCurrentPage('about');
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(siteSettings));
      localStorage.setItem(READ_SETTINGS_KEY, JSON.stringify(readingSettings));
    } catch (e) {
      console.error("Storage sync failed:", e);
    }
  }, [posts, siteSettings, readingSettings]);

  const navigateTo = (page: 'home' | 'about', postId: number | null = null) => {
    setCurrentPage(page);
    setCurrentPostId(postId);
    const newUrl = new URL(window.location.href);
    newUrl.search = "";
    if (postId) newUrl.searchParams.set('post', postId.toString());
    if (page === 'about') newUrl.searchParams.set('page', 'about');
    window.history.pushState({}, '', newUrl);
    window.scrollTo(0, 0);
  };

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesCategory = categoryFilter === 'All' || post.category === categoryFilter;
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [posts, categoryFilter, searchQuery]);

  const selectedPostData = useMemo(() => {
    return posts.find(p => p.id === currentPostId) || null;
  }, [posts, currentPostId]);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginPassword === 'admin123') {
      setIsAdminLoggedIn(true);
      setShowLoginModal(false);
      setLoginPassword('');
    } else {
      alert('ভুল পাসওয়ার্ড!');
    }
  };

  if (isAdminLoggedIn) {
    return (
      <AdminDashboard 
        posts={posts} settings={siteSettings}
        onUpdatePosts={setPosts} onUpdateSettings={setSiteSettings}
        onLogout={() => setIsAdminLoggedIn(false)} 
      />
    );
  }

  return (
    <div 
      className={`min-h-screen flex flex-col font-sans bg-white ${readingSettings.fontFamily}`}
      style={{ '--article-font-size': `${readingSettings.fontSize}px` } as React.CSSProperties}
    >
      <TopBar />
      <Header 
        onSearch={setSearchQuery} 
        onFilter={(c) => { setCategoryFilter(c); navigateTo('home'); }} 
        onNavigateAbout={() => navigateTo('about')}
        currentCategory={categoryFilter} currentPage={currentPage}
        siteName={siteSettings.siteName}
        onGoHome={() => { setCategoryFilter('All'); navigateTo('home'); }}
      />
      
      <main className="flex-grow">
        {currentPage === 'about' ? (
          <AboutView settings={siteSettings} />
        ) : currentPostId ? (
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
            <div className="flex flex-col lg:flex-row gap-16">
              <div className="lg:w-2/3">
                {selectedPostData ? (
                  <SinglePostView post={selectedPostData} onBack={() => navigateTo('home')} />
                ) : (
                  <div className="py-20 text-center">
                    <h3 className="text-2xl font-bold text-gray-400">লেখাটি খুঁজে পাওয়া যায়নি।</h3>
                    <button onClick={() => navigateTo('home')} className="mt-4 text-brand-teal font-bold underline">প্রচ্ছদে ফিরে যান</button>
                  </div>
                )}
              </div>
              <div className="lg:w-1/3">
                <Sidebar onCategoryClick={(c) => { setCategoryFilter(c); navigateTo('home'); }} adBannerUrl={siteSettings.sidebarAdUrl} />
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16">
            <div className="flex flex-col lg:flex-row gap-16">
              <div className="lg:w-2/3">
                {categoryFilter === 'All' && searchQuery === '' && filteredPosts.length > 0 && (
                  <div className="mb-16">
                    <PostCard post={filteredPosts[0]} onViewPost={(id) => navigateTo('home', id)} featured />
                  </div>
                )}
                <div className="mb-10 flex items-center justify-between border-b border-gray-100 pb-4">
                  <h2 className="text-2xl font-bold serif-content text-brand-teal uppercase tracking-widest">
                    {categoryFilter === 'All' ? 'সাম্প্রতিক সমাহার' : `${categoryFilter} আর্কাইভ`}
                  </h2>
                </div>
                <div className="grid grid-cols-1 gap-12">
                  {filteredPosts.slice(categoryFilter === 'All' && searchQuery === '' ? 1 : 0).map((post) => (
                    <PostCard key={post.id} post={post} onViewPost={(id) => navigateTo('home', id)} />
                  ))}
                  {filteredPosts.length === 0 && (
                    <div className="py-20 text-center text-gray-400 serif-content">দুঃখিত, কোনো লেখা পাওয়া যায়নি।</div>
                  )}
                </div>
              </div>
              <div className="lg:w-1/3">
                <Sidebar onCategoryClick={(c) => { setCategoryFilter(c); navigateTo('home'); }} adBannerUrl={siteSettings.sidebarAdUrl} />
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
      
      <div className="fixed bottom-4 left-4 z-50">
        <button onClick={() => setShowLoginModal(true)} className="text-[10px] uppercase font-bold text-gray-300 hover:text-brand-gold opacity-30">CMS Access</button>
      </div>

      {showLoginModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="bg-white p-8 w-full max-w-sm rounded-xl shadow-2xl">
             <h3 className="text-xl font-bold serif-content text-brand-teal mb-6 text-center">অ্যাডমিন প্রবেশাধিকার</h3>
             <form onSubmit={handleAdminLogin} className="space-y-4">
                <input type="password" placeholder="পাসওয়ার্ড লিখুন..." className="w-full bg-gray-50 border border-gray-100 rounded-lg p-3 text-center text-xl" autoFocus value={loginPassword} onChange={e => setLoginPassword(e.target.value)} />
                <button type="submit" className="bg-brand-teal text-white w-full py-3 rounded-lg font-bold">লগইন</button>
                <button type="button" onClick={() => setShowLoginModal(false)} className="block w-full text-center text-xs text-gray-400 mt-2 uppercase">বাতিল</button>
             </form>
          </div>
        </div>
      )}

      <ReadingSettings settings={readingSettings} onUpdate={setReadingSettings} />
      <BackToTop />
    </div>
  );
};

export default App;
