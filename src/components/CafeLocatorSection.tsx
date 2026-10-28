import React, { useState, useMemo } from 'react';
import { CAFES, CITIES } from '../data/cafes';
import { CafeLocation } from '../types';
import { Search, MapPin, Clock, Phone, Navigation, Check, Sparkles, Compass } from 'lucide-react';

interface CafeLocatorSectionProps {
  onSelectStore?: (cafe: CafeLocation) => void;
  selectedStoreId?: string;
}

export const CafeLocatorSection: React.FC<CafeLocatorSectionProps> = ({
  onSelectStore,
  selectedStoreId,
}) => {
  const [selectedCity, setSelectedCity] = useState<string>('All Cities');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCafeId, setActiveCafeId] = useState<string>(CAFES[0].id);

  const filteredCafes = useMemo(() => {
    return CAFES.filter((cafe) => {
      if (selectedCity !== 'All Cities' && cafe.city !== selectedCity) return false;
      if (
        searchQuery &&
        !cafe.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !cafe.address.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !cafe.area.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [selectedCity, searchQuery]);

  const activeCafe = CAFES.find((c) => c.id === activeCafeId) || filteredCafes[0] || CAFES[0];

  return (
    <section id="cafes" className="py-20 bg-[#120B09] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2A1D17] border border-[#FAF6EE]/15 text-xs text-[#E8C580]">
            <Sparkles className="w-3.5 h-3.5 text-[#C8102E]" />
            <span>CAFÉ LOCATOR</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FAF6EE] font-heading tracking-tight">
            Find A Tim Hortons Near You
          </h2>
          <p className="text-sm sm:text-base text-[#E0D0C1]">
            Experience cozy seating, drive-thru convenience, free Wi-Fi, and fresh coffee across India.
          </p>
        </div>

        {/* Search & City Filter Bar */}
        <div className="glass-panel p-4 rounded-2xl mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#E0D0C1]" />
              <input
                type="text"
                placeholder="Search by city, mall, or area (e.g. Saket, Bandra)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#120B09]/80 border border-[#FAF6EE]/15 rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#FAF6EE] placeholder-[#E0D0C1]/50 focus:outline-none focus:border-[#C8102E]"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 no-scrollbar">
              {CITIES.map((city) => (
                <button
                  key={city}
                  onClick={() => setSelectedCity(city)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-all ${
                    selectedCity === city
                      ? 'bg-[#C8102E] text-white shadow-md'
                      : 'bg-[#120B09]/60 text-[#E0D0C1] hover:text-white hover:bg-[#2A1D17]'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* Split Grid: List Left + Custom Interactive Map Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Cafe Cards List (Left 6 cols) */}
          <div className="lg:col-span-6 space-y-4 max-h-[600px] overflow-y-auto pr-1">
            {filteredCafes.length === 0 ? (
              <div className="p-8 text-center bg-[#1D1310] rounded-2xl border border-[#FAF6EE]/10 text-xs text-[#E0D0C1]">
                No cafés matching your search criteria in this region.
              </div>
            ) : (
              filteredCafes.map((cafe) => {
                const isActive = cafe.id === activeCafeId;
                const isSelected = cafe.id === selectedStoreId;

                return (
                  <div
                    key={cafe.id}
                    onClick={() => setActiveCafeId(cafe.id)}
                    className={`glass-card p-5 rounded-2xl border transition-all cursor-pointer ${
                      isActive
                        ? 'border-[#C8102E] bg-[#2A1D17]/80 shadow-xl'
                        : 'border-[#FAF6EE]/10 hover:border-[#FAF6EE]/30'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-[#FAF6EE] font-heading">{cafe.name}</h3>
                          {cafe.isOpen24Hours && (
                            <span className="bg-[#C8102E]/20 text-[#FAF6EE] text-[10px] font-bold px-2 py-0.5 rounded-full border border-[#C8102E]/40">
                              24/7 OPEN
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#E0D0C1] mt-1 leading-relaxed">{cafe.address}</p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs font-bold text-[#E8C580] block">{cafe.distanceKm} km away</span>
                      </div>
                    </div>

                    {/* Details & Phone */}
                    <div className="mt-4 pt-3 border-t border-[#FAF6EE]/10 flex flex-wrap items-center justify-between gap-3 text-xs text-[#E0D0C1]">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#E8C580]" />
                          {cafe.openingHours}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5 text-[#E8C580]" />
                          {cafe.phone}
                        </span>
                      </div>

                      {/* Amenities Pills */}
                      <div className="flex items-center gap-1.5">
                        {cafe.amenities.map((a) => (
                          <span
                            key={a}
                            className="bg-[#120B09]/80 text-[10px] text-[#E0D0C1] px-2 py-0.5 rounded-md border border-[#FAF6EE]/10"
                          >
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${cafe.googleMapsQuery}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-[#FAF6EE] bg-[#120B09] hover:bg-[#3B2A23] border border-[#FAF6EE]/10 transition-colors"
                      >
                        <Navigation className="w-3.5 h-3.5 text-[#C8102E]" />
                        <span>Get Directions</span>
                      </a>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onSelectStore) onSelectStore(cafe);
                        }}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          isSelected
                            ? 'bg-emerald-900/60 text-emerald-400 border border-emerald-500/50'
                            : 'bg-[#C8102E] text-white hover:bg-[#a00c24]'
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>My Selected Store</span>
                          </>
                        ) : (
                          <span>Select Store</span>
                        )}
                      </button>
                    </div>

                  </div>
                );
              })
            )}
          </div>

          {/* Interactive Visual Map Preview (Right 6 cols) */}
          <div className="lg:col-span-6 relative h-[520px] rounded-3xl overflow-hidden glass-panel border border-[#FAF6EE]/15 shadow-2xl p-6 flex flex-col justify-between">
            
            {/* Map Canvas Visual Simulation */}
            <div className="absolute inset-0 bg-[#1D1310] opacity-90">
              {/* Map grid lines */}
              <svg className="w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#FAF6EE" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Map Header Overlay */}
            <div className="relative z-10 flex items-center justify-between glass-panel p-3.5 rounded-2xl border border-[#FAF6EE]/10">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#E8C580]" />
                <span className="text-xs font-bold text-[#FAF6EE]">INDIA CAFÉ MAP NETWORK</span>
              </div>
              <span className="text-[11px] text-[#E8C580] bg-[#120B09] px-2.5 py-1 rounded-full font-mono">
                {filteredCafes.length} Stores Shown
              </span>
            </div>

            {/* Interactive Pins on Map Area */}
            <div className="relative z-10 my-auto h-80 w-full">
              {filteredCafes.map((cafe) => {
                const isActive = cafe.id === activeCafe.id;

                return (
                  <button
                    key={cafe.id}
                    onClick={() => setActiveCafeId(cafe.id)}
                    style={{
                      top: `${cafe.mapCoords.y}%`,
                      left: `${cafe.mapCoords.x}%`,
                    }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-all ${
                      isActive ? 'z-20 scale-125' : 'z-10 hover:scale-110'
                    }`}
                  >
                    <div className="relative flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shadow-2xl transition-colors ${
                          isActive
                            ? 'bg-[#C8102E] text-white ring-4 ring-[#C8102E]/40'
                            : 'bg-[#2A1D17] text-[#E8C580] border border-[#FAF6EE]/20'
                        }`}
                      >
                        <MapPin className="w-4 h-4 fill-current" />
                      </div>

                      {/* Tooltip on hover/active */}
                      <div
                        className={`mt-1 px-2.5 py-1 bg-[#120B09] border border-[#FAF6EE]/20 rounded-lg text-[10px] font-bold text-[#FAF6EE] whitespace-nowrap shadow-xl transition-all ${
                          isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                        }`}
                      >
                        {cafe.name.replace('Tim Hortons — ', '')}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Store Details Bottom Sheet inside Map */}
            {activeCafe && (
              <div className="relative z-10 glass-panel p-4 rounded-2xl border border-[#C8102E]/40 animate-fadeIn space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#E8C580] uppercase tracking-wider">
                    {activeCafe.city} • {activeCafe.area}
                  </span>
                  <span className="text-xs font-extrabold text-[#FAF6EE]">{activeCafe.distanceKm} km</span>
                </div>
                <h4 className="text-sm font-bold text-[#FAF6EE] font-heading">{activeCafe.name}</h4>
                <p className="text-[11px] text-[#E0D0C1] line-clamp-1">{activeCafe.address}</p>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
