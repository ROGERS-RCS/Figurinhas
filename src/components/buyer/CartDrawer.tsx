import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, ShoppingBag, Trash2, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, checkoutCart, clearCart, formatCurrency } = useApp();

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.price, 0);

  const handleCheckout = () => {
    checkoutCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0F0F0F]/95 backdrop-blur-2xl border-l border-white/10 shadow-2xl flex flex-col">
          
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#00C853]/15 text-[#00C853] border border-[#00C853]/30">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white font-['Outfit']">
                  Minha Lista & Carrinho
                </h3>
                <p className="text-xs text-zinc-400">
                  {cart.length} {cart.length === 1 ? 'figurinha selecionada' : 'figurinhas selecionadas'}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-white font-['Outfit']">
                  Seu carrinho está vazio
                </h4>
                <p className="text-xs text-zinc-400 max-w-xs mt-1 leading-relaxed">
                  Navegue pelo marketplace e adicione as figurinhas que faltam para o seu álbum!
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between text-xs text-zinc-400 pb-1">
                  <span>Itens adicionados</span>
                  <button 
                    onClick={clearCart}
                    className="text-red-400 hover:underline"
                  >
                    Limpar tudo
                  </button>
                </div>

                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3.5 group hover:border-white/20 transition-all"
                  >
                    {/* Visual box */}
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg font-['Outfit'] shrink-0 shadow-md"
                      style={{
                        backgroundColor: item.sticker.teamColors.primary,
                        color: '#000000',
                      }}
                    >
                      {item.sticker.number}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
                        <span>{item.sticker.flagEmoji} {item.sticker.team}</span>
                        {item.isAuctionWon && (
                          <span className="text-[10px] font-bold text-[#FFD600] bg-[#FFD600]/15 px-1.5 py-0.5 rounded border border-[#FFD600]/30">
                            ★ Arremate de Leilão
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-white truncate font-['Outfit']">
                        {item.sticker.player}
                      </h4>
                      <p className="text-xs font-black text-[#FFD600] tabular-nums mt-0.5">
                        {formatCurrency(item.price)}
                      </p>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-zinc-500 hover:text-red-400 hover:bg-white/5 rounded-xl transition-colors"
                      title="Remover figurinha"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Footer with totals */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-black/40 space-y-4">
              <div className="space-y-2 text-xs text-zinc-400">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="text-white font-medium tabular-nums">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Envio / Entrega Segura:</span>
                  <span className="text-[#00C853] font-medium">Grátis (Combinar com vendedor)</span>
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-white">Total a Pagar:</span>
                  <span className="text-2xl font-black text-[#FFD600] tabular-nums font-['Outfit']">
                    {formatCurrency(subtotal)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/5 text-[11px] text-zinc-400">
                <ShieldCheck className="w-4 h-4 text-[#00C853] shrink-0" />
                <span>Garantia de entrega FigurinhasBR ou seu dinheiro de volta.</span>
              </div>

              <button
                onClick={handleCheckout}
                className="btn-primary-gradient w-full py-3.5 rounded-2xl text-sm font-black flex items-center justify-center gap-2 shadow-xl"
              >
                <span>Finalizar Pedido</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
