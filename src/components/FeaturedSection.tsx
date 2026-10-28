import React from 'react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { Sparkles, Star, Plus } from 'lucide-react';

interface FeaturedSectionProps {
  onSelectProduct: (product: Product) => void;
}

export const FeaturedSection: React.FC<FeaturedSectionProps> = ({ onSelectProduct }) => {
  // Select 6 featured drinks specifically requested: Latte, Cappuccino, Americano, Iced Coffee, Cold Brew, French Vanilla
  const featuredIds = ['french-vanilla', 'cold-brew-nitro', 'iced-capp', 'cappuccino-classic', 'hazelnut-frappe'];
  const featuredProducts = PRODUCTS.filter((p) => featuredIds.includes(p.id) || p.category === 'hot-beverages' || p.category === 'cold-beverages').slice(0, 6);

  return (
    <section id="featured" className="py-20 bg-[#120B09] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2A1D17] border border-[#FAF6EE]/15 text-xs text-[#E8C580]">
            <Sparkles className="w-3.5 h-3.5 text-[#C8102E]" />
            <span>SIGNATURE BREWS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FAF6EE] font-heading tracking-tight text-balance">
            Handcrafted Coffee & Cold Beverages
          </h2>
          <p className="text-sm sm:text-base text-[#E0D0C1]">
            Every cup is freshly ground from 100% Arabica coffee beans and steam-crafted to perfection.
          </p>
        </div>

        {/* 3-Column Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="glass-card rounded-3xl overflow-hidden group hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between border border-[#FAF6EE]/10 hover:border-[#C8102E]/40 shadow-xl"
            >
              {/* Product Image Area */}
              <div className="relative h-64 overflow-hidden bg-[#1D1310]">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    // Fallback visual if image fails
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                
                {/* Fallback Container */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#120B09] via-transparent to-transparent opacity-80" />

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-[#120B09]/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#FAF6EE]/15 flex items-center gap-1 text-xs text-[#FAF6EE]">
                  <Star className="w-3.5 h-3.5 fill-[#E8C580] text-[#E8C580]" />
                  <span className="font-bold">{product.rating}</span>
                </div>

                {/* Bestseller Badge */}
                {product.isBestseller && (
                  <div className="absolute top-4 left-4 bg-[#C8102E] text-white px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase shadow-md">
                    Bestseller
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-xs text-[#E8C580] font-semibold uppercase tracking-wider mb-1">
                    {product.categoryLabel}
                  </div>
                  <h3 className="text-xl font-bold text-[#FAF6EE] font-heading group-hover:text-[#E8C580] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#E0D0C1] line-clamp-2 mt-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Flavor Notes */}
                {product.flavorNotes && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {product.flavorNotes.map((note) => (
                      <span
                        key={note}
                        className="text-[11px] text-[#E0D0C1] bg-[#120B09]/80 border border-[#FAF6EE]/10 px-2 py-0.5 rounded-md"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                )}

                {/* Footer / Customise Action */}
                <div className="pt-4 border-t border-[#FAF6EE]/10 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-[#E0D0C1]">Starting at</span>
                    <div className="text-lg font-extrabold text-[#FAF6EE] tabular-nums font-heading">
                      ₹{product.price}
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectProduct(product)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#C8102E] hover:bg-[#a00c24] active:scale-95 transition-all shadow-md"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Customise</span>
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
