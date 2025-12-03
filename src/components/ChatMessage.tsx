import { cn } from "@/lib/utils";
import { ProductCard } from "./ProductCard";
import { Bot, User } from "lucide-react";

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

interface Recommendation {
  product: Product;
  confidence: number;
  reasoning: string;
}

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  recommendations?: Recommendation[];
  isLoading?: boolean;
}

export function ChatMessage({ role, content, recommendations, isLoading }: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div
      className={cn(
        "flex gap-3 animate-message-in",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center",
          isUser 
            ? "bg-primary text-primary-foreground" 
            : "bg-accent text-accent-foreground"
        )}
      >
        {isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
      </div>

      {/* Message Content */}
      <div className={cn("flex flex-col gap-3 max-w-[85%]", isUser ? "items-end" : "items-start")}>
        {/* Text Bubble */}
        <div
          className={cn(
            "px-4 py-3 rounded-2xl",
            isUser
              ? "bg-primary text-primary-foreground rounded-br-md"
              : "bg-card shadow-card border border-border rounded-bl-md"
          )}
        >
          {isLoading ? (
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-current animate-typing" style={{ animationDelay: "0ms" }} />
              <span className="w-2 h-2 rounded-full bg-current animate-typing" style={{ animationDelay: "200ms" }} />
              <span className="w-2 h-2 rounded-full bg-current animate-typing" style={{ animationDelay: "400ms" }} />
            </div>
          ) : (
            <p className={cn("text-sm leading-relaxed", isUser ? "text-primary-foreground" : "text-foreground")}>
              {content}
            </p>
          )}
        </div>

        {/* Product Recommendations Grid */}
        {recommendations && recommendations.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            {recommendations.map((rec, index) => (
              <ProductCard
                key={rec.product.id}
                product={rec.product}
                confidence={rec.confidence}
                reasoning={rec.reasoning}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
