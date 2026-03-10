import React, { useState, useEffect } from 'react';
import {
  ChevronRight,
  CheckCircle2,
  Truck,
  ShieldCheck,
  Clock,
  CreditCard,
  MapPin,
  Star,
  Plus,
  Minus,
  MessageCircle,
  Menu,
  X,
  ArrowRight,
  Award,
  Users,
  Building2,
  ArrowUp,
  Play
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useConfig } from './config';
import AdminPage from './AdminPage';

// --- Components ---

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-honda-red text-white rounded-full flex items-center justify-center shadow-2xl shadow-honda-red/40 hover:bg-red-700 transition-all group"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const Navbar = () => {
  const { config } = useConfig();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-nav py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src={config.logoUrl} alt="Logo" className="h-[50px] w-auto object-contain" />

        </div>

        <div className="hidden md:flex items-center gap-8">
          {['Trang chủ', 'Dịch vụ', 'Quy trình', 'Bảng giá', 'Hỏi đáp'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className={`text-sm font-medium hover:text-honda-red transition-colors ${isScrolled ? 'text-premium-black' : 'text-white'}`}
            >
              {item}
            </a>
          ))}
          <button
            onClick={() => document.getElementById('đăng-ký')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-honda-red text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-red-700 transition-all premium-shadow"
          >
            Đặt xe ngay
          </button>
        </div>

        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className={isScrolled ? 'text-premium-black' : 'text-white'} /> : <Menu className={isScrolled ? 'text-premium-black' : 'text-white'} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white p-6 border-t md:hidden flex flex-col gap-4 shadow-xl"
          >
            {['Trang chủ', 'Dịch vụ', 'Quy trình', 'Bảng giá', 'Hỏi đáp'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-lg font-medium text-premium-black border-b border-gray-100 pb-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <button className="bg-honda-red text-white w-full py-4 rounded-xl font-bold mt-4">
              Đặt xe ngay
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const { config } = useConfig();
  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Background Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={config.heroImage}
          alt="Honda Motorcycle"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <span className="inline-block bg-honda-red/20 text-honda-red px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-sm border border-honda-red/30">
            Dịch vụ độc quyền
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-6 text-balance">
            Mua xe không cần <br />
            <span className="text-honda-red">đến HEAD</span>
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-lg leading-relaxed">
            Trải nghiệm mua sắm xe máy Honda hoàn toàn mới. Nhận xe tận nhà, kiểm tra kỹ lưỡng và chỉ thanh toán khi hoàn toàn hài lòng.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => document.getElementById('đăng-ký')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-honda-red text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-red-700 transition-all flex items-center justify-center gap-2 group"
            >
              Đặt xe ngay
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-full font-bold text-lg hover:bg-white/20 transition-all">
              Xem cách hoạt động
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-widest font-bold">Cuộn để khám phá</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent"></div>
      </motion.div>
    </section>
  );
};

const TrustBar = () => {
  const stats = [
    { icon: <Award className="w-6 h-6" />, label: "30+ Năm", sub: "Kinh nghiệm" },
    { icon: <Users className="w-6 h-6" />, label: "3 Triệu+", sub: "Khách hàng" },
    { icon: <Building2 className="w-6 h-6" />, label: "Hệ thống HEAD", sub: "Ủy nhiệm Honda" },
    { icon: <MapPin className="w-6 h-6" />, label: "Toàn TP.HCM", sub: "Giao nhanh 24h" },
  ];

  return (
    <section className="bg-white py-12 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col md:flex-row items-center md:items-start gap-4 text-center md:text-left">
              <div className="w-12 h-12 bg-premium-gray rounded-2xl flex items-center justify-center text-honda-red">
                {stat.icon}
              </div>
              <div>
                <div className="font-bold text-xl text-premium-black">{stat.label}</div>
                <div className="text-sm text-gray-500 font-medium">{stat.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ValueProps = () => {
  const features = [
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Giao xe tận nhà",
      desc: "Đội ngũ chuyên nghiệp vận chuyển xe đến tận cửa nhà bạn bằng xe chuyên dụng."
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "Thanh toán sau",
      desc: "Kiểm tra xe kỹ lưỡng, chạy thử và chỉ thanh toán khi bạn thực sự hài lòng."
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Xe chính hãng 100%",
      desc: "Cam kết xe mới hoàn toàn, đầy đủ giấy tờ từ hệ thống HEAD Phát Tiến."
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Giao trong ngày",
      desc: "Xác nhận đơn hàng và giao xe ngay trong vòng 24h làm việc."
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Vận chuyển an toàn",
      desc: "Quy trình đóng gói và vận chuyển nghiêm ngặt, bảo vệ xe tuyệt đối."
    }
  ];

  return (
    <section id="dịch-vụ" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Đặc quyền mua sắm cao cấp</h2>
          <p className="text-lg text-gray-500">Chúng tôi không chỉ bán xe, chúng tôi mang đến sự tiện nghi và an tâm tuyệt đối cho hành trình mới của bạn.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="p-8 rounded-3xl bg-premium-gray border border-transparent hover:border-honda-red/20 transition-all duration-500 premium-shadow group"
            >
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-honda-red mb-6 group-hover:scale-110 transition-transform duration-500 shadow-sm">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 leading-tight">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ExperienceSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = "mh2py76E4RI";

  return (
    <section className="py-24 bg-premium-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="w-full lg:w-1/2 relative">
            <div className="aspect-video lg:aspect-[4/5] rounded-[2rem] overflow-hidden bg-gray-900 shadow-2xl relative group">
              {!isPlaying ? (
                <>
                  <img
                    src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                    alt="Video Thumbnail"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div
                    onClick={() => setIsPlaying(true)}
                    className="absolute inset-0 bg-black/40 flex items-center justify-center transition-colors group-hover:bg-black/20 cursor-pointer z-10"
                    role="button"
                    aria-label="Play video"
                  >
                    <div className="w-20 h-20 bg-honda-red/90 text-white rounded-full flex items-center justify-center backdrop-blur-sm shadow-xl shadow-honda-red/30 group-hover:scale-110 group-hover:bg-honda-red transition-all pl-2">
                      <Play className="w-10 h-10 fill-white" />
                    </div>
                  </div>
                </>
              ) : (
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                  title="Honda Motorcycle Experience"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-honda-red/10 blur-[100px] rounded-full"></div>
          </div>

          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">Tận hưởng khoảnh khắc <br /> không chờ đợi</h2>

              <div className="space-y-10 mb-12">
                {[
                  { title: "Không chờ đợi", desc: "Bỏ qua việc xếp hàng tại showroom. Mọi thủ tục được xử lý nhanh chóng qua online." },
                  { title: "Không di chuyển", desc: "Tiết kiệm thời gian quý báu của bạn. Chúng tôi mang cả showroom đến trước cửa nhà." },
                  { title: "Không áp lực", desc: "Tự do kiểm tra xe trong không gian riêng tư của bạn trước khi quyết định thanh toán." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-6">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full border border-honda-red flex items-center justify-center text-honda-red font-bold text-sm">
                      0{idx + 1}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                      <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="bg-white text-premium-black px-10 py-5 rounded-full font-bold text-lg hover:bg-gray-200 transition-all">
                Khám phá ngay
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    { title: "Chọn xe online", desc: "Duyệt qua danh mục xe đa dạng trên website Phát Tiến." },
    { title: "Xác nhận đơn hàng", desc: "Đội ngũ tư vấn sẽ gọi điện xác nhận và hướng dẫn thủ tục." },
    { title: "Giao xe tận nhà", desc: "Xe được vận chuyển đến địa chỉ của bạn theo lịch hẹn." },
    { title: "Kiểm tra & Thanh toán", desc: "Kiểm tra xe, nhận bàn giao và thanh toán tại chỗ." }
  ];

  return (
    <section id="quy-trình" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Quy trình đơn giản</h2>
          <p className="text-lg text-gray-500">Chỉ với 4 bước để sở hữu chiếc xe mơ ước</p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-px bg-gray-100 -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-honda-red text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-8 shadow-xl shadow-honda-red/20 border-8 border-white">
                  {i + 1}
                </div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed px-4">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Comparison = () => {
  const rows = [
    { feature: "Thời gian mua hàng", traditional: "2 - 4 tiếng", home: "15 phút online" },
    { feature: "Di chuyển", traditional: "Phải đến tận showroom", home: "Tại nhà / Văn phòng" },
    { feature: "Kiểm tra xe", traditional: "Tại cửa hàng đông đúc", home: "Tại nhà, yên tĩnh & kỹ lưỡng" },
    { feature: "Thanh toán", traditional: "Tại quầy thu ngân", home: "Tại nhà sau khi nhận xe" },
    { feature: "Thủ tục giấy tờ", traditional: "Tự làm hoặc chờ đợi", home: "Hỗ trợ tận nơi 100%" },
  ];

  return (
    <section className="py-24 bg-premium-gray">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Sự khác biệt vượt trội</h2>
          <p className="text-gray-500">So sánh trải nghiệm mua sắm truyền thống và hiện đại</p>
        </div>

        <div className="bg-white rounded-[2.5rem] overflow-hidden premium-shadow border border-black/5">
          <div className="grid grid-cols-3 bg-premium-black text-white p-8">
            <div className="font-bold">Đặc điểm</div>
            <div className="font-bold text-center opacity-60">Mua tại HEAD</div>
            <div className="font-bold text-center text-honda-red">Giao xe tận nhà</div>
          </div>

          {rows.map((row, i) => (
            <div key={i} className={`grid grid-cols-3 p-8 border-b border-gray-50 ${i === rows.length - 1 ? 'border-none' : ''}`}>
              <div className="font-semibold text-premium-black">{row.feature}</div>
              <div className="text-center text-gray-400">{row.traditional}</div>
              <div className="text-center font-bold text-premium-black flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                {row.home}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SocialProof = () => {
  const { config } = useConfig();

  const testimonials = [
    { name: "Anh Minh Quân", role: "Quận 1, TP.HCM", text: "Dịch vụ quá tuyệt vời. Tôi bận đi làm cả ngày, chỉ cần đặt online buổi sáng, chiều xe đã có mặt tại nhà. Nhân viên bàn giao rất kỹ." },
    { name: "Chị Thanh Trúc", role: "Quận 7, TP.HCM", text: "Lần đầu mua xe mà không cần ra cửa hàng. Cảm giác nhận xe tại nhà rất sang trọng và an tâm vì được kiểm tra kỹ mới trả tiền." }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Khoảnh khắc bàn giao</h2>
          <p className="text-gray-500">Hàng ngàn khách hàng đã tin tưởng và hài lòng</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-20">
          {config.deliveryImages.map((img, i) => (
            <div key={i} className="aspect-square rounded-3xl overflow-hidden group">
              <img
                src={img}
                alt="Delivery"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="p-10 rounded-[2.5rem] bg-premium-gray premium-shadow">
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-honda-red text-honda-red" />)}
              </div>
              <p className="text-xl italic text-premium-black mb-8 leading-relaxed">"{t.text}"</p>
              <div>
                <div className="font-bold text-lg">{t.name}</div>
                <div className="text-sm text-gray-500">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Pricing = () => {
  return (
    <section id="bảng-giá" className="py-24 bg-premium-gray">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-[3rem] p-12 md:p-20 premium-shadow relative overflow-hidden text-center md:pt-20 pt-16">
          <div className="absolute top-4 right-4 md:top-10 md:right-10 bg-honda-red text-white px-6 py-2 rounded-full text-sm font-bold animate-pulse">
            Ưu đãi giới hạn
          </div>

          <h2 className="text-4xl font-bold mb-6">Chi phí dịch vụ</h2>
          <p className="text-xl text-gray-500 mb-12">Minh bạch, rõ ràng và xứng đáng với trải nghiệm của bạn</p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-12 mb-16">
            <div className="text-center">
              <div className="text-sm text-gray-400 uppercase tracking-widest font-bold mb-2">Nội thành TP.HCM</div>
              <div className="text-5xl font-bold text-honda-red">Miễn phí</div>
              <div className="text-sm text-gray-500 mt-2">Cho tất cả các dòng xe</div>
            </div>
            <div className="hidden md:block w-px h-20 bg-gray-100"></div>
            <div className="text-center">
              <div className="text-sm text-gray-400 uppercase tracking-widest font-bold mb-2">Khu vực lân cận</div>
              <div className="text-5xl font-bold text-premium-black">Từ 200k</div>
              <div className="text-sm text-gray-500 mt-2">Tùy theo khoảng cách</div>
            </div>
          </div>

          <div className="bg-premium-gray rounded-2xl p-6 mb-12 text-left">
            <h4 className="font-bold mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-honda-red" />
              Gói dịch vụ bao gồm:
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["Vận chuyển chuyên dụng", "Hỗ trợ đăng ký biển số", "Bàn giao kỹ thuật tận nơi", "Quà tặng chính hãng"].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => document.getElementById('đăng-ký')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-honda-red text-white px-12 py-6 rounded-full font-bold text-xl hover:bg-red-700 transition-all shadow-xl shadow-honda-red/20 w-full md:w-auto"
          >
            Đặt xe ngay hôm nay
          </button>
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const { config } = useConfig();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="hỏi-đáp" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Câu hỏi thường gặp</h2>
          <p className="text-gray-500">Giải đáp những thắc mắc của bạn về dịch vụ</p>
        </div>

        <div className="space-y-4">
          {config.faqs.map((faq, i) => (
            <div key={i} className="border border-gray-100 rounded-3xl overflow-hidden">
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center justify-between p-8 text-left hover:bg-premium-gray transition-colors"
              >
                <span className="text-lg font-bold text-premium-black">{faq.q}</span>
                {openIdx === i ? <Minus className="w-5 h-5 text-honda-red" /> : <Plus className="w-5 h-5 text-gray-400" />}
              </button>
              <AnimatePresence>
                {openIdx === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-8 pt-0 text-gray-500 leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const RegistrationSection = () => {
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    model: '',
    address: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Đã thay thế bằng Webhook thực tế của User
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxXzYqkKxvRa5F23uAd0dqJinzWoh0UIVhIYQlevBvXh8J_Ery6odmWs-7o2nvuoxtY/exec';

    try {
      // Bắt URL hiện tại (bao gồm các tham số utm_source, utm_campaign...)
      const trackingUrl = window.location.href;

      const payload = {
        ...formState,
        trackingUrl
      };

      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        }
      });

      // Với no-cors, response trả về sẽ là opaque (không đọc được body)
      // Nên ta cứ mặc định là thành công nếu không văng ra lỗi mạng
      setIsSuccess(true);

      // Bắt sự kiện GTM DataLayer
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'lead_form_submitted',
          form_name: 'Giao Xe Tan Nha',
          car_model: formState.model
        });
      }

      setFormState({ name: '', phone: '', model: '', address: '' });
    } catch (error) {
      console.error('Error submitting form', error);
      alert('Không thể kết nối đến máy chủ. Vui lòng thử lại sau.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="đăng-ký" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Đăng ký nhận tư vấn</h2>
            <p className="text-lg text-gray-500 mb-8">
              Để lại thông tin của bạn, đội ngũ chuyên viên của Phát Tiến sẽ liên hệ tư vấn chi tiết về dòng xe và quy trình giao xe tận nhà trong vòng 15 phút.
            </p>

            <div className="space-y-6">
              {[
                { icon: <CheckCircle2 className="w-5 h-5 text-green-500" />, text: "Tư vấn chọn dòng xe phù hợp" },
                { icon: <CheckCircle2 className="w-5 h-5 text-green-500" />, text: "Báo giá lăn bánh chính xác nhất" },
                { icon: <CheckCircle2 className="w-5 h-5 text-green-500" />, text: "Hướng dẫn thủ tục trả góp 0%" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  {item.icon}
                  <span className="font-medium text-premium-black">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="bg-premium-gray p-8 md:p-12 rounded-[2.5rem] premium-shadow border border-black/5">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Gửi thông tin thành công!</h3>
                  <p className="text-gray-500 mb-8">Cảm ơn bạn đã tin tưởng Phát Tiến. Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.</p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="text-honda-red font-bold hover:underline"
                  >
                    Gửi yêu cầu khác
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 ml-1">Họ và tên</label>
                      <input
                        required
                        type="text"
                        placeholder="Nguyễn Văn A"
                        className="w-full px-6 py-4 rounded-2xl bg-white border border-gray-200 focus:border-honda-red focus:ring-2 focus:ring-honda-red/20 outline-none transition-all"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 ml-1">Số điện thoại</label>
                      <input
                        required
                        type="tel"
                        placeholder="0901 234 567"
                        className="w-full px-6 py-4 rounded-2xl bg-white border border-gray-200 focus:border-honda-red focus:ring-2 focus:ring-honda-red/20 outline-none transition-all"
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Dòng xe quan tâm</label>
                    <select
                      required
                      className="w-full px-6 py-4 rounded-2xl bg-white border border-gray-200 focus:border-honda-red focus:ring-2 focus:ring-honda-red/20 outline-none transition-all appearance-none"
                      value={formState.model}
                      onChange={(e) => setFormState({ ...formState, model: e.target.value })}
                    >
                      <option value="">Chọn dòng xe</option>
                      <option value="sh350i">Honda SH350i</option>
                      <option value="sh160i">Honda SH160i/125i</option>
                      <option value="airblade">Honda Air Blade</option>
                      <option value="vision">Honda Vision</option>
                      <option value="vario">Honda Vario</option>
                      <option value="winner">Honda Winner X</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Địa chỉ nhận xe (Quận/Huyện)</label>
                    <input
                      required
                      type="text"
                      placeholder="Ví dụ: Quận 1, TP.HCM"
                      className="w-full px-6 py-4 rounded-2xl bg-white border border-gray-200 focus:border-honda-red focus:ring-2 focus:ring-honda-red/20 outline-none transition-all"
                      value={formState.address}
                      onChange={(e) => setFormState({ ...formState, address: e.target.value })}
                    />
                  </div>

                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full bg-honda-red text-white py-5 rounded-2xl font-bold text-lg hover:bg-red-700 transition-all shadow-xl shadow-honda-red/20 flex items-center justify-center gap-3 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        Gửi yêu cầu ngay
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                  <p className="text-center text-xs text-gray-400">
                    Bằng cách gửi thông tin, bạn đồng ý với chính sách bảo mật của Phát Tiến.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FinalCTA = () => {
  return (
    <section className="py-32 bg-premium-black relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-honda-red/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-10 leading-tight">
            Chiếc xe mới của bạn <br />
            đang chờ trước cửa nhà.
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button
              onClick={() => document.getElementById('đăng-ký')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-honda-red text-white px-12 py-6 rounded-full font-bold text-xl hover:bg-red-700 transition-all shadow-2xl shadow-honda-red/40 w-full sm:w-auto"
            >
              Đặt xe ngay
            </button>
            <a
              href="https://zalo.me/hondaphattien"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-12 py-6 rounded-full font-bold text-xl hover:bg-white/20 transition-all flex items-center gap-3 w-full sm:w-auto justify-center"
            >
              <MessageCircle className="w-6 h-6 fill-white" />
              Tư vấn qua Zalo
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  const { config } = useConfig();
  return (
    <footer className="bg-white pt-24 pb-12 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-8">
              <img src={config.logoUrl} alt="Logo" className="h-[50px] w-auto object-contain" />

            </div>
            <p className="text-gray-500 leading-relaxed mb-8">
              Hệ thống HEAD Phát Tiến - Đại lý ủy nhiệm chính thức của Honda Việt Nam. Tận tâm phục vụ, khẳng định niềm tin.
            </p>
            <div className="flex gap-4">
              {config.socialLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-premium-gray flex items-center justify-center text-xs font-bold text-gray-400 hover:bg-honda-red hover:text-white transition-all cursor-pointer"
                >
                  {link.platform}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h5 className="font-bold text-lg mb-8">Dịch vụ</h5>
            <ul className="space-y-4 text-gray-500">
              <li><a href="#" className="hover:text-honda-red transition-colors">Giao xe tận nhà</a></li>
              <li><a href="#" className="hover:text-honda-red transition-colors">Bảo dưỡng lưu động</a></li>
              <li><a href="#" className="hover:text-honda-red transition-colors">Cứu hộ 24/7</a></li>
              <li><a href="#" className="hover:text-honda-red transition-colors">Phụ tùng chính hãng</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-lg mb-8">Hệ thống HEAD</h5>
            <ul className="space-y-4 text-gray-500">
              <li><a href="#" className="hover:text-honda-red transition-colors">HEAD Phát Tiến 1</a></li>
              <li><a href="#" className="hover:text-honda-red transition-colors">HEAD Phát Tiến 2</a></li>
              <li><a href="#" className="hover:text-honda-red transition-colors">HEAD Phát Tiến 3</a></li>
              <li><a href="#" className="hover:text-honda-red transition-colors">HEAD Phát Tiến 4</a></li>
              <li><a href="#" className="hover:text-honda-red transition-colors">HEAD Phát Tiến 5</a></li>
              <li><a href="#" className="hover:text-honda-red transition-colors">HEAD Phát Tiến 6</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-lg mb-8">Liên hệ</h5>
            <ul className="space-y-4 text-gray-500">
              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-honda-red" />
                08:00 - 20:00 (T2 - CN)
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-honda-red" />
                1800 6610 (Miễn phí)
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-honda-red" />
                TP. Hồ Chí Minh
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-gray-400">© 2026 Hệ thống HEAD Phát Tiến. All rights reserved.</p>
          <div className="flex gap-8 text-sm text-gray-400">
            <Link to="/admin" className="hover:text-premium-black">Quản trị</Link>
            <a href="#" className="hover:text-premium-black">Chính sách bảo mật</a>
            <a href="#" className="hover:text-premium-black">Điều khoản sử dụng</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FloatingCTA = () => {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-4 md:hidden">
      <a
        href="https://zalo.me/hondaphattien"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl"
      >
        <MessageCircle className="w-7 h-7 fill-white" />
      </a>
      <button
        onClick={() => document.getElementById('đăng-ký')?.scrollIntoView({ behavior: 'smooth' })}
        className="bg-honda-red text-white px-6 py-4 rounded-full font-bold shadow-2xl flex items-center gap-2"
      >
        Đặt xe ngay
      </button>
    </div>
  );
};

// --- Main App ---

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <TrustBar />
      <ValueProps />
      <ExperienceSection />
      <HowItWorks />
      <Comparison />
      <SocialProof />
      <Pricing />
      <RegistrationSection />
      <FAQ />
      <FinalCTA />
      <Footer />
      <FloatingCTA />
      <ScrollToTop />
    </>
  );
};

export default function App() {
  return (
    <Router basename="/giaoxetannha">
      <div className="min-h-screen selection:bg-honda-red selection:text-white">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </Router>
  );
}
