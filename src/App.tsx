import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { BackgroundBlobs } from './components/common/BackgroundBlobs';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { ToastContainer } from './components/common/ToastContainer';
import { LandingPage } from './components/landing/LandingPage';
import { LoginPage } from './components/auth/LoginPage';
import { Marketplace } from './components/buyer/Marketplace';
import { MyAuctions } from './components/buyer/MyAuctions';
import { SellerDashboard } from './components/seller/SellerDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { CartDrawer } from './components/buyer/CartDrawer';

const AppContent: React.FC = () => {
  const { currentPage } = useApp();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const renderCurrentView = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage />;
      case 'login':
        return <LoginPage />;
      case 'marketplace':
        return <Marketplace />;
      case 'buyer-auctions':
        return <MyAuctions />;
      case 'seller':
        return <SellerDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col relative selection:bg-[#FFD600] selection:text-black">
      {/* Visual Ambient Glass Blobs */}
      <BackgroundBlobs />

      {/* Main Glass Header */}
      <Header onOpenCart={() => setIsCartOpen(true)} />

      {/* Main Content View */}
      <main className="flex-1 relative z-10">
        {renderCurrentView()}
      </main>

      {/* Footer on public/standard pages */}
      {currentPage !== 'login' && <Footer />}

      {/* Shopping Bag / Cart Slide-over */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />

      {/* Global Interactive Glass Toasts */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
