import React, { useState } from 'react';
import { MapPin, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface LocationSelectorProps {
  onLocationSelect: (location: string) => void;
  onClose: () => void;
  currentLocation?: string;
}

export function LocationSelector({ onLocationSelect, onClose, currentLocation }: LocationSelectorProps) {
  const [location, setLocation] = useState(currentLocation || '');
  
  // Common Indian cities/regions for quick selection
  const popularLocations = [
    'Mumbai, Maharashtra',
    'Delhi, Delhi',
    'Bangalore, Karnataka',
    'Hyderabad, Telangana',
    'Chennai, Tamil Nadu',
    'Pune, Maharashtra',
    'Kolkata, West Bengal',
    'Ratnagiri, Maharashtra',
    'Alphonso Belt, Maharashtra',
    'Kesar Belt, Gujarat',
    'Mango Belt, Uttar Pradesh'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim()) {
      onLocationSelect(location.trim());
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Select Your Location
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Choose your location to see products available in your area
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter your city and state"
              className="w-full"
            />
            <Button type="submit" className="w-full" disabled={!location.trim()}>
              Set Location
            </Button>
          </form>
          
          <div className="space-y-2">
            <p className="text-sm font-medium">Popular locations:</p>
            <div className="flex flex-wrap gap-2">
              {popularLocations.map((loc) => (
                <Badge
                  key={loc}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => {
                    onLocationSelect(loc);
                    onClose();
                  }}
                >
                  {loc}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}