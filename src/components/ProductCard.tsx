import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Star, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  tags: string[];
  description: string;
  brand: string;
  rating: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
  confidence: number;
  reasoning: string;
  index: number;
}

const productImages: Record<string, string> = {
  cookies: "🍪",
  "energy-bites": "🥜",
  "oat-bars": "🌾",
  makhana: "🌸",
  "ragi-cookies": "🍘",
  "almond-butter": "🥛",
  "trail-mix": "🥗",
  "turmeric-latte": "☕",
  kurta: "👔",
  tee: "👕",
  palazzo: "👖",
  jacket: "🧥",
  joggers: "🩳",
  saree: "👗",
  "crop-top": "👚",
  chinos: "👖",
};

export function ProductCard({ product, confidence, reasoning, index }: ProductCardProps) {
  const getConfidenceColor = (conf: number) => {
    if (conf >= 90) return "from-teal to-teal-light";
    if (conf >= 80) return "from-teal-light to-accent";
    return "from-accent to-muted-foreground";
  };

  return (
    <Card 
      className={cn(
        "group relative overflow-hidden border-none shadow-card transition-all duration-300 hover:shadow-elevated hover:-translate-y-1",
        "animate-message-in"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Confidence Badge */}
      <div className="absolute top-3 right-3 z-10">
        <div 
          className={cn(
            "match-indicator px-3 py-1.5 rounded-full text-xs font-semibold text-primary-foreground bg-gradient-to-r",
            getConfidenceColor(confidence)
          )}
        >
          {confidence}% Match
        </div>
      </div>

      <div className="p-5">
        {/* Product Image Placeholder */}
        <div className="relative mb-4 aspect-square w-20 mx-auto rounded-xl bg-secondary flex items-center justify-center text-4xl">
          {productImages[product.image] || "📦"}
        </div>

        {/* Brand */}
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
          {product.brand}
        </p>

        {/* Product Name */}
        <h3 className="font-display text-lg font-semibold text-foreground mb-2 leading-tight">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <Star className="w-3.5 h-3.5 fill-gold text-gold" />
          <span className="text-sm font-medium text-foreground">{product.rating}</span>
        </div>

        {/* Price */}
        <div className="mb-4">
          <span className="text-2xl font-bold text-primary">₹{product.price}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.tags.slice(0, 3).map((tag) => (
            <Badge 
              key={tag} 
              variant="secondary" 
              className="text-xs font-normal bg-secondary/80 text-secondary-foreground"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Reasoning */}
        <div className="p-3 rounded-lg bg-accent/5 border border-accent/10">
          <p className="text-xs font-medium text-accent mb-1">Why it's perfect:</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {reasoning}
          </p>
        </div>

        {/* CTA */}
        <Button 
          className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
          size="sm"
        >
          <ShoppingBag className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </Card>
  );
}
