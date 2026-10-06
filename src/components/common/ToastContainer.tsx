import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-md w-full px-4 sm:px-0 pointer-events-none">
      {toasts.map((toast) => {
        let borderColor = 'border-white/10';
        let icon = <Info className="w-5 h-5 text-blue-400 shrink-0" />;
        let glowClass = 'shadow-[0_8px_30px_rgb(0,0,0,0.5)]';

        if (toast.type === 'success') {
          borderColor = 'border-[#00C853]/40';
          icon = <CheckCircle2 className="w-5 h-5 text-[#00C853] shrink-0" />;
          glowClass = 'shadow-[0_8px_30px_rgba(0,200,83,0.18)]';
        } else if (toast.type === 'error') {
          borderColor = 'border-red-500/40';
          icon = <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />;
          glowClass = 'shadow-[0_8px_30px_rgba(239,68,68,0.2)]';
        } else {
          borderColor = 'border-[#FFD600]/40';
          icon = <Info className="w-5 h-5 text-[#FFD600] shrink-0" />;
          glowClass = 'shadow-[0_8px_30px_rgba(255,214,0,0.15)]';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl backdrop-blur-xl bg-[#121212]/90 border ${borderColor} ${glowClass} text-white transition-all transform animate-in fade-in slide-in-from-bottom-3 duration-200`}
          >
            {icon}
            <div className="flex-1 text-sm leading-relaxed text-zinc-100">
              {toast.message}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-zinc-400 hover:text-white transition-colors p-1 -mr-1"
              aria-label="Fechar notificação"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
