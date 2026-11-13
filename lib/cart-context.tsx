'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { Product } from './products';

export type CartLine = {
  variantId: string;
  handle: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

export type AppliedDiscount = {
  code: string;
  percentage: number;
};

type CartContextValue = {
  lines: CartLine[];
  isOpen: boolean;
  itemCount: number;
  subtotal: number;
  appliedDiscount: AppliedDiscount | null;
  discountAmount: number;
  total: number;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, quantity?: number) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  removeItem: (variantId: string) => void;
  applyDiscountCode: (code: string) => Promise<{ ok: boolean; error?: string }>;
  removeDiscount: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = 'brr-cart';
const DISCOUNT_STORAGE_KEY = 'brr-discount';

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [appliedDiscount, setAppliedDiscount] = useState<AppliedDiscount | null>(null);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setLines(JSON.parse(raw));
      } catch {
        // ignore malformed cart data
      }
    }
    const rawDiscount = window.localStorage.getItem(DISCOUNT_STORAGE_KEY);
    if (rawDiscount) {
      try {
        setAppliedDiscount(JSON.parse(rawDiscount));
      } catch {
        // ignore malformed discount data
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    if (appliedDiscount) {
      window.localStorage.setItem(DISCOUNT_STORAGE_KEY, JSON.stringify(appliedDiscount));
    } else {
      window.localStorage.removeItem(DISCOUNT_STORAGE_KEY);
    }
  }, [appliedDiscount, hydrated]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback((product: Product, quantity = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.variantId === product.variantId);
      if (existing) {
        return prev.map((l) =>
          l.variantId === product.variantId ? { ...l, quantity: l.quantity + quantity } : l
        );
      }
      return [
        ...prev,
        {
          variantId: product.variantId,
          handle: product.handle,
          title: product.title,
          price: product.price,
          image: product.image,
          quantity,
        },
      ];
    });
    setIsOpen(true);
  }, []);

  const updateQuantity = useCallback((variantId: string, quantity: number) => {
    setLines((prev) => {
      if (quantity <= 0) {
        return prev.filter((l) => l.variantId !== variantId);
      }
      return prev.map((l) => (l.variantId === variantId ? { ...l, quantity } : l));
    });
  }, []);

  const removeItem = useCallback((variantId: string) => {
    setLines((prev) => prev.filter((l) => l.variantId !== variantId));
  }, []);

  const applyDiscountCode = useCallback(async (code: string) => {
    try {
      const response = await fetch('/api/discounts/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      const data = await response.json();
      if (!data.ok) {
        return { ok: false, error: data.error ?? 'Código inválido.' };
      }
      setAppliedDiscount({ code: data.code, percentage: data.percentage });
      return { ok: true };
    } catch {
      return { ok: false, error: 'No se pudo validar el código. Intenta nuevamente.' };
    }
  }, []);

  const removeDiscount = useCallback(() => setAppliedDiscount(null), []);

  const itemCount = useMemo(() => lines.reduce((sum, l) => sum + l.quantity, 0), [lines]);
  const subtotal = useMemo(() => lines.reduce((sum, l) => sum + l.price * l.quantity, 0), [lines]);
  const discountAmount = useMemo(
    () => (appliedDiscount ? Math.round((subtotal * appliedDiscount.percentage) / 100) : 0),
    [subtotal, appliedDiscount]
  );
  const total = subtotal - discountAmount;

  const value: CartContextValue = {
    lines,
    isOpen,
    itemCount,
    subtotal,
    appliedDiscount,
    discountAmount,
    total,
    openCart,
    closeCart,
    addItem,
    updateQuantity,
    removeItem,
    applyDiscountCode,
    removeDiscount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
