import { ArrowRight, Leaf, Shield, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { FarmerCard } from "@/components/FarmerCard";
import { Header } from "@/components/Header";
import { CartSidebar } from "@/components/CartSidebar";

import heroImage from "@/assets/hero-mangoes.jpg";
import alphonsoImage from "@/assets/alphonso-mango.jpg";
import kesarImage from "@/assets/kesar-mango.jpg";
import hadenImage from "@/assets/haden-mango.jpg";
import farmerRajImage from "@/assets/farmer-raj.jpg";

const Index = () => {
  const featuredProducts = [
    {
      id: "1",
      name: "Premium Alphonso",
      variety: "Alphonso Mango",
      price: 850,
      image: alphonsoImage,
      farmer: {
        name: "Raj Patel",
        location: "Ratnagiri, Maharashtra",
        rating: 4.9
      },
      inStock: true,
      organic: true
    },
    {
      id: "2", 
      name: "Sweet Kesar",
      variety: "Kesar Mango",
      price: 720,
      image: kesarImage,
      farmer: {
        name: "Amit Kumar",
        location: "Junagadh, Gujarat",
        rating: 4.8
      },
      inStock: true,
      organic: false
    },
    {
      id: "3",
      name: "Fresh Haden",
      variety: "Haden Mango", 
      price: 650,
      image: hadenImage,
      farmer: {
        name: "Priya Sharma",
        location: "Bangalore, Karnataka",
        rating: 4.7
      },
      inStock: false,
      organic: true
    }
  ];

  const featuredFarmers = [
    {
      name: "Raj Patel",
      location: "Ratnagiri, Maharashtra",
      rating: 4.9,
      reviewCount: 156,
      image: farmerRajImage,
      specialties: ["Alphonso", "Kesar", "Totapuri"],
      deliveryDays: 2,
      verified: true
    }
  ];

  return (
    <div className="min-h-screen bg-background">
        <Header />
        <CartSidebar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-warm-cream to-background">
        <div className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                Fresh Mangoes
                <span className="block text-primary">Direct from Farmers</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Experience the authentic taste of premium mangoes sourced directly from certified farmers across India.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-tropical hover:opacity-90 transition-opacity"
                  onClick={() => {
                    document.getElementById('featured-products')?.scrollIntoView({ 
                      behavior: 'smooth' 
                    });
                  }}
                >
                  Shop Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg">
                  Meet Our Farmers
                </Button>
              </div>
            </div>
            <div className="relative animate-slide-up">
              <img 
                src={heroImage} 
                alt="Fresh mangoes" 
                className="w-full h-[400px] lg:h-[500px] object-cover rounded-2xl shadow-warm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-fresh rounded-full flex items-center justify-center mx-auto">
                <Leaf className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Farm Fresh</h3>
              <p className="text-muted-foreground">Harvested at perfect ripeness and delivered within 24-48 hours</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-tropical rounded-full flex items-center justify-center mx-auto">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Quality Assured</h3>
              <p className="text-muted-foreground">Every mango is hand-picked and quality checked by our farmers</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-sunset rounded-full flex items-center justify-center mx-auto">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold">Fast Delivery</h3>
              <p className="text-muted-foreground">Quick and careful delivery to preserve freshness and flavor</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured-products" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Featured Mangoes</h2>
            <p className="text-muted-foreground">Discover our premium selection of mangoes from verified farmers</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Farmers */}
      <section id="featured-farmers" className="py-16 bg-accent/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Meet Our Farmers</h2>
            <p className="text-muted-foreground">Supporting local farmers and bringing you the best mangoes</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredFarmers.map((farmer, index) => (
              <FarmerCard key={index} {...farmer} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-earth-brown text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-tropical rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">M</span>
                </div>
                <span className="font-bold text-xl">MangoMarket</span>
              </div>
              <p className="text-white/80">
                Connecting farmers with customers for the freshest mango experience.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Shop</h3>
              <ul className="space-y-2 text-white/80">
                <li>All Mangoes</li>
                <li>Organic Only</li>
                <li>By Variety</li>
                <li>By Location</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">For Farmers</h3>
              <ul className="space-y-2 text-white/80">
                <li>Sell Your Mangoes</li>
                <li>Farmer Portal</li>
                <li>Support</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-white/80">
                <li>Contact Us</li>
                <li>Track Order</li>
                <li>Returns</li>
                <li>FAQ</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/60">
            <p>&copy; 2024 MangoMarket. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
