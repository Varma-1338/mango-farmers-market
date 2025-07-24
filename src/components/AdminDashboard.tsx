import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Settings, Package, Users, MessageSquare, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { FarmerManagement } from './FarmerManagement';
import { ProductManagement } from './ProductManagement';
import { OrderManagement } from './OrderManagement';
import { MessageManagement } from './MessageManagement';

export function AdminDashboard() {
  const [productSettings, setProductSettings] = useState({
    alphonsoStock: 150,
    kesarStock: 120,
    hadenStock: 0,
    alphonsoAvailable: true,
    kesarAvailable: true,
    hadenAvailable: false,
  });
  
  const [currentView, setCurrentView] = useState<'dashboard' | 'farmers' | 'products' | 'orders' | 'messages'>('dashboard');

  const handleStockUpdate = (product: string, value: number) => {
    setProductSettings(prev => ({
      ...prev,
      [`${product}Stock`]: value
    }));
    toast.success(`${product} stock updated to ${value}`);
  };

  const handleAvailabilityToggle = (product: string, available: boolean) => {
    setProductSettings(prev => ({
      ...prev,
      [`${product}Available`]: available
    }));
    toast.success(`${product} ${available ? 'enabled' : 'disabled'}`);
  };

  if (currentView === 'farmers') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => setCurrentView('dashboard')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          <h2 className="text-2xl font-bold">Farmer Management</h2>
        </div>
        <FarmerManagement />
      </div>
    );
  }

  if (currentView === 'products') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => setCurrentView('dashboard')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          <h2 className="text-2xl font-bold">Product Management</h2>
        </div>
        <ProductManagement />
      </div>
    );
  }

  if (currentView === 'orders') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => setCurrentView('dashboard')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          <h2 className="text-2xl font-bold">Order Management</h2>
        </div>
        <OrderManagement />
      </div>
    );
  }

  if (currentView === 'messages') {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => setCurrentView('dashboard')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          <h2 className="text-2xl font-bold">Message Management</h2>
        </div>
        <MessageManagement />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              Total Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-muted-foreground">Active varieties</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-muted-foreground">Registered users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-muted-foreground">Pending messages</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Online</div>
            <p className="text-muted-foreground">All systems operational</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common administrative tasks
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={() => setCurrentView('orders')}>
              View All Orders
            </Button>
            <Button variant="outline" onClick={() => setCurrentView('products')}>
              Manage Products
            </Button>
            <Button variant="outline" onClick={() => setCurrentView('farmers')}>
              Manage Farmers
            </Button>
            <Button variant="outline" onClick={() => setCurrentView('messages')}>
              View Messages
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}