import React from 'react';
import { Sticker } from '../../types';
import { useApp } from '../../context/AppContext';
import { Star, Sparkles, Gavel, ShoppingBag, Eye, Flame } from 'lucide-react';

interface StickerCardProps {
  sticker: Sticker;
  onSelect?: (sticker: Sticker) => void;
  onBargain?: (sticker: Sticker) => void;
  onAuction?: (sticker: Sticker) => void;
}

export const StickerCard: React.FC<StickerCardProps> = ({
  sticker,
  onSelect,
  onBargain,
  onAuction,
}) => {
  const { addToCart, formatCurrency } = useApp();

  // Category styling
  const isEspecial = sticker.category === 'especial';
  const isBrilhante = sticker.category === 'brilhante';
  const triggerAuction = onAuction || onBargain;

  return (
    <div className={`relative group rounded-2xl glass-panel glass-panel-hover p-4 flex flex-col justify-between transition-all duration-300 border ${
      isEspecial 
        ? 'border-yellow-500/40 shadow-[0_4px_25px_rgba(255,214,0,0.12)]' 
        : isBrilhante 
        ? 'border-emerald-500/30 shadow-[0_4px_25px_rgba(0,200,83,0.1)]' 
        : 'border-white/10'
    }`}>
      {/* Top Bar: Team, Flag, Number */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl leading-none" role="img" aria-label={sticker.team}>
              {sticker.flagEmoji}
            </span>
            <span className="text-xs font-bold text-zinc-300 tracking-wide uppercase">
              {sticker.team}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs font-black tracking-tight px-2 py-0.5 rounded-lg bg-white/10 text-white font-mono border border-white/15">
              #{String(sticker.number).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Visual Card Artwork */}
        <div 
          onClick={() => onSelect && onSelect(sticker)}
          className={`relative w-full aspect-[4/3] rounded-xl overflow-hidden cursor-pointer flex flex-col items-center justify-center p-4 border transition-transform duration-300 group-hover:scale-[1.02] ${
            isEspecial 
              ? 'bg-gradient-to-br from-[#FFD600]/20 via-[#18181B] to-[#00C853]/15 border-yellow-500/30' 
              : isBrilhante 
              ? 'bg-gradient-to-br from-[#00C853]/20 via-[#18181B] to-cyan-500/10 border-emerald-500/30' 
              : 'bg-zinc-900/90 border-white/5'
          }`}
        >
          {/* Subtle Foil Shimmer Overlay for Special/Brilhante */}
          {(isEspecial || isBrilhante) && (
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-60 pointer-events-none group-hover:opacity-100 transition-opacity" />
          )}

          {/* Player Badge / Jersey Visual */}
          <div className="relative z-10 flex flex-col items-center text-center">
            <div 
              className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl shadow-lg border mb-2 font-['Outfit']"
              style={{
                backgroundColor: sticker.teamColors.primary,
                color: '#000000',
                borderColor: 'rgba(255,255,255,0.3)',
              }}
            >
              {sticker.number}
            </div>

            <span className="text-base font-extrabold text-white tracking-tight leading-tight line-clamp-1 font-['Outfit']">
              {sticker.player}
            </span>
            <span className="text-[11px] font-medium text-zinc-400 mt-0.5">
              {sticker.position}
            </span>
          </div>

          {/* Category Chip */}
          <div className="absolute top-2 right-2 flex items-center gap-1">
            {isEspecial && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#FFD600] text-black shadow-md">
                <Sparkles className="w-2.5 h-2.5" />
                Especial
              </span>
            )}
            {isBrilhante && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#00C853] text-black shadow-md">
                <Sparkles className="w-2.5 h-2.5" />
                Brilhante
              </span>
            )}
            {!isEspecial && !isBrilhante && (
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/10 text-zinc-300">
                Comum
              </span>
            )}
          </div>

          {/* Quick View Hover Indicator */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-xs font-semibold text-white">
            <Eye className="w-4 h-4 text-[#FFD600]" />
            <span>Ver Detalhes do Lote</span>
          </div>
        </div>

        {/* Pricing & Range */}
        <div className="mt-3.5 space-y-1">
          <div className="flex items-baseline justify-between">
            <span className="text-xs text-zinc-400">Lance / Valor:</span>
            <span className="text-lg font-black text-white tabular-nums">
              {formatCurrency(sticker.currentPrice)}
            </span>
          </div>

          {/* Price Range (faixa do leilão) */}
          <div className="flex items-center justify-between text-[11px] text-zinc-500 pt-0.5 border-t border-white/5">
            <span>Disputa do Leilão:</span>
            <span className="font-medium text-[#FFD600] tabular-nums">
              Lance min: {formatCurrency(sticker.minPrice)}
            </span>
          </div>
        </div>

        {/* Seller Info */}
        <div className="mt-2.5 flex items-center justify-between text-xs text-zinc-400">
          <span className="truncate max-w-[130px]" title={sticker.sellerName}>
            {sticker.sellerName}
          </span>
          <div className="flex items-center gap-1 text-amber-400 shrink-0">
            <Star className="w-3 h-3 fill-amber-400" />
            <span className="font-semibold text-[11px] text-zinc-300">
              {sticker.sellerRating.toFixed(1)}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 pt-3 border-t border-white/10 grid grid-cols-2 gap-2">
        <button
          onClick={() => triggerAuction && triggerAuction(sticker)}
          className="w-full py-2 px-2.5 rounded-xl text-xs font-bold bg-[#FFD600]/15 hover:bg-[#FFD600]/25 text-[#FFD600] border border-[#FFD600]/30 transition-all flex items-center justify-center gap-1.5 group/btn shadow-[0_0_15px_rgba(255,214,0,0.1)]"
          title="Disputar figurinha no Leilão"
        >
          <Gavel className="w-3.5 h-3.5 group-hover/btn:rotate-12 transition-transform" />
          <span>Dar Lance</span>
        </button>

        <button
          onClick={() => addToCart(sticker)}
          className="w-full py-2 px-2.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-[#00C853] hover:text-black hover:border-[#00C853] text-white border border-white/15 transition-all flex items-center justify-center gap-1.5 shadow-sm group/btn"
          title="Arrematar de imediato pelo valor fixo"
        >
          <ShoppingBag className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
          <span>Arrematar</span>
        </button>
      </div>
    </div>
  );
};
