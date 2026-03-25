import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, ShoppingBag, ChevronRight, Star, Clock, Phone, Menu, X, ArrowRight, PlayCircle, Plus } from 'lucide-react';

// --- Data ---
const MENU_CATEGORIES = ['腊汁肉', '飲品', '套餐'];
const MENU_ITEMS = [
  { id: 1, name: '招牌經典腊汁肉夾饃', desc: '現滷現切，肥瘦剛剛好，皮酥肉爛。', price: 15, category: '腊汁肉', image: 'https://images.unsplash.com/photo-1627308595229-7830f5c90683?auto=format&fit=crop&q=80&w=600', tags: ['熱銷', '招牌'] },
  { id: 2, name: '純瘦腊汁肉夾饃', desc: '精選瘦肉，滷汁入味，不柴不膩。', price: 16, category: '腊汁肉', image: 'https://images.unsplash.com/photo-1596649283733-401490231920?auto=format&fit=crop&q=80&w=600' },
  { id: 3, name: '冰鎮酸梅湯', desc: '古法熬製，解膩消暑，搭配肉夾饃絕佳。', price: 8, category: '飲品', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=600' },
  { id: 4, name: '長安冰峰', desc: '西安人的童年回憶，經典橙味汽水。', price: 5, category: '飲品', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=600' },
  { id: 5, name: '單人經典套餐', desc: '招牌肉夾饃 + 涼皮 + 酸梅湯', price: 28, category: '套餐', image: 'https://images.unsplash.com/photo-1606843046080-a6daa392a246?auto=format&fit=crop&q=80&w=600', tags: ['超值'] },
];

const STORES = [
  { id: 1, name: '鐘樓總店', address: '西安市碑林區鐘樓商圈1號', time: '10:00 - 22:00', distance: '1.2km' },
  { id: 2, name: '大雁塔分店', address: '西安市雁塔區大雁塔南廣場', time: '10:00 - 22:30', distance: '3.5km' },
  { id: 3, name: '高新旗艦店', address: '西安市高新區科技路金鷹國際', time: '09:30 - 21:30', distance: '5.8km' },
];

const REVIEWS = [
  { id: 1, user: '王先生', text: '這是我吃過最地道的肉夾饃，肥而不膩，饃酥脆！', rating: 5 },
  { id: 2, user: '李小姐', text: '每次來西安必吃，酸梅湯配肉夾饃簡直絕配。', rating: 5 },
  { id: 3, user: '張同學', text: '現切的肉真的很香，排隊也值得！', rating: 5 },
];

// --- Components ---

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-serif font-bold text-xl">
            樊
          </div>
          <span className={`font-serif font-bold text-xl tracking-wider ${isScrolled ? 'text-text-main' : 'text-white'}`}>
            樊记腊汁肉
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {['招牌菜單', '品牌故事', '尋找門店'].map((item) => (
            <a key={item} href={`#${item}`} className={`font-medium hover:text-primary transition-colors ${isScrolled ? 'text-text-main' : 'text-white/90'}`}>
              {item}
            </a>
          ))}
          <button className="bg-primary hover:bg-primary-hover text-white px-6 py-2.5 rounded-full font-medium transition-colors flex items-center gap-2 shadow-lg shadow-primary/30">
            <ShoppingBag size={18} />
            立即點餐
          </button>
        </nav>

        {/* Mobile Toggle */}
        <button className="md:hidden text-primary" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28} className={isScrolled ? 'text-text-main' : 'text-white'} /> : <Menu size={28} className={isScrolled ? 'text-text-main' : 'text-white'} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-100 py-4 px-4 flex flex-col gap-4 md:hidden"
          >
            {['招牌菜單', '品牌故事', '尋找門店'].map((item) => (
              <a key={item} href={`#${item}`} className="text-lg font-medium text-text-main py-2 border-b border-gray-50" onClick={() => setMobileMenuOpen(false)}>
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1626804475297-41609ea0af49?auto=format&fit=crop&q=80&w=1920" 
          alt="樊记腊汁肉" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 pt-20">
        <div className="max-w-2xl text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-primary/20 border border-primary/50 text-primary-100 text-sm font-medium mb-6 backdrop-blur-sm">
              百年傳承 · 地道長安味
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight mb-6">
              一口入魂的<br />老味道
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-lg leading-relaxed">
              傳統工藝，現滷現切。肥瘦剛剛好，每一口都是地道長安味。
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-full font-bold text-lg transition-transform hover:scale-105 flex items-center justify-center gap-2 shadow-xl shadow-primary/30">
                <ShoppingBag size={20} />
                馬上下單
              </button>
              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full font-bold text-lg transition-colors flex items-center justify-center gap-2">
                <MapPin size={20} />
                附近門店
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    { title: '傳統工藝', desc: '百年老湯，慢火熬燉', icon: '🍲' },
    { title: '現滷現切', desc: '保證每一口的新鮮與溫度', icon: '🔪' },
    { title: '地道風味', desc: '精選香料，還原老長安記憶', icon: '🌶️' },
  ];

  return (
    <section className="py-16 bg-white relative -mt-10 z-20 rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-4 p-6 rounded-2xl bg-bg-light border border-gray-100"
            >
              <div className="text-4xl">{f.icon}</div>
              <div>
                <h3 className="font-bold text-lg mb-1">{f.title}</h3>
                <p className="text-text-muted text-sm">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MenuSection() {
  const [activeTab, setActiveTab] = useState(MENU_CATEGORIES[0]);

  const filteredItems = MENU_ITEMS.filter(item => item.category === activeTab);

  return (
    <section id="招牌菜單" className="py-20 bg-bg-light">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">招牌必點</h2>
          <p className="text-text-muted">精心挑選，每一款都是經典</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-white p-1 rounded-full shadow-sm border border-gray-100">
            {MENU_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeTab === cat 
                    ? 'bg-primary text-white shadow-md' 
                    : 'text-text-muted hover:text-text-main'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map(item => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow group border border-gray-50"
              >
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {item.tags && (
                    <div className="absolute top-3 left-3 flex gap-2">
                      {item.tags.map(tag => (
                        <span key={tag} className="bg-primary text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <span className="font-bold text-primary text-lg">¥{item.price}</span>
                  </div>
                  <p className="text-text-muted text-sm mb-4 line-clamp-2">{item.desc}</p>
                  <button className="w-full py-2.5 rounded-xl border border-primary text-primary font-medium hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2">
                    <Plus size={18} />
                    加入購物車
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function BrandStory() {
  return (
    <section id="品牌故事" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] lg:aspect-square">
              <img src="https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&q=80&w=1000" alt="製作工藝" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center group cursor-pointer">
                <div className="w-16 h-16 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <PlayCircle size={32} className="text-white" />
                </div>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-bg-light rounded-full -z-10"></div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 leading-tight">
              傳承百年的<br /><span className="text-primary">講究</span>
            </h2>
            <div className="space-y-6 text-text-muted text-lg">
              <p>
                「樊记」的故事，始於長安城內的一口老湯。我們堅持使用傳統工藝，三十多種名貴調料，慢火熬燉數十小時，只為那一抹醇厚的肉香。
              </p>
              <p>
                饃，必須是現打的白吉饃，外酥裡嫩，帶著麥香。肉，必須是肥瘦相間的五花，滷得酥爛，入口即化。
              </p>
              <p className="font-medium text-text-main border-l-4 border-primary pl-4 py-1">
                不妥協的食材，不偷懶的工藝，是我們對每一位食客的承諾。
              </p>
            </div>
            <button className="mt-8 flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all">
              了解更多品牌故事 <ArrowRight size={20} />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SocialProof() {
  return (
    <section className="py-20 bg-bg-light">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">食客口碑</h2>
          <div className="flex justify-center items-center gap-2 text-yellow-500 mb-2">
            {[1,2,3,4,5].map(i => <Star key={i} fill="currentColor" size={24} />)}
          </div>
          <p className="text-text-muted">超過 100,000+ 顧客的美味認證</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review, i) => (
            <motion.div 
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-50 relative"
            >
              <div className="text-primary/20 absolute top-6 right-6 font-serif text-6xl leading-none">"</div>
              <div className="flex gap-1 text-yellow-500 mb-4">
                {[...Array(review.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-lg mb-6 relative z-10">"{review.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-500">
                  {review.user[0]}
                </div>
                <span className="font-medium">{review.user}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StoreLocator() {
  return (
    <section id="尋找門店" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">尋找附近門店</h2>
            <p className="text-text-muted mb-8">隨時隨地，享受地道美味</p>
            
            <div className="space-y-4">
              {STORES.map((store) => (
                <div key={store.id} className="p-6 rounded-2xl border border-gray-100 hover:border-primary/30 hover:shadow-md transition-all group">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-xl group-hover:text-primary transition-colors">{store.name}</h3>
                    <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded">{store.distance}</span>
                  </div>
                  <div className="space-y-2 text-text-muted text-sm mb-4">
                    <p className="flex items-center gap-2"><MapPin size={16} /> {store.address}</p>
                    <p className="flex items-center gap-2"><Clock size={16} /> {store.time}</p>
                  </div>
                  <div className="flex gap-3">
                    <button className="flex-1 py-2 rounded-lg bg-bg-light text-text-main font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                      <MapPin size={16} /> 一鍵導航
                    </button>
                    <button className="flex-1 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary-hover transition-colors flex items-center justify-center gap-2">
                      <ShoppingBag size={16} /> 點外賣
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex-1 min-h-[400px] bg-gray-100 rounded-3xl overflow-hidden relative border border-gray-200">
            {/* Map Placeholder */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
              <MapPin size={48} className="mb-4 text-primary/50" />
              <p>互動地圖載入中...</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-text-main text-white pt-16 pb-24 md:pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-serif font-bold text-xl">
                樊
              </div>
              <span className="font-serif font-bold text-2xl tracking-wider">
                樊记腊汁肉
              </span>
            </div>
            <p className="text-gray-400 max-w-sm mb-6">
              傳承百年工藝，用心做好每一個肉夾饃。為您帶來最地道的長安風味。
            </p>
            <div className="flex gap-4">
              {/* Social Icons Placeholders */}
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
                微信
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
                抖音
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">快速連結</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">關於我們</a></li>
              <li><a href="#招牌菜單" className="hover:text-white transition-colors">最新菜單</a></li>
              <li><a href="#尋找門店" className="hover:text-white transition-colors">門店分佈</a></li>
              <li><a href="#" className="hover:text-white transition-colors">會員中心</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-4">聯絡我們</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center gap-2"><Phone size={16} /> 400-123-4567</li>
              <li className="flex items-center gap-2"><Clock size={16} /> 週一至週日 09:00-22:00</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
          <p>© 2026 樊记腊汁肉 版權所有.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">隱私政策</a>
            <a href="#" className="hover:text-white transition-colors">服務條款</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function MobileBottomBar() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 z-50 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] flex gap-3">
      <button className="flex-1 py-3 rounded-xl bg-bg-light text-text-main font-medium flex items-center justify-center gap-2">
        <MapPin size={18} /> 找門店
      </button>
      <button className="flex-[2] py-3 rounded-xl bg-primary text-white font-bold text-lg shadow-lg shadow-primary/30 flex items-center justify-center gap-2">
        <ShoppingBag size={20} /> 立即下單
      </button>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-bg-light font-sans selection:bg-primary/20">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <MenuSection />
        <BrandStory />
        <SocialProof />
        <StoreLocator />
      </main>
      <Footer />
      <MobileBottomBar />
    </div>
  );
}
