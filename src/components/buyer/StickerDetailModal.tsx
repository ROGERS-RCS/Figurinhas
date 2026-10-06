import React from 'react';
import { Sticker } from '../../types';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Gavel, 
  ShoppingBag, 
  Star, 
  Sparkles, 
  ShieldCheck, 
  Layers,
  Award,
  Clock
} from 'lucide-react';

interface StickerDetailModalProps {
  sticker: Sticker | null;
  onClose: () => void;
  onAuction?: (sticker: Sticker) => void;
  onBargain?: (sticker: Sticker) => void;
}

export const StickerDetailModal: React.FC<StickerDetailModalProps> = ({
  sticker,
  onClose,
  onAuction,
  onBargain,
}) => {
  const { addToCart, formatCurrency } = useApp();
  const triggerAuction = onAuction || onBargain;

  if (!sticker) return null;

  const isEspecial = sticker.category === 'especial';
  const isBrilhante = sticker.category === 'brilhante';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl rounded-3xl glass-panel bg-[#121212]/95 border border-white/15 p-6 sm:p-8 shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200"
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
          
          {/* Card Showcase Left */}
          <div className="flex flex-col items-center">
            <div 
              className={`relative w-full max-w-[260px] aspect-[3/4] rounded-2xl p-6 flex flex-col justify-between border shadow-2xl overflow-hidden ${
                isEspecial
                  ? 'bg-gradient-to-br from-[#FFD600]/25 via-zinc-900 to-[#00C853]/20 border-yellow-500/40 shadow-[0_0_40px_rgba(255,214,0,0.2)]'
                  : isBrilhante
                  ? 'bg-gradient-to-br from-[#00C853]/25 via-zinc-900 to-cyan-500/20 border-emerald-500/40 shadow-[0_0_40px_rgba(0,200,83,0.15)]'
                  : 'bg-zinc-900 border-white/10'
              }`}
            >
              {/* Top Header on Card */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="text-2xl">{sticker.flagEmoji}</span>
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    {sticker.team}
                  </span>
                </div>
                <span className="text-sm font-black px-2.5 py-1 rounded-lg bg-black/40 text-white font-mono border border-white/20">
                  #{String(sticker.number).padStart(2, '0')}
                </span>
              </div>

              {/* Player Center */}
              <div className="flex flex-col items-center text-center my-auto">
                <div 
                  className="w-20 h-20 rounded-2xl flex items-center justify-center font-black text-3xl shadow-xl border-2 mb-3 font-['Outfit']"
                  style={{
                    backgroundColor: sticker.teamColors.primary,
                    color: '#000000',
                    borderColor: 'rgba(255,255,255,0.4)',
                  }}
                >
                  {sticker.number}
                </div>
                <h3 className="text-xl font-black text-white font-['Outfit'] leading-tight">
                  {sticker.player}
                </h3>
                <span className="text-xs font-medium text-zinc-300 mt-1">
                  {sticker.position}
                </span>
              </div>

              {/* Category bottom ribbon */}
              <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs">
                <span className="text-zinc-400 capitalize">{sticker.category}</span>
                <span className="text-[11px] font-semibold text-[#FFD600]">FigurinhasBR</span>
              </div>
            </div>
          </div>

          {/* Details Right */}
          <div className="space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#00C853]">
                  {sticker.team} · Copa do Mundo
                </span>
                {isEspecial && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#FFD600]/20 text-[#FFD600] border border-[#FFD600]/30">
                    <Sparkles className="w-3 h-3" />
                    Especial
                  </span>
                )}
                {isBrilhante && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#00C853]/20 text-[#00C853] border border-[#00C853]/30">
                    <Award className="w-3 h-3" />
                    Brilhante
                  </span>
                )}
              </div>

              <h2 className="text-2xl font-black text-white font-['Outfit']">
                {sticker.player}
              </h2>
              <p className="text-sm text-zinc-400 mt-0.5">
                Figurinha número #{sticker.number} · Posição: {sticker.position}
              </p>
            </div>

            {/* Price & Auction Box */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-zinc-400 font-medium">Lance Atual / Referência:</span>
                <span className="text-2xl font-black text-white tabular-nums font-['Outfit']">
                  {formatCurrency(sticker.currentPrice)}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-zinc-400 pt-2 border-t border-white/5">
                <span>Disputa do Leilão:</span>
                <span className="font-semibold text-[#FFD600] tabular-nums">
                  Lance mín: {formatCurrency(sticker.minPrice)} · Arremate: {formatCurrency(sticker.maxPrice)}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-zinc-400">
                <span>Estoque disponível:</span>
                <span className="font-semibold text-zinc-200">
                  {sticker.quantity} {sticker.quantity === 1 ? 'unidade' : 'unidades'}
                </span>
              </div>
            </div>

            {/* Seller profile snippet */}
            <div className="p-3.5 rounded-xl bg-black/30 border border-white/5 flex items-center justify-between text-xs">
              <div>
                <span className="text-zinc-500 block text-[11px]">Vendido por</span>
                <span className="font-bold text-white text-sm">{sticker.sellerName}</span>
              </div>
              <div className="flex items-center gap-1 text-amber-400 bg-amber-400/10 px-2 py-1 rounded-lg border border-amber-400/20">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span className="font-bold text-xs">{sticker.sellerRating.toFixed(1)}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => {
                  onClose();
                  if (triggerAuction) triggerAuction(sticker);
                }}
                className="w-full py-3 px-4 rounded-xl text-sm font-bold bg-[#FFD600]/15 hover:bg-[#FFD600]/25 text-[#FFD600] border border-[#FFD600]/40 transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <Gavel className="w-4 h-4" />
                <span>Disputar no Leilão (Dar Lance)</span>
              </button>

              <button
                onClick={() => {
                  addToCart(sticker);
                  onClose();
                }}
                className="btn-primary-gradient w-full py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-xl"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Arrematar Já ({formatCurrency(sticker.currentPrice)})</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
