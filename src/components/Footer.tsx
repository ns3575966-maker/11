import React from 'react';
import { MapPin, Coffee, ShieldAlert } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#0B0605] border-t border-[#FAF6EE]/10 pt-16 pb-12 text-[#E0D0C1] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#C8102E] flex items-center justify-center font-bold text-white text-base">
                T
              </div>
              <span className="text-lg font-bold text-[#FAF6EE] font-brand tracking-tight">
                TIM HORTONS
              </span>
            </div>
            <p className="text-xs text-[#E0D0C1]/80 leading-relaxed">
              Experience Canada’s favorite coffee, freshly baked Timbits®, and artisan cold brews across India.
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FAF6EE]">Quick Links</h4>
            <ul className="space-y-2">
              {['hero', 'featured', 'bakery', 'menu', 'story', 'cafes'].map((id) => (
                <li key={id}>
                  <button
                    onClick={() => onNavigate(id)}
                    className="hover:text-[#FAF6EE] transition-colors capitalize"
                  >
                    {id === 'hero' ? 'Home' : id === 'featured' ? 'Signature Brews' : id === 'cafes' ? 'Find a Café' : id}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Menu Items */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FAF6EE]">Menu Favorites</h4>
            <ul className="space-y-2 text-[#E0D0C1]/80">
              <li>French Vanilla Latte</li>
              <li>Signature Timbits® Pack</li>
              <li>Nitro Cold Brew</li>
              <li>Iced Capp® Original</li>
              <li>Artisanal Butter Croissant</li>
            </ul>
          </div>

          {/* Locations */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FAF6EE]">Key Metro Regions</h4>
            <p className="text-[#E0D0C1]/80 leading-relaxed">
              Delhi NCR · Mumbai · Bengaluru · Chandigarh · Pune · Hyderabad · Jaipur
            </p>
            <button
              onClick={() => onNavigate('cafes')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E8C580] hover:text-white pt-1"
            >
              <MapPin className="w-3.5 h-3.5 text-[#C8102E]" />
              <span>Locate Nearest Café</span>
            </button>
          </div>

        </div>

        {/* Independent Concept Redesign Notice Box */}
        <div className="p-4 bg-[#120B09] border border-[#FAF6EE]/10 rounded-2xl flex items-start gap-3 text-[#E0D0C1]">
          <ShieldAlert className="w-5 h-5 text-[#E8C580] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-[#FAF6EE] text-xs">DISCLAIMER & INDEPENDENT DESIGN CONCEPT NOTICE</span>
            <p className="text-[11px] leading-relaxed opacity-80">
              This website is an independent UI/UX and 3D web application concept developed strictly for demonstration and portfolio showcase purposes. It is not affiliated with, endorsed by, or authorized by Tim Hortons or Restaurant Brands International. All trademarks, logos, and brand names are the property of their respective owners.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[#FAF6EE]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#E0D0C1]/60">
          <span>© {new Date().getFullYear()} Tim Hortons India Concept Redesign. Built with React & Three.js.</span>
          <div className="flex gap-4">
            <span>Privacy Policy</span>
            <span>·</span>
            <span>Terms of Service</span>
            <span>·</span>
            <span>Cookie Settings</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
