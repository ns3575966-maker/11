import React, { useState } from 'react';
import { ShoppingBag, Menu as MenuIcon, X, MapPin } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  activeSection,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'featured', label: 'Brews' },
    { id: 'bakery', label: 'Bakery' },
    { id: 'menu', label: 'Menu' },
    { id: 'story', label: 'Our Story' },
    { id: 'cafes', label: 'Find Café' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#120B09]/90 backdrop-blur-md border-b border-[#FAF6EE]/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-2.5 group text-left focus:outline-none"
          >
            <div className="w-9 h-9 rounded-full bg-[#C8102E] flex items-center justify-center font-bold text-white text-lg shadow-md group-hover:scale-105 transition-transform">
              T
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-[#FAF6EE] font-brand whitespace-nowrap">
                TIM HORTONS
              </span>
              <span className="text-[10px] font-semibold tracking-widest text-[#E8C580] uppercase -mt-1">
                INDIA CONCEPT
              </span>
            </div>
          </button>

          {/* Zone 2: 5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-sm font-medium transition-colors whitespace-nowrap shrink-0 relative py-1 ${
                  activeSection === link.id
                    ? 'text-[#FAF6EE] font-semibold'
                    : 'text-[#E0D0C1] hover:text-[#FAF6EE]'
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#C8102E] rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Zone 3: 1 primary action button + Mobile Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleNavClick('cafes')}
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#E0D0C1] hover:text-white bg-[#2A1D17] hover:bg-[#3B2A23] border border-[#FAF6EE]/10 rounded-xl transition-all"
            >
              <MapPin className="w-3.5 h-3.5 text-[#C8102E]" />
              <span>Café Locator</span>
            </button>

            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#C8102E] hover:bg-[#a00c24] active:scale-95 rounded-xl shadow-lg transition-all whitespace-nowrap shrink-0"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Order Bag</span>
              {cartCount > 0 && (
                <span className="ml-1 bg-white text-[#C8102E] font-extrabold px-1.5 py-0.5 rounded-full text-[11px] animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#E0D0C1] hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1D1310] border-b border-[#FAF6EE]/10 px-6 py-4 space-y-3 animate-fadeIn">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`block w-full text-left py-2 text-base font-medium transition-colors ${
                activeSection === link.id ? 'text-[#C8102E] font-bold' : 'text-[#E0D0C1]'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
