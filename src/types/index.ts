export type UserRole = 'admin' | 'seller' | 'buyer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  active: boolean;
  memberSince: string;
  totalSales: number;
  totalPurchases: number;
  phone?: string;
  city?: string;
}

export type StickerCategory = 'comum' | 'brilhante' | 'especial';
export type StickerPosition = 'Goleiro' | 'Zagueiro' | 'Lateral' | 'Meio-Campo' | 'Atacante';

export interface Sticker {
  id: string;
  number: number;
  team: string;
  player: string;
  position: StickerPosition;
  category: StickerCategory;
  quantity: number;
  minPrice: number;
  maxPrice: number;
  currentPrice: number; // Listed price or buy now
  sellerId: string;
  sellerName: string;
  sellerRating: number;
  status: 'active' | 'paused' | 'sold';
  createdAt: string;
  teamColors: {
    primary: string;
    secondary: string;
  };
  flagEmoji: string;
  inAuction?: boolean;
  currentBid?: number;
  auctionTimeLeft?: string;
}

export interface AuctionBid {
  id: string;
  bidderId: string;
  bidderName: string;
  amount: number;
  timestamp: string;
}

export type AuctionStatus = 'Ativo' | 'Arrematado' | 'Encerrado';

export interface AuctionItem {
  id: string;
  stickerId: string;
  stickerNumber: number;
  stickerPlayer: string;
  stickerTeam: string;
  stickerCategory: StickerCategory;
  sellerId: string;
  sellerName: string;
  initialBid: number;
  currentBid: number;
  buyNowPrice: number;
  highestBidderId?: string;
  highestBidderName?: string;
  bidsCount: number;
  timeLeft: string;
  secondsRemaining: number;
  status: AuctionStatus;
  createdAt: string;
  bidsHistory: AuctionBid[];
}

export interface CartItem {
  id: string;
  sticker: Sticker;
  price: number;
  auctionId?: string;
  isAuctionWon?: boolean;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

export type NavigationPage = 
  | 'landing' 
  | 'login' 
  | 'marketplace' 
  | 'seller' 
  | 'buyer-auctions'
  | 'admin';
