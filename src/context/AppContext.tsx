import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  Sticker, 
  AuctionItem, 
  CartItem, 
  ToastMessage, 
  NavigationPage, 
  UserRole,
  AuctionStatus 
} from '../types';
import { INITIAL_USERS, INITIAL_STICKERS, INITIAL_AUCTIONS } from '../data/mockData';

interface AppContextType {
  currentUser: User | null;
  currentPage: NavigationPage;
  setCurrentPage: (page: NavigationPage) => void;
  stickers: Sticker[];
  auctions: AuctionItem[];
  cart: CartItem[];
  users: User[];
  toasts: ToastMessage[];
  loginAs: (role: UserRole) => void;
  loginWithCredentials: (email: string, pass: string) => { success: boolean; message?: string };
  logout: () => void;
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
  
  // Stickers
  addSticker: (data: {
    number: number;
    team: string;
    player: string;
    position: Sticker['position'];
    category: Sticker['category'];
    quantity: number;
    minPrice: number;
    maxPrice: number;
    currentPrice: number;
    inAuction?: boolean;
  }) => void;
  updateSticker: (id: string, updates: Partial<Sticker>) => void;
  toggleStickerStatus: (id: string) => void;
  deleteSticker: (id: string) => void;

  // Auctions & Bids
  placeBid: (auctionId: string, amount: number) => { success: boolean; message?: string };
  buyNowAuction: (auctionId: string) => void;
  createAuction: (data: {
    sticker: Sticker;
    initialBid: number;
    buyNowPrice: number;
    durationHours?: number;
  }) => void;
  finalizeAuction: (auctionId: string) => void;

  // Cart
  addToCart: (sticker: Sticker, priceOverride?: number, auctionId?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  checkoutCart: () => void;

  // Admin
  toggleUserStatus: (userId: string) => void;
  deleteStickerByAdmin: (stickerId: string) => void;

  // Helpers
  formatCurrency: (value: number) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const FLAG_MAP: Record<string, string> = {
  'Brasil': '🇧🇷',
  'Argentina': '🇦🇷',
  'França': '🇫🇷',
  'Espanha': '🇪🇸',
  'Alemanha': '🇩🇪',
  'Portugal': '🇵🇹',
  'Inglaterra': '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
  'Holanda': '🇳🇱',
  'Uruguai': '🇺🇾',
  'Japão': '🇯🇵',
  'Croácia': '🇭🇷',
  'Itália': '🇮🇹',
  'Bélgica': '🇧🇪',
  'Colômbia': '🇨🇴',
  'México': '🇲🇽',
};

const COLOR_MAP: Record<string, { primary: string; secondary: string }> = {
  'Brasil': { primary: '#FFD600', secondary: '#00C853' },
  'Argentina': { primary: '#74ACDF', secondary: '#FFFFFF' },
  'França': { primary: '#002654', secondary: '#ED2939' },
  'Espanha': { primary: '#AA151B', secondary: '#F1BF00' },
  'Alemanha': { primary: '#111827', secondary: '#FFCC00' },
  'Portugal': { primary: '#006600', secondary: '#FF0000' },
  'Inglaterra': { primary: '#CF081F', secondary: '#FFFFFF' },
  'Holanda': { primary: '#FF6600', secondary: '#FFFFFF' },
  'Uruguai': { primary: '#55B5E6', secondary: '#0038A8' },
  'Japão': { primary: '#000080', secondary: '#BC002D' },
  'Croácia': { primary: '#FF0000', secondary: '#FFFFFF' },
  'Itália': { primary: '#002B7F', secondary: '#FFFFFF' },
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('figurinhas_user');
    if (saved) {
      try { return JSON.parse(saved); } catch { return null; }
    }
    return null;
  });

  const [currentPage, setCurrentPage] = useState<NavigationPage>('landing');
  
  const [stickers, setStickers] = useState<Sticker[]>(() => {
    const saved = localStorage.getItem('figurinhas_stickers');
    if (saved) {
      try { return JSON.parse(saved); } catch { return INITIAL_STICKERS; }
    }
    return INITIAL_STICKERS;
  });

  const [auctions, setAuctions] = useState<AuctionItem[]>(() => {
    const saved = localStorage.getItem('figurinhas_auctions');
    if (saved) {
      try { return JSON.parse(saved); } catch { return INITIAL_AUCTIONS; }
    }
    return INITIAL_AUCTIONS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('figurinhas_cart');
    if (saved) {
      try { return JSON.parse(saved); } catch { return []; }
    }
    return [];
  });

  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Persist state
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('figurinhas_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('figurinhas_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('figurinhas_stickers', JSON.stringify(stickers));
  }, [stickers]);

  useEffect(() => {
    localStorage.setItem('figurinhas_auctions', JSON.stringify(auctions));
  }, [auctions]);

  useEffect(() => {
    localStorage.setItem('figurinhas_cart', JSON.stringify(cart));
  }, [cart]);

  // Tick auction remaining time
  useEffect(() => {
    const timer = setInterval(() => {
      setAuctions((prev) =>
        prev.map((auc) => {
          if (auc.status !== 'Ativo' || auc.secondsRemaining <= 0) return auc;
          const nextSec = auc.secondsRemaining - 1;
          const hours = Math.floor(nextSec / 3600);
          const minutes = Math.floor((nextSec % 3600) / 60);
          const seconds = nextSec % 60;
          const timeFormatted = nextSec > 0
            ? `${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`
            : 'Encerrado';

          return {
            ...auc,
            secondsRemaining: nextSec,
            timeLeft: timeFormatted,
            status: nextSec <= 0 ? 'Encerrado' : auc.status,
          };
        })
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = 'toast-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const loginAs = (role: UserRole) => {
    const targetUser = users.find((u) => u.role === role);
    if (targetUser) {
      setCurrentUser(targetUser);
      addToast(`Bem-vindo de volta, ${targetUser.name}!`, 'success');
      if (role === 'admin') setCurrentPage('admin');
      else if (role === 'seller') setCurrentPage('seller');
      else setCurrentPage('marketplace');
    }
  };

  const loginWithCredentials = (email: string, pass: string) => {
    if (pass !== '123456') {
      return { success: false, message: 'Senha incorreta. Utilize 123456 no protótipo.' };
    }
    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!found) {
      return { success: false, message: 'Usuário não cadastrado com este e-mail.' };
    }
    if (!found.active) {
      return { success: false, message: 'Esta conta foi temporariamente desativada pelo administrador.' };
    }

    setCurrentUser(found);
    addToast(`Login realizado como ${found.name} (${found.role})`, 'success');
    if (found.role === 'admin') setCurrentPage('admin');
    else if (found.role === 'seller') setCurrentPage('seller');
    else setCurrentPage('marketplace');

    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentPage('landing');
    addToast('Sessão encerrada com sucesso.', 'info');
  };

  // Sticker actions
  const addSticker = (data: {
    number: number;
    team: string;
    player: string;
    position: Sticker['position'];
    category: Sticker['category'];
    quantity: number;
    minPrice: number;
    maxPrice: number;
    currentPrice: number;
    inAuction?: boolean;
  }) => {
    if (!currentUser) return;
    const teamColors = COLOR_MAP[data.team] || { primary: '#FFD600', secondary: '#00C853' };
    const flagEmoji = FLAG_MAP[data.team] || '⚽';

    const newSticker: Sticker = {
      id: 'stk-' + Date.now(),
      ...data,
      sellerId: currentUser.id,
      sellerName: currentUser.name,
      sellerRating: 5.0,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
      teamColors,
      flagEmoji,
    };

    setStickers((prev) => [newSticker, ...prev]);

    // If marked for auction immediately, create an auction item
    if (data.inAuction) {
      createAuction({
        sticker: newSticker,
        initialBid: data.minPrice,
        buyNowPrice: data.maxPrice,
        durationHours: 6,
      });
    }

    addToast(`Figurinha #${data.number} (${data.player}) cadastrada com sucesso!`, 'success');
  };

  const updateSticker = (id: string, updates: Partial<Sticker>) => {
    setStickers((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
    addToast('Anúncio atualizado com sucesso!', 'success');
  };

  const toggleStickerStatus = (id: string) => {
    setStickers((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const nextStatus = s.status === 'active' ? 'paused' : 'active';
          addToast(
            nextStatus === 'active' ? 'Anúncio reativado!' : 'Anúncio pausado!',
            'info'
          );
          return { ...s, status: nextStatus };
        }
        return s;
      })
    );
  };

  const deleteSticker = (id: string) => {
    setStickers((prev) => prev.filter((s) => s.id !== id));
    addToast('Anúncio removido da sua lista.', 'info');
  };

  const deleteStickerByAdmin = (id: string) => {
    setStickers((prev) => prev.filter((s) => s.id !== id));
    addToast('Anúncio moderado e removido pelo Administrador.', 'info');
  };

  // Auction Actions
  const placeBid = (auctionId: string, amount: number) => {
    if (!currentUser) {
      addToast('Faça login como Comprador para dar lances no Leilão.', 'error');
      setCurrentPage('login');
      return { success: false, message: 'Requer login' };
    }

    const auction = auctions.find((a) => a.id === auctionId);
    if (!auction) {
      return { success: false, message: 'Leilão não encontrado' };
    }

    if (auction.status !== 'Ativo') {
      addToast('Este leilão já foi encerrado.', 'error');
      return { success: false, message: 'Leilão encerrado' };
    }

    if (amount <= auction.currentBid) {
      addToast(`Seu lance deve ser superior ao lance atual de ${formatCurrency(auction.currentBid)}.`, 'error');
      return { success: false, message: 'Lance baixo demais' };
    }

    const newBid = {
      id: 'bid-' + Date.now(),
      bidderId: currentUser.id,
      bidderName: currentUser.name,
      amount,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    };

    setAuctions((prev) =>
      prev.map((a) => {
        if (a.id === auctionId) {
          return {
            ...a,
            currentBid: amount,
            bidsCount: a.bidsCount + 1,
            highestBidderId: currentUser.id,
            highestBidderName: currentUser.name,
            bidsHistory: [newBid, ...a.bidsHistory],
          };
        }
        return a;
      })
    );

    addToast(
      `🔨 Lance de ${formatCurrency(amount)} confirmado no cromo #${auction.stickerNumber} (${auction.stickerPlayer})! Você é o maior ofertante.`,
      'success'
    );
    return { success: true };
  };

  const buyNowAuction = (auctionId: string) => {
    if (!currentUser) {
      addToast('Faça login para arrematar a figurinha.', 'error');
      setCurrentPage('login');
      return;
    }

    const auction = auctions.find((a) => a.id === auctionId);
    if (!auction) return;

    const stk = stickers.find((s) => s.id === auction.stickerId);
    if (!stk) return;

    // Mark auction as Arrematado
    setAuctions((prev) =>
      prev.map((a) =>
        a.id === auctionId
          ? {
              ...a,
              status: 'Arrematado',
              currentBid: a.buyNowPrice,
              highestBidderId: currentUser.id,
              highestBidderName: currentUser.name,
              secondsRemaining: 0,
              timeLeft: 'Arrematado Imediato',
            }
          : a
      )
    );

    // Add directly to cart
    addToCart(stk, auction.buyNowPrice, auction.id);
    addToast(
      `🏆 Parabéns! Você arrematou de imediato a figurinha #${auction.stickerNumber} (${auction.stickerPlayer}) por ${formatCurrency(auction.buyNowPrice)}!`,
      'success'
    );
  };

  const createAuction = (data: {
    sticker: Sticker;
    initialBid: number;
    buyNowPrice: number;
    durationHours?: number;
  }) => {
    const hours = data.durationHours || 4;
    const totalSec = hours * 3600;

    const newAuction: AuctionItem = {
      id: 'auc-' + Date.now(),
      stickerId: data.sticker.id,
      stickerNumber: data.sticker.number,
      stickerPlayer: data.sticker.player,
      stickerTeam: data.sticker.team,
      stickerCategory: data.sticker.category,
      sellerId: data.sticker.sellerId,
      sellerName: data.sticker.sellerName,
      initialBid: data.initialBid,
      currentBid: data.initialBid,
      buyNowPrice: data.buyNowPrice,
      bidsCount: 0,
      timeLeft: `${String(hours).padStart(2, '0')}h 00m 00s`,
      secondsRemaining: totalSec,
      status: 'Ativo',
      createdAt: new Date().toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' }),
      bidsHistory: [],
    };

    setAuctions((prev) => [newAuction, ...prev]);
    addToast(`Leilão aberto para o cromo #${data.sticker.number} (${data.sticker.player})!`, 'success');
  };

  const finalizeAuction = (auctionId: string) => {
    setAuctions((prev) =>
      prev.map((a) => {
        if (a.id === auctionId) {
          return {
            ...a,
            status: 'Arrematado',
            secondsRemaining: 0,
            timeLeft: 'Encerrado',
          };
        }
        return a;
      })
    );
    addToast('Martelo batido! Leilão finalizado com sucesso.', 'success');
  };

  // Cart actions
  const addToCart = (sticker: Sticker, priceOverride?: number, auctionId?: string) => {
    const finalPrice = priceOverride !== undefined ? priceOverride : sticker.currentPrice;

    const newItem: CartItem = {
      id: 'cart-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      sticker,
      price: finalPrice,
      auctionId,
      isAuctionWon: auctionId !== undefined,
    };

    setCart((prev) => [...prev, newItem]);
    addToast(
      `Figurinha #${sticker.number} (${sticker.player}) adicionada ao carrinho!`,
      'success'
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((i) => i.id !== cartItemId));
    addToast('Item removido do carrinho.', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const checkoutCart = () => {
    if (cart.length === 0) return;
    const total = cart.reduce((sum, item) => sum + item.price, 0);

    setStickers((prev) =>
      prev.map((s) => {
        const inCartCount = cart.filter((c) => c.sticker.id === s.id).length;
        if (inCartCount > 0) {
          const newQty = Math.max(0, s.quantity - inCartCount);
          return {
            ...s,
            quantity: newQty,
            status: newQty === 0 ? 'sold' : s.status,
          };
        }
        return s;
      })
    );

    clearCart();
    addToast(`Pedido finalizado com sucesso! Valor total: ${formatCurrency(total)}. O lote é seu!`, 'success');
  };

  const toggleUserStatus = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const nextActive = !u.active;
          addToast(
            nextActive ? `Usuário ${u.name} ativado!` : `Usuário ${u.name} bloqueado!`,
            'info'
          );
          return { ...u, active: nextActive };
        }
        return u;
      })
    );
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentPage,
        setCurrentPage,
        stickers,
        auctions,
        cart,
        users,
        toasts,
        loginAs,
        loginWithCredentials,
        logout,
        addToast,
        removeToast,
        addSticker,
        updateSticker,
        toggleStickerStatus,
        deleteSticker,
        placeBid,
        buyNowAuction,
        createAuction,
        finalizeAuction,
        addToCart,
        removeFromCart,
        clearCart,
        checkoutCart,
        toggleUserStatus,
        deleteStickerByAdmin,
        formatCurrency,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
