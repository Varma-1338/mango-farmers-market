import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, MessageCircle, Package, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function UserDashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-primary" />
              Shop Mangoes
            </CardTitle>
            <CardDescription>
              Browse our fresh selection of premium mangoes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              className="w-full bg-gradient-tropical hover:opacity-90"
              onClick={() => navigate('/')}
            >
              Start Shopping
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              Contact Us
            </CardTitle>
            <CardDescription>
              Get in touch with our team for any queries
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                // Scroll to contact section on home page
                navigate('/');
                setTimeout(() => {
                  document.getElementById('contact')?.scrollIntoView({ 
                    behavior: 'smooth' 
                  });
                }, 100);
              }}
            >
              Send Message
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              My Orders
            </CardTitle>
            <CardDescription>
              Track your mango orders and delivery status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full" disabled>
              Coming Soon
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              Favorites
            </CardTitle>
            <CardDescription>
              Your saved mango varieties and farmers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full" disabled>
              Coming Soon
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Everything you need to get the freshest mangoes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-gradient-tropical hover:opacity-90"
              onClick={() => navigate('/')}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Browse Mangoes
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => {
                navigate('/');
                setTimeout(() => {
                  document.getElementById('featured-farmers')?.scrollIntoView({ 
                    behavior: 'smooth' 
                  });
                }, 100);
              }}
            >
              Meet Our Farmers
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}