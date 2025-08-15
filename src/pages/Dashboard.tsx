import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AdminDashboard } from '@/components/AdminDashboard';
import { UserDashboard } from '@/components/UserDashboard';
import { FarmerDashboard } from '@/components/FarmerDashboard';
import { Header } from '@/components/Header';
import { CartSidebar } from '@/components/CartSidebar';

export default function Dashboard() {
  const { profile, isAdmin, isFarmer, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartSidebar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Welcome, {profile?.full_name || profile?.email}!
          </h1>
          <p className="text-muted-foreground">
            {isAdmin ? 'Admin Dashboard' : isFarmer ? 'Farmer Dashboard' : 'User Dashboard'}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Role: {profile?.role || 'unknown'} | Admin: {isAdmin ? 'Yes' : 'No'} | Farmer: {isFarmer ? 'Yes' : 'No'}
          </p>
        </div>

        {isAdmin ? (
          <AdminDashboard />
        ) : isFarmer ? (
          <FarmerDashboard />
        ) : (
          <UserDashboard />
        )}
      </div>
    </div>
  );
}