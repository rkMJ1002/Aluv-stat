"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  colorways: string[];
  primaryImage: string;
  galleryImages: string[];
  stockStatus: string;
  category: "camera" | "accessory";
  paypalLink: string;
  specsSummary: { [key: string]: string };
}

export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "aluvion-pocket-4k",
    name: "Aluvion Pocket 4K",
    slug: "pocket-4k",
    price: 27,
    description: "Compact 4K digital camera featuring a 48.0 megapixel sensor, 180-degree vertical flip display, 8X digital zoom, and a 140-gram lightweight chassis. Includes complete accessory starter kit.",
    colorways: ["Pearl White", "Blush Pink", "Obsidian Black"],
    primaryImage: "/assets/camera-real-white.jpg",
    galleryImages: [
      "/assets/camera-real-white.jpg",
      "/assets/camera-real-pink.jpg",
      "/assets/camera-real-black.jpg",
    ],
    stockStatus: "In Stock: Ready to dispatch",
    category: "camera",
    paypalLink: "https://www.paypal.com/ncp/payment/ZA4JPKKV2GVFY",
    specsSummary: {
      "Video Resolution": "4K Ultra HD",
      "Photo Resolution": "48.0 Megapixels",
      "Optical Formula": "F=2.8mm fixed focal length",
      "Display Screen": "2.4-inch IPS with 180-degree flip hinge",
      "Weight": "140 grams with battery",
      "Battery Pack": "1000 mAh rechargeable Li-Ion",
      "Storage": "MicroSD slot (supports up to 128GB)",
    },
  },
  {
    id: "microsd-128gb",
    name: "High-Speed 128GB MicroSD Card",
    slug: "microsd-128gb",
    price: 29,
    description: "High-speed Class 10 U3 MicroSDXC expansion card tested for continuous 4K Ultra HD video capture and high-frame-rate storage.",
    colorways: ["Standard"],
    primaryImage: "/assets/accessory-card.svg",
    galleryImages: ["/assets/accessory-card.svg"],
    stockStatus: "In Stock: Ready to dispatch",
    category: "accessory",
    paypalLink: "https://www.paypal.com/ncp/payment/SD128GB",
    specsSummary: {
      "Capacity": "128 Gigabytes",
      "Speed Rating": "Class 10, UHS-I Speed Class 3 (U3)",
      "Format": "MicroSDXC",
      "Compatibility": "Aluvion Pocket 4K and USB readers",
    },
  },
  {
    id: "battery-dual-pack",
    name: "Dual 1000mAh Battery Kit with Charger",
    slug: "battery-dual-pack",
    price: 24,
    description: "Two auxiliary 1000mAh rechargeable Lithium-Ion battery packs accompanied by a dual-slot fast charger powered via USB Type-C.",
    colorways: ["Matte Black"],
    primaryImage: "/assets/accessory-battery.svg",
    galleryImages: ["/assets/accessory-battery.svg"],
    stockStatus: "In Stock: Ready to dispatch",
    category: "accessory",
    paypalLink: "https://www.paypal.com/ncp/payment/BATTERYPACK",
    specsSummary: {
      "Capacity": "2x 1000 mAh Lithium-Ion",
      "Charge Port": "USB Type-C input",
      "Charge Duration": "90 minutes for dual pack",
    },
  },
  {
    id: "protective-travel-case",
    name: "Rigid Form-Fit Travel Case",
    slug: "protective-travel-case",
    price: 19,
    description: "Impact-resistant ballistic shell with custom laser-cut EVA foam compartments sized precisely for the camera body, cables, and spare cards.",
    colorways: ["Slate Graphite"],
    primaryImage: "/assets/accessory-case.svg",
    galleryImages: ["/assets/accessory-case.svg"],
    stockStatus: "In Stock: Ready to dispatch",
    category: "accessory",
    paypalLink: "https://www.paypal.com/ncp/payment/CASE4K",
    specsSummary: {
      "Shell Material": "Reinforced ballistic nylon",
      "Dimensions": "150 x 100 x 45 mm",
      "Weight": "85 grams",
    },
  },
];

interface ProductContextType {
  products: Product[];
  getProductBySlug: (slug: string) => Product | undefined;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  resetToDefaults: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(DEFAULT_PRODUCTS);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("aluvion_products");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const sanitized = parsed.map((p: Product) => {
            if (p.id === "aluvion-pocket-4k" || p.slug === "pocket-4k") {
              return {
                ...p,
                price: 27,
                primaryImage: "/assets/camera-real-white.jpg",
                galleryImages: [
                  "/assets/camera-real-white.jpg",
                  "/assets/camera-real-pink.jpg",
                  "/assets/camera-real-black.jpg",
                ],
              };
            }
            return p;
          });
          setProducts(sanitized);
          localStorage.setItem("aluvion_products", JSON.stringify(sanitized));
        }
      }
    } catch {
      // Keep defaults on error
    }
    setInitialized(true);
  }, []);

  const saveProducts = (updated: Product[]) => {
    setProducts(updated);
    try {
      localStorage.setItem("aluvion_products", JSON.stringify(updated));
    } catch {
      // Ignore storage errors
    }
  };

  const getProductBySlug = (slug: string) => {
    return products.find((p) => p.slug === slug || p.id === slug);
  };

  const addProduct = (product: Product) => {
    const updated = [...products, product];
    saveProducts(updated);
  };

  const updateProduct = (product: Product) => {
    const updated = products.map((p) => (p.id === product.id ? product : p));
    saveProducts(updated);
  };

  const deleteProduct = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    saveProducts(updated);
  };

  const resetToDefaults = () => {
    saveProducts(DEFAULT_PRODUCTS);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        getProductBySlug,
        addProduct,
        updateProduct,
        deleteProduct,
        resetToDefaults,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
}
