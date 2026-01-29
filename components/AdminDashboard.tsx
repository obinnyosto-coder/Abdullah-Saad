
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
        activeTab === id && !editingPost ? 'bg-brand-teal text-white shadow-lg' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
      }`}
    >
      <i className={`fas ${icon} w-5`}></i>
      {label}
    </button>
  );

  return (
    <div className="fixed inset-0 z-[500] bg-[#f8fafc] flex">
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
        <button onClick={onLogout} className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg text-sm font-medium mt-auto">
          <i className="fas fa-sign-out-alt w-5"></i> লগআউট
        </button>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b flex items-center justify-between px-8">
          <h1 className="text-gray-800 font-bold text-xl">
            {editingPost ? 'সম্পাদক' : activeTab === 'dashboard' ? 'ড্যাশবোর্ড হোম' : activeTab === 'posts' ? 'কন্টেন্ট লাইব্রেরি' : 'সিস্টেম ও প্রচ্ছদ সেটিংস'}
          </h1>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          {activeTab === 'settings' ? (
            <div className="max-w-4xl mx-auto animate-fadeIn pb-12">
              <form onSubmit={handleSaveSettings} className="space-y-6">
                <div className="bg-white p-8 rounded-xl shadow-sm border space-y-8">
                  <h3 className="text-lg font-bold text-brand-teal border-b pb-4">ব্র্যান্ডিং ও হিরো সেকশন কনফিগারেশন</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input value={localSettings.siteName} onChange={e => setLocalSettings({...localSettings, siteName: e.target.value})} placeholder="সাইটের নাম" className="w-full bg-gray-50 border-gray-200 rounded-lg p-3 outline-none border focus:border-brand-teal" />
                    <input value={localSettings.tagline} onChange={e => setLocalSettings({...localSettings, tagline: e.target.value})} placeholder="ট্যাগলাইন" className="w-full bg-gray-50 border-gray-200 rounded-lg p-3 outline-none border focus:border-brand-teal" />
                  </div>
                  <div className="space-y-4">
                    <input value={localSettings.heroTitle} onChange={e => setLocalSettings({...localSettings, heroTitle: e.target.value})} placeholder="হিরো শিরোনাম" className="w-full bg-gray-50 border-gray-200 rounded-lg p-3 outline-none border focus:border-brand-teal" />
                    <input value={localSettings.heroSubtitle} onChange={e => setLocalSettings({...localSettings, heroSubtitle: e.target.value})} placeholder="হিরো উপ-শিরোনাম" className="w-full bg-gray-50 border-gray-200 rounded-lg p-3 outline-none border focus:border-brand-teal" />
                    <textarea value={localSettings.heroDescription} onChange={e => setLocalSettings({...localSettings, heroDescription: e.target.value})} placeholder="হিরো বর্ণনা" rows={3} className="w-full bg-gray-50 border-gray-200 rounded-lg p-3 outline-none border focus:border-brand-teal" />
                    <input value={localSettings.heroImageUrl} onChange={e => setLocalSettings({...localSettings, heroImageUrl: e.target.value})} placeholder="ইমেজ URL" className="w-full bg-gray-50 border-gray-200 rounded-lg p-3 outline-none border focus:border-brand-teal" />
                  </div>
                </div>
                <button type="submit" className="bg-brand-teal text-white px-10 py-3 rounded-lg font-bold text-sm shadow-lg">সেটিংস সংরক্ষণ করুন</button>
              </form>
            </div>
          ) : editingPost || activeTab === 'new' ? (
            <div className="max-w-4xl mx-auto animate-fadeIn pb-12">
              <form onSubmit={handleSavePost} className="space-y-6">
                <div className="bg-white p-8 rounded-xl shadow-sm border space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input required value={editingPost?.title || ''} onChange={e => setEditingPost({...(editingPost || {}), title: e.target.value})} placeholder="শিরোনাম" className="w-full bg-gray-50 border-gray-200 rounded-lg focus:border-brand-teal p-3 outline-none border" />
                    <select value={editingPost?.category || 'কবিতা'} onChange={e => setEditingPost({...(editingPost || {}), category: e.target.value})} className="w-full bg-gray-50 border-gray-200 rounded-lg focus:border-brand-teal p-3 outline-none border">
                      <option value="কবিতা">কবিতা</option><option value="গদ্য">গদ্য</option><option value="প্রবন্ধ">প্রবন্ধ</option><option value="ভ্রমণকাহিনী">ভ্রমণকাহিনী</option><option value="সমালোচনা">সমালোচনা</option>
                    </select>
                  </div>
                  <input value={editingPost?.image || ''} onChange={e => setEditingPost({...(editingPost || {}), image: e.target.value})} placeholder="ফিচার ইমেজ URL (Unsplash Link...)" className="w-full bg-gray-50 border-gray-200 rounded-lg focus:border-brand-teal p-3 outline-none border" />
                  <textarea rows={3} value={editingPost?.excerpt || ''} onChange={e => setEditingPost({...(editingPost || {}), excerpt: e.target.value})} placeholder="সংক্ষিপ্ত সার" className="w-full bg-gray-50 border-gray-200 rounded-lg focus:border-brand-teal p-3 outline-none border" />
                  <textarea required rows={10} value={editingPost?.content || ''} onChange={e => setEditingPost({...(editingPost || {}), content: e.target.value})} placeholder="মূল বক্তব্য" className="w-full bg-gray-50 border-gray-200 rounded-lg focus:border-brand-teal p-4 outline-none border serif-content" />
                </div>
                <div className="flex gap-4">
                  <button type="submit" className="bg-brand-teal text-white px-10 py-3 rounded-lg font-bold text-sm">সংরক্ষণ ও প্রকাশ</button>
                  <button type="button" onClick={() => { setEditingPost(null); setActiveTab('posts'); }} className="text-gray-400 font-bold">বাতিল</button>
                </div>
              </form>
            </div>
          ) : activeTab === 'dashboard' ? (
            <div className="space-y-8 animate-fadeIn">
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border text-center">
                  <p className="text-xs font-bold text-gray-400 uppercase">মোট লেখা</p>
                  <h4 className="text-3xl font-bold">{posts.length}</h4>
                </div>
                <div className="bg-white p-6 rounded-xl border text-center">
                  <p className="text-xs font-bold text-gray-400 uppercase">মোট ভিউ</p>
                  <h4 className="text-3xl font-bold text-emerald-600">১২,৪৫০+</h4>
                </div>
                <div className="bg-white p-6 rounded-xl border text-center">
                  <p className="text-xs font-bold text-gray-400 uppercase">সাবস্ক্রাইবার</p>
                  <h4 className="text-3xl font-bold text-brand-gold">৪৮২</h4>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-fadeIn">
              {posts.map(post => (
                <div key={post.id} className="bg-white rounded-xl shadow-sm border overflow-hidden">
                  <img src={post.image} className="w-full aspect-video object-cover" />
                  <div className="p-4">
                    <h4 className="font-bold mb-4 serif-content">{post.title}</h4>
                    <div className="flex justify-between">
                      <button onClick={() => setEditingPost(post)} className="text-brand-teal text-xs font-bold uppercase">এডিট</button>
                      <button onClick={() => { if(confirm('মুছে ফেলবেন?')) onUpdatePosts(posts.filter(p => p.id !== post.id)) }} className="text-red-500 text-xs font-bold uppercase">মুছে ফেলুন</button>
                    </div>
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
