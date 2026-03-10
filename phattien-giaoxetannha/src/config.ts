import { useState, useEffect } from 'react';
import localLogo from './assets/logo-phattien-ngang.png';

export interface FAQItem {
  q: string;
  a: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface AppConfig {
  logoUrl: string;
  heroImage: string;
  deliveryImages: string[];
  faqs: FAQItem[];
  socialLinks: SocialLink[];
}

const DEFAULT_CONFIG: AppConfig = {
  logoUrl: localLogo,
  heroImage: "https://phattien.com/wp-content/uploads/2023/12/DSC05061-1024x683.jpg",
  deliveryImages: [
    "https://thuvienanhweb.phattien.net/wp-content/uploads/2026/03/1.jpg",
    "https://thuvienanhweb.phattien.net/wp-content/uploads/2026/03/2.jpg",
    "https://thuvienanhweb.phattien.net/wp-content/uploads/2026/03/3.jpg",
    "https://thuvienanhweb.phattien.net/wp-content/uploads/2026/03/4.jpg",
    "https://thuvienanhweb.phattien.net/wp-content/uploads/2026/03/5.jpg",
    "https://thuvienanhweb.phattien.net/wp-content/uploads/2026/03/6.jpg",
  ],
  faqs: [
    { q: "Làm sao để tôi tin tưởng xe giao đến là xe mới 100%?", a: "Mọi xe giao đi đều đi kèm biên bản bàn giao từ HEAD Phát Tiến, số khung số máy trùng khớp với giấy tờ gốc và bạn có thể kiểm tra ODO (số km đã đi) ngay lúc nhận." },
    { q: "Dịch vụ có hỗ trợ mua xe trả góp không?", a: "Có. Chúng tôi hỗ trợ làm thủ tục trả góp online 100%. Bạn chỉ cần nhận xe và ký hồ sơ tại nhà." },
    { q: "Nếu tôi không ưng ý chiếc xe khi giao đến thì sao?", a: "Nếu xe có lỗi kỹ thuật hoặc không đúng như cam kết, bạn có quyền từ chối nhận xe mà không mất bất kỳ chi phí nào." },
    { q: "Thời gian giao xe mất bao lâu?", a: "Thông thường chúng tôi sẽ giao xe trong vòng 24h kể từ khi xác nhận đơn hàng thành công đối với các dòng xe có sẵn." }
  ],
  socialLinks: [
    { platform: 'FB', url: '#', icon: 'Facebook' },
    { platform: 'IG', url: '#', icon: 'Instagram' },
    { platform: 'YT', url: '#', icon: 'Youtube' },
    { platform: 'TT', url: '#', icon: 'Twitter' },
  ]
};

export const useConfig = () => {
  const [config, setConfig] = useState<AppConfig>(() => {
    const saved = localStorage.getItem('honda_app_config_v3');
    return saved ? JSON.parse(saved) : DEFAULT_CONFIG;
  });

  useEffect(() => {
    localStorage.setItem('honda_app_config_v3', JSON.stringify(config));
  }, [config]);

  const updateConfig = (newConfig: Partial<AppConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  };

  return { config, updateConfig };
};
