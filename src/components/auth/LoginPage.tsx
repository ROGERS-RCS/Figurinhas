import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  ShieldCheck, 
  Store, 
  ShoppingBag, 
  Lock, 
  Mail, 
  Sparkles,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { UserRole } from '../../types';

export const LoginPage: React.FC = () => {
  const { loginWithCredentials, setCurrentPage } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleQuickFill = (role: UserRole) => {
    setErrorMessage('');
    if (role === 'admin') {
      setEmail('admin@figurinhasbr.com');
      setPassword('123456');
    } else if (role === 'seller') {
      setEmail('vendedor@figurinhasbr.com');
      setPassword('123456');
    } else {
      setEmail('comprador@figurinhasbr.com');
      setPassword('123456');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password) {
      setErrorMessage('Por favor, preencha o e-mail e a senha.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const res = loginWithCredentials(email.trim(), password);
      setIsLoading(false);
      if (!res.success) {
        setErrorMessage(res.message || 'Credenciais inválidas.');
      }
    }, 300);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-12 relative z-10">
      
      <div className="w-full max-w-md space-y-6">
        
        {/* Back Link */}
        <button
          onClick={() => setCurrentPage('landing')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para o início</span>
        </button>

        {/* Central Glass Card */}
        <div className="rounded-3xl glass-panel bg-[#121212]/90 border border-white/15 p-7 sm:p-9 shadow-2xl space-y-6 backdrop-blur-2xl">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FFD600] to-[#00C853] p-0.5 mx-auto shadow-[0_0_25px_rgba(255,214,0,0.3)]">
              <div className="w-full h-full bg-[#0D0D0D] rounded-[14px] flex items-center justify-center font-black text-sm text-[#FFD600]">
                FBR
              </div>
            </div>
            <h2 className="text-2xl font-black text-white font-['Outfit']">
              Acesse sua Conta
            </h2>
            <p className="text-xs text-zinc-400">
              Entre para comprar, vender ou disputar figurinhas em leilão
            </p>
          </div>

          {/* Error alert */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300 flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                E-mail
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu.email@exemplo.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#FFD600] transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                Senha
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••"
                  className="w-full pl-10 pr-11 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#FFD600] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors"
                  aria-label={showPassword ? 'Ocultar senha' : 'Exibir senha'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary-gradient w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-xl mt-2 disabled:opacity-50"
            >
              <span>{isLoading ? 'Entrando...' : 'Entrar'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>

          {/* Quick Demo Shortcut Card */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FFD600]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Acesso rápido (demonstração)</span>
            </div>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Clique em um dos perfis abaixo para preencher os campos automaticamente e teste o fluxo completo:
            </p>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickFill('admin')}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-center transition-all group hover:border-[#FFD600]/40"
              >
                <ShieldCheck className="w-4 h-4 text-[#FFD600] mx-auto mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-bold text-zinc-200 block truncate">Admin</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickFill('seller')}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-center transition-all group hover:border-[#00C853]/40"
              >
                <Store className="w-4 h-4 text-[#00C853] mx-auto mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-bold text-zinc-200 block truncate">Vendedor</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickFill('buyer')}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-center transition-all group hover:border-blue-400/40"
              >
                <ShoppingBag className="w-4 h-4 text-blue-400 mx-auto mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-bold text-zinc-200 block truncate">Comprador</span>
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
