import React, { useState } from 'react';
import { DisclaimerBanner } from './components/DisclaimerBanner';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturedSection } from './components/FeaturedSection';
import { BakerySection } from './components/BakerySection';
import { MenuSection } from './components/MenuSection';
import { StorySection } from './components/StorySection';
import { CafeLocatorSection } from './components/CafeLocatorSection';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';

import { Product, ProductCustomizationOptions, CartItem, CafeLocation } from './types';
import { CAFES } from './data/cafes';
import { ShoppingBag, MapPin } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  
  // Customizer Modal State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Cart / Order Bag State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Selected Store State
  const [selectedStore, setSelectedStore] = useState<CafeLocation>(CAFES[0]);

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleAddToCart = (
    product: Product,
    quantity: number,
    customization: ProductCustomizationOptions,
    totalPrice: number
  ) => {
    const cartItemId = `${product.id}-${customization.size}-${customization.milk}-${customization.sweetness}-${customization.extraShot ? 'shot' : ''}-${customization.whippedCream ? 'cream' : ''}`;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.cartItemId === cartItemId
            ? {
                ...item,
                quantity: item.quantity + quantity,
                totalPrice: item.totalPrice + totalPrice,
              }
            : item
        );
      }
      return [
        ...prev,
        {
          cartItemId,
          product,
          quantity,
          customization,
          totalPrice,
        },
      ];
    });

    showToast(`Added ${quantity}x ${product.name} to your Order Bag!`);
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.cartItemId === cartItemId) {
          const unitPrice = item.totalPrice / item.quantity;
          return {
            ...item,
            quantity: newQty,
            totalPrice: unitPrice * newQty,
          };
        }
        return item;
      })
    );
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#120B09] text-[#FAF6EE]">
      
      {/* Top Independent Redesign Banner */}
      <DisclaimerBanner />

      {/* Main Top Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Main Experience Body */}
      <main className="flex-1">
        
        {/* 1. Cinematic 3D Hero Section */}
        <HeroSection
          onExploreMenu={() => handleNavigate('menu')}
          onFindCafe={() => handleNavigate('cafes')}
        />

        {/* 2. Featured Coffee & Drinks */}
        <FeaturedSection
          onSelectProduct={(product) => setSelectedProduct(product)}
        />

        {/* 3. Bakery & Timbits Section */}
        <BakerySection
          onSelectProduct={(product) => setSelectedProduct(product)}
        />

        {/* 4. Full Interactive Digital Menu */}
        <MenuSection
          onSelectProduct={(product) => setSelectedProduct(product)}
        />

        {/* 5. Brand Story & Craft */}
        <StorySection />

        {/* 6. Find a Cafe / Store Locator */}
        <CafeLocatorSection
          onSelectStore={(store) => {
            setSelectedStore(store);
            showToast(`Selected Store: ${store.name}`);
          }}
          selectedStoreId={selectedStore.id}
        />

      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Customizer Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Order Bag Slide-Out Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        selectedStore={selectedStore}
      />

      {/* Mobile Sticky Order Bag Bar */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-30 flex gap-2 max-h-[12vh]">
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex-1 flex items-center justify-between px-5 py-3 bg-[#C8102E] text-white font-bold text-xs rounded-2xl shadow-2xl border border-white/20 active:scale-95 transition-all"
        >
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4" />
            <span>View Order Bag</span>
          </div>
          {totalCartCount > 0 && (
            <span className="bg-white text-[#C8102E] font-black px-2 py-0.5 rounded-full text-xs">
              {totalCartCount}
            </span>
          )}
        </button>

        <button
          onClick={() => handleNavigate('cafes')}
          className="p-3 bg-[#2A1D17] text-[#FAF6EE] border border-[#FAF6EE]/15 rounded-2xl shadow-2xl active:scale-95 transition-all flex items-center justify-center"
          aria-label="Find Cafe"
        >
          <MapPin className="w-5 h-5 text-[#C8102E]" />
        </button>
      </div>

      {/* Toast Popup Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-[#C8102E] text-white px-4 py-2.5 rounded-2xl font-bold text-xs shadow-2xl border border-white/20 animate-bounce">
          {toastMessage}
        </div>
      )}

    </div>
  );
}
