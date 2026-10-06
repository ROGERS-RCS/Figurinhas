import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MOCK_ADMIN_STATS } from '../../data/mockData';
import { 
  ShieldCheck, 
  Users, 
  Layers, 
  Gavel, 
  DollarSign, 
  BarChart3, 
  Settings, 
  Search, 
  CheckCircle, 
  Ban, 
  Trash2, 
  TrendingUp, 
  Sliders, 
  Eye, 
  Sparkles,
  ChevronRight,
  Menu,
  Clock,
  X
} from 'lucide-react';
import { User, Sticker, AuctionItem } from '../../types';

type AdminTab = 'dashboard' | 'users' | 'stickers' | 'auctions' | 'settings';

export const AdminDashboard: React.FC = () => {
  const { 
    users, 
    stickers, 
    auctions, 
    toggleUserStatus, 
    deleteStickerByAdmin, 
    formatCurrency 
  } = useApp();

  const [currentTab, setCurrentTab] = useState<AdminTab>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Users management state
  const [userSearch, setUserSearch] = useState('');
  
  // Stickers moderation state
  const [stickerSearch, setStickerSearch] = useState('');

  // Settings state
  const [platformFee, setPlatformFee] = useState(5.0);
  const [allowInstantBargains, setAllowInstantBargains] = useState(true);
  const [autoModeration, setAutoModeration] = useState(true);

  // Filtered users
  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  // Filtered stickers
  const filteredStickers = stickers.filter((s) =>
    s.player.toLowerCase().includes(stickerSearch.toLowerCase()) ||
    s.team.toLowerCase().includes(stickerSearch.toLowerCase()) ||
    String(s.number).includes(stickerSearch)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden mb-4 flex items-center justify-between p-4 rounded-2xl glass-panel border border-white/10">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#FFD600]" />
          <span className="font-bold text-white text-sm">Painel Administrativo</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-xl bg-white/5 border border-white/10 text-white"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Glass Sidebar */}
        <aside className={`lg:col-span-3 rounded-3xl glass-panel border border-white/10 p-5 space-y-6 ${
          sidebarOpen ? 'block mb-6' : 'hidden lg:block'
        }`}>
          <div className="flex items-center gap-3 pb-5 border-b border-white/10">
            <div className="w-10 h-10 rounded-xl bg-[#FFD600]/15 border border-[#FFD600]/30 flex items-center justify-center text-[#FFD600]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-white text-base font-['Outfit']">
                Administração
              </h3>
              <p className="text-[11px] text-zinc-400">FigurinhasBR Master</p>
            </div>
          </div>

          <nav className="space-y-1.5 text-xs font-semibold">
            <button
              onClick={() => { setCurrentTab('dashboard'); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all ${
                currentTab === 'dashboard'
                  ? 'bg-gradient-to-r from-[#FFD600]/20 to-transparent border-l-4 border-[#FFD600] text-white font-bold'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-[#FFD600]" />
              <span>Visão Geral & KPIs</span>
            </button>

            <button
              onClick={() => { setCurrentTab('users'); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all ${
                currentTab === 'users'
                  ? 'bg-gradient-to-r from-[#FFD600]/20 to-transparent border-l-4 border-[#FFD600] text-white font-bold'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Users className="w-4 h-4 text-[#00C853]" />
              <span>Gestão de Usuários</span>
              <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-zinc-300">
                {users.length}
              </span>
            </button>

            <button
              onClick={() => { setCurrentTab('stickers'); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all ${
                currentTab === 'stickers'
                  ? 'bg-gradient-to-r from-[#FFD600]/20 to-transparent border-l-4 border-[#FFD600] text-white font-bold'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Layers className="w-4 h-4 text-[#FFD600]" />
              <span>Moderação de Anúncios</span>
              <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-zinc-300">
                {stickers.length}
              </span>
            </button>

            <button
              onClick={() => { setCurrentTab('auctions'); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all ${
                currentTab === 'auctions'
                  ? 'bg-gradient-to-r from-[#FFD600]/20 to-transparent border-l-4 border-[#FFD600] text-white font-bold'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Gavel className="w-4 h-4 text-[#00C853]" />
              <span>Arena de Leilões</span>
              <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-[#00C853]/20 text-[#00C853] font-bold">
                {auctions.length}
              </span>
            </button>

            <button
              onClick={() => { setCurrentTab('settings'); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all ${
                currentTab === 'settings'
                  ? 'bg-gradient-to-r from-[#FFD600]/20 to-transparent border-l-4 border-[#FFD600] text-white font-bold'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Settings className="w-4 h-4 text-zinc-400" />
              <span>Configurações Gerais</span>
            </button>
          </nav>

          <div className="pt-4 border-t border-white/10 text-[11px] text-zinc-500 space-y-1">
            <p>Status do Sistema: <span className="text-[#00C853] font-bold">Operacional</span></p>
            <p>Versão da Plataforma: <span className="text-zinc-400">1.0.0 Pro</span></p>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* TAB 1: DASHBOARD & KPIS */}
          {currentTab === 'dashboard' && (
            <div className="space-y-6">
              
              {/* 4 Primary KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* KPI 1: Total Users */}
                <div className="p-5 rounded-2xl glass-panel border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-zinc-400 text-xs">
                    <span>Usuários Cadastrados</span>
                    <Users className="w-4 h-4 text-[#FFD600]" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white font-['Outfit'] tabular-nums">
                    {MOCK_ADMIN_STATS.totalUsers.toLocaleString('pt-BR')}
                  </div>
                  <span className="text-[11px] text-[#00C853] block">
                    +18% este mês
                  </span>
                </div>

                {/* KPI 2: Active Ads */}
                <div className="p-5 rounded-2xl glass-panel border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-zinc-400 text-xs">
                    <span>Anúncios Ativos</span>
                    <Layers className="w-4 h-4 text-[#00C853]" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white font-['Outfit'] tabular-nums">
                    {MOCK_ADMIN_STATS.activeAds.toLocaleString('pt-BR')}
                  </div>
                  <span className="text-[11px] text-zinc-400 block">
                    {stickers.length} no catálogo atual
                  </span>
                </div>

                {/* KPI 3: Ongoing Auctions */}
                <div className="p-5 rounded-2xl glass-panel border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-zinc-400 text-xs">
                    <span>Leilões Ativos</span>
                    <Gavel className="w-4 h-4 text-[#FFD600]" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-[#FFD600] font-['Outfit'] tabular-nums">
                    {auctions.filter(a => a.status === 'Ativo').length}
                  </div>
                  <span className="text-[11px] text-[#00C853] block">
                    Disputa de lances em tempo real
                  </span>
                </div>

                {/* KPI 4: Total Volume */}
                <div className="p-5 rounded-2xl glass-panel border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-zinc-400 text-xs">
                    <span>Volume Transacionado</span>
                    <DollarSign className="w-4 h-4 text-[#00C853]" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white font-['Outfit'] tabular-nums">
                    {formatCurrency(MOCK_ADMIN_STATS.totalVolume)}
                  </div>
                  <span className="text-[11px] text-[#00C853] block">
                    Taxa recolhida: R$ 4.232,50
                  </span>
                </div>

              </div>

              {/* Interactive Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Chart 1: Vendas por Dia */}
                <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-base font-bold text-white font-['Outfit']">
                        Volume Diário de Transações (R$)
                      </h4>
                      <p className="text-xs text-zinc-400">Pico histórico aos fins de semana</p>
                    </div>
                    <span className="text-xs font-semibold text-[#00C853] bg-[#00C853]/10 px-2.5 py-1 rounded-lg">
                      Últimos 7 dias
                    </span>
                  </div>

                  <div className="h-48 flex items-end justify-between gap-3 pt-6 pb-2 px-2">
                    {MOCK_ADMIN_STATS.dailySales.map((item) => {
                      const maxVal = 25000;
                      const heightPercent = Math.round((item.volume / maxVal) * 100);

                      return (
                        <div key={item.day} className="flex-1 flex flex-col items-center gap-2 group">
                          <span className="text-[10px] text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity tabular-nums">
                            R$ {(item.volume / 1000).toFixed(1)}k
                          </span>
                          <div 
                            className="w-full rounded-t-lg bg-gradient-to-t from-[#00C853]/40 to-[#FFD600] group-hover:brightness-125 transition-all shadow-[0_0_15px_rgba(255,214,0,0.15)]"
                            style={{ height: `${heightPercent}%` }}
                          />
                          <span className="text-xs font-bold text-zinc-300 font-['Outfit']">
                            {item.day}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Chart 2: Figurinhas Mais Buscadas por Seleção */}
                <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-4">
                  <div>
                    <h4 className="text-base font-bold text-white font-['Outfit']">
                      Figurinhas Mais Procuradas
                    </h4>
                    <p className="text-xs text-zinc-400">Distribuição de buscas por seleção</p>
                  </div>

                  <div className="space-y-3 pt-2">
                    {MOCK_ADMIN_STATS.topSearched.map((item) => (
                      <div key={item.team} className="space-y-1">
                        <div className="flex justify-between text-xs font-medium">
                          <span className="text-white font-bold">{item.team}</span>
                          <span className="text-zinc-400 tabular-nums">
                            {item.count} buscas ({item.percentage}%)
                          </span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-[#FFD600] to-[#00C853]"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: GESTÃO DE USUÁRIOS */}
          {currentTab === 'users' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-xl font-bold text-white font-['Outfit']">
                    Gestão de Usuários
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Controle de acesso, papéis e bloqueio de usuários infratores
                  </p>
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    placeholder="Buscar usuário..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#FFD600]"
                  />
                </div>
              </div>

              {/* Users Table / Responsive Cards */}
              <div className="rounded-2xl glass-panel border border-white/10 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-white/5 border-b border-white/10 text-zinc-400 uppercase tracking-wider font-semibold">
                      <tr>
                        <th className="p-3.5">Usuário</th>
                        <th className="p-3.5">Perfil</th>
                        <th className="p-3.5">Cidade</th>
                        <th className="p-3.5">Membro Desde</th>
                        <th className="p-3.5">Status</th>
                        <th className="p-3.5 text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-zinc-300">
                      {filteredUsers.map((u) => (
                        <tr key={u.id} className="hover:bg-white/5 transition-colors">
                          <td className="p-3.5 flex items-center gap-3">
                            <img
                              src={u.avatar}
                              alt={u.name}
                              className="w-8 h-8 rounded-lg object-cover border border-white/10"
                            />
                            <div>
                              <span className="font-bold text-white block">{u.name}</span>
                              <span className="text-[11px] text-zinc-400">{u.email}</span>
                            </div>
                          </td>
                          <td className="p-3.5">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              u.role === 'admin' 
                                ? 'bg-[#FFD600]/20 text-[#FFD600]' 
                                : u.role === 'seller' 
                                ? 'bg-[#00C853]/20 text-[#00C853]' 
                                : 'bg-blue-500/20 text-blue-300'
                            }`}>
                              {u.role === 'admin' ? 'Administrador' : u.role === 'seller' ? 'Vendedor' : 'Comprador'}
                            </span>
                          </td>
                          <td className="p-3.5 text-zinc-400">{u.city || 'Brasil'}</td>
                          <td className="p-3.5 text-zinc-400">{u.memberSince}</td>
                          <td className="p-3.5">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              u.active 
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' 
                                : 'bg-red-500/10 text-red-400 border border-red-500/30'
                            }`}>
                              {u.active ? 'Ativo' : 'Bloqueado'}
                            </span>
                          </td>
                          <td className="p-3.5 text-right">
                            <button
                              onClick={() => toggleUserStatus(u.id)}
                              className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                                u.active
                                  ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20'
                                  : 'bg-[#00C853]/10 text-[#00C853] hover:bg-[#00C853]/20'
                              }`}
                            >
                              {u.active ? 'Bloquear' : 'Ativar'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: MODERAÇÃO DE ANÚNCIOS */}
          {currentTab === 'stickers' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-xl font-bold text-white font-['Outfit']">
                    Moderação de Anúncios
                  </h3>
                  <p className="text-xs text-zinc-400">
                    Remova ou modere anúncios com descrições indevidas ou valores fora da faixa
                  </p>
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={stickerSearch}
                    onChange={(e) => setStickerSearch(e.target.value)}
                    placeholder="Filtrar anúncios..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#FFD600]"
                  />
                </div>
              </div>

              <div className="rounded-2xl glass-panel border border-white/10 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-white/5 border-b border-white/10 text-zinc-400 uppercase tracking-wider font-semibold">
                      <tr>
                        <th className="p-3.5">Figurinha</th>
                        <th className="p-3.5">Seleção</th>
                        <th className="p-3.5">Vendedor</th>
                        <th className="p-3.5">Preço Atual</th>
                        <th className="p-3.5">Faixa Mín / Máx</th>
                        <th className="p-3.5 text-right">Moderação</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-zinc-300">
                      {filteredStickers.map((s) => (
                        <tr key={s.id} className="hover:bg-white/5 transition-colors">
                          <td className="p-3.5 flex items-center gap-2">
                            <span className="font-mono font-bold text-white bg-white/10 px-1.5 py-0.5 rounded">
                              #{s.number}
                            </span>
                            <span className="font-bold text-white">{s.player}</span>
                          </td>
                          <td className="p-3.5">
                            {s.flagEmoji} {s.team} ({s.category})
                          </td>
                          <td className="p-3.5 text-zinc-400">{s.sellerName}</td>
                          <td className="p-3.5 font-bold text-white tabular-nums">
                            {formatCurrency(s.currentPrice)}
                          </td>
                          <td className="p-3.5 text-zinc-400 tabular-nums">
                            {formatCurrency(s.minPrice)} – {formatCurrency(s.maxPrice)}
                          </td>
                          <td className="p-3.5 text-right">
                            <button
                              onClick={() => deleteStickerByAdmin(s.id)}
                              className="px-2.5 py-1 rounded-lg text-xs font-bold bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors inline-flex items-center gap-1"
                              title="Remover anúncio imediatamente"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Remover</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: TODAS AS DISPUTAS DE LEILÃO */}
          {currentTab === 'auctions' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-white font-['Outfit']">
                  Monitor Global de Leilões & Lances
                </h3>
                <p className="text-xs text-zinc-400">
                  Visão em tempo real de todos os pregões e disputas entre colecionadores
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {auctions.map((a) => (
                  <div
                    key={a.id}
                    className="p-5 rounded-2xl glass-panel border border-white/10 space-y-3"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-zinc-400">
                        Vendedor: {a.sellerName} · Lote #{a.stickerNumber}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        a.status === 'Arrematado' 
                          ? 'bg-[#00C853]/20 text-[#00C853]' 
                          : a.status === 'Encerrado' 
                          ? 'bg-zinc-500/20 text-zinc-400' 
                          : 'bg-[#FFD600]/20 text-[#FFD600] animate-pulse'
                      }`}>
                        {a.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5 text-xs">
                      <div>
                        <span className="font-bold text-white block">
                          {a.stickerPlayer} ({a.stickerTeam})
                        </span>
                        <span className="text-zinc-400 text-[11px]">
                          {a.bidsCount} lances registrados · Tempo: {a.timeLeft}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-zinc-500 block text-[10px]">
                          Maior Oferta:
                        </span>
                        <span className="font-bold text-[#FFD600] text-sm tabular-nums">
                          {formatCurrency(a.currentBid)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-zinc-400">
                      <span>Líder do lote: <strong className="text-white">{a.highestBidderName || 'Nenhum'}</strong></span>
                      <span>Arremate Direto: {formatCurrency(a.buyNowPrice)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: CONFIGURAÇÕES GERAIS */}
          {currentTab === 'settings' && (
            <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white font-['Outfit']">
                  Configurações da Plataforma
                </h3>
                <p className="text-xs text-zinc-400">
                  Parâmetros operacionais e regras de intermediação do marketplace
                </p>
              </div>

              <div className="space-y-4 max-w-xl text-xs">
                
                {/* Fee */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white text-sm">Taxa de Intermediação FigurinhasBR</span>
                    <span className="font-bold text-[#FFD600] text-sm">{platformFee}%</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    step="0.5"
                    value={platformFee}
                    onChange={(e) => setPlatformFee(Number(e.target.value))}
                    className="w-full accent-[#FFD600] cursor-pointer"
                  />
                  <p className="text-[11px] text-zinc-400">
                    Taxa retida na confirmação do pedido para custeio de segurança e servidores.
                  </p>
                </div>

                {/* Instant Bargains / Auction Mode */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-white text-sm">Arena de Leilões & Lances Dinâmicos</h5>
                    <p className="text-[11px] text-zinc-400">
                      Habilita o pregão em tempo real e disputas competitivas de lances na plataforma.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={allowInstantBargains}
                    onChange={(e) => setAllowInstantBargains(e.target.checked)}
                    className="w-5 h-5 accent-[#00C853] cursor-pointer"
                  />
                </div>

                {/* Auto Moderation */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-white text-sm">Filtro Automático de Conteúdo</h5>
                    <p className="text-[11px] text-zinc-400">
                      Bloqueia palavras impróprias nos cadastros de anúncios e mensagens.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={autoModeration}
                    onChange={(e) => setAutoModeration(e.target.checked)}
                    className="w-5 h-5 accent-[#00C853] cursor-pointer"
                  />
                </div>

              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
