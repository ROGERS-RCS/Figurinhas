import React from 'react';

export const BackgroundBlobs: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Top Left Yellow Blob */}
      <div 
        className="absolute -top-[15%] -left-[10%] w-[550px] h-[550px] rounded-full opacity-[0.14] blur-[140px]"
        style={{ background: 'radial-gradient(circle, #FFD600 0%, transparent 70%)' }}
      />
      {/* Top Right Green Blob */}
      <div 
        className="absolute top-[5%] -right-[10%] w-[600px] h-[600px] rounded-full opacity-[0.15] blur-[150px]"
        style={{ background: 'radial-gradient(circle, #00C853 0%, transparent 70%)' }}
      />
      {/* Center Ambient Subtle Yellow/Green Blob */}
      <div 
        className="absolute top-[45%] left-[25%] w-[500px] h-[500px] rounded-full opacity-[0.08] blur-[160px]"
        style={{ background: 'radial-gradient(circle, #FFD600 0%, #00C853 100%)' }}
      />
      {/* Bottom Left Green Blob */}
      <div 
        className="absolute -bottom-[10%] -left-[5%] w-[600px] h-[600px] rounded-full opacity-[0.12] blur-[150px]"
        style={{ background: 'radial-gradient(circle, #00C853 0%, transparent 70%)' }}
      />
      {/* Bottom Right Golden Glow */}
      <div 
        className="absolute -bottom-[10%] -right-[5%] w-[500px] h-[500px] rounded-full opacity-[0.12] blur-[140px]"
        style={{ background: 'radial-gradient(circle, #FFD600 0%, transparent 70%)' }}
      />
      {/* Subtle pitch grid lines overlay for depth */}
      <div 
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />
    </div>
  );
};
