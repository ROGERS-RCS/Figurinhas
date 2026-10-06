import React, { useState, useMemo } from 'react';
import { Sticker, StickerCategory, StickerPosition } from '../../types';
import { useApp } from '../../context/AppContext';
import { StickerCard } from '../common/StickerCard';
import { AuctionModal } from './AuctionModal';
import { StickerDetailModal } from './StickerDetailModal';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  SlidersHorizontal, 
  RotateCcw,
  Sparkles,
  Layers,
  Check,
  Gavel
} from 'lucide-react';

export const Marketplace: React.FC = () => {
  const { stickers } = useApp();

  // Search & Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeam, setSelectedTeam] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPosition, setSelectedPosition] = useState<string>('all');
  const [maxPriceFilter, setMaxPriceFilter] = useState<number>(50);
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'number-asc' | 'recent'>('recent');

  // Modals state
  const [selectedSticker, setSelectedSticker] = useState<Sticker | null>(null);
  const [auctionSticker, setAuctionSticker] = useState<Sticker | null>(null);

  // Extract unique teams
  const availableTeams = useMemo(() => {
    const teams = Array.from(new Set(stickers.map((s) => s.team))).sort();
    return teams;
  }, [stickers]);

  // Filter and sort
  const filteredStickers = useMemo(() => {
    return stickers
      .filter((sticker) => {
        // Only active ads
        if (sticker.status !== 'active') return false;

        // Search text: player, number, team
        if (searchTerm.trim()) {
          const term = searchTerm.toLowerCase();
          const matchPlayer = sticker.player.toLowerCase().includes(term);
          const matchTeam = sticker.team.toLowerCase().includes(term);
          const matchNumber = String(sticker.number).includes(term);
          if (!matchPlayer && !matchTeam && !matchNumber) return false;
        }

        // Team filter
        if (selectedTeam !== 'all' && sticker.team !== selectedTeam) return false;

        // Category filter
        if (selectedCategory !== 'all' && sticker.category !== selectedCategory) return false;

        // Position filter
        if (selectedPosition !== 'all' && sticker.position !== selectedPosition) return false;

        // Price filter
        if (sticker.currentPrice > maxPriceFilter) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.currentPrice - b.currentPrice;
        if (sortBy === 'price-desc') return b.currentPrice - a.currentPrice;
        if (sortBy === 'number-asc') return a.number - b.number;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [stickers, searchTerm, selectedTeam, selectedCategory, selectedPosition, maxPriceFilter, sortBy]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedTeam('all');
    setSelectedCategory('all');
    setSelectedPosition('all');
    setMaxPriceFilter(50);
    setSortBy('recent');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner / Marketplace Header */}
      <div className="relative rounded-3xl glass-panel p-6 sm:p-10 border border-white/10 overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD600]/10 border border-[#FFD600]/25 text-xs text-[#FFD600] font-bold">
            <Gavel className="w-3.5 h-3.5" />
            <span>Catálogo Completo & Disputa de Leilões</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white font-['Outfit'] tracking-tight">
            Encontre, Colecione e <span className="bg-gradient-to-r from-[#FFD600] to-[#00C853] bg-clip-text text-transparent">Dispute no Leilão</span>
          </h1>
          <p className="text-sm sm:text-base text-zinc-300 font-medium max-w-2xl leading-relaxed">
            ⚡ <strong>A disputa pelo cromo perfeito começa aqui:</strong> dê seus lances ao vivo nos lotes mais cobiçados da Copa do Mundo ou garanta suas figurinhas pelo arremate imediato!
          </p>
        </div>

        {/* Ambient glow accent */}
        <div className="absolute right-0 top-0 w-80 h-80 bg-gradient-to-br from-[#00C853]/20 to-transparent rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Search & Filter Toolbar */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
          
          {/* Search Input */}
          <div className="lg:col-span-5 relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por jogador, seleção ou número (#10)..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl glass-panel bg-white/5 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#FFD600] transition-colors"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-white"
              >
                Limpar
              </button>
            )}
          </div>

          {/* Team Filter */}
          <div className="lg:col-span-3">
            <select
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl glass-panel bg-zinc-900 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FFD600] transition-colors cursor-pointer"
            >
              <option value="all">Todas as Seleções</option>
              {availableTeams.map((team) => (
                <option key={team} value={team}>{team}</option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div className="lg:col-span-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl glass-panel bg-zinc-900 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FFD600] transition-colors cursor-pointer"
            >
              <option value="all">Todas Categorias</option>
              <option value="comum">Comum</option>
              <option value="brilhante">Brilhante</option>
              <option value="especial">Especial</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="lg:col-span-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-4 py-3 rounded-2xl glass-panel bg-zinc-900 border border-white/10 text-white text-sm focus:outline-none focus:border-[#FFD600] transition-colors cursor-pointer"
            >
              <option value="recent">Mais Recentes</option>
              <option value="price-asc">Menor Preço</option>
              <option value="price-desc">Maior Preço</option>
              <option value="number-asc">Ordem por Número</option>
            </select>
          </div>

        </div>

        {/* Secondary filters bar (Position & Price slider + Reset) */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl glass-panel bg-white/5 border border-white/10 text-xs">
          
          {/* Position Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <span className="text-zinc-400 font-semibold mr-1">Posição:</span>
            {['all', 'Goleiro', 'Zagueiro', 'Lateral', 'Meio-Campo', 'Atacante'].map((pos) => (
              <button
                key={pos}
                onClick={() => setSelectedPosition(pos)}
                className={`px-3 py-1.5 rounded-xl font-medium transition-colors whitespace-nowrap ${
                  selectedPosition === pos
                    ? 'bg-[#00C853] text-black font-bold shadow-md'
                    : 'bg-white/5 text-zinc-300 hover:bg-white/10'
                }`}
              >
                {pos === 'all' ? 'Todas' : pos}
              </button>
            ))}
          </div>

          {/* Max Price Slider & Reset */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-zinc-400">Até:</span>
              <span className="font-bold text-white tabular-nums">R$ {maxPriceFilter},00</span>
              <input
                type="range"
                min="5"
                max="50"
                step="1"
                value={maxPriceFilter}
                onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
                className="w-24 sm:w-32 accent-[#FFD600] cursor-pointer"
              />
            </div>

            <button
              onClick={resetFilters}
              className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors"
              title="Resetar filtros"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Limpar filtros</span>
            </button>
          </div>

        </div>

        {/* Result Counter */}
        <div className="flex items-center justify-between text-xs text-zinc-400 px-1">
          <span>
            Mostrando <strong className="text-white">{filteredStickers.length}</strong> de {stickers.filter(s => s.status === 'active').length} figurinhas disponíveis
          </span>
          <span className="text-[11px] text-[#FFD600] font-semibold">
            🔨 Dica: use "Dar Lance" para disputar no leilão ou arremate direto no carrinho!
          </span>
        </div>
      </div>

      {/* Stickers Grid */}
      {filteredStickers.length === 0 ? (
        <div className="rounded-3xl glass-panel p-12 text-center border border-white/10 max-w-lg mx-auto space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500 mx-auto">
            <Layers className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white font-['Outfit']">
            Nenhuma figurinha encontrada
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Não encontramos itens com os filtros selecionados. Tente ajustar o termo de busca ou resetar as opções.
          </p>
          <button
            onClick={resetFilters}
            className="btn-primary-gradient px-5 py-2.5 rounded-xl text-xs font-bold"
          >
            Limpar todos os filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredStickers.map((sticker) => (
            <StickerCard
              key={sticker.id}
              sticker={sticker}
              onSelect={(stk) => setSelectedSticker(stk)}
              onAuction={(stk) => setAuctionSticker(stk)}
              onBargain={(stk) => setAuctionSticker(stk)}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      <StickerDetailModal
        sticker={selectedSticker}
        onClose={() => setSelectedSticker(null)}
        onAuction={(stk) => setAuctionSticker(stk)}
        onBargain={(stk) => setAuctionSticker(stk)}
      />

      <AuctionModal
        sticker={auctionSticker}
        onClose={() => setAuctionSticker(null)}
      />

    </div>
  );
};
