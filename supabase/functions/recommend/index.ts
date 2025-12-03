import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Sample product catalog - Indian D2C food and fashion brands
const productCatalog = {
  food: [
    {
      id: "f1",
      name: "Plant-Based Protein Cookies",
      price: 299,
      category: "snacks",
      tags: ["vegan", "gluten-free", "high-protein", "healthy"],
      description: "Delicious gluten-free cookies with 12g plant protein per serving",
      brand: "NutriCrunch",
      rating: 4.5,
      image: "cookies"
    },
    {
      id: "f2",
      name: "Quinoa Energy Bites",
      price: 249,
      category: "snacks",
      tags: ["vegan", "superfood", "natural", "dates", "coconut"],
      description: "Vegan superfood snacks with natural sweetness from dates and coconut",
      brand: "GreenBites",
      rating: 4.3,
      image: "energy-bites"
    },
    {
      id: "f3",
      name: "Oats & Chia Seed Bars",
      price: 349,
      category: "breakfast",
      tags: ["protein-rich", "fiber", "oats", "chia", "morning"],
      description: "15g plant protein per serving, perfect for active lifestyles",
      brand: "MorningFuel",
      rating: 4.6,
      image: "oat-bars"
    },
    {
      id: "f4",
      name: "Masala Makhana",
      price: 199,
      category: "snacks",
      tags: ["vegetarian", "low-calorie", "indian", "roasted"],
      description: "Crunchy roasted lotus seeds with authentic Indian spices",
      brand: "DesiMunch",
      rating: 4.4,
      image: "makhana"
    },
    {
      id: "f5",
      name: "Organic Ragi Cookies",
      price: 275,
      category: "snacks",
      tags: ["organic", "millet", "calcium-rich", "kids-friendly"],
      description: "Nutritious finger millet cookies, rich in calcium",
      brand: "MilletMagic",
      rating: 4.2,
      image: "ragi-cookies"
    },
    {
      id: "f6",
      name: "Cold-Pressed Almond Butter",
      price: 450,
      category: "spreads",
      tags: ["protein-rich", "no-sugar", "keto-friendly", "breakfast"],
      description: "Pure almonds, no additives. Perfect protein boost",
      brand: "NutButter Co",
      rating: 4.7,
      image: "almond-butter"
    },
    {
      id: "f7",
      name: "Mixed Dry Fruit Trail Mix",
      price: 399,
      category: "snacks",
      tags: ["healthy", "energy", "nuts", "dried-fruits"],
      description: "Premium mix of almonds, cashews, raisins, and cranberries",
      brand: "TrailBlaze",
      rating: 4.5,
      image: "trail-mix"
    },
    {
      id: "f8",
      name: "Turmeric Latte Mix",
      price: 325,
      category: "beverages",
      tags: ["immunity", "ayurvedic", "golden-milk", "wellness"],
      description: "Traditional haldi doodh mix with premium spices",
      brand: "AyurVeda Essentials",
      rating: 4.4,
      image: "turmeric-latte"
    }
  ],
  fashion: [
    {
      id: "w1",
      name: "Handblock Print Kurta",
      price: 1499,
      category: "ethnic",
      tags: ["cotton", "summer", "light", "traditional", "casual"],
      description: "100% cotton kurta with authentic handblock prints, keeps you cool",
      brand: "FabIndia",
      rating: 4.6,
      image: "kurta"
    },
    {
      id: "w2",
      name: "Oversized Cotton Tee",
      price: 799,
      category: "casual",
      tags: ["trendy", "cotton", "casual", "streetwear", "unisex"],
      description: "Premium cotton oversized fit, perfect for casual outings",
      brand: "UrbanStreet",
      rating: 4.4,
      image: "tee"
    },
    {
      id: "w3",
      name: "Linen Palazzo Pants",
      price: 1199,
      category: "bottoms",
      tags: ["linen", "summer", "comfortable", "breathable"],
      description: "Breezy linen palazzos for effortless summer style",
      brand: "ComfortWear",
      rating: 4.5,
      image: "palazzo"
    },
    {
      id: "w4",
      name: "Embroidered Jacket",
      price: 2499,
      category: "outerwear",
      tags: ["festive", "embroidery", "ethnic", "party"],
      description: "Stunning embroidered jacket for festive occasions",
      brand: "EthnicLux",
      rating: 4.7,
      image: "jacket"
    },
    {
      id: "w5",
      name: "Denim Joggers",
      price: 999,
      category: "bottoms",
      tags: ["casual", "comfortable", "trendy", "streetwear"],
      description: "Comfortable denim joggers with modern fit",
      brand: "DenimCo",
      rating: 4.3,
      image: "joggers"
    },
    {
      id: "w6",
      name: "Silk Blend Saree",
      price: 3499,
      category: "ethnic",
      tags: ["festive", "wedding", "silk", "traditional", "elegant"],
      description: "Elegant silk blend saree with contemporary design",
      brand: "SilkRoutes",
      rating: 4.8,
      image: "saree"
    },
    {
      id: "w7",
      name: "Printed Crop Top",
      price: 599,
      category: "tops",
      tags: ["trendy", "summer", "casual", "youth"],
      description: "Vibrant printed crop top for summer vibes",
      brand: "TrendSetters",
      rating: 4.2,
      image: "crop-top"
    },
    {
      id: "w8",
      name: "Cotton Chinos",
      price: 1299,
      category: "bottoms",
      tags: ["formal", "casual", "cotton", "versatile", "office"],
      description: "Versatile cotton chinos for work and weekend",
      brand: "ClassicFit",
      rating: 4.5,
      image: "chinos"
    }
  ]
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are a personalized shopping assistant for Indian D2C brands specializing in food and fashion. Your role is to understand user preferences and recommend products with clear reasoning.

PRODUCT CATALOG:
${JSON.stringify(productCatalog, null, 2)}

INSTRUCTIONS:
1. Analyze the user's query to extract: dietary preferences, budget (in ₹), style preferences, occasion, and any other constraints
2. Match products from the catalog based on these preferences
3. Calculate a confidence score (0-100) based on how well each product matches
4. Provide personalized reasoning for each recommendation

RESPONSE FORMAT:
Return a JSON object with this exact structure:
{
  "recommendations": [
    {
      "product": {<full product object from catalog>},
      "confidence": <number 0-100>,
      "reasoning": "<personalized explanation why this product is perfect for the user>"
    }
  ],
  "extractedPreferences": {
    "category": "<food/fashion/both>",
    "budget": <number or null>,
    "dietary": ["<any dietary preferences>"],
    "style": ["<any style preferences>"],
    "occasion": "<occasion if mentioned>"
  },
  "greeting": "<friendly acknowledgment of user's request>"
}

IMPORTANT:
- Always use ₹ for prices
- Consider Indian cultural context and seasonal preferences
- Be warm and conversational in your reasoning
- Prioritize products that match budget constraints
- Return 2-4 relevant recommendations
- If no products match, explain why and suggest alternatives`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: query }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required. Please add credits." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    // Parse the JSON response from the AI
    let parsedResponse;
    try {
      // Extract JSON from the response (might be wrapped in markdown code blocks)
      const jsonMatch = content.match(/```json\n?([\s\S]*?)\n?```/) || content.match(/\{[\s\S]*\}/);
      const jsonStr = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : content;
      parsedResponse = JSON.parse(jsonStr);
    } catch (e) {
      console.error("Failed to parse AI response:", e, content);
      parsedResponse = {
        recommendations: [],
        extractedPreferences: {},
        greeting: "I'd love to help you find something perfect! Could you tell me more about what you're looking for?"
      };
    }

    return new Response(JSON.stringify(parsedResponse), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Error in recommend function:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
