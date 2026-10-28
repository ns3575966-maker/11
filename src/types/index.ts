export type ProductCategory = 
  | 'all' 
  | 'hot-beverages' 
  | 'cold-beverages' 
  | 'timbits-donuts' 
  | 'bakery-food' 
  | 'desserts';

export interface ProductCustomizationOptions {
  size?: 'Small' | 'Medium' | 'Large';
  milk?: 'Whole Milk' | 'Skimmed Milk' | 'Oat Milk (+₹40)' | 'Almond Milk (+₹40)';
  sweetness?: '0% Sugar' | '50% Medium' | '100% Standard' | 'Extra Sweet';
  temperature?: 'Hot' | 'Iced';
  extraShot?: boolean;
  whippedCream?: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  description: string;
  longDescription?: string;
  price: number;
  calories: number;
  isBestseller?: boolean;
  isVeg?: boolean;
  isNew?: boolean;
  rating: number;
  reviewCount: number;
  image: string;
  flavorNotes?: string[];
  defaultCustomization?: ProductCustomizationOptions;
}

export interface CartItem {
  cartItemId: string;
  product: Product;
  quantity: number;
  customization: ProductCustomizationOptions;
  totalPrice: number;
}

export interface CafeLocation {
  id: string;
  name: string;
  city: string;
  area: string;
  address: string;
  distanceKm: number;
  openingHours: string;
  isOpen24Hours?: boolean;
  phone: string;
  amenities: ('Drive-Thru' | 'WiFi' | 'Outdoor Seating' | 'Pet Friendly' | '24/7')[];
  mapCoords: { x: number; y: number }; // Percentage relative coords on custom map
  googleMapsQuery: string;
}
