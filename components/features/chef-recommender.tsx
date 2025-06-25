"use client"

import React, { useState, useEffect } from 'react';
import { ChefHat, Search, Sparkles, Star, X } from 'lucide-react';
import { FoodItemModal } from '@/components/shared/food-item-modal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { FoodItem, recommendFoods, RecommendationFilters } from '@/lib/food-database';

import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

interface ChefRecommenderProps {
  onViewDetails: (item: FoodItem) => void;
}

export const ChefRecommender: React.FC<ChefRecommenderProps> = ({ onViewDetails }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<FoodItem[]>([]);
  const [searched, setSearched] = useState(false);
  
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [filters, setFilters] = useState<RecommendationFilters>({});


  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    handleSearch();
  }, [query, filters]);

  const handleSearch = () => {
    const recommended = recommendFoods(query, filters);
    setResults(recommended);
    setSearched(true);
  };

  

    const handleFilterToggle = (filter: keyof RecommendationFilters) => {
    setFilters(prev => ({ ...prev, [filter]: !prev[filter] }));
  };

  

  const toggleRecommender = () => {
    setIsOpen(!isOpen);
    setQuery('');
    setResults([]);
    setSearched(false);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        <div className="bg-transparent px-2 hidden md:block">
          <p className="font-playfair text-2xl text-primary/70 italic opacity-90">Ask the Chef</p>
        </div>
        <Button
          onClick={toggleRecommender}
          className="rounded-full w-16 h-16 bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 flex items-center justify-center animate-pulse-subtle"
        >
          {isOpen ? <X className="w-8 h-8" /> : <span className="text-4xl">👨‍🍳</span>}
        </Button>
      </div>

      {isOpen && (
        <div className={`fixed inset-0 bg-black/60 z-40 flex justify-center p-4 ${isMobile && isInputFocused ? 'items-start pt-4' : 'items-center'}`}>
          <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-background border-2 border-primary/50 shadow-2xl animate-fade-in-up">
            <CardHeader>
              <CardTitle className="text-center text-2xl font-bold text-primary flex items-center justify-center gap-2">
                <ChefHat className="w-7 h-7" />
                Chef's Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-center text-muted-foreground">
                Tell me what you're in the mood for, and I'll suggest a dish!
              </p>
                            <div>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="e.g., 'something spicy and grilled'"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                    className="flex-grow"
                  />
                </div>
                <div className="flex gap-2 justify-center pt-3">
                  <Button size="sm" variant={filters.isVegetarian ? 'default' : 'outline'} onClick={() => handleFilterToggle('isVegetarian')}>🌱 Vegetarian</Button>
                  <Button size="sm" variant={filters.isSpicy ? 'default' : 'outline'} onClick={() => handleFilterToggle('isSpicy')}>🌶️ Spicy</Button>
                  <Button size="sm" variant={filters.isPopular ? 'default' : 'outline'} onClick={() => handleFilterToggle('isPopular')}>⭐ Popular</Button>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                {searched && results.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">I couldn't find any matches. Try a different search or filter!</p>
                )}
                {results.map((item) => (
                                    <div key={item.id} className="flex gap-4 items-center border p-2 rounded-lg transition-colors hover:bg-accent/50 cursor-pointer" onClick={() => onViewDetails(item)}>
                      <Image src={item.image} alt={item.name} width={80} height={80} className="rounded-md object-cover flex-shrink-0" />
                      <div className="flex-grow">
                        <h4 className="font-bold text-base">{item.name}</h4>
                        <div className="flex items-center gap-1.5 mt-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-sm font-bold">{item.rating.toFixed(1)}</span>
                          <span className="text-xs text-muted-foreground">({item.reviews} reviews)</span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{item.description}</p>
                      </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

    </>
  );
}
