import { ChatInterface } from "@/components/ChatInterface";
import { ShoppingBag, Sparkles, Heart } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center shadow-glow">
              <ShoppingBag className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold text-foreground">
                ShopSmart
              </h1>
              <p className="text-xs text-muted-foreground">AI Shopping Assistant</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>Powered by AI</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto flex flex-col">
        <ChatInterface />
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-3">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
            Made with <Heart className="w-3 h-3 text-primary fill-primary" /> for Indian D2C brands
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
