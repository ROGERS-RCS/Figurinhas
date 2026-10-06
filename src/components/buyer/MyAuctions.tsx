import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Gavel, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  ShoppingBag, 
  TrendingUp, 
  Flame, 
  Sparkles, 
  User, 
  ArrowRight,
  ShieldCheck,
  Award
} from 'lucide-react';
import { AuctionItem } from '../../types';
import { AuctionModal } from './AuctionModal';

export const MyAuctions: React.FC = () => {
  const { 
    auctions, 
    currentUser, 
    stickers, 
    addToCart, 
    formatCurrency, 
    setCurrentPage, 
    placeBid 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'my-bids' | 'won'>('all');
  const [selectedAuctionSticker, setSelectedAuctionSticker] = useState<any | null>(null);

  // Filter lists
  const myBidAuctions = auctions.filter((a) =>
    a.bidsHistory.some((b) => b.bidderId === currentUser?.id) || a.highestBidderId === currentUser?.id
  );

  const wonAuctions = auctions.filter((a) =>
    a.status === 'Arrematado' && a.highestBidderId === currentUser?.id
  );

  const displayedAuctions = activeTab === 'my-bids' 
    ? myBidAuctions 
    : activeTab === 'won' 
    ? wonAuctions 
    : auctions;

  const handleQuickOutbid = (auction: AuctionItem) => {
    const nextAmount = Number((auction.currentBid + 2.00).toFixed(2));
    placeBid(auction.id, nextAmount);
  };

  const handlePayWon = (auction: AuctionItem) => {
    const stk = stickers.find((s) => s.id === auction.stickerId);
    if (!stk) return;
    addToCart(stk, auction.currentBid, auction.id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Impact Header with Catchphrase */}
      <div className="relative rounded-3xl glass-panel bg-gradient-to-r from-zinc-950 via-[#141414] to-zinc-950 border border-white/10 p-6 sm:p-10 overflow-hidden">
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFD600]/15 border border-[#FFD600]/30 text-xs font-black text-[#FFD600] uppercase tracking-wider">
            <Gavel className="w-4 h-4 animate-bounce" />
            <span>Arena de Leilões em Tempo Real</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white font-['Outfit'] tracking-tight">
            A disputa mais quente da Copa: <span className="bg-gradient-to-r from-[#FFD600] to-[#00C853] bg-clip-text text-transparent">dê o lance certo e arremate relíquias!</span>
          </h1>

          {/* Impact Catchphrase Hook for Characters/Users */}
          <p className="text-sm sm:text-base text-zinc-300 font-medium leading-relaxed bg-white/5 p-4 rounded-2xl border border-white/10">
            🔥 <strong className="text-[#FFD600]">Não deixe o martelo bater!</strong> Sinta a adrenalina do pregão ao vivo. Dispute segundo a segundo com colecionadores de todo o Brasil e garanta os cromos mais raros para o seu álbum antes que o tempo esgote.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              onClick={() => setCurrentPage('marketplace')}
              className="btn-primary-gradient px-6 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg"
            >
              <span>Explorar Catálogo Completo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <ShieldCheck className="w-4 h-4 text-[#00C853]" />
              <span>Transações seguras com lances transparentes</span>
            </div>
          </div>
        </div>

        {/* Ambient glow accent */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-gradient-to-br from-[#FFD600]/15 to-[#00C853]/15 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'all'
                ? 'bg-white/10 text-white border border-white/20'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Flame className="w-4 h-4 text-orange-400" />
            <span>Todos os Leilões Ativos ({auctions.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('my-bids')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'my-bids'
                ? 'bg-white/10 text-white border border-white/20'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Gavel className="w-4 h-4 text-[#FFD600]" />
            <span>Meus Lances ({myBidAuctions.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('won')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'won'
                ? 'bg-white/10 text-white border border-white/20'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Award className="w-4 h-4 text-[#00C853]" />
            <span>Arrematados por Mim ({wonAuctions.length})</span>
          </button>
        </div>

        <span className="text-xs text-zinc-400 hidden sm:block">
          Atualização de pregão em tempo real
        </span>
      </div>

      {/* Auctions Grid */}
      {displayedAuctions.length === 0 ? (
        <div className="rounded-3xl glass-panel p-12 text-center border border-white/10 max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500 mx-auto">
            <Gavel className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white font-['Outfit']">
            Nenhum lote nesta aba
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Navegue pelos leilões ativos e dê seu primeiro lance para entrar na disputa!
          </p>
          <button
            onClick={() => setActiveTab('all')}
            className="btn-primary-gradient px-5 py-2.5 rounded-xl text-xs font-bold"
          >
            Ver Todos os Leilões
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayedAuctions.map((auction) => {
            const stk = stickers.find((s) => s.id === auction.stickerId);
            const isHighest = auction.highestBidderId === currentUser?.id;
            const hasBid = auction.bidsHistory.some((b) => b.bidderId === currentUser?.id);
            const isFinished = auction.status === 'Arrematado' || auction.status === 'Encerrado';

            return (
              <div
                key={auction.id}
                className={`rounded-3xl glass-panel border p-6 flex flex-col justify-between space-y-5 transition-all hover:border-white/20 ${
                  isHighest && !isFinished
                    ? 'border-[#00C853]/40 shadow-[0_0_25px_rgba(0,200,83,0.1)]'
                    : hasBid && !isHighest && !isFinished
                    ? 'border-yellow-500/40 shadow-[0_0_25px_rgba(255,214,0,0.1)]'
                    : 'border-white/10'
                }`}
              >
                <div>
                  {/* Top Header */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                      {auction.stickerTeam} · Lote #{auction.stickerNumber}
                    </span>

                    {/* Status Badge */}
                    {isFinished ? (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#00C853]/20 text-[#00C853] border border-[#00C853]/40">
                        {auction.status}
                      </span>
                    ) : isHighest ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#00C853]/20 text-[#00C853] border border-[#00C853]/40 animate-pulse">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Ganhando o lote!
                      </span>
                    ) : hasBid ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        Lance Superado!
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#FFD600]/15 text-[#FFD600] border border-[#FFD600]/30">
                        Pregão Ativo
                      </span>
                    )}
                  </div>

                  {/* Artwork Showcase */}
                  <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-black/50 border border-white/5 mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg font-['Outfit'] shrink-0 shadow-md"
                      style={{
                        backgroundColor: stk?.teamColors.primary || '#FFD600',
                        color: '#000000',
                      }}
                    >
                      {auction.stickerNumber}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-base font-black text-white truncate font-['Outfit']">
                        {auction.stickerPlayer}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-zinc-400 mt-0.5">
                        <span className="capitalize">{auction.stickerCategory}</span>
                        <span>·</span>
                        <span>{auction.sellerName}</span>
                      </div>
                    </div>
                  </div>

                  {/* Auction Numbers Box */}
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2.5">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs text-zinc-400">Lance Atual:</span>
                      <span className="text-2xl font-black text-[#FFD600] tabular-nums font-['Outfit']">
                        {formatCurrency(auction.currentBid)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-zinc-400 pt-2 border-t border-white/5">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#00C853]" />
                        Tempo restante:
                      </span>
                      <span className="font-mono font-bold text-white tabular-nums">
                        {auction.timeLeft}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-zinc-400">
                      <span>Líder da disputa:</span>
                      <span className="font-semibold text-zinc-200 truncate max-w-[130px]">
                        {auction.highestBidderName || 'Nenhum lance'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="space-y-2 pt-2">
                  {isFinished ? (
                    isHighest ? (
                      <button
                        onClick={() => handlePayWon(auction)}
                        className="btn-primary-gradient w-full py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>Pagar & Finalizar Arremate</span>
                      </button>
                    ) : (
                      <div className="p-3 text-center rounded-xl bg-white/5 text-xs text-zinc-400">
                        Lote arrematado por {auction.highestBidderName}
                      </div>
                    )
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleQuickOutbid(auction)}
                        className="py-2.5 px-3 rounded-xl text-xs font-bold bg-[#FFD600]/15 hover:bg-[#FFD600]/25 text-[#FFD600] border border-[#FFD600]/40 transition-all flex items-center justify-center gap-1.5"
                        title="Cobrir com lance rápido de +R$ 2,00"
                      >
                        <TrendingUp className="w-3.5 h-3.5" />
                        <span>+R$ 2,00</span>
                      </button>

                      <button
                        onClick={() => setSelectedAuctionSticker(stk || {
                          id: auction.stickerId,
                          number: auction.stickerNumber,
                          team: auction.stickerTeam,
                          player: auction.stickerPlayer,
                          position: 'Atacante',
                          category: auction.stickerCategory,
                          quantity: 1,
                          minPrice: auction.initialBid,
                          maxPrice: auction.buyNowPrice,
                          currentPrice: auction.currentBid,
                          sellerId: auction.sellerId,
                          sellerName: auction.sellerName,
                          sellerRating: 5.0,
                          status: 'active',
                          createdAt: auction.createdAt,
                          teamColors: { primary: '#FFD600', secondary: '#00C853' },
                          flagEmoji: '⚽'
                        })}
                        className="btn-primary-gradient py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md"
                      >
                        <Gavel className="w-3.5 h-3.5" />
                        <span>Dar Lance</span>
                      </button>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Auction Modal Triggered from Card */}
      {selectedAuctionSticker && (
        <AuctionModal
          sticker={selectedAuctionSticker}
          onClose={() => setSelectedAuctionSticker(null)}
        />
      )}

    </div>
  );
};
