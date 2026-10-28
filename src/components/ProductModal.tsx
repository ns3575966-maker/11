import React, { useState } from 'react';
import { Product, ProductCustomizationOptions } from '../types';
import { X, Plus, Minus, Check, ShoppingBag, Flame, Sparkles } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (
    product: Product,
    quantity: number,
    customization: ProductCustomizationOptions,
    totalPrice: number
  ) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState<'Small' | 'Medium' | 'Large'>(
    product.defaultCustomization?.size || 'Medium'
  );
  const [milk, setMilk] = useState<
    'Whole Milk' | 'Skimmed Milk' | 'Oat Milk (+₹40)' | 'Almond Milk (+₹40)'
  >(product.defaultCustomization?.milk || 'Whole Milk');
  const [sweetness, setSweetness] = useState<
    '0% Sugar' | '50% Medium' | '100% Standard' | 'Extra Sweet'
  >(product.defaultCustomization?.sweetness || '100% Standard');
  const [extraShot, setExtraShot] = useState<boolean>(
    product.defaultCustomization?.extraShot || false
  );
  const [whippedCream, setWhippedCream] = useState<boolean>(
    product.defaultCustomization?.whippedCream || false
  );

  // Price Calculation
  let basePrice = product.price;
  if (size === 'Large') basePrice += 50;
  if (size === 'Small') basePrice -= 20;
  if (milk.includes('+₹40')) basePrice += 40;
  if (extraShot) basePrice += 50;
  if (whippedCream) basePrice += 30;

  const totalPrice = basePrice * quantity;

  const handleAdd = () => {
    onAddToCart(product, quantity, { size, milk, sweetness, extraShot, whippedCream }, totalPrice);
    onClose();
  };

  const isBeverage = product.category === 'hot-beverages' || product.category === 'cold-beverages';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#1D1310] border border-[#FAF6EE]/15 rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="relative h-48 sm:h-56 overflow-hidden bg-[#120B09]">
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1D1310] via-[#1D1310]/40 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-[#120B09]/80 text-[#FAF6EE] hover:text-white hover:bg-[#C8102E] rounded-full border border-[#FAF6EE]/15 transition-all"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <span className="text-xs text-[#E8C580] uppercase tracking-wider font-semibold">
              {product.categoryLabel}
            </span>
            <h2 className="text-2xl font-bold text-[#FAF6EE] font-heading">{product.name}</h2>
          </div>
        </div>

        {/* Scrollable Customization Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-[#E0D0C1]">
          <p className="text-xs sm:text-sm leading-relaxed">{product.longDescription || product.description}</p>

          {isBeverage && (
            <>
              {/* Size Selector */}
              <div className="space-y-2">
                <label className="font-semibold text-[#FAF6EE] block">Select Size</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['Small', 'Medium', 'Large'] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all ${
                        size === s
                          ? 'bg-[#C8102E] text-white border-[#C8102E] shadow-md'
                          : 'bg-[#120B09]/60 text-[#E0D0C1] border-[#FAF6EE]/10 hover:border-[#FAF6EE]/30'
                      }`}
                    >
                      {s} {s === 'Large' ? '(+₹50)' : s === 'Small' ? '(-₹20)' : ''}
                    </button>
                  ))}
                </div>
              </div>

              {/* Milk Option */}
              <div className="space-y-2">
                <label className="font-semibold text-[#FAF6EE] block">Milk Preference</label>
                <div className="grid grid-cols-2 gap-2">
                  {(
                    [
                      'Whole Milk',
                      'Skimmed Milk',
                      'Oat Milk (+₹40)',
                      'Almond Milk (+₹40)',
                    ] as const
                  ).map((m) => (
                    <button
                      key={m}
                      onClick={() => setMilk(m)}
                      className={`py-2 px-3 rounded-xl border text-xs font-medium text-left transition-all ${
                        milk === m
                          ? 'bg-[#2A1D17] text-[#E8C580] border-[#E8C580]'
                          : 'bg-[#120B09]/60 text-[#E0D0C1] border-[#FAF6EE]/10 hover:border-[#FAF6EE]/30'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sweetness */}
              <div className="space-y-2">
                <label className="font-semibold text-[#FAF6EE] block">Sweetness Level</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(['0% Sugar', '50% Medium', '100% Standard', 'Extra Sweet'] as const).map(
                    (sw) => (
                      <button
                        key={sw}
                        onClick={() => setSweetness(sw)}
                        className={`py-2 px-2.5 rounded-xl border text-[11px] font-medium transition-all ${
                          sweetness === sw
                            ? 'bg-[#2A1D17] text-[#FAF6EE] border-[#C8102E]'
                            : 'bg-[#120B09]/60 text-[#E0D0C1] border-[#FAF6EE]/10'
                        }`}
                      >
                        {sw}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Add-ons */}
              <div className="space-y-2 pt-2 border-t border-[#FAF6EE]/10">
                <label className="font-semibold text-[#FAF6EE] block">Add-ons</label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setExtraShot(!extraShot)}
                    className={`flex-1 p-3 rounded-xl border flex items-center justify-between text-xs transition-all ${
                      extraShot
                        ? 'bg-[#2A1D17] border-[#C8102E] text-[#FAF6EE]'
                        : 'bg-[#120B09]/60 border-[#FAF6EE]/10 text-[#E0D0C1]'
                    }`}
                  >
                    <span>Extra Espresso Shot (+₹50)</span>
                    {extraShot && <Check className="w-4 h-4 text-[#C8102E]" />}
                  </button>

                  <button
                    onClick={() => setWhippedCream(!whippedCream)}
                    className={`flex-1 p-3 rounded-xl border flex items-center justify-between text-xs transition-all ${
                      whippedCream
                        ? 'bg-[#2A1D17] border-[#C8102E] text-[#FAF6EE]'
                        : 'bg-[#120B09]/60 border-[#FAF6EE]/10 text-[#E0D0C1]'
                    }`}
                  >
                    <span>Whipped Cream Swirl (+₹30)</span>
                    {whippedCream && <Check className="w-4 h-4 text-[#C8102E]" />}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Action Bar */}
        <div className="p-6 bg-[#120B09] border-t border-[#FAF6EE]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Quantity Counter */}
          <div className="flex items-center gap-3 bg-[#2A1D17] p-1.5 rounded-xl border border-[#FAF6EE]/10">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-1.5 hover:bg-[#3B2A23] text-[#FAF6EE] rounded-lg transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-bold text-base text-[#FAF6EE] w-6 text-center tabular-nums">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-1.5 hover:bg-[#3B2A23] text-[#FAF6EE] rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Order Button */}
          <button
            onClick={handleAdd}
            className="w-full sm:w-auto flex-1 flex items-center justify-between gap-4 px-6 py-3.5 bg-[#C8102E] hover:bg-[#a00c24] active:scale-95 text-white font-bold text-sm rounded-2xl shadow-xl transition-all"
          >
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Order Bag</span>
            </div>
            <span className="text-base font-extrabold tabular-nums">₹{totalPrice}</span>
          </button>

        </div>

      </div>
    </div>
  );
};
