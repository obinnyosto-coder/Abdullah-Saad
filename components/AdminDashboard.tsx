
import React, { useState } from 'react';
import { Post, SiteSettings } from '../types';

interface AdminDashboardProps {
  posts: Post[];
  settings: SiteSettings;
  onUpdatePosts: (posts: Post[]) => void;
  onUpdateSettings: (settings: SiteSettings) => void;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ posts, settings, onUpdatePosts, onUpdateSettings, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'posts' | 'new' | 'settings'>('dashboard');
  const [editingPost, setEditingPost] = useState<Partial<Post> | null>(null);
  const [localSettings, setLocalSettings] = useState<SiteSettings>(settings);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings(localSettings);
    alert('সেটিংস সফলভাবে সংরক্ষিত হয়েছে!');
  };

  const handleDelete = (id: number) => {
    if (window.confirm('লেখাটি মুছে ফেলতে চান?')) {
      onUpdatePosts(posts.filter(p => p.id !== id));
    }
  };

  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;

    if (editingPost.id) {
      onUpdatePosts(posts.map(p => p.id === editingPost.id ? (editingPost as Post) : p));
    } else {
      const newPost = {
        ...editingPost,
        id: Date.now(),
        author: "আবদুল্লাহ সাআদ",
        date: new Date().toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' })
      } as Post;
      onUpdatePosts([newPost, ...posts]);
    }
    setEditingPost(null);
    setActiveTab('posts');
  };

  const NavItem = ({ icon, label, id }: { icon: string, label: string, id: typeof activeTab }) => (
    <button 
      onClick={() => { setActiveTab(id); setEditingPost(null); }}
      className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all text-sm font-medium ${
        activeTab === id && !editingPost
          ? 'bg-brand-teal text-white shadow-lg' 
          : 'text-gray-400 hover:bg-gray-800 hover:text-white'
      }`}
    >
      <i className={`fas ${icon} w-5`}></i>
      {label}
    </button>
  );

  return (
    <div className="fixed inset-0 z-[500] bg-[#f8fafc] flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col p-6 hidden lg:flex">
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-8 h-8 bg-brand-gold rounded flex items-center justify-center text-dark font-bold">AS</div>
          <h2 className="text-lg font-bold serif-content text-white">সাআদ CMS</h2>
        </div>
        
        <nav className="flex-1 space-y-2">
          <NavItem icon="fa-chart-line" label="ড্যাশবোর্ড" id="dashboard" />
          <NavItem icon="fa-file-alt" label="সবগুলো লেখা" id="posts" />
          <NavItem icon="fa-pen-nib" label="নতুন লেখা" id="new" />
          <NavItem icon="fa-home" label="প্রচ্ছদ সেটিংস" id="settings" />
        </nav>

        <button 
          onClick={onLogout}
          className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-all text-sm font-medium mt-auto"
        >
          <i className="fas fa-sign-out-alt w-5"></i>
          লগআউট
        </button>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b flex items-center justify-between px-8">
          <h1 className="text-gray-800 font-bold text-xl">
            {editingPost ? 'সম্পাদক' : activeTab === 'dashboard' ? 'ড্যাশবোর্ড হোম' : activeTab === 'posts' ? 'কন্টেন্ট লাইব্রেরি' : 'সিস্টেম ও প্রচ্ছদ সেটিংস'}
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-gray-600 bg-brand-light px-3 py-1 rounded-full border border-gray-100">অ্যাডমিন মোড</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          {activeTab === 'settings' ? (
            <div className="max-w-4xl mx-auto animate-fadeIn pb-12">
              <form onSubmit={handleSaveSettings} className="space-y-6">
                <div className="bg-white p-8 rounded-xl shadow-sm border space-y-8">
                  <h3 className="text-lg font-bold text-brand-teal border-b pb-4">ব্র্যান্ডিং ও হিরো সেকশন কনফিগারেশন</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400">সাইটের নাম</label>
                      <input 
                        value={localSettings.siteName} 
                        onChange={e => setLocalSettings({...localSettings, siteName: e.target.value})} 
                        className="w-full bg-gray-50 border-gray-200 rounded-lg p-3 outline-none border focus:border-brand-teal"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400">ট্যাগলাইন</label>
                      <input 
                        value={localSettings.tagline} 
                        onChange={e => setLocalSettings({...localSettings, tagline: e.target.value})} 
                        className="w-full bg-gray-50 border-gray-200 rounded-lg p-3 outline-none border focus:border-brand-teal"
                      />
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-gray-50">
                    <h4 className="text-sm font-bold text-gray-700 uppercase tracking-widest">প্রচ্ছদ (Hero) কন্টেন্ট</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400">হিরো শিরোনাম</label>
                        <input 
                          value={localSettings.heroTitle} 
                          onChange={e => setLocalSettings({...localSettings, heroTitle: e.target.value})} 
                          className="w-full bg-gray-50 border-gray-200 rounded-lg p-3 outline-none border focus:border-brand-teal"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400">হিরো উপ-শিরোনাম</label>
                        <input 
                          value={localSettings.heroSubtitle} 
                          onChange={e => setLocalSettings({...localSettings, heroSubtitle: e.target.value})} 
                          className="w-full bg-gray-50 border-gray-200 rounded-lg p-3 outline-none border focus:border-brand-teal"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400">হিরো বর্ণনা</label>
                      <textarea 
                        rows={3}
                        value={localSettings.heroDescription} 
                        onChange={e => setLocalSettings({...localSettings, heroDescription: e.target.value})} 
                        className="w-full bg-gray-50 border-gray-200 rounded-lg p-3 outline-none border focus:border-brand-teal resize-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-50">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400">হিরো ইমেজ URL</label>
                      <input 
                        value={localSettings.heroImageUrl} 
                        onChange={e => setLocalSettings({...localSettings, heroImageUrl: e.target.value})} 
                        className="w-full bg-gray-50 border-gray-200 rounded-lg p-3 outline-none border focus:border-brand-teal"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400">সাইডবার বিজ্ঞাপন URL</label>
                      <input 
                        value={localSettings.sidebarAdUrl} 
                        onChange={e => setLocalSettings({...localSettings, sidebarAdUrl: e.target.value})} 
                        className="w-full bg-gray-50 border-gray-200 rounded-lg p-3 outline-none border focus:border-brand-teal"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-gray-50">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">ফুটার টেক্সট</label>
                    <input 
                      value={localSettings.footerText} 
                      onChange={e => setLocalSettings({...localSettings, footerText: e.target.value})} 
                      className="w-full bg-gray-50 border-gray-200 rounded-lg p-3 outline-none border focus:border-brand-teal"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button type="submit" className="bg-brand-teal text-white px-10 py-3 rounded-lg font-bold text-sm shadow-lg hover:bg-brand-dark transition-all transform active:scale-95">সেটিংস সংরক্ষণ করুন</button>
                </div>
              </form>
            </div>
          ) : editingPost || activeTab === 'new' ? (
            <div className="max-w-4xl mx-auto animate-fadeIn pb-12">
              <form onSubmit={handleSavePost} className="space-y-6">
                <div className="bg-white p-8 rounded-xl shadow-sm border space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400">শিরোনাম</label>
                      <input 
                        required 
                        value={editingPost?.title || ''} 
                        onChange={e => setEditingPost({...(editingPost || {}), title: e.target.value})} 
                        className="w-full bg-gray-50 border-gray-200 rounded-lg focus:border-brand-teal p-3 outline-none border"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400">বিভাগ</label>
                      <select 
                        value={editingPost?.category || 'কবিতা'} 
                        onChange={e => setEditingPost({...(editingPost || {}), category: e.target.value})} 
                        className="w-full bg-gray-50 border-gray-200 rounded-lg focus:border-brand-teal p-3 outline-none border"
                      >
                        <option value="কবিতা">কবিতা</option>
                        <option value="গদ্য">গদ্য</option>
                        <option value="প্রবন্ধ">প্রবন্ধ</option>
                        <option value="ভ্রমণকাহিনী">ভ্রমণকাহিনী</option>
                        <option value="সমালোচনা">সমালোচনা</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">ফিচার ইমেজ URL</label>
                    <input 
                      value={editingPost?.image || ''} 
                      onChange={e => setEditingPost({...(editingPost || {}), image: e.target.value})} 
                      className="w-full bg-gray-50 border-gray-200 rounded-lg focus:border-brand-teal p-3 outline-none border"
                      placeholder="https://images.unsplash.com/..."
                    />
                    <p className="text-[10px] text-gray-400 italic">নতুন লেখার জন্য বা বিদ্যমান লেখার ইমেজ পরিবর্তনের জন্য এখানে একটি পূর্ণ ইমেজ ইউআরএল (URL) দিন।</p>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">সংক্ষিপ্ত সার (Excerpt)</label>
                    <textarea rows={3} value={editingPost?.excerpt || ''} onChange={e => setEditingPost({...(editingPost || {}), excerpt: e.target.value})} className="w-full bg-gray-50 border-gray-200 rounded-lg focus:border-brand-teal p-3 outline-none border resize-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">মূল বক্তব্য</label>
                    <textarea required rows={12} value={editingPost?.content || ''} onChange={e => setEditingPost({...(editingPost || {}), content: e.target.value})} className="w-full bg-gray-50 border-gray-200 rounded-lg focus:border-brand-teal p-4 outline-none border serif-content text-lg leading-relaxed" />
                  </div>
                </div>
                <div className="flex gap-4">
                  <button type="submit" className="bg-brand-teal text-white px-10 py-3 rounded-lg font-bold text-sm shadow-lg hover:bg-brand-dark transition-all">সংরক্ষণ ও প্রকাশ করুন</button>
                  <button type="button" onClick={() => { setEditingPost(null); setActiveTab('posts'); }} className="text-gray-400 hover:text-gray-600 px-6 font-bold text-sm">বাতিল</button>
                </div>
              </form>
            </div>
          ) : activeTab === 'dashboard' ? (
            <div className="space-y-8 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">মোট লেখা</p>
                    <h4 className="text-2xl font-bold">{posts.length}</h4>
                  </div>
                  <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center">
                    <i className="fas fa-file-alt text-xl"></i>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">মোট ভিউ</p>
                    <h4 className="text-2xl font-bold text-emerald-600">১২,৪৫০+</h4>
                  </div>
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-lg flex items-center justify-center">
                    <i className="fas fa-eye text-xl"></i>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">সাবস্ক্রাইবার</p>
                    <h4 className="text-2xl font-bold text-brand-gold">৪৮২</h4>
                  </div>
                  <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-lg flex items-center justify-center">
                    <i className="fas fa-users text-xl"></i>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <div className="p-6 border-b bg-gray-50/50 flex justify-between items-center">
                   <h3 className="font-bold text-gray-800 serif-content">সাম্প্রতিক কন্টেন্ট আপডেট</h3>
                   <button onClick={() => setActiveTab('posts')} className="text-xs font-bold text-brand-teal uppercase tracking-widest">সবগুলো দেখুন</button>
                </div>
                <div className="p-0">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="bg-gray-50 text-gray-400 uppercase text-[10px] tracking-widest">
                        <th className="px-6 py-4">শিরোনাম</th>
                        <th className="px-6 py-4">বিভাগ</th>
                        <th className="px-6 py-4">তারিখ</th>
                        <th className="px-6 py-4">অবস্থা</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y border-t">
                      {posts.slice(0, 5).map(p => (
                        <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 font-bold text-gray-700">{p.title}</td>
                          <td className="px-6 py-4 text-gray-500">{p.category}</td>
                          <td className="px-6 py-4 text-gray-400">{p.date}</td>
                          <td className="px-6 py-4">
                             <span className="text-[10px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-bold">প্রকাশিত</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-fadeIn pb-12">
              {posts.map(post => (
                <div key={post.id} className="bg-white rounded-xl shadow-sm border overflow-hidden group">
                  <div className="aspect-video relative overflow-hidden">
                    <img src={post.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <button onClick={() => setEditingPost(post)} className="w-10 h-10 bg-white text-brand-teal rounded-full flex items-center justify-center shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all"><i className="fas fa-edit"></i></button>
                      <button onClick={() => handleDelete(post.id)} className="w-10 h-10 bg-white text-red-500 rounded-full flex items-center justify-center shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all delay-75"><i className="fas fa-trash"></i></button>
                    </div>
                  </div>
                  <div className="p-5">
                    <span className="text-[10px] font-bold text-brand-gold uppercase tracking-widest mb-1 block">{post.category}</span>
                    <h4 className="font-bold text-gray-800 line-clamp-1 mb-2 serif-content">{post.title}</h4>
                    <p className="text-xs text-gray-400">{post.date}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
