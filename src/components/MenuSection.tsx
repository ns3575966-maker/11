import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../data/products';
import { ProductCategory, Product } from '../types';
import { Search, Filter, Sparkles, Star, Plus } from 'lucide-react';

interface MenuSectionProps {
  onSelectProduct: (product: Product) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onSelectProduct }) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  const [bestsellerOnly, setBestsellerOnly] = useState(false);

  const categories: { id: ProductCategory; label: string }[] = [
    { id: 'all', label: 'All Menu' },
    { id: 'hot-beverages', label: 'Hot Beverages' },
    { id: 'cold-beverages', label: 'Cold Beverages' },
    { id: 'timbits-donuts', label: 'Timbits® & Donuts' },
    { id: 'bakery-food', label: 'Bakery & Food' },
    { id: 'desserts', label: 'Desserts' },
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category Filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Search Filter
      if (
        searchQuery &&
        !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.description.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      // Veg Filter
      if (vegOnly && !product.isVeg) return false;
      // Bestseller Filter
      if (bestsellerOnly && !product.isBestseller) return false;

      return true;
    });
  }, [selectedCategory, searchQuery, vegOnly, bestsellerOnly]);

  return (
    <section id="menu" className="py-20 bg-[#120B09] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2A1D17] border border-[#FAF6EE]/15 text-xs text-[#E8C580]">
            <Sparkles className="w-3.5 h-3.5 text-[#C8102E]" />
            <span>FULL DIGITAL MENU</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FAF6EE] font-heading tracking-tight">
            Explore The Tim Hortons Menu
          </h2>
          <p className="text-sm sm:text-base text-[#E0D0C1]">
            Select an item to customize size, milk preference, sweetness, or extra espresso shots.
          </p>
        </div>

        {/* Controls Bar: Search & Toggles */}
        <div className="glass-panel p-4 rounded-2xl mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            
            {/* Search Field */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#E0D0C1]" />
              <input
                type="text"
                placeholder="Search coffee, timbits, croissants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#120B09]/80 border border-[#FAF6EE]/15 rounded-xl pl-10 pr-4 py-2 text-xs text-[#FAF6EE] placeholder-[#E0D0C1]/50 focus:outline-none focus:border-[#C8102E]"
              />
            </div>

            {/* Filter Toggles */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-start md:justify-end">
              <button
                onClick={() => setVegOnly(!vegOnly)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors ${
                  vegOnly
                    ? 'bg-emerald-950/80 text-emerald-400 border-emerald-500/50'
                    : 'bg-[#120B09]/60 text-[#E0D0C1] border-[#FAF6EE]/10 hover:border-[#FAF6EE]/30'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Pure Veg Only</span>
              </button>

              <button
                onClick={() => setBestsellerOnly(!bestsellerOnly)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors ${
                  bestsellerOnly
                    ? 'bg-[#C8102E]/20 text-[#FAF6EE] border-[#C8102E]'
                    : 'bg-[#120B09]/60 text-[#E0D0C1] border-[#FAF6EE]/10 hover:border-[#FAF6EE]/30'
                }`}
              >
                <Star className="w-3.5 h-3.5 fill-[#E8C580] text-[#E8C580]" />
                <span>Bestsellers</span>
              </button>
            </div>

          </div>

          {/* Interactive Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#C8102E] text-white shadow-md'
                    : 'bg-[#120B09]/60 text-[#E0D0C1] hover:text-white hover:bg-[#2A1D17]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-[#1D1310] rounded-3xl border border-[#FAF6EE]/10 p-8 space-y-3">
            <Filter className="w-8 h-8 text-[#E8C580] mx-auto opacity-50" />
            <h3 className="text-lg font-bold text-[#FAF6EE] font-heading">No menu items found</h3>
            <p className="text-xs text-[#E0D0C1]">Try clearing your search query or adjusting your dietary filters.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setVegOnly(false);
                setBestsellerOnly(false);
                setSelectedCategory('all');
              }}
              className="mt-2 px-4 py-2 text-xs font-bold text-white bg-[#C8102E] rounded-xl"
            >
              Reset Menu Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="glass-card rounded-3xl overflow-hidden group hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between border border-[#FAF6EE]/10 hover:border-[#C8102E]/40"
              >
                <div className="relative h-48 overflow-hidden bg-[#1D1310]">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#120B09] via-transparent to-transparent opacity-80" />

                  {product.isBestseller && (
                    <span className="absolute top-3 left-3 bg-[#C8102E] text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full shadow-md">
                      Bestseller
                    </span>
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[11px] text-[#E8C580] font-semibold uppercase tracking-wider block">
                      {product.categoryLabel}
                    </span>
                    <h3 className="text-lg font-bold text-[#FAF6EE] font-heading group-hover:text-[#E8C580] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-[#E0D0C1] line-clamp-2 mt-1 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#FAF6EE]/10 flex items-center justify-between">
                    <span className="text-base font-extrabold text-[#FAF6EE] font-heading tabular-nums">
                      ₹{product.price}
                    </span>

                    <button
                      onClick={() => onSelectProduct(product)}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-[#C8102E] hover:bg-[#a00c24] active:scale-95 transition-all shadow-md"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Customise</span>
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
