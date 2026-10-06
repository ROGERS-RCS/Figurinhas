import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  ArrowRight, 
  Gavel, 
  ShieldCheck, 
  Users, 
  Zap, 
  ChevronDown, 
  ChevronUp, 
  Star, 
  Layers, 
  Award, 
  Clock, 
  Flame,
  CheckCircle2
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setCurrentPage, formatCurrency } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: 'Como funciona a Arena de Leilões da FigurinhasBR?',
      a: 'Ao visualizar qualquer figurinha em leilão, os colecionadores podem dar lances rápidos (+R$ 2, +R$ 5, +R$ 10) ou personalizar sua oferta. Cada novo lance atualiza o pregão em tempo real. Quem tiver a maior oferta quando o cronômetro zerar — ou quem acionar o Arremate Imediato — leva o cromo para o álbum!'
    },
    {
      q: 'O que é a opção de "Arremate Imediato"?',
      a: 'Se você não quer esperar o término do leilão e não quer arriscar perder o cromo para outro comprador, pode pagar o valor de arremate estipulado pelo vendedor e garantir a figurinha na hora.'
    },
    {
      q: 'É seguro dar lances e negociar na FigurinhasBR?',
      a: 'Sim! Todos os pregões contam com lances transparentes, histórico auditável de ofertas, moderação ativa e reputação comunitária para garantir que nenhum colecionador saia prejudicado.'
    },
    {
      q: 'Como vendedor, posso abrir leilão para as minhas repetidas?',
      a: 'Com certeza! Ao cadastrar seus cromos, você define um lance inicial e um preço de arremate máximo. Os interessados disputam lance a lance, valorizando seu card raro.'
    },
  ];

  const testimonials = [
    {
      name: 'Thiago Valença',
      role: 'Colecionador há 4 Copas',
      album: 'Álbum 100% Completo',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
      comment: 'Disputei o cromo dourado do Brasil nos últimos 30 segundos do leilão! A adrenalina foi espetacular e fechei o álbum com chave de ouro.'
    },
    {
      name: 'Larissa Albuquerque',
      role: 'Colecionadora Master',
      album: '98% Completo',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
      comment: 'Coloquei 10 repetidas em leilão e vendi todas acima do preço de banca. Com o saldo arrematei de imediato as duas especiais que me faltavam.'
    },
    {
      name: 'Guilherme Siqueira',
      role: 'Vendedor & Colecionador',
      album: '150+ Vendas Concluídas',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80',
      comment: 'O sistema de pregão com cronômetro ao vivo dá muita credibilidade e dinamismo. Bater o martelo no maior lance é muito gratificante.'
    }
  ];

  return (
    <div className="space-y-24 pb-12 overflow-hidden">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 sm:pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Copy Left */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-[#FFD600] shadow-[0_0_20px_rgba(255,214,0,0.15)]">
              <Gavel className="w-3.5 h-3.5 animate-bounce" />
              <span>O Primeiro Marketplace com Leilão em Tempo Real</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.08] font-['Outfit']">
              Complete seu álbum da Copa na maior <span className="bg-gradient-to-r from-[#FFD600] to-[#00C853] bg-clip-text text-transparent">disputa de lances</span> do Brasil.
            </h1>

            {/* Impact Catchphrase */}
            <p className="text-base sm:text-lg text-zinc-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium bg-white/5 p-4 rounded-2xl border border-white/10">
              ⚡ <strong className="text-[#FFD600]">A disputa mais quente da Copa:</strong> dê o lance certo, dispute segundo a segundo e arremate os cromos mais raros antes que o martelo bata!
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={() => setCurrentPage('buyer-auctions')}
                className="btn-primary-gradient w-full sm:w-auto px-8 py-4 rounded-2xl text-sm font-black flex items-center justify-center gap-2 shadow-2xl"
              >
                <Gavel className="w-4 h-4" />
                <span>Entrar na Arena de Leilões</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setCurrentPage('marketplace')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl text-sm font-bold bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2"
              >
                <span>Catálogo Completo</span>
              </button>
            </div>

            {/* Micro stats banner */}
            <div className="pt-6 flex items-center justify-center lg:justify-start gap-6 text-xs text-zinc-400 border-t border-white/10">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#00C853]" />
                <span>+14.000 cards cadastrados</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-orange-400" />
                <span>Lances ao vivo</span>
              </div>
              <div className="hidden sm:flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#00C853]" />
                <span>Garantia de arremate seguro</span>
              </div>
            </div>

          </div>

          {/* Hero Visual Composition Right: Floating Glass Cards with Live Auction */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Background Halo */}
            <div className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-[#FFD600]/25 to-[#00C853]/25 blur-3xl pointer-events-none" />

            {/* Floating Card Stack */}
            <div className="relative w-full max-w-[360px] h-[450px] flex items-center justify-center">
              
              {/* Back Card (Argentina #10) */}
              <div className="absolute top-2 -right-4 w-[240px] aspect-[3/4] rounded-2xl p-4 glass-panel bg-zinc-900/90 border border-yellow-500/30 transform rotate-12 opacity-75 shadow-2xl transition-transform hover:rotate-6">
                <div className="flex justify-between items-center text-xs">
                  <span>🇦🇷 Argentina</span>
                  <span className="font-mono font-bold">#10</span>
                </div>
                <div className="my-auto text-center py-6">
                  <div className="w-14 h-14 rounded-xl bg-[#74ACDF] text-black font-black text-xl flex items-center justify-center mx-auto mb-2">
                    10
                  </div>
                  <h4 className="font-bold text-sm text-white">Diego Rocha</h4>
                  <span className="text-[11px] text-zinc-400">Atacante · Especial</span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold text-[#FFD600] border-t border-white/10 pt-2">
                  <span>Lance: R$ 44,00</span>
                  <span className="text-[10px] text-zinc-400">8 lances</span>
                </div>
              </div>

              {/* Front Card (Brasil #10 Lucas Silva - Especial em Leilão) */}
              <div className="relative z-10 w-[275px] aspect-[3/4] rounded-3xl p-5 glass-panel bg-[#121212]/95 border-2 border-[#FFD600]/60 shadow-[0_10px_50px_rgba(255,214,0,0.3)] flex flex-col justify-between transform -rotate-3 hover:rotate-0 transition-all duration-300">
                
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xl">🇧🇷</span>
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Brasil</span>
                  </div>
                  <span className="text-xs font-black px-2 py-0.5 rounded-lg bg-[#FFD600] text-black font-mono">
                    #10
                  </span>
                </div>

                {/* Player Artwork */}
                <div className="my-auto text-center py-2">
                  <div className="w-16 h-16 rounded-2xl bg-[#FFD600] text-black font-black text-2xl flex items-center justify-center mx-auto mb-2 shadow-lg border border-white/40 font-['Outfit']">
                    10
                  </div>
                  <h3 className="text-lg font-black text-white font-['Outfit']">Lucas Silva</h3>
                  <span className="text-xs font-semibold text-[#00C853] mt-0.5 inline-block">
                    ★ Especial Dourado em Leilão
                  </span>
                </div>

                {/* Live Auction Board Badge */}
                <div className="p-3 rounded-xl bg-black/50 border border-white/10 space-y-1">
                  <div className="flex justify-between text-[11px] text-zinc-400">
                    <span className="flex items-center gap-1 text-[#00C853] font-bold">
                      <Clock className="w-3 h-3 animate-pulse" />
                      01h 24m restantes
                    </span>
                    <span className="text-[#FFD600] font-bold">6 lances</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-0.5">
                    <span className="text-xs font-bold text-white">Maior lance:</span>
                    <span className="text-lg font-black text-[#FFD600] tabular-nums font-['Outfit']">
                      R$ 38,00
                    </span>
                  </div>
                </div>

                {/* Action button preview */}
                <button 
                  onClick={() => setCurrentPage('buyer-auctions')}
                  className="btn-primary-gradient w-full py-2.5 rounded-xl text-xs font-bold shadow-md flex items-center justify-center gap-1.5"
                >
                  <Gavel className="w-3.5 h-3.5" />
                  <span>Cobrir Lance (+R$ 2)</span>
                </button>
              </div>

              {/* Bottom Card (França #07) */}
              <div className="absolute -bottom-4 -left-4 w-[230px] aspect-[3/4] rounded-2xl p-4 glass-panel bg-zinc-900/90 border border-emerald-500/30 transform -rotate-12 opacity-80 shadow-2xl">
                <div className="flex justify-between items-center text-xs">
                  <span>🇫🇷 França</span>
                  <span className="font-mono font-bold">#07</span>
                </div>
                <div className="my-auto text-center py-6">
                  <div className="w-12 h-12 rounded-xl bg-[#002654] text-white font-black text-lg flex items-center justify-center mx-auto mb-2">
                    07
                  </div>
                  <h4 className="font-bold text-xs text-white">Antoine Laurent</h4>
                </div>
                <div className="text-right text-xs font-bold text-[#00C853]">
                  R$ 42,00
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* NUMBERS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="p-8 rounded-3xl glass-panel border border-white/10 text-center space-y-2">
            <span className="text-4xl sm:text-5xl font-black text-white font-['Outfit'] tabular-nums">
              +14.200
            </span>
            <p className="text-sm font-bold text-[#FFD600] uppercase tracking-wider">
              Figurinhas Anunciadas
            </p>
            <p className="text-xs text-zinc-400">
              Coleções completas, brilhantes raras e cards comuns
            </p>
          </div>

          <div className="p-8 rounded-3xl glass-panel border border-white/10 text-center space-y-2">
            <span className="text-4xl sm:text-5xl font-black text-[#00C853] font-['Outfit'] tabular-nums">
              +3.800
            </span>
            <p className="text-sm font-bold text-white uppercase tracking-wider">
              Colecionadores Ativos
            </p>
            <p className="text-xs text-zinc-400">
              Compradores e vendedores de todos os estados do Brasil
            </p>
          </div>

          <div className="p-8 rounded-3xl glass-panel border border-white/10 text-center space-y-2">
            <span className="text-4xl sm:text-5xl font-black text-[#FFD600] font-['Outfit'] tabular-nums">
              +8.400
            </span>
            <p className="text-sm font-bold text-[#00C853] uppercase tracking-wider">
              Lotes Arrematados
            </p>
            <p className="text-xs text-zinc-400">
              Disputas decididas lance a lance em pregões ao vivo
            </p>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA (3 PASSOS) */}
      <section id="como-funciona" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00C853]/10 border border-[#00C853]/25 text-xs text-[#00C853] font-bold">
            <Zap className="w-3.5 h-3.5" />
            <span>Simples e Transparente</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-['Outfit']">
            Como Funciona a FigurinhasBR
          </h2>
          <p className="text-sm text-zinc-400">
            Três passos descomplicados para você anunciar ou conseguir a figurinha dos seus sonhos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Passo 1 */}
          <div className="p-8 rounded-3xl glass-panel border border-white/10 relative overflow-hidden group hover:border-[#FFD600]/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-black text-xl text-[#FFD600] font-['Outfit'] mb-6">
              01
            </div>
            <h3 className="text-xl font-bold text-white font-['Outfit'] mb-2">
              1. Anuncie ou Abra Leilão
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              O vendedor cadastra número, seleção, jogador e informa um <strong>lance inicial e preço de arremate imediato</strong>. O card entra direto na vitrine!
            </p>
          </div>

          {/* Passo 2 */}
          <div className="p-8 rounded-3xl glass-panel border border-white/10 relative overflow-hidden group hover:border-[#00C853]/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-black text-xl text-[#00C853] font-['Outfit'] mb-6">
              02
            </div>
            <h3 className="text-xl font-bold text-white font-['Outfit'] mb-2">
              2. Dispute no Leilão Ao Vivo
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              O comprador navega nos lotes e <strong>dá lances rápidos em tempo real</strong>. Se alguém cobrir sua oferta, você é notificado imediatamente para contra-atacar!
            </p>
          </div>

          {/* Passo 3 */}
          <div className="p-8 rounded-3xl glass-panel border border-white/10 relative overflow-hidden group hover:border-[#FFD600]/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-black text-xl text-[#FFD600] font-['Outfit'] mb-6">
              03
            </div>
            <h3 className="text-xl font-bold text-white font-['Outfit'] mb-2">
              3. O Martelo Bate: É Seu!
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Quando o cronômetro zera ou ao acionar o arremate imediato, o cromo é seu! Finalize a compra pelo carrinho e receba para colar no seu álbum da Copa.
            </p>
          </div>

        </div>
      </section>

      {/* VANTAGENS SECTION */}
      <section id="vantagens" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD600]/10 border border-[#FFD600]/25 text-xs text-[#FFD600] font-bold">
            <Award className="w-3.5 h-3.5" />
            <span>Por que escolher a plataforma</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-['Outfit']">
            Vantagens Exclusivas para Colecionadores
          </h2>
          <p className="text-sm text-zinc-400">
            A união perfeita entre marketplace tradicional e arena competitiva de leilões esportivos.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#00C853]/15 text-[#00C853] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white font-['Outfit']">
              Segurança Total
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Reputação visível de vendedores, moderação ativa e suporte com painel administrativo rigoroso.
            </p>
          </div>

          <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFD600]/15 text-[#FFD600] flex items-center justify-center">
              <Gavel className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white font-['Outfit']">
              Leilão em Tempo Real
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Dispute lances competitivos, sinta a emoção do pregão e pague o valor justo de mercado.
            </p>
          </div>

          <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#00C853]/15 text-[#00C853] flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white font-['Outfit']">
              Comunidade Real
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Milhares de fãs de futebol trocando, leiloando e negociando figurinhas todos os dias.
            </p>
          </div>

          <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFD600]/15 text-[#FFD600] flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-white font-['Outfit']">
              Arremate Imediato
            </h4>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Achou a última figurinha que faltava? Pague o valor fixo e arremate na hora sem esperar o leilão.
            </p>
          </div>

        </div>
      </section>

      {/* DEPOIMENTOS SECTION */}
      <section id="depoimentos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00C853]/10 border border-[#00C853]/25 text-xs text-[#00C853] font-bold">
            <Star className="w-3.5 h-3.5 fill-[#00C853]" />
            <span>Depoimentos Reais</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-['Outfit']">
            O que dizem os colecionadores
          </h2>
          <p className="text-sm text-zinc-400">
            Veja como a FigurinhasBR ajudou centenas de pessoas a completarem seus álbuns.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl glass-panel border border-white/10 flex flex-col justify-between space-y-6 hover:border-white/20 transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic">
                  "{t.comment}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-xl object-cover border border-white/10"
                />
                <div>
                  <h4 className="text-sm font-bold text-white font-['Outfit']">{t.name}</h4>
                  <p className="text-[11px] text-[#00C853] font-medium">{t.album}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD600]/10 border border-[#FFD600]/25 text-xs text-[#FFD600] font-bold">
            <span>Dúvidas Frequentes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-['Outfit']">
            Perguntas & Respostas
          </h2>
          <p className="text-sm text-zinc-400">
            Tudo o que você precisa saber sobre o marketplace e os leilões.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;

            return (
              <div
                key={index}
                className="rounded-2xl glass-panel border border-white/10 overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 text-sm font-bold text-white hover:text-[#FFD600] transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#FFD600] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-zinc-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-white/5 pt-3 animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* FINAL BOTTOM CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl glass-panel bg-gradient-to-r from-zinc-950 via-[#121212] to-zinc-950 border border-white/15 p-8 sm:p-14 text-center space-y-6 relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <h2 className="text-3xl sm:text-5xl font-black text-white font-['Outfit']">
              Pronto para disputar e completar seu álbum?
            </h2>
            <p className="text-sm sm:text-base text-zinc-300">
              Junte-se a milhares de colecionadores agora mesmo. Entre na Arena de Leilões ou anuncie suas figurinhas repetidas!
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setCurrentPage('buyer-auctions')}
                className="btn-primary-gradient px-8 py-4 rounded-2xl text-sm font-black flex items-center gap-2 shadow-2xl"
              >
                <Gavel className="w-4 h-4" />
                <span>Entrar no Pregão Agora</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentPage('login')}
                className="px-8 py-4 rounded-2xl text-sm font-bold bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors"
              >
                <span>Fazer Login</span>
              </button>
            </div>
          </div>

          <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-[#00C853]/15 blur-3xl pointer-events-none" />
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-[#FFD600]/15 blur-3xl pointer-events-none" />
        </div>
      </section>

    </div>
  );
};
