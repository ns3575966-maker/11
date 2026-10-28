import React, { useState } from 'react';
import { HeroCoffeeScene } from './3d/HeroCoffeeScene';
import { ControlOverlay } from './3d/ControlOverlay';
import { ArrowRight, MapPin, Coffee, Award, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onExploreMenu: () => void;
  onFindCafe: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreMenu,
  onFindCafe,
}) => {
  const [rotateSpeed, setRotateSpeed] = useState<number>(0.5);
  const [steamEnabled, setSteamEnabled] = useState<boolean>(true);
  const [viewAngle, setViewAngle] = useState<'hero' | 'top' | 'front' | 'cinematic'>('hero');

  return (
    <section className="relative min-h-[calc(100vh-5rem)] flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#120B09] via-[#1D1310] to-[#120B09] pt-6 pb-12">
      
      {/* Background Subtle Gradient Glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#C8102E]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-96 h-96 bg-[#E8C580]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
        
        {/* Left Copy & Headline */}
        <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2A1D17]/80 border border-[#FAF6EE]/15 text-xs text-[#E8C580]">
            <Sparkles className="w-3.5 h-3.5 text-[#C8102E]" />
            <span className="font-medium tracking-wide">3D EXPERIENCE REDESIGN</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#FAF6EE] font-heading tracking-tight text-balance leading-[1.1]">
            A Better <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#FAF6EE] via-[#E8C580] to-[#C8102E] bg-clip-text text-transparent">
              Coffee Moment.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#E0D0C1] max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed text-balance">
            Discover your next favourite coffee, crafted for every moment. Freshly brewed 100% Arabica espresso, world-famous Timbits®, and artisan cold drinks across India.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
            <button
              onClick={onExploreMenu}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-bold text-white bg-[#C8102E] hover:bg-[#a00c24] active:scale-95 rounded-2xl shadow-xl hover:shadow-[#C8102E]/25 transition-all group"
            >
              <span>Explore Our Menu</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onFindCafe}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#FAF6EE] bg-[#2A1D17] hover:bg-[#3B2A23] border border-[#FAF6EE]/15 rounded-2xl transition-all"
            >
              <MapPin className="w-4 h-4 text-[#C8102E]" />
              <span>Find a Café</span>
            </button>
          </div>

          {/* Social Proof / Craft Badges */}
          <div className="pt-6 border-t border-[#FAF6EE]/10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-[#E0D0C1]">
            <div className="flex items-center gap-2">
              <Coffee className="w-4 h-4 text-[#E8C580]" />
              <span>100% Arabica Beans</span>
            </div>
            <span className="hidden sm:inline text-[#FAF6EE]/20">•</span>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#E8C580]" />
              <span>Freshly Baked Daily</span>
            </div>
            <span className="hidden sm:inline text-[#FAF6EE]/20">•</span>
            <div>
              <span className="font-bold text-[#FAF6EE]">35+</span> Cafés in India
            </div>
          </div>

        </div>

        {/* Right 3D Interactive Canvas */}
        <div className="lg:col-span-6 relative h-[420px] sm:h-[500px] lg:h-[580px] w-full flex items-center justify-center">
          <HeroCoffeeScene
            rotateSpeed={rotateSpeed}
            steamEnabled={steamEnabled}
            viewAngle={viewAngle}
          />

          <ControlOverlay
            rotateSpeed={rotateSpeed}
            setRotateSpeed={setRotateSpeed}
            steamEnabled={steamEnabled}
            setSteamEnabled={setSteamEnabled}
            viewAngle={viewAngle}
            setViewAngle={setViewAngle}
          />
        </div>

      </div>

    </section>
  );
};
