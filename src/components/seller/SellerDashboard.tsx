import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CreateStickerModal } from './CreateStickerModal';
import { 
  Plus, 
  Store, 
  Gavel, 
  DollarSign, 
  TrendingUp, 
  Check, 
  X, 
  Pause, 
  Play, 
  Trash2, 
  Clock, 
  Layers, 
  Sparkles, 
  Flame,
  CheckCircle2,
  Award,
  Zap
} from 'lucide-react';
import { Sticker, AuctionItem } from '../../types';

export const SellerDashboard: React.FC = () => {
  const { 
    currentUser, 
    stickers, 
    auctions, 
    toggleStickerStatus, 
    deleteSticker, 
    finalizeAuction,
    createAuction,
    formatCurrency 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'listings' | 'auctions'>('listings');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Quick auction trigger on an existing sticker
  const [selectedStickerForAuction, setSelectedStickerForAuction] = useState<Sticker | null>(null);
  const [initialBidInput, setInitialBidInput] = useState<number>(10);
  const [buyNowInput, setBuyNowInput] = useState<number>(30);

  // Seller's stickers
  const sellerStickers = currentUser 
    ? stickers.filter((s) => s.sellerId === currentUser.id || currentUser.role === 'admin')
    : stickers.filter((s) => s.sellerId === 'user-seller');

  // Seller's auctions
  const sellerAuctions = currentUser
    ? auctions.filter((a) => a.sellerId === currentUser.id || currentUser.role === 'admin')
    : auctions.filter((a) => a.sellerId === 'user-seller');

  const activeAuctionsCount = sellerAuctions.filter((a) => a.status === 'Ativo').length;
  const activeListingsCount = sellerStickers.filter((s) => s.status === 'active').length;
  const totalVolumeSold = 2450.00; // Simulated historical sales

  const handleOpenAuctionForSticker = (sticker: Sticker) => {
    setSelectedStickerForAuction(sticker);
    setInitialBidInput(sticker.minPrice);
    setBuyNowInput(sticker.maxPrice);
  };

  const handleConfirmStartAuction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStickerForAuction) return;

    createAuction({
      sticker: selectedStickerForAuction,
      initialBid: initialBidInput,
      buyNowPrice: buyNowInput,
      durationHours: 4,
    });

    setSelectedStickerForAuction(null);
    setActiveTab('auctions');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl glass-panel border border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD600]/10 border border-[#FFD600]/25 text-xs text-[#FFD600] font-bold mb-2">
            <Store className="w-3.5 h-3.5" />
            <span>Painel do Anunciante & Leiloeiro</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
            Área do Vendedor
          </h1>
          <p className="text-xs sm:text-sm text-zinc-300 font-medium mt-1">
            ⚡ <span className="text-[#FFD600]">Coloque seus cromos na Arena:</span> anuncie suas repetidas ou abra leilões para ver a disputa valorizar seus cards a cada lance!
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="btn-primary-gradient px-5 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 self-start sm:self-auto shadow-xl"
        >
          <Plus className="w-4 h-4" />
          <span>Cadastrar Nova Figurinha</span>
        </button>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1: Active Ads */}
        <div className="p-5 rounded-2xl glass-panel border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Anúncios em Catálogo</span>
            <Layers className="w-4 h-4 text-[#00C853]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-['Outfit'] tabular-nums">
            {activeListingsCount}
          </div>
          <span className="text-[11px] text-zinc-400 block">
            {sellerStickers.length} cadastrados no total
          </span>
        </div>

        {/* KPI 2: Active Auctions */}
        <div className="p-5 rounded-2xl glass-panel border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Leilões Ativos</span>
            <Gavel className="w-4 h-4 text-[#FFD600]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#FFD600] font-['Outfit'] tabular-nums">
            {activeAuctionsCount}
          </div>
          <span className="text-[11px] text-[#00C853] block">
            {activeAuctionsCount > 0 ? 'Recebendo lances ao vivo' : 'Nenhum leilão no momento'}
          </span>
        </div>

        {/* KPI 3: Total Sales Concluded */}
        <div className="p-5 rounded-2xl glass-panel border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Lotes Arrematados</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-['Outfit'] tabular-nums">
            104
          </div>
          <span className="text-[11px] text-[#00C853] block">
            Reputação 4.9 ★★★★★
          </span>
        </div>

        {/* KPI 4: Total Volume Sold */}
        <div className="p-5 rounded-2xl glass-panel border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Volume Arrecadado</span>
            <DollarSign className="w-4 h-4 text-[#FFD600]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-['Outfit'] tabular-nums">
            {formatCurrency(totalVolumeSold)}
          </div>
          <span className="text-[11px] text-zinc-400 block">
            Saldo disponível para saque
          </span>
        </div>

      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-2">
        <button
          onClick={() => setActiveTab('listings')}
          className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'listings'
              ? 'bg-white/10 text-white border border-white/20'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4 text-[#FFD600]" />
          <span>Meus Anúncios ({sellerStickers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('auctions')}
          className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 relative ${
            activeTab === 'auctions'
              ? 'bg-white/10 text-white border border-white/20'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <Gavel className="w-4 h-4 text-[#00C853]" />
          <span>Meus Leilões & Lances ({sellerAuctions.length})</span>
          {activeAuctionsCount > 0 && (
            <span className="w-2 h-2 rounded-full bg-[#FFD600] animate-ping" />
          )}
        </button>
      </div>

      {/* TAB 1: Meus Anúncios */}
      {activeTab === 'listings' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>Listagem completa dos seus cards</span>
            <span>Você pode pausar, excluir ou abrir leilão imediatamente</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sellerStickers.map((sticker) => {
              const isPaused = sticker.status === 'paused';

              return (
                <div
                  key={sticker.id}
                  className={`p-5 rounded-2xl glass-panel border transition-all flex flex-col justify-between ${
                    isPaused ? 'border-amber-500/30 opacity-70' : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <div>
                    {/* Header line */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-lg">{sticker.flagEmoji}</span>
                        <span className="font-bold text-white uppercase">{sticker.team}</span>
                      </div>
                      <span className="font-mono text-xs font-black bg-white/10 px-2 py-0.5 rounded text-white">
                        #{sticker.number}
                      </span>
                    </div>

                    {/* Artwork mini */}
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-black/40 border border-white/5 mb-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center font-black text-sm font-['Outfit']"
                        style={{ backgroundColor: sticker.teamColors.primary, color: '#000000' }}
                      >
                        {sticker.number}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-bold text-white truncate font-['Outfit']">
                          {sticker.player}
                        </h4>
                        <p className="text-[11px] text-zinc-400 capitalize">
                          {sticker.position} · {sticker.category}
                        </p>
                      </div>
                    </div>

                    {/* Price and Range */}
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-zinc-400">Preço atual:</span>
                        <span className="font-bold text-white tabular-nums">
                          {formatCurrency(sticker.currentPrice)}
                        </span>
                      </div>
                      <div className="flex justify-between text-[11px] text-zinc-400">
                        <span>Faixa do lote:</span>
                        <span className="tabular-nums">
                          {formatCurrency(sticker.minPrice)} a {formatCurrency(sticker.maxPrice)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleOpenAuctionForSticker(sticker)}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#FFD600]/15 hover:bg-[#FFD600]/25 text-[#FFD600] border border-[#FFD600]/30 transition-all flex items-center gap-1.5"
                      title="Abrir pregão de leilão para esta figurinha"
                    >
                      <Gavel className="w-3.5 h-3.5" />
                      <span>Abrir Leilão</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => toggleStickerStatus(sticker.id)}
                        className={`p-2 rounded-lg text-xs font-semibold transition-colors ${
                          isPaused 
                            ? 'bg-[#00C853]/20 text-[#00C853]' 
                            : 'bg-white/5 text-zinc-300 hover:bg-white/10'
                        }`}
                        title={isPaused ? 'Reativar anúncio' : 'Pausar anúncio'}
                      >
                        {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        onClick={() => deleteSticker(sticker.id)}
                        className="p-2 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        title="Excluir anúncio"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: Meus Leilões & Lances */}
      {activeTab === 'auctions' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-zinc-400">
            <span>Leilões abertos por você com lances dos colecionadores</span>
            <span>Você pode acompanhar o tempo restante ou bater o martelo no maior lance</span>
          </div>

          {sellerAuctions.length === 0 ? (
            <div className="p-12 text-center rounded-3xl glass-panel border border-white/10 space-y-3">
              <Gavel className="w-10 h-10 text-zinc-500 mx-auto" />
              <h4 className="text-base font-bold text-white font-['Outfit']">
                Você não possui leilões em andamento
              </h4>
              <p className="text-xs text-zinc-400">
                Selecione uma figurinha em "Meus Anúncios" e clique em "Abrir Leilão" para iniciar um pregão!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sellerAuctions.map((auction) => {
                const isFinished = auction.status === 'Arrematado' || auction.status === 'Encerrado';

                return (
                  <div
                    key={auction.id}
                    className="p-6 rounded-2xl glass-panel border border-white/10 flex flex-col justify-between space-y-4 hover:border-white/20 transition-all"
                  >
                    <div>
                      {/* Top bar */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-zinc-400">
                          Lote #{auction.stickerNumber} · {auction.stickerTeam}
                        </span>
                        <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                          isFinished
                            ? 'bg-[#00C853]/20 text-[#00C853]'
                            : 'bg-[#FFD600]/20 text-[#FFD600] animate-pulse'
                        }`}>
                          {auction.status}
                        </span>
                      </div>

                      {/* Card Info */}
                      <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="text-base font-bold text-white font-['Outfit']">
                            {auction.stickerPlayer}
                          </h4>
                          <span className="text-xs font-black text-[#FFD600] bg-[#FFD600]/15 px-2 py-0.5 rounded">
                            {auction.bidsCount} lances
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-white/5">
                          <div>
                            <span className="text-zinc-500 block">Lance Inicial:</span>
                            <span className="text-zinc-300 tabular-nums">
                              {formatCurrency(auction.initialBid)}
                            </span>
                          </div>
                          <div>
                            <span className="text-zinc-400 block font-medium">Lance Mais Alto:</span>
                            <span className="text-base font-black text-[#00C853] tabular-nums font-['Outfit']">
                              {formatCurrency(auction.currentBid)}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs text-zinc-400 pt-1">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-[#00C853]" />
                            {auction.timeLeft}
                          </span>
                          <span>Líder: <strong className="text-white">{auction.highestBidderName || 'Nenhum'}</strong></span>
                        </div>
                      </div>
                    </div>

                    {/* Hammer down action if active and has bids */}
                    {!isFinished && (
                      <div className="pt-2 border-t border-white/10 flex items-center justify-end gap-2">
                        <button
                          onClick={() => finalizeAuction(auction.id)}
                          className="btn-primary-gradient px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-md"
                          title="Aceitar lance atual e bater o martelo imediatamente"
                        >
                          <Gavel className="w-3.5 h-3.5" />
                          <span>Bater o Martelo ({formatCurrency(auction.currentBid)})</span>
                        </button>
                      </div>
                    )}

                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Modal para Abrir Leilão de Figurinha Existente */}
      {selectedStickerForAuction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md rounded-3xl glass-panel bg-[#121212]/95 border border-white/15 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-white font-['Outfit'] flex items-center gap-2">
                <Gavel className="w-5 h-5 text-[#FFD600]" />
                Abrir Leilão para Cromo #{selectedStickerForAuction.number}
              </h3>
              <button 
                onClick={() => setSelectedStickerForAuction(null)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed">
              Defina os parâmetros do pregão para o jogador <strong>{selectedStickerForAuction.player}</strong>:
            </p>

            <form onSubmit={handleConfirmStartAuction} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1">
                  Lance Inicial (R$)
                </label>
                <input
                  type="number"
                  step="0.50"
                  min="1"
                  required
                  value={initialBidInput}
                  onChange={(e) => setInitialBidInput(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-white font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1">
                  Preço de Arremate Imediato (R$)
                </label>
                <input
                  type="number"
                  step="0.50"
                  min="1"
                  required
                  value={buyNowInput}
                  onChange={(e) => setBuyNowInput(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-[#FFD600]/40 text-[#FFD600] font-bold"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedStickerForAuction(null)}
                  className="px-4 py-2 text-xs text-zinc-400"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn-primary-gradient px-5 py-2.5 rounded-xl text-xs font-bold shadow-md"
                >
                  Iniciar Pregão Ao Vivo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Sticker Modal */}
      <CreateStickerModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

    </div>
  );
};
