import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StickerCategory, StickerPosition } from '../../types';
import { X, PlusCircle, Sparkles, DollarSign } from 'lucide-react';

interface CreateStickerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateStickerModal: React.FC<CreateStickerModalProps> = ({ isOpen, onClose }) => {
  const { addSticker } = useApp();

  const [number, setNumber] = useState<number>(10);
  const [team, setTeam] = useState<string>('Brasil');
  const [player, setPlayer] = useState<string>('');
  const [position, setPosition] = useState<StickerPosition>('Atacante');
  const [category, setCategory] = useState<StickerCategory>('comum');
  const [quantity, setQuantity] = useState<number>(1);
  const [minPrice, setMinPrice] = useState<number>(5);
  const [maxPrice, setMaxPrice] = useState<number>(15);
  const [currentPrice, setCurrentPrice] = useState<number>(12);
  const [inAuction, setInAuction] = useState<boolean>(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!player.trim()) return;

    // Validate min <= current <= max or adjust gracefully
    const safeMin = Math.min(minPrice, maxPrice);
    const safeMax = Math.max(minPrice, maxPrice);
    const safeCurrent = Math.max(safeMin, Math.min(currentPrice, safeMax));

    addSticker({
      number: Number(number),
      team,
      player: player.trim(),
      position,
      category,
      quantity: Number(quantity),
      minPrice: safeMin,
      maxPrice: safeMax,
      currentPrice: safeCurrent,
      inAuction,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl rounded-3xl glass-panel bg-[#121212]/95 border border-white/15 p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#00C853]/15 border border-[#00C853]/30 flex items-center justify-center text-[#00C853]">
            <PlusCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white font-['Outfit']">
              Cadastrar Nova Figurinha
            </h3>
            <p className="text-xs text-zinc-400">
              Anuncie e defina sua faixa de preço para negociações
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Row 1: Player Name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
              Nome do Jogador *
            </label>
            <input
              type="text"
              required
              value={player}
              onChange={(e) => setPlayer(e.target.value)}
              placeholder="Ex: Lucas Paquetá, Gabriel Barbosa..."
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#00C853] transition-colors"
            />
          </div>

          {/* Row 2: Number & Team */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                Número no Álbum (#) *
              </label>
              <input
                type="number"
                min="1"
                max="999"
                required
                value={number}
                onChange={(e) => setNumber(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00C853] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                Seleção *
              </label>
              <select
                value={team}
                onChange={(e) => setTeam(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00C853] transition-colors cursor-pointer"
              >
                <option value="Brasil">Brasil 🇧🇷</option>
                <option value="Argentina">Argentina 🇦🇷</option>
                <option value="França">França 🇫🇷</option>
                <option value="Espanha">Espanha 🇪🇸</option>
                <option value="Alemanha">Alemanha 🇩🇪</option>
                <option value="Portugal">Portugal 🇵🇹</option>
                <option value="Inglaterra">Inglaterra 🏴󠁧󠁢󠁥󠁮󠁧󠁿</option>
                <option value="Holanda">Holanda 🇳🇱</option>
                <option value="Uruguai">Uruguai 🇺🇾</option>
                <option value="Japão">Japão 🇯🇵</option>
                <option value="Croácia">Croácia 🇭🇷</option>
                <option value="Itália">Itália 🇮🇹</option>
              </select>
            </div>
          </div>

          {/* Row 3: Position, Category & Quantity */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                Posição
              </label>
              <select
                value={position}
                onChange={(e) => setPosition(e.target.value as any)}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00C853] cursor-pointer"
              >
                <option value="Goleiro">Goleiro</option>
                <option value="Zagueiro">Zagueiro</option>
                <option value="Lateral">Lateral</option>
                <option value="Meio-Campo">Meio-Campo</option>
                <option value="Atacante">Atacante</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                Categoria
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00C853] cursor-pointer"
              >
                <option value="comum">Comum</option>
                <option value="brilhante">Brilhante</option>
                <option value="especial">Especial</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                Quantidade
              </label>
              <input
                type="number"
                min="1"
                max="50"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#00C853]"
              />
            </div>
          </div>

          {/* Row 4: Price Range (Mínimo e Máximo) e Preço de Anúncio */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FFD600]">
              <DollarSign className="w-4 h-4" />
              <span>Valores de Referência & Parâmetros de Leilão</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] text-zinc-400 mb-1">
                  Lance Inicial Mínimo (R$)
                </label>
                <input
                  type="number"
                  step="0.50"
                  min="1"
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-[11px] text-zinc-400 mb-1">
                  Preço de Tabela (R$)
                </label>
                <input
                  type="number"
                  step="0.50"
                  min="1"
                  value={currentPrice}
                  onChange={(e) => setCurrentPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-[#00C853]/40 text-[#00C853] font-bold text-sm"
                />
              </div>

              <div>
                <label className="block text-[11px] text-zinc-400 mb-1">
                  Arremate Imediato Máximo (R$)
                </label>
                <input
                  type="number"
                  step="0.50"
                  min="1"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-sm"
                />
              </div>
            </div>

            {/* Auction toggle */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-black/30 border border-white/5 text-xs">
              <div>
                <span className="font-bold text-white block">Abrir pregão de Leilão ao vivo</span>
                <span className="text-[11px] text-zinc-400">Permite lances competitivos de colecionadores na Arena</span>
              </div>
              <input
                type="checkbox"
                checked={inAuction}
                onChange={(e) => setInAuction(e.target.checked)}
                className="w-5 h-5 accent-[#FFD600] cursor-pointer"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn-primary-gradient px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-lg"
            >
              Publicar Anúncio
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
