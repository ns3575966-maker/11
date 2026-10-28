import React, { useState } from 'react';
import { CartItem, CafeLocation } from '../types';
import { X, ShoppingBag, Plus, Minus, Trash2, CheckCircle, MapPin, Sparkles, ArrowRight } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  selectedStore: CafeLocation;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  selectedStore,
}) => {
  const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('pickup');
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
  const [orderConfirmed, setOrderConfirmed] = useState<boolean>(false);
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
  const gstTax = Math.round(subtotal * 0.05);
  const deliveryFee = orderType === 'delivery' ? 49 : 0;
  const grandTotal = subtotal + gstTax + deliveryFee;

  // Free Timbits reward threshold
  const freeThreshold = 500;
  const progressToFree = Math.min(100, Math.round((subtotal / freeThreshold) * 100));

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderConfirmed(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md bg-[#1D1310] border-l border-[#FAF6EE]/15 h-full flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-5 bg-[#120B09] border-b border-[#FAF6EE]/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#C8102E]" />
            <h2 className="text-lg font-bold text-[#FAF6EE] font-heading">Your Order Bag</h2>
            <span className="text-xs bg-[#2A1D17] text-[#E8C580] px-2 py-0.5 rounded-full font-bold">
              {cartItems.reduce((acc, i) => acc + i.quantity, 0)} Items
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#E0D0C1] hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Reward Progress Bar */}
        <div className="bg-[#2A1D17]/80 p-3.5 border-b border-[#FAF6EE]/10 text-xs text-[#E0D0C1]">
          <div className="flex justify-between font-medium mb-1.5">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#E8C580]" />
              {subtotal >= freeThreshold ? 'Free Timbits Unlocked!' : `Add ₹${freeThreshold - subtotal} for Free Timbits®`}
            </span>
            <span className="font-bold text-[#FAF6EE]">{progressToFree}%</span>
          </div>
          <div className="w-full h-2 bg-[#120B09] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#E8C580] to-[#C8102E] transition-all duration-300"
              style={{ width: `${progressToFree}%` }}
            />
          </div>
        </div>

        {/* Selected Cafe Pickup Summary */}
        <div className="px-5 py-3 bg-[#120B09]/60 border-b border-[#FAF6EE]/10 flex items-center justify-between text-xs text-[#E0D0C1]">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#C8102E]" />
            <span className="truncate max-w-[220px] font-medium text-[#FAF6EE]">
              {selectedStore.name}
            </span>
          </div>

          <div className="flex gap-1 bg-[#2A1D17] p-0.5 rounded-lg border border-[#FAF6EE]/10">
            <button
              onClick={() => setOrderType('pickup')}
              className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                orderType === 'pickup' ? 'bg-[#C8102E] text-white' : 'text-[#E0D0C1]'
              }`}
            >
              Pickup
            </button>
            <button
              onClick={() => setOrderType('delivery')}
              className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                orderType === 'delivery' ? 'bg-[#C8102E] text-white' : 'text-[#E0D0C1]'
              }`}
            >
              Delivery
            </button>
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <ShoppingBag className="w-12 h-12 text-[#E8C580]/40 stroke-[1.5]" />
              <h3 className="text-base font-bold text-[#FAF6EE] font-heading">Your bag is empty</h3>
              <p className="text-xs text-[#E0D0C1] max-w-xs">
                Explore our handcrafted coffee brews, fresh Timbits®, and bakery options to add items.
              </p>
            </div>
          ) : orderConfirmed ? (
            /* Order Receipt Screen */
            <div className="py-6 text-center space-y-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-2xl">
                <CheckCircle className="w-8 h-8" />
              </div>

              <h3 className="text-xl font-bold text-[#FAF6EE] font-heading">Order Confirmed!</h3>
              <p className="text-xs text-[#E0D0C1]">
                Thank you, <span className="text-[#FAF6EE] font-bold">{customerName || 'Coffee Lover'}</span>! Your order has been placed with <span className="text-[#FAF6EE] font-bold">{selectedStore.name}</span>.
              </p>

              <div className="p-4 glass-panel rounded-2xl border border-[#FAF6EE]/10 text-left text-xs space-y-2">
                <div className="flex justify-between border-b border-[#FAF6EE]/10 pb-2">
                  <span className="text-[#E0D0C1]">Order ID</span>
                  <span className="font-mono font-bold text-[#E8C580]">#TH-IN-{Math.floor(1000 + Math.random() * 9000)}</span>
                </div>
                <div className="flex justify-between border-b border-[#FAF6EE]/10 pb-2">
                  <span className="text-[#E0D0C1]">Fulfillment</span>
                  <span className="font-bold text-[#FAF6EE] capitalize">{orderType}</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-[#FAF6EE] pt-1">
                  <span>Paid Total</span>
                  <span>₹{grandTotal}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onClearCart();
                  setOrderConfirmed(false);
                  setIsCheckingOut(false);
                  onClose();
                }}
                className="w-full py-3 bg-[#C8102E] hover:bg-[#a00c24] text-white font-bold text-xs rounded-xl shadow-lg"
              >
                Done
              </button>
            </div>
          ) : isCheckingOut ? (
            /* Checkout Form Screen */
            <form onSubmit={handleCheckoutSubmit} className="space-y-4 animate-fadeIn">
              <h3 className="text-base font-bold text-[#FAF6EE] font-heading border-b border-[#FAF6EE]/10 pb-2">
                Guest Checkout Details
              </h3>

              <div className="space-y-1">
                <label className="text-xs text-[#E0D0C1] block">Your Name</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-[#120B09] border border-[#FAF6EE]/15 rounded-xl px-3 py-2 text-xs text-[#FAF6EE] focus:outline-none focus:border-[#C8102E]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-[#E0D0C1] block">Mobile Phone</label>
                <input
                  required
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full bg-[#120B09] border border-[#FAF6EE]/15 rounded-xl px-3 py-2 text-xs text-[#FAF6EE] focus:outline-none focus:border-[#C8102E]"
                />
              </div>

              <div className="p-3 bg-[#120B09] rounded-xl text-xs space-y-1 text-[#E0D0C1]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (5%)</span>
                  <span>₹{gstTax}</span>
                </div>
                {orderType === 'delivery' && (
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>₹{deliveryFee}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-sm text-[#FAF6EE] pt-2 border-t border-[#FAF6EE]/10">
                  <span>Total Payable</span>
                  <span>₹{grandTotal}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCheckingOut(false)}
                  className="flex-1 py-2.5 bg-[#2A1D17] text-[#FAF6EE] font-bold text-xs rounded-xl"
                >
                  Back
                </button>

                <button
                  type="submit"
                  className="flex-[2] py-2.5 bg-[#C8102E] hover:bg-[#a00c24] text-white font-bold text-xs rounded-xl shadow-lg"
                >
                  Confirm & Place Order
                </button>
              </div>
            </form>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.cartItemId}
                className="p-3.5 bg-[#120B09] border border-[#FAF6EE]/10 rounded-2xl flex gap-3 items-center justify-between"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded-xl shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-[#FAF6EE] truncate">{item.product.name}</h4>
                  <p className="text-[10px] text-[#E0D0C1] truncate">
                    {item.customization.size} • {item.customization.milk}
                  </p>
                  <span className="text-xs font-extrabold text-[#FAF6EE] tabular-nums block mt-1">
                    ₹{item.totalPrice}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 bg-[#2A1D17] p-1 rounded-lg">
                  <button
                    onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                    className="p-1 text-[#E0D0C1] hover:text-white"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-bold text-[#FAF6EE] px-1 tabular-nums">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                    className="p-1 text-[#E0D0C1] hover:text-white"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                <button
                  onClick={() => onRemoveItem(item.cartItemId)}
                  className="p-1.5 text-red-400 hover:text-red-300"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Bar */}
        {cartItems.length > 0 && !isCheckingOut && !orderConfirmed && (
          <div className="p-5 bg-[#120B09] border-t border-[#FAF6EE]/10 space-y-3">
            <div className="space-y-1 text-xs text-[#E0D0C1]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="tabular-nums font-medium">₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated GST (5%)</span>
                <span className="tabular-nums font-medium">₹{gstTax}</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-[#FAF6EE] pt-2 border-t border-[#FAF6EE]/10">
                <span>Total Amount</span>
                <span className="tabular-nums font-extrabold text-base">₹{grandTotal}</span>
              </div>
            </div>

            <button
              onClick={() => setIsCheckingOut(true)}
              className="w-full flex items-center justify-between px-6 py-3.5 bg-[#C8102E] hover:bg-[#a00c24] active:scale-95 text-white font-bold text-sm rounded-2xl shadow-xl transition-all"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
