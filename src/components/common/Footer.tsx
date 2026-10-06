import React from 'react';
import { ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { setCurrentPage } = useApp();

  return (
    <footer className="relative mt-24 border-t border-white/10 bg-[#080808]/90 backdrop-blur-xl text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FFD600] to-[#00C853] p-0.5">
                <div className="w-full h-full bg-[#0D0D0D] rounded-[6px] flex items-center justify-center font-bold text-xs text-[#FFD600]">
                  FBR
                </div>
              </div>
              <span className="text-lg font-black text-white font-['Outfit']">
                Figurinhas<span className="text-[#00C853]">BR</span>
              </span>
            </div>
            <p className="text-sm text-zinc-400 max-w-md leading-relaxed">
              O marketplace definitivo para colecionadores de figurinhas da Copa do Mundo. 
              Compre, venda, complete seu álbum e dispute relíquias na Arena de Leilões em tempo real.
            </p>
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <ShieldCheck className="w-4 h-4 text-[#00C853]" />
              <span>Ambiente 100% seguro com lances auditáveis e reputação comunitária.</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Navegação
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button 
                  onClick={() => setCurrentPage('marketplace')}
                  className="hover:text-[#FFD600] transition-colors"
                >
                  Marketplace Completo
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('buyer-auctions')}
                  className="hover:text-[#FFD600] transition-colors"
                >
                  Arena de Leilões
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('seller')}
                  className="hover:text-[#FFD600] transition-colors"
                >
                  Área do Vendedor
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('login')}
                  className="hover:text-[#FFD600] transition-colors"
                >
                  Entrar na Conta
                </button>
              </li>
            </ul>
          </div>

          {/* Legal and Disclaimer */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Transparência
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed mb-3">
              A FigurinhasBR é uma plataforma independente de intermediação entre colecionadores particulares. Não possuímos vínculo com entidades organizadoras ou fabricantes oficiais.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-[#FFD600]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Edição Copa do Mundo</span>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <p>© {new Date().getFullYear()} FigurinhasBR. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1">
            Feito para colecionadores apaixonados por futebol
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
          </p>
        </div>
      </div>
    </footer>
  );
};
