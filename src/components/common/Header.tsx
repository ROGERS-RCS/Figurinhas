import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  ShoppingBag, 
  Menu, 
  X, 
  Layers, 
  Gavel, 
  LogOut, 
  UserCheck, 
  Sparkles,
  ArrowRight,
  Store,
  ChevronDown,
  Repeat
} from 'lucide-react';
import { UserRole } from '../../types';

interface HeaderProps {
  onOpenCart?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCart }) => {
  const { 
    currentUser, 
    currentPage, 
    setCurrentPage, 
    cart, 
    auctions, 
    loginAs, 
    logout 
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Count active auctions
  const activeAuctionsCount = auctions.filter((a) => a.status === 'Ativo').length;

  const navigateTo = (page: any) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  };

  const handleRoleSwitch = (role: UserRole) => {
    loginAs(role);
    setProfileDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#0A0A0A]/80 border-b border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={() => navigateTo(currentUser ? 'marketplace' : 'landing')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFD600] to-[#00C853] p-0.5 shadow-[0_0_20px_rgba(255,214,0,0.3)] group-hover:shadow-[0_0_25px_rgba(0,200,83,0.5)] transition-all">
              <div className="w-full h-full bg-[#0D0D0D] rounded-[10px] flex items-center justify-center">
                <span className="font-extrabold text-base tracking-tighter bg-gradient-to-r from-[#FFD600] to-[#00C853] bg-clip-text text-transparent">
                  FBR
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-white group-hover:text-[#FFD600] transition-colors font-['Outfit']">
                Figurinhas<span className="text-[#00C853]">BR</span>
              </span>
              <span className="text-[10px] tracking-wider uppercase text-zinc-400 font-medium -mt-1">
                Marketplace da Copa
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-zinc-300">
          {currentPage === 'landing' && !currentUser ? (
            <>
              <a href="#como-funciona" className="hover:text-white transition-colors">
                Como Funciona
              </a>
              <a href="#vantagens" className="hover:text-white transition-colors">
                Vantagens
              </a>
              <a href="#depoimentos" className="hover:text-white transition-colors">
                Depoimentos
              </a>
              <a href="#faq" className="hover:text-white transition-colors">
                FAQ
              </a>
              <button 
                onClick={() => navigateTo('marketplace')}
                className="hover:text-[#FFD600] transition-colors flex items-center gap-1.5"
              >
                <span>Ver Figurinhas</span>
                <span className="w-2 h-2 rounded-full bg-[#00C853] animate-pulse"></span>
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => navigateTo('marketplace')}
                className={`transition-colors flex items-center gap-1.5 ${
                  currentPage === 'marketplace' ? 'text-[#FFD600] font-semibold' : 'hover:text-white'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Marketplace</span>
              </button>

              <button 
                onClick={() => navigateTo('buyer-auctions')}
                className={`transition-colors flex items-center gap-1.5 relative ${
                  currentPage === 'buyer-auctions' ? 'text-[#FFD600] font-semibold' : 'hover:text-white'
                }`}
              >
                <Gavel className="w-4 h-4 text-[#FFD600]" />
                <span>Arena de Leilões</span>
                {activeAuctionsCount > 0 && (
                  <span className="px-1.5 py-0.2 text-[11px] font-bold rounded-full bg-[#FFD600]/20 border border-[#FFD600]/50 text-[#FFD600] animate-pulse">
                    {activeAuctionsCount}
                  </span>
                )}
              </button>

              <button 
                onClick={() => navigateTo('seller')}
                className={`transition-colors flex items-center gap-1.5 ${
                  currentPage === 'seller' ? 'text-[#FFD600] font-semibold' : 'hover:text-white'
                }`}
              >
                <Store className="w-4 h-4" />
                <span>Área do Vendedor</span>
              </button>
            </>
          )}
        </nav>

        {/* Zone 3: Actions & Admin Shield */}
        <div className="flex items-center gap-3">
          
          {/* Admin Shield Button - High Priority in top-right as specified in prompt */}
          {currentUser?.role === 'admin' && (
            <button
              onClick={() => navigateTo('admin')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                currentPage === 'admin'
                  ? 'bg-[#FFD600] text-black border-[#FFD600] shadow-[0_0_20px_rgba(255,214,0,0.4)]'
                  : 'bg-yellow-500/10 text-[#FFD600] border-yellow-500/30 hover:bg-yellow-500/20 shadow-[0_0_15px_rgba(255,214,0,0.15)]'
              }`}
              title="Painel Administrativo"
            >
              <ShieldCheck className="w-4 h-4 text-inherit" />
              <span className="hidden sm:inline">Painel Admin</span>
            </button>
          )}

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="relative p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#FFD600]/40 text-zinc-300 hover:text-white transition-all hover:bg-white/10"
            aria-label="Carrinho de Compras"
          >
            <ShoppingBag className="w-5 h-5" />
            {cart.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#00C853] text-black text-[11px] font-black flex items-center justify-center shadow-lg animate-bounce">
                {cart.length}
              </span>
            )}
          </button>

          {/* User Logged in / Guest Buttons */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2.5 p-1.5 sm:px-3 sm:py-2 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all text-left"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-lg object-cover border border-white/20"
                />
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-bold text-white leading-tight max-w-[120px] truncate">
                    {currentUser.name}
                  </span>
                  <span className="text-[10px] text-zinc-400 capitalize">
                    {currentUser.role === 'admin' ? 'Administrador' : currentUser.role === 'seller' ? 'Vendedor' : 'Comprador'}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-zinc-400 hidden sm:block" />
              </button>

              {/* Profile Dropdown */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#121212]/95 backdrop-blur-2xl border border-white/10 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="p-3 border-b border-white/10 mb-1">
                    <p className="text-xs text-zinc-400">Conectado como</p>
                    <p className="text-sm font-bold text-white truncate">{currentUser.name}</p>
                    <p className="text-xs text-zinc-400 truncate">{currentUser.email}</p>
                    <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/5 text-[11px] text-[#FFD600] border border-[#FFD600]/20 font-medium capitalize">
                      <Sparkles className="w-3 h-3" />
                      Perfil: {currentUser.role === 'admin' ? 'Admin' : currentUser.role === 'seller' ? 'Vendedor' : 'Comprador'}
                    </div>
                  </div>

                  {/* Switch Profile Shortcuts (Helpful to test cross-role bargains immediately) */}
                  <div className="px-3 py-2 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider flex items-center justify-between">
                    <span>Trocar Perfil (Demo)</span>
                    <Repeat className="w-3 h-3" />
                  </div>
                  <div className="flex flex-col gap-1 mb-2">
                    <button
                      onClick={() => handleRoleSwitch('admin')}
                      className={`w-full text-left px-3 py-1.5 text-xs rounded-lg transition-colors flex items-center justify-between ${
                        currentUser.role === 'admin' ? 'bg-[#FFD600]/10 text-[#FFD600] font-semibold' : 'text-zinc-300 hover:bg-white/5'
                      }`}
                    >
                      <span>Carlos (Admin)</span>
                      {currentUser.role === 'admin' && <ShieldCheck className="w-3.5 h-3.5 text-[#FFD600]" />}
                    </button>
                    <button
                      onClick={() => handleRoleSwitch('seller')}
                      className={`w-full text-left px-3 py-1.5 text-xs rounded-lg transition-colors flex items-center justify-between ${
                        currentUser.role === 'seller' ? 'bg-[#FFD600]/10 text-[#FFD600] font-semibold' : 'text-zinc-300 hover:bg-white/5'
                      }`}
                    >
                      <span>Renato (Vendedor)</span>
                      {currentUser.role === 'seller' && <Store className="w-3.5 h-3.5 text-[#FFD600]" />}
                    </button>
                    <button
                      onClick={() => handleRoleSwitch('buyer')}
                      className={`w-full text-left px-3 py-1.5 text-xs rounded-lg transition-colors flex items-center justify-between ${
                        currentUser.role === 'buyer' ? 'bg-[#FFD600]/10 text-[#FFD600] font-semibold' : 'text-zinc-300 hover:bg-white/5'
                      }`}
                    >
                      <span>Rodrigo (Comprador)</span>
                      {currentUser.role === 'buyer' && <ShoppingBag className="w-3.5 h-3.5 text-[#FFD600]" />}
                    </button>
                  </div>

                  <div className="border-t border-white/10 pt-1">
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-400 hover:bg-red-500/10 rounded-lg transition-colors font-medium"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sair da Conta</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigateTo('login')}
              className="btn-primary-gradient px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-lg"
            >
              <span>Entrar</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:text-white"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden backdrop-blur-2xl bg-[#0D0D0D]/95 border-b border-white/10 px-4 pt-3 pb-6 flex flex-col gap-3 animate-in slide-in-from-top-3">
          {currentUser?.role === 'admin' && (
            <button
              onClick={() => navigateTo('admin')}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-[#FFD600]/10 border border-[#FFD600]/30 text-[#FFD600] font-bold text-sm"
            >
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                Painel Administrativo
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={() => navigateTo('marketplace')}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 text-left text-sm font-medium text-white"
          >
            <span className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#FFD600]" />
              Marketplace de Figurinhas
            </span>
          </button>

          <button
            onClick={() => navigateTo('buyer-auctions')}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 text-left text-sm font-medium text-white"
          >
            <span className="flex items-center gap-2">
              <Gavel className="w-4 h-4 text-[#FFD600]" />
              Arena de Leilões & Lances
            </span>
            {activeAuctionsCount > 0 && (
              <span className="px-2 py-0.5 text-xs rounded-full bg-[#FFD600]/20 text-[#FFD600] font-bold">
                {activeAuctionsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => navigateTo('seller')}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 text-left text-sm font-medium text-white"
          >
            <span className="flex items-center gap-2">
              <Store className="w-4 h-4 text-[#FFD600]" />
              Área do Vendedor (Anunciar)
            </span>
          </button>

          {!currentUser && (
            <button
              onClick={() => navigateTo('login')}
              className="btn-primary-gradient w-full py-3 rounded-xl text-sm font-bold text-center mt-2"
            >
              Entrar na FigurinhasBR
            </button>
          )}
        </div>
      )}
    </header>
  );
};
