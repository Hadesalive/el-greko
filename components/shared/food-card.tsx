import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Clock, Users } from 'lucide-react';
import { FoodItem } from '@/lib/food-database';

interface FoodCardProps {
  food: FoodItem;
}

export const FoodCard = ({ food }: FoodCardProps) => {
  const formatPrice = (price: number) => {
    return `Le ${price.toLocaleString()}`;
  };

  return (
    <Card className="group overflow-hidden border-2 hover:border-primary/80 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-gradient-to-br from-background to-primary/10 shadow-lg h-full flex flex-col">
      <div className="relative overflow-hidden">
        <Image
          src={food.image || '/placeholder.svg'}
          alt={food.name}
          width={400}
          height={300}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {food.specialOffer && (
            <Badge className="bg-primary text-primary-foreground font-bold text-xs">Special Offer</Badge>
          )}
          {food.popular && (
             <Badge className="bg-yellow-500 text-black font-bold text-xs">⭐ Popular</Badge>
          )}
          {food.vegetarian && (
            <Badge className="bg-green-500 text-white font-bold text-xs">🌱 Vegetarian</Badge>
          )}
          {food.spicy && <Badge className="bg-orange-500 text-white font-bold text-xs">🌶️ Spicy</Badge>}
        </div>
        <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full text-sm flex items-center">
          <Star className="w-3 h-3 text-yellow-400 mr-1 fill-current" />
          {food.rating.toFixed(1)}
        </div>
        <div className="absolute bottom-3 left-3 text-4xl">{food.emoji}</div>
        {food.originalPrice && (
          <div className="absolute bottom-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
            SALE
          </div>
        )}
      </div>
      <CardContent className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
          <h3 className="text-lg font-bold mb-2 truncate group-hover:text-primary">{food.name}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">{food.description}</p>
        </div>
        <div className="mt-4 pt-4 border-t border-border/20">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1.5" />
                    {food.cookingTime}
                </div>
                <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1.5" />
                    {food.reviews} reviews
                </div>
            </div>
            <div className="flex items-baseline justify-end gap-2">
                {food.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                    {formatPrice(food.originalPrice)}
                    </span>
                )}
                <span className="text-2xl font-bold text-primary">
                    {formatPrice(food.price)}
                </span>
            </div>
        </div>
      </CardContent>
    </Card>
  );
};
