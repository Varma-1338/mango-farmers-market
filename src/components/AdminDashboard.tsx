import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Settings, Package, Users, MessageSquare, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { FarmerManagement } from './FarmerManagement';

export function AdminDashboard() {
  const [productSettings, setProductSettings] = useState({
    alphonsoStock: 150,
    kesarStock: 120,
    hadenStock: 0,
    alphonsoAvailable: true,
    kesarAvailable: true,
    hadenAvailable: false,
  });
  
  const [currentView, setCurrentView] = useState<'dashboard' | 'farmers'>('dashboard');

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
          <CardTitle>Product Management</CardTitle>
          <CardDescription>
            Manage product availability and stock levels
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Alphonso Mango */}
          <div className="border rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Premium Alphonso</h3>
              <Switch
                checked={productSettings.alphonsoAvailable}
                onCheckedChange={(checked) => handleAvailabilityToggle('alphonso', checked)}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="alphonso-stock">Stock Level (kg)</Label>
                <Input
                  id="alphonso-stock"
                  type="number"
                  value={productSettings.alphonsoStock}
                  onChange={(e) => handleStockUpdate('alphonso', parseInt(e.target.value) || 0)}
                />
              </div>
              <div className="space-y-2">
                <Label>Current Status</Label>
                <div className={`px-3 py-2 rounded-md text-sm ${
                  productSettings.alphonsoAvailable && productSettings.alphonsoStock > 0
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {productSettings.alphonsoAvailable && productSettings.alphonsoStock > 0
                    ? 'In Stock'
                    : 'Out of Stock'
                  }
                </div>
              </div>
            </div>
          </div>

          {/* Kesar Mango */}
          <div className="border rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Sweet Kesar</h3>
              <Switch
                checked={productSettings.kesarAvailable}
                onCheckedChange={(checked) => handleAvailabilityToggle('kesar', checked)}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="kesar-stock">Stock Level (kg)</Label>
                <Input
                  id="kesar-stock"
                  type="number"
                  value={productSettings.kesarStock}
                  onChange={(e) => handleStockUpdate('kesar', parseInt(e.target.value) || 0)}
                />
              </div>
              <div className="space-y-2">
                <Label>Current Status</Label>
                <div className={`px-3 py-2 rounded-md text-sm ${
                  productSettings.kesarAvailable && productSettings.kesarStock > 0
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {productSettings.kesarAvailable && productSettings.kesarStock > 0
                    ? 'In Stock'
                    : 'Out of Stock'
                  }
                </div>
              </div>
            </div>
          </div>

          {/* Haden Mango */}
          <div className="border rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Fresh Haden</h3>
              <Switch
                checked={productSettings.hadenAvailable}
                onCheckedChange={(checked) => handleAvailabilityToggle('haden', checked)}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="haden-stock">Stock Level (kg)</Label>
                <Input
                  id="haden-stock"
                  type="number"
                  value={productSettings.hadenStock}
                  onChange={(e) => handleStockUpdate('haden', parseInt(e.target.value) || 0)}
                />
              </div>
              <div className="space-y-2">
                <Label>Current Status</Label>
                <div className={`px-3 py-2 rounded-md text-sm ${
                  productSettings.hadenAvailable && productSettings.hadenStock > 0
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {productSettings.hadenAvailable && productSettings.hadenStock > 0
                    ? 'In Stock'
                    : 'Out of Stock'
                  }
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common administrative tasks
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={() => toast.info('Feature coming soon!')}>
              View All Orders
            </Button>
            <Button variant="outline" onClick={() => setCurrentView('farmers')}>
              Manage Farmers
            </Button>
            <Button variant="outline" onClick={() => toast.info('Feature coming soon!')}>
              View Messages
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}