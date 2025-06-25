"use client"

import React from 'react';
import { FoodItem, getFoodItemById } from '@/lib/food-database';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { X } from 'lucide-react';

interface FoodItemModalProps {
  item: FoodItem;
  onClose: () => void;
  onAddToCart: (item: FoodItem) => void;
  cartFeedback: { [key: number]: boolean };
  onViewDetails: (item: FoodItem) => void;
}

export const FoodItemModal: React.FC<FoodItemModalProps> = ({ item, onClose, onAddToCart, cartFeedback, onViewDetails }) => {
  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 animate-fade-in">
      <Card className="w-full max-w-md relative bg-background shadow-2xl border-primary/50 overflow-hidden">
        <Button onClick={onClose} variant="ghost" size="icon" className="absolute top-2 right-2 z-10 bg-background/50 hover:bg-background/80 rounded-full">
          <X className="w-5 h-5" />
        </Button>
        <CardContent className="p-0 max-h-[90vh] overflow-y-auto">
          <Image src={item.image} alt={item.name} width={500} height={300} className="rounded-t-lg object-cover w-full h-48" />
          <div className="p-6 space-y-4">
            <h3 className="text-2xl font-bold text-primary">{item.name}</h3>
            <p className="text-muted-foreground">{item.description}</p>
            <div className="flex flex-wrap gap-2">
              {item.vegetarian && <Badge variant="secondary">🌱 Vegetarian</Badge>}
              {item.spicy && <Badge variant="destructive">🌶️ Spicy</Badge>}
              <Badge variant="outline">🔥 {item.calories} Cal</Badge>
              <Badge variant="outline">⏰ {item.cookingTime}</Badge>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Ingredients:</h4>
              <p className="text-sm text-muted-foreground">{item.ingredients.join(', ')}</p>
            </div>
            {item.pairings && item.pairings.length > 0 && (
              <div className="mt-6">
                <h4 className="font-semibold mb-3 text-lg">Pairs Well With:</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {item.pairings.map(pairingId => {
                    const pairedItem = getFoodItemById(pairingId);
                    if (!pairedItem) return null;
                    return (
                      <div key={pairedItem.id} onClick={() => onViewDetails(pairedItem)} className="cursor-pointer border rounded-lg p-2 hover:bg-accent/80 transition-colors text-center shadow-sm">
                        <Image src={pairedItem.image} alt={pairedItem.name} width={100} height={80} className="rounded-md object-cover w-full h-20 mx-auto" />
                        <p className="text-sm font-medium mt-2">{pairedItem.name}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            <Button 
              onClick={() => onAddToCart(item)} 
              className={`w-full transition-colors duration-300 text-lg py-6 mt-6 ${cartFeedback[item.id] ? 'bg-green-600 hover:bg-green-700' : 'bg-primary'}`}
            >
              {cartFeedback[item.id] ? 'Added to Cart!' : `Add to Cart - $${item.price.toFixed(2)}`}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
