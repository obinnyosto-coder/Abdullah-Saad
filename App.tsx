
import React, { useState, useMemo } from 'react';
import TopBar from './components/TopBar';
import Header from './components/Header';
import Hero from './components/Hero';
import PostCard from './components/PostCard';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import FullPostModal from './components/FullPostModal';
import BackToTop from './components/BackToTop';
import { MOCK_POSTS } from './constants';
import { Post } from './types';

const App: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = useMemo(() => {
    return MOCK_POSTS.filter(post => {
      const matchesCategory = categoryFilter === 'All' || post.category === categoryFilter;
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [categoryFilter, searchQuery]);

  const handleFilter = (cat: string) => {
    setCategoryFilter(cat);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white selection:bg-brand-gold selection:text-white">
      <TopBar />
      <Header 
        onSearch={setSearchQuery} 
        onFilter={handleFilter} 
        currentCategory={categoryFilter} 
      />
      
      <main className="flex-grow">
        {/* Only show Hero on the front page with no search/filter active */}
        {categoryFilter === 'All' && searchQuery === '' && (
          <Hero onReadMore={setSelectedPost} />
        )}

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Left Column: Feed */}
            <div className="lg:w-2/3">
              <div className="mb-10 flex items-center justify-between border-b border-gray-100 pb-4">
                <h2 className="text-2xl font-bold serif-font text-brand-teal">
                  {categoryFilter === 'All' ? 'সর্বশেষ লেখাগুলো' : `${categoryFilter} আর্কাইভ`}
                  {searchQuery && <span className="text-gray-400 text-lg ml-2 font-normal"> (খুঁজছেন: "{searchQuery}")</span>}
                </h2>
                <div className="hidden sm:flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-brand-gold"></div>
                  <div className="w-2 h-2 rounded-full bg-brand-teal"></div>
                </div>
              </div>

              {filteredPosts.length > 0 ? (
                filteredPosts.map((post, index) => (
                  <React.Fragment key={post.id}>
                    <PostCard post={post} onReadMore={(p) => setSelectedPost(p)} />
                    
                    {/* Advertisement Banner Placeholder after 3rd post of total list */}
                    {index === 2 && (
                      <div className="my-16 bg-gray-50 border border-dashed border-gray-300 h-[150px] md:h-[250px] w-full flex flex-col items-center justify-center overflow-hidden">
                        <img 
                          src="https://placehold.co/970x250/006064/ffffff?text=Premium+Banner+Space" 
                          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all cursor-pointer" 
                          alt="Ad Banner" 
                        />
                      </div>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <div className="py-20 text-center space-y-4">
                   <i className="fas fa-search text-5xl text-gray-200"></i>
                   <h3 className="text-xl serif-font text-gray-400">দুঃখিত, কোনো লেখা পাওয়া যায়নি।</h3>
                   <button 
                    onClick={() => {setSearchQuery(''); setCategoryFilter('All');}}
                    className="text-brand-teal font-bold border-b border-brand-teal"
                   >
                     সব লেখা দেখুন
                   </button>
                </div>
              )}

              {filteredPosts.length > 0 && (
                <div className="flex flex-wrap justify-center mt-12 gap-2">
                  <button className="w-10 h-10 flex items-center justify-center bg-brand-teal text-white font-bold">১</button>
                  <button className="w-10 h-10 flex items-center justify-center border border-gray-200 text-gray-500 hover:bg-brand-light">২</button>
                  <button className="px-4 h-10 flex items-center justify-center border border-gray-200 text-gray-500 hover:bg-brand-light uppercase text-[10px] font-bold tracking-widest">
                    পরবর্তী <i className="fas fa-arrow-right ml-2 text-[10px]"></i>
                  </button>
                </div>
              )}
            </div>

            {/* Right Column: Sidebar */}
            <div className="lg:w-1/3">
              <Sidebar onCategoryClick={handleFilter} />
            </div>

          </div>
        </div>
      </main>

      <Footer />

      {/* Overlays */}
      <FullPostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      <BackToTop />
    </div>
  );
};

export default App;
