import React, { useState, useMemo } from 'react';
import { 
  Camera, 
  Aperture, 
  Search, 
  ShoppingCart, 
  LayoutGrid, 
  List, 
  Check, 
  ShieldCheck, 
  Truck, 
  Star, 
  X, 
  Menu, 
  Eye, 
  ArrowRight, 
  Phone, 
  Instagram, 
  Mail, 
  MapPin 
} from 'lucide-react';
import { PRODUCTS, CATEGORIES, STORE_INFO } from './data/products';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("Todos os Produtos");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'list'
  const [sortBy, setSortBy] = useState("relevance");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const formatCurrency = (val) => {
    return Number(val).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    showToast(`"${product.name.slice(0, 30)}..." adicionado ao carrinho!`);
  };

  const updateCartQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartTotalItems = useMemo(() => cart.reduce((acc, item) => acc + item.qty, 0), [cart]);
  const cartTotalPrice = useMemo(() => cart.reduce((acc, item) => acc + (item.price * item.qty), 0), [cart]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchCategory = selectedCategory === "Todos os Produtos" || product.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q || 
        product.name.toLowerCase().includes(q) || 
        product.code.toLowerCase().includes(q) || 
        product.category.toLowerCase().includes(q) ||
        (product.description && product.description.toLowerCase().includes(q));

      return matchCategory && matchSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      return 0;
    });
  }, [selectedCategory, searchQuery, sortBy]);

  const getWhatsAppProductLink = (product) => {
    const text = encodeURIComponent(
      `Olá Marcelo! 👋 Vim pelo site da *MvillasBoasCameras* e tenho interesse no produto:\n\n` +
      `📸 *${product.name}*\n` +
      `🏷️ Código: *${product.code}*\n` +
      `💰 Valor: *${formatCurrency(product.price)}*\n\n` +
      `Gostaria de confirmar a disponibilidade e prazo de envio/retirada!`
    );
    return `https://wa.me/${STORE_INFO.whatsappNumber}?text=${text}`;
  };

  const getWhatsAppCheckoutLink = () => {
    let msg = `Olá Marcelo! 👋 Gostaria de fazer um pedido pela *MvillasBoasCameras*:\n\n`;
    cart.forEach((item, idx) => {
      msg += `${idx + 1}. *${item.name}*\n   Qtd: ${item.qty}x | Cód: ${item.code} | Subtotal: ${formatCurrency(item.price * item.qty)}\n\n`;
    });
    msg += `*TOTAL DO PEDIDO:* ${formatCurrency(cartTotalPrice)}\n\n`;
    msg += `Como posso efetuar o pagamento e combinar a entrega/retirada na loja?`;
    return `https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  };

  const getCategoryCount = (cat) => {
    if (cat === "Todos os Produtos") return PRODUCTS.length;
    return PRODUCTS.filter(p => p.category === cat).length;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#070b12] text-slate-100">
      
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl bg-brand-600 text-white shadow-2xl shadow-brand-500/30 border border-brand-400/30 animate-bounce">
          <Check className="w-5 h-5 text-white" />
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Top Banner Informativo */}
      <div className="bg-slate-900/90 border-b border-slate-800 text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-3 text-slate-300">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Atendimento Online
            </span>
            <span className="hidden sm:inline text-slate-500">•</span>
            <span className="hidden sm:inline text-slate-400">Produtos 100% Originais & Pronta Entrega para todo o Brasil</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <a href={`https://maps.google.com/?q=${encodeURIComponent(STORE_INFO.address)}`} target="_blank" rel="noopener noreferrer" className="hover:text-brand-400 transition flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-brand-400" />
              <span className="hidden md:inline">{STORE_INFO.address}</span>
              <span className="md:hidden">{STORE_INFO.city}</span>
            </a>
            <a href={`https://wa.me/${STORE_INFO.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" />
              <span>{STORE_INFO.whatsapp}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Header Fixo */}
      <header className="sticky top-0 z-40 bg-[#0f172a]/90 backdrop-blur-md border-b border-slate-800 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 transition"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logotipo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-blue-400 p-0.5 shadow-lg shadow-brand-500/20 group-hover:shadow-brand-500/40 transition-all duration-300">
              <div className="w-full h-full bg-[#0b1120] rounded-[10px] flex items-center justify-center text-brand-400 group-hover:text-brand-300 transition">
                <Aperture className="w-6 h-6 transform group-hover:rotate-45 transition-transform duration-500" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                  MvillasBoas<span className="text-brand-400">Cameras</span>
                </span>
              </div>
              <p className="text-[10px] uppercase font-mono tracking-widest text-slate-400">Cinema & Foto Pro</p>
            </div>
          </a>

          {/* Busca Central Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-6 relative">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por produto ou código (ex: SONY, LEXAR, SD)..."
                className="w-full bg-slate-900/90 text-sm text-slate-100 placeholder-slate-400 pl-10 pr-10 py-2.5 rounded-xl border border-slate-700/80 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition-all shadow-inner"
              />
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <Search className="w-4 h-4" />
              </div>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Ações Header */}
          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent("Olá Marcelo! Vim pelo site da MvillasBoasCameras.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600/15 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-600 hover:text-white font-medium text-xs transition duration-200"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden xl:inline">Falar com</span> Marcelo
            </a>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs transition duration-200 shadow-lg shadow-brand-600/30 hover:shadow-brand-500/40"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Carrinho</span>
              {cartTotalItems > 0 && (
                <span className="bg-amber-400 text-slate-950 text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center -ml-0.5 shadow-sm">
                  {cartTotalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Busca Mobile */}
        <div className="md:hidden px-4 pb-3">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar produto ou código..."
              className="w-full bg-slate-900 text-sm text-slate-100 placeholder-slate-400 pl-10 pr-10 py-2.5 rounded-xl border border-slate-700 focus:border-brand-500 focus:outline-none"
            />
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 w-full flex-1 flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Desktop */}
        <aside className="hidden lg:block w-72 flex-shrink-0 space-y-6">
          <div className="glass-panel p-5 rounded-2xl shadow-xl">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
              <div className="w-2 h-2 rounded-full bg-brand-500"></div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Departamentos</h3>
            </div>
            
            <nav className="space-y-1">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                      isActive 
                        ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/30' 
                        : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                    }`}
                  >
                    <span className="truncate">{cat}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {getCategoryCount(cat)}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Informações de Contato */}
          <div className="glass-panel p-5 rounded-2xl shadow-xl relative overflow-hidden">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Contato & Loja</h3>
            </div>

            <div className="space-y-4 text-xs">
              <a
                href={`https://wa.me/${STORE_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 hover:bg-emerald-950/40 border border-slate-800 hover:border-emerald-500/40 transition group"
              >
                <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">WhatsApp / Telefone</div>
                  <div className="font-bold text-white group-hover:text-emerald-300 transition">{STORE_INFO.whatsapp}</div>
                  <div className="text-[10px] text-emerald-400 font-medium">Marcelo Villas-Bôas</div>
                </div>
              </a>

              <a
                href={STORE_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 hover:bg-pink-950/40 border border-slate-800 hover:border-pink-500/40 transition group"
              >
                <div className="p-2 rounded-lg bg-pink-500/20 text-pink-400 group-hover:bg-pink-500 group-hover:text-white transition">
                  <Instagram className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">Instagram</div>
                  <div className="font-bold text-white group-hover:text-pink-300 transition">{STORE_INFO.instagram}</div>
                  <div className="text-[10px] text-slate-400">Novidades & Catálogo</div>
                </div>
              </a>

              <a
                href={`mailto:${STORE_INFO.email}`}
                className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 hover:bg-brand-950/40 border border-slate-800 hover:border-brand-500/40 transition group"
              >
                <div className="p-2 rounded-lg bg-brand-500/20 text-brand-400 group-hover:bg-brand-500 group-hover:text-white transition">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">E-mail Comercial</div>
                  <div className="font-bold text-white group-hover:text-brand-300 truncate transition">{STORE_INFO.email}</div>
                  <div className="text-[10px] text-slate-400">Orçamentos & Notas</div>
                </div>
              </a>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="p-2 rounded-lg bg-slate-800 text-amber-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">Endereço</div>
                  <div className="font-semibold text-slate-200 leading-snug">{STORE_INFO.address}</div>
                  <div className="text-[10px] text-amber-400/90 font-medium">{STORE_INFO.city}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-slate-800 bg-slate-900/40 space-y-3">
            <div className="flex items-center gap-2.5 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-brand-400 flex-shrink-0" />
              <span>Procedência e Garantia Total</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-300">
              <Truck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Envio Expresso para todo Brasil</span>
            </div>
          </div>
        </aside>

        {/* Área Central */}
        <main className="flex-1 min-w-0">
          {/* Banner Hero */}
          <div className="relative rounded-3xl overflow-hidden mb-6 p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 shadow-2xl">
            <div className="relative z-10 max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-brand-500/10 text-brand-400 border border-brand-500/20 mb-3">
                <Aperture className="w-3.5 h-3.5" /> Fotografia & Cinema Profissional
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-2">
                Equipamentos e Acessórios de Alta Performance
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mb-5 leading-relaxed">
                Cartões CFexpress, SD UHS-II, baterias originais e acessórios essenciais para seu fluxo de trabalho audiovisual com envio rápido.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent("Olá Marcelo! Vim pelo site da MvillasBoasCameras.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition transform hover:-translate-y-0.5"
                >
                  <Phone className="w-4 h-4" />
                  Compre via WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Tags Horizontais de Categoria */}
          <div className="mb-6">
            <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-2">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 flex-shrink-0 flex items-center gap-2 ${
                      isActive
                        ? 'bg-brand-600 text-white shadow-md shadow-brand-500/25 ring-2 ring-brand-400/30'
                        : 'bg-slate-900/90 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {getCategoryCount(cat)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Toolbar de Controle */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800/80">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <span className="font-semibold text-white">{filteredProducts.length}</span>
              <span>produtos encontrados</span>
              {searchQuery && (
                <span className="text-brand-400 font-mono">para "{searchQuery}"</span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-900 text-xs text-slate-200 px-3 py-2 rounded-xl border border-slate-700 focus:outline-none focus:border-brand-500"
              >
                <option value="relevance">Mais Relevantes</option>
                <option value="price-asc">Menor Preço</option>
                <option value="price-desc">Maior Preço</option>
                <option value="name-asc">Nome (A - Z)</option>
              </select>

              <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-lg transition ${viewMode === "grid" ? 'bg-brand-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded-lg transition ${viewMode === "list" ? 'bg-brand-600 text-white shadow' : 'text-slate-400 hover:text-white'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Grid de Produtos */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-500/10 group"
                >
                  <div>
                    <div className="relative aspect-[4/3] bg-slate-950 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute top-3 left-3">
                        {product.badge && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-brand-500 text-white shadow-md">
                            {product.badge}
                          </span>
                        )}
                      </div>
                      <div className="absolute top-3 right-3">
                        <button
                          onClick={() => setQuickViewProduct(product)}
                          className="p-2 rounded-xl bg-slate-900/80 hover:bg-brand-600 text-slate-200 hover:text-white backdrop-blur-md transition shadow"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[11px] font-mono">
                        <span className="bg-slate-900/90 text-amber-400 px-2 py-0.5 rounded-md border border-amber-400/20 backdrop-blur-md font-semibold">
                          Cód: {product.code}
                        </span>
                        <span className="flex items-center gap-1 bg-slate-900/90 text-slate-200 px-2 py-0.5 rounded-md backdrop-blur-md">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          {product.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 sm:p-5">
                      <div className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                        {product.category}
                      </div>
                      <h3 className="font-bold text-sm text-white line-clamp-2 min-h-[2.5rem] leading-snug group-hover:text-brand-300 transition-colors">
                        {product.name}
                      </h3>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {product.specs.slice(0, 2).map((sp, idx) => (
                          <span key={idx} className="text-[10px] bg-slate-800/80 text-slate-300 px-2 py-0.5 rounded border border-slate-700/60">
                            {sp.label}: <strong className="text-slate-100">{sp.val}</strong>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 pt-0 border-t border-slate-800/60 mt-2">
                    <div className="flex items-baseline gap-2 mb-3 pt-3">
                      {product.oldPrice && (
                        <span className="text-xs text-slate-400 line-through">
                          {formatCurrency(product.oldPrice)}
                        </span>
                      )}
                      <span className="text-xl font-extrabold text-white">
                        {formatCurrency(product.price)}
                      </span>
                      <span className="text-[10px] text-emerald-400 font-medium">À vista</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={getWhatsAppProductLink(product)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition duration-200 shadow-md shadow-emerald-600/20"
                      >
                        <Phone className="w-4 h-4" />
                        <span>WhatsApp</span>
                      </a>

                      <button
                        onClick={() => addToCart(product)}
                        className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-brand-600 text-slate-200 hover:text-white font-semibold text-xs border border-slate-700 hover:border-brand-500 transition duration-200"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span>Carrinho</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Lista */
            <div className="space-y-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="glass-card rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-5 transition hover:border-brand-500/40"
                >
                  <div className="w-full sm:w-44 h-40 flex-shrink-0 rounded-xl overflow-hidden bg-slate-950 relative">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    <span className="absolute bottom-2 left-2 bg-slate-900/90 text-amber-400 text-[10px] px-2 py-0.5 rounded font-mono font-semibold">
                      Cód: {product.code}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0 w-full">
                    <span className="text-[11px] uppercase tracking-wider text-brand-400 font-semibold">{product.category}</span>
                    <h3 className="font-bold text-base text-white mb-1.5">{product.name}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mb-3">{product.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {product.specs.slice(0, 3).map((sp, idx) => (
                        <span key={idx} className="text-[11px] bg-slate-800 text-slate-300 px-2.5 py-1 rounded">
                          {sp.label}: <strong className="text-white">{sp.val}</strong>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:items-end justify-between w-full sm:w-auto border-t sm:border-t-0 border-slate-800 pt-3 sm:pt-0">
                    <div className="mb-3 text-left sm:text-right">
                      <div className="text-2xl font-extrabold text-white">{formatCurrency(product.price)}</div>
                    </div>

                    <div className="flex sm:flex-col gap-2 w-full">
                      <a
                        href={getWhatsAppProductLink(product)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition"
                      >
                        <Phone className="w-4 h-4" />
                        Comprar via WhatsApp
                      </a>
                      <button
                        onClick={() => addToCart(product)}
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-xs transition"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Carrinho
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Modal Quick View */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={() => setQuickViewProduct(null)}></div>
          <div className="min-h-screen px-4 flex items-center justify-center py-8">
            <div className="relative bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl z-10">
              <button
                onClick={() => setQuickViewProduct(null)}
                className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="aspect-square rounded-2xl overflow-hidden bg-slate-950 relative border border-slate-800">
                  <img src={quickViewProduct.image} alt={quickViewProduct.name} className="w-full h-full object-cover" />
                  <span className="absolute bottom-3 left-3 bg-slate-900/90 text-amber-400 text-xs px-2.5 py-1 rounded-md font-mono font-semibold border border-amber-400/20">
                    Cód: {quickViewProduct.code}
                  </span>
                </div>

                <div>
                  <span className="text-xs uppercase font-bold text-brand-400 tracking-wider">{quickViewProduct.category}</span>
                  <h2 className="text-lg font-bold text-white mt-1 mb-2 leading-snug">{quickViewProduct.name}</h2>
                  <div className="text-2xl font-black text-white mb-3">{formatCurrency(quickViewProduct.price)}</div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">{quickViewProduct.description}</p>
                  
                  <div className="flex gap-3">
                    <a
                      href={getWhatsAppProductLink(quickViewProduct)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition"
                    >
                      <Phone className="w-4 h-4" />
                      Comprar via WhatsApp
                    </a>
                    <button
                      onClick={() => { addToCart(quickViewProduct); setQuickViewProduct(null); }}
                      className="px-4 py-3 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs transition"
                    >
                      Ao Carrinho
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity" onClick={() => setIsCartOpen(false)}></div>
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col">
              <div className="p-5 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-brand-600/20 text-brand-400">
                    <ShoppingCart className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-bold text-base text-white">Seu Carrinho</h2>
                    <p className="text-xs text-slate-400">{cartTotalItems} itens</p>
                  </div>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="p-2 rounded-xl text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-16 text-slate-400">
                    <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p className="font-semibold text-white mb-1">Seu carrinho está vazio</p>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex gap-3 p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                      <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover bg-slate-950 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-white truncate">{item.name}</h4>
                        <div className="text-[10px] font-mono text-amber-400 mt-0.5">Cód: {item.code}</div>
                        <div className="text-xs font-extrabold text-brand-400 mt-1">{formatCurrency(item.price)}</div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-1.5 bg-slate-900 px-2 py-1 rounded-lg border border-slate-700">
                            <button onClick={() => updateCartQty(item.id, -1)} className="w-5 h-5 flex items-center justify-center text-slate-300">-</button>
                            <span className="text-xs font-bold font-mono px-1.5">{item.qty}</span>
                            <button onClick={() => updateCartQty(item.id, 1)} className="w-5 h-5 flex items-center justify-center text-slate-300">+</button>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} className="text-[11px] text-red-400 hover:text-red-300">Remover</button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-5 border-t border-slate-800 bg-slate-950/60 space-y-4">
                  <div className="flex justify-between text-base font-extrabold text-white">
                    <span>Total:</span>
                    <span className="text-brand-400 font-mono">{formatCurrency(cartTotalPrice)}</span>
                  </div>
                  <a
                    href={getWhatsAppCheckoutLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xl transition"
                  >
                    <Phone className="w-5 h-5" />
                    Finalizar Pedido via WhatsApp
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-16 bg-[#060a10] border-t border-slate-800/80 text-slate-400 text-xs py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} MvillasBoasCameras. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            <span>WhatsApp: {STORE_INFO.whatsapp}</span>
            <span>•</span>
            <span>{STORE_INFO.address}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
