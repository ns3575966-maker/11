import React from 'react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { Sparkles, Plus, Check } from 'lucide-react';

interface BakerySectionProps {
  onSelectProduct: (product: Product) => void;
}

export const BakerySection: React.FC<BakerySectionProps> = ({ onSelectProduct }) => {
  const bakeryItems = PRODUCTS.filter(
    (p) => p.category === 'timbits-donuts' || p.category === 'bakery-food' || p.category === 'desserts'
  );

  return (
    <section id="bakery" className="py-20 bg-gradient-to-b from-[#120B09] via-[#1A100C] to-[#120B09] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2A1D17] border border-[#FAF6EE]/15 text-xs text-[#E8C580]">
              <Sparkles className="w-3.5 h-3.5 text-[#C8102E]" />
              <span>FRESH FROM THE OVEN</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FAF6EE] font-heading tracking-tight">
              Timbits®, Donuts & Artisanal Bakery
            </h2>
            <p className="text-sm sm:text-base text-[#E0D0C1]">
              Baked fresh throughout the day in store. Perfect pairings with your favorite Tim Hortons coffee brew.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs text-[#E8C580] bg-[#2A1D17]/60 px-4 py-2.5 rounded-2xl border border-[#FAF6EE]/10 shrink-0">
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-[#C8102E]" /> 100% Pure Veg Options</span>
            <span className="text-[#FAF6EE]/20">•</span>
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-[#C8102E]" /> Warm Oven Heating</span>
          </div>
        </div>

        {/* Bakery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bakeryItems.map((item) => (
            <div
              key={item.id}
              className="glass-card rounded-3xl overflow-hidden group hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between border border-[#FAF6EE]/10 hover:border-[#E8C580]/40 shadow-xl"
            >
              <div className="relative h-52 overflow-hidden bg-[#120B09]">
                <img
                  src={item.image}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120B09] via-transparent to-transparent opacity-80" />
                
                {item.isVeg && (
                  <span className="absolute top-3 left-3 bg-[#120B09]/80 backdrop-blur-md text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-md text-[11px] font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    PURE VEG
                  </span>
                )}
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-lg font-bold text-[#FAF6EE] font-heading group-hover:text-[#E8C580] transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-[#E0D0C1] line-clamp-2 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#FAF6EE]/10 flex items-center justify-between">
                  <span className="text-base font-extrabold text-[#FAF6EE] font-heading tabular-nums">
                    ₹{item.price}
                  </span>

                  <button
                    onClick={() => onSelectProduct(item)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-[#C8102E] hover:bg-[#a00c24] active:scale-95 transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
