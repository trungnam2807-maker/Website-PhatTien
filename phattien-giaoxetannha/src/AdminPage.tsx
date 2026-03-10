import React, { useState } from 'react';
import { useConfig, FAQItem, SocialLink } from './config';
import { 
  Save, 
  Plus, 
  Trash2, 
  Image as ImageIcon, 
  HelpCircle, 
  Share2, 
  ArrowLeft,
  Layout,
  Lock,
  LogOut
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminPage = () => {
  const { config, updateConfig } = useConfig();
  const [activeTab, setActiveTab] = useState('hero');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple hardcoded password for demonstration
    if (password === 'admin123') {
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleSave = () => {
    alert('Đã lưu cấu hình thành công!');
  };

  const updateFAQ = (index: number, field: keyof FAQItem, value: string) => {
    const newFaqs = [...config.faqs];
    newFaqs[index] = { ...newFaqs[index], [field]: value };
    updateConfig({ faqs: newFaqs });
  };

  const addFAQ = () => {
    updateConfig({ faqs: [...config.faqs, { q: 'Câu hỏi mới', a: 'Câu trả lời mới' }] });
  };

  const removeFAQ = (index: number) => {
    updateConfig({ faqs: config.faqs.filter((_, i) => i !== index) });
  };

  const updateDeliveryImage = (index: number, value: string) => {
    const newImages = [...config.deliveryImages];
    newImages[index] = value;
    updateConfig({ deliveryImages: newImages });
  };

  const updateSocialLink = (index: number, field: keyof SocialLink, value: string) => {
    const newLinks = [...config.socialLinks];
    newLinks[index] = { ...newLinks[index], [field]: value };
    updateConfig({ socialLinks: newLinks });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-premium-black flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-[2.5rem] p-10 shadow-2xl">
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-honda-red/10 rounded-3xl flex items-center justify-center text-honda-red mx-auto mb-6">
              <Lock className="w-10 h-10" />
            </div>
            <h1 className="text-3xl font-bold text-premium-black mb-2">Quản trị hệ thống</h1>
            <p className="text-gray-500">Vui lòng nhập mật khẩu để tiếp tục</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Mật khẩu</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full px-6 py-4 rounded-2xl bg-gray-50 border ${loginError ? 'border-red-500 ring-2 ring-red-500/10' : 'border-gray-200'} focus:border-honda-red focus:ring-2 focus:ring-honda-red/20 outline-none transition-all`}
                autoFocus
              />
              {loginError && (
                <p className="text-red-500 text-xs font-bold ml-1">Mật khẩu không chính xác. Vui lòng thử lại.</p>
              )}
            </div>

            <button 
              type="submit"
              className="w-full bg-honda-red text-white py-5 rounded-2xl font-bold text-lg hover:bg-red-700 transition-all shadow-xl shadow-honda-red/20"
            >
              Đăng nhập
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link to="/" className="text-sm text-gray-400 hover:text-honda-red transition-colors flex items-center justify-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Quay lại trang chủ
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-premium-black text-white p-6 flex flex-col">
        <div className="flex items-center gap-2 mb-10">
          <img src={config.logoUrl} alt="Logo" className="h-8 w-auto object-contain" />
          <span className="font-bold text-xl">Admin Panel</span>
        </div>

        <nav className="flex-1 space-y-2">
          {[
            { id: 'hero', label: 'Hero Section', icon: <Layout className="w-5 h-5" /> },
            { id: 'delivery', label: 'Khoảnh khắc bàn giao', icon: <ImageIcon className="w-5 h-5" /> },
            { id: 'faq', label: 'Câu hỏi thường gặp', icon: <HelpCircle className="w-5 h-5" /> },
            { id: 'footer', label: 'Footer & Social', icon: <Share2 className="w-5 h-5" /> },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === tab.id ? 'bg-honda-red text-white' : 'text-gray-400 hover:bg-white/5'}`}
            >
              {tab.icon}
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto space-y-4">
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="w-full flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors text-sm px-4"
          >
            <LogOut className="w-4 h-4" />
            Đăng xuất
          </button>
          <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm px-4">
            <ArrowLeft className="w-4 h-4" />
            Quay lại trang chủ
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-premium-black">Cấu hình nội dung</h1>
          <button 
            onClick={handleSave}
            className="bg-honda-red text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-red-700 transition-all shadow-lg shadow-honda-red/20"
          >
            <Save className="w-5 h-5" />
            Lưu thay đổi
          </button>
        </header>

        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">
          {activeTab === 'hero' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold mb-4">Cấu hình chung</h2>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-500">URL Logo (Header)</label>
                  <input 
                    type="text" 
                    value={config.logoUrl}
                    onChange={(e) => updateConfig({ logoUrl: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-honda-red/20 outline-none"
                  />
                  <div className="mt-4 h-16 bg-premium-black rounded-2xl flex items-center justify-center p-4 border border-gray-100">
                    <img src={config.logoUrl} alt="Logo Preview" className="h-full object-contain" />
                  </div>
                </div>
              </div>

              <hr className="border-gray-100" />

              <div>
                <h2 className="text-xl font-bold mb-4">Hero Section</h2>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-500">URL Hình ảnh nền</label>
                  <input 
                    type="text" 
                    value={config.heroImage}
                    onChange={(e) => updateConfig({ heroImage: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-honda-red/20 outline-none"
                  />
                  <div className="mt-4 aspect-video rounded-2xl overflow-hidden border border-gray-100">
                    <img src={config.heroImage} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'delivery' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold mb-4">Khoảnh khắc bàn giao (6 ảnh)</h2>
              <div className="grid grid-cols-2 gap-6">
                {config.deliveryImages.map((img, idx) => (
                  <div key={idx} className="space-y-2">
                    <label className="text-sm font-bold text-gray-500">Hình ảnh {idx + 1}</label>
                    <input 
                      type="text" 
                      value={img}
                      onChange={(e) => updateDeliveryImage(idx, e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-honda-red/20 outline-none"
                    />
                    <div className="aspect-square rounded-xl overflow-hidden border border-gray-100 mt-2">
                      <img src={img} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'faq' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Câu hỏi thường gặp</h2>
                <button 
                  onClick={addFAQ}
                  className="text-honda-red font-bold flex items-center gap-1 hover:underline"
                >
                  <Plus className="w-4 h-4" /> Thêm câu hỏi
                </button>
              </div>
              <div className="space-y-4">
                {config.faqs.map((faq, idx) => (
                  <div key={idx} className="p-6 rounded-2xl border border-gray-100 bg-gray-50 relative group">
                    <button 
                      onClick={() => removeFAQ(idx)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-400 uppercase">Câu hỏi</label>
                        <input 
                          type="text" 
                          value={faq.q}
                          onChange={(e) => updateFAQ(idx, 'q', e.target.value)}
                          className="w-full bg-transparent font-bold text-premium-black outline-none border-b border-gray-200 focus:border-honda-red pb-1"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-400 uppercase">Câu trả lời</label>
                        <textarea 
                          value={faq.a}
                          onChange={(e) => updateFAQ(idx, 'a', e.target.value)}
                          className="w-full bg-transparent text-gray-600 outline-none border-b border-gray-200 focus:border-honda-red pb-1 resize-none"
                          rows={2}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'footer' && (
            <div className="space-y-8">
              <h2 className="text-xl font-bold mb-4">Footer & Social Links</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {config.socialLinks.map((link, idx) => (
                  <div key={idx} className="p-6 rounded-2xl border border-gray-100 bg-gray-50 space-y-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-premium-black text-white flex items-center justify-center font-bold text-xs">
                        {link.platform}
                      </div>
                      <span className="font-bold text-premium-black">Mạng xã hội {idx + 1}</span>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs font-bold text-gray-400 uppercase">Tên hiển thị (VD: FB, YT)</label>
                        <input 
                          type="text" 
                          value={link.platform}
                          onChange={(e) => updateSocialLink(idx, 'platform', e.target.value)}
                          className="w-full bg-transparent font-medium outline-none border-b border-gray-200 focus:border-honda-red"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-400 uppercase">Link liên kết</label>
                        <input 
                          type="text" 
                          value={link.url}
                          onChange={(e) => updateSocialLink(idx, 'url', e.target.value)}
                          className="w-full bg-transparent font-medium outline-none border-b border-gray-200 focus:border-honda-red"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
