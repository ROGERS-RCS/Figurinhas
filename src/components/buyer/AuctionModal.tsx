import React, { useState } from 'react';
import { Sticker, AuctionItem } from '../../types';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Gavel, 
  Clock, 
  Sparkles, 
  Zap, 
  ArrowRight, 
  User, 
  TrendingUp, 
  Award,
  Flame,
  ShoppingBag
} from 'lucide-react';

interface AuctionModalProps {
  sticker: Sticker | null;
  onClose: () => void;
}

export const AuctionModal: React.FC<AuctionModalProps> = ({ sticker, onClose }) => {
  const { 
    auctions, 
    placeBid, 
    buyNowAuction, 
    formatCurrency, 
    currentUser, 
    setCurrentPage 
  } = useApp();

  if (!sticker) return null;

  // Find auction for this sticker or fallback to active auction
  const existingAuction = auctions.find((a) => a.stickerId === sticker.id) || {
    id: 'auc-temp-' + sticker.id,
    stickerId: sticker.id,
    stickerNumber: sticker.number,
    stickerPlayer: sticker.player,
    stickerTeam: sticker.team,
    stickerCategory: sticker.category,
    sellerId: sticker.sellerId,
    sellerName: sticker.sellerName,
    initialBid: sticker.minPrice,
    currentBid: sticker.minPrice + 4.00,
    buyNowPrice: sticker.maxPrice,
    highestBidderId: 'user-4',
    highestBidderName: 'Juliana Pires',
    bidsCount: 4,
    timeLeft: '02h 15m 30s',
    secondsRemaining: 8130,
    status: 'Ativo' as const,
    createdAt: 'Hoje',
    bidsHistory: [
      { id: 'b1', bidderId: 'user-4', bidderName: 'Juliana Pires', amount: sticker.minPrice + 4.00, timestamp: 'Agora' },
      { id: 'b2', bidderId: 'user-5', bidderName: 'Marcos Vinicius', amount: sticker.minPrice + 2.00, timestamp: '10m atrás' },
    ],
  };

  const minNextBid = Number((existingAuction.currentBid + 1.00).toFixed(2));
  const [customBid, setCustomBid] = useState<number>(Number((existingAuction.currentBid + 3.00).toFixed(2)));
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleQuickAdd = (increment: number) => {
    setCustomBid(Number((existingAuction.currentBid + increment).toFixed(2)));
  };

  const handlePlaceBid = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      onClose();
      setCurrentPage('login');
      return;
    }

    if (customBid <= existingAuction.currentBid) {
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const res = placeBid(existingAuction.id, customBid);
      setIsSubmitting(false);
      if (res.success) {
        onClose();
      }
    }, 350);
  };

  const handleBuyNow = () => {
    buyNowAuction(existingAuction.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl rounded-3xl glass-panel bg-[#121212]/95 border border-white/15 p-6 sm:p-8 shadow-2xl relative max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors z-20"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Impactful Header Hook */}
        <div className="space-y-2 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD600]/15 border border-[#FFD600]/30 text-xs font-black text-[#FFD600] uppercase tracking-wider">
            <Gavel className="w-3.5 h-3.5 animate-bounce" />
            <span>Arena de Leilão Ao Vivo</span>
          </div>
          
          <h3 className="text-2xl font-black text-white font-['Outfit'] tracking-tight">
            Dispute o Cromo #{sticker.number}
          </h3>

          {/* Impact Catchphrase */}
          <p className="text-xs sm:text-sm text-zinc-300 font-medium leading-relaxed bg-white/5 p-3 rounded-xl border border-white/10">
            ⚡ <span className="text-[#FFD600] font-bold">Quem dá mais?</span> Não deixe o martelo bater! Supere o lance atual e garanta este exemplar raro para o seu álbum antes que o tempo esgote.
          </p>
        </div>

        {/* Sticker Artwork Summary */}
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-black/50 border border-white/10 mb-6">
          <div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl shadow-lg font-['Outfit'] shrink-0 border border-white/20"
            style={{ backgroundColor: sticker.teamColors.primary, color: '#000000' }}
          >
            {sticker.number}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <span className="text-base">{sticker.flagEmoji}</span>
              <span className="font-bold text-white uppercase">{sticker.team}</span>
              <span>·</span>
              <span className="capitalize text-[#00C853] font-semibold">{sticker.category}</span>
            </div>
            <h4 className="text-lg font-black text-white truncate font-['Outfit'] mt-0.5">
              {sticker.player}
            </h4>
            <span className="text-xs text-zinc-400">
              Vendido por: <strong>{sticker.sellerName}</strong>
            </span>
          </div>
        </div>

        {/* Auction Live Board */}
        <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 mb-6">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-0.5">
              Lance Atual (Liderando)
            </span>
            <span className="text-2xl sm:text-3xl font-black text-[#FFD600] tabular-nums font-['Outfit']">
              {formatCurrency(existingAuction.currentBid)}
            </span>
            <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 mt-1">
              <User className="w-3 h-3 text-[#00C853]" />
              <span className="truncate max-w-[120px]">{existingAuction.highestBidderName || 'Sem lances'}</span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 block mb-0.5">
              Tempo Restante
            </span>
            <span className="text-lg sm:text-xl font-black text-[#00C853] font-mono tabular-nums flex items-center justify-end gap-1">
              <Clock className="w-4 h-4 text-[#00C853] animate-pulse" />
              {existingAuction.timeLeft}
            </span>
            <span className="text-[11px] text-zinc-400 block mt-1">
              {existingAuction.bidsCount} lances registrados
            </span>
          </div>
        </div>

        {/* Bidding Form */}
        <form onSubmit={handlePlaceBid} className="space-y-4">
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-zinc-300 mb-2">
              <span className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-orange-400" />
                Seu Próximo Lance (Mínimo: {formatCurrency(minNextBid)})
              </span>
            </div>

            {/* Quick Bid Increment Buttons */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              {[2, 5, 10].map((inc) => (
                <button
                  key={inc}
                  type="button"
                  onClick={() => handleQuickAdd(inc)}
                  className="py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#FFD600]/40 text-xs font-bold text-zinc-200 transition-all flex items-center justify-center gap-1"
                >
                  <TrendingUp className="w-3.5 h-3.5 text-[#FFD600]" />
                  <span>+{formatCurrency(inc)}</span>
                </button>
              ))}
            </div>

            {/* Custom Bid Input */}
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-zinc-400">
                R$
              </span>
              <input
                type="number"
                step="0.50"
                min={minNextBid}
                required
                value={customBid}
                onChange={(e) => setCustomBid(Number(e.target.value))}
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-black/60 border border-[#FFD600]/40 text-[#FFD600] font-black text-xl tabular-nums focus:outline-none focus:border-[#FFD600] transition-colors"
              />
            </div>
          </div>

          {/* Place Bid Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || customBid <= existingAuction.currentBid}
            className="btn-primary-gradient w-full py-3.5 rounded-2xl text-sm sm:text-base font-black flex items-center justify-center gap-2 shadow-xl disabled:opacity-50"
          >
            <Gavel className="w-4 h-4" />
            <span>{isSubmitting ? 'Registrando Lance...' : `Dar Lance de ${formatCurrency(customBid)}`}</span>
          </button>
        </form>

        {/* Buy Now / Arremate Imediato Alternative */}
        <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
          <div className="text-xs">
            <span className="text-zinc-400 block font-medium">Não quer disputar lances?</span>
            <span className="font-black text-white text-sm tabular-nums">
              Arremate Imediato: {formatCurrency(existingAuction.buyNowPrice)}
            </span>
          </div>

          <button
            type="button"
            onClick={handleBuyNow}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-[#00C853] hover:text-black text-xs font-bold text-white border border-white/15 transition-all flex items-center gap-1.5 shrink-0"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Arrematar Já</span>
          </button>
        </div>

        {/* Recent Bids Log */}
        {existingAuction.bidsHistory && existingAuction.bidsHistory.length > 0 && (
          <div className="mt-5 pt-4 border-t border-white/10">
            <h5 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
              Histórico de Lances Recentes
            </h5>
            <div className="space-y-1.5 max-h-24 overflow-y-auto text-xs">
              {existingAuction.bidsHistory.map((b) => (
                <div key={b.id} className="flex justify-between items-center text-zinc-400 py-0.5">
                  <span className="text-zinc-300 font-medium">{b.bidderName}</span>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-zinc-500 text-[10px]">{b.timestamp}</span>
                    <span className="text-[#FFD600] font-bold">{formatCurrency(b.amount)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
