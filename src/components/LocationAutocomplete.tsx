import React, { useState, useEffect, useRef } from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface LocationAutocompleteProps {
  value: string;
  onChange: (location: string) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
}

// Comprehensive list of Indian cities and locations
const INDIAN_LOCATIONS = [
  // Maharashtra
  'Mumbai, Maharashtra',
  'Pune, Maharashtra',
  'Nagpur, Maharashtra',
  'Nashik, Maharashtra',
  'Ratnagiri, Maharashtra',
  'Kolhapur, Maharashtra',
  'Sangli, Maharashtra',
  'Solapur, Maharashtra',
  'Aurangabad, Maharashtra',
  'Thane, Maharashtra',
  'Navi Mumbai, Maharashtra',
  'Alphonso Belt, Maharashtra',
  
  // Gujarat
  'Ahmedabad, Gujarat',
  'Surat, Gujarat',
  'Vadodara, Gujarat',
  'Rajkot, Gujarat',
  'Bhavnagar, Gujarat',
  'Jamnagar, Gujarat',
  'Junagadh, Gujarat',
  'Kesar Belt, Gujarat',
  
  // Karnataka
  'Bangalore, Karnataka',
  'Mysore, Karnataka',
  'Hubli, Karnataka',
  'Dharwad, Karnataka',
  'Belgaum, Karnataka',
  'Gulbarga, Karnataka',
  'Bijapur, Karnataka',
  'Shimoga, Karnataka',
  'Tumkur, Karnataka',
  'Davangere, Karnataka',
  
  // Tamil Nadu
  'Chennai, Tamil Nadu',
  'Coimbatore, Tamil Nadu',
  'Madurai, Tamil Nadu',
  'Tiruchirappalli, Tamil Nadu',
  'Salem, Tamil Nadu',
  'Erode, Tamil Nadu',
  'Tirunelveli, Tamil Nadu',
  'Vellore, Tamil Nadu',
  'Thoothukudi, Tamil Nadu',
  'Dindigul, Tamil Nadu',
  
  // Andhra Pradesh & Telangana
  'Hyderabad, Telangana',
  'Vijayawada, Andhra Pradesh',
  'Visakhapatnam, Andhra Pradesh',
  'Guntur, Andhra Pradesh',
  'Nellore, Andhra Pradesh',
  'Kurnool, Andhra Pradesh',
  'Rajahmundry, Andhra Pradesh',
  'Tirupati, Andhra Pradesh',
  'Warangal, Telangana',
  'Nizamabad, Telangana',
  
  // Kerala
  'Kochi, Kerala',
  'Thiruvananthapuram, Kerala',
  'Kozhikode, Kerala',
  'Thrissur, Kerala',
  'Kollam, Kerala',
  'Palakkad, Kerala',
  'Malappuram, Kerala',
  'Kannur, Kerala',
  'Kottayam, Kerala',
  'Alappuzha, Kerala',
  
  // West Bengal
  'Kolkata, West Bengal',
  'Howrah, West Bengal',
  'Durgapur, West Bengal',
  'Asansol, West Bengal',
  'Siliguri, West Bengal',
  'Bardhaman, West Bengal',
  'Malda, West Bengal',
  'Kharagpur, West Bengal',
  
  // Uttar Pradesh
  'Lucknow, Uttar Pradesh',
  'Kanpur, Uttar Pradesh',
  'Agra, Uttar Pradesh',
  'Varanasi, Uttar Pradesh',
  'Meerut, Uttar Pradesh',
  'Allahabad, Uttar Pradesh',
  'Bareilly, Uttar Pradesh',
  'Moradabad, Uttar Pradesh',
  'Saharanpur, Uttar Pradesh',
  'Gorakhpur, Uttar Pradesh',
  'Mango Belt, Uttar Pradesh',
  
  // Delhi & NCR
  'Delhi, Delhi',
  'New Delhi, Delhi',
  'Gurgaon, Haryana',
  'Noida, Uttar Pradesh',
  'Faridabad, Haryana',
  'Ghaziabad, Uttar Pradesh',
  'Greater Noida, Uttar Pradesh',
  
  // Rajasthan
  'Jaipur, Rajasthan',
  'Jodhpur, Rajasthan',
  'Udaipur, Rajasthan',
  'Kota, Rajasthan',
  'Bikaner, Rajasthan',
  'Ajmer, Rajasthan',
  'Bharatpur, Rajasthan',
  'Alwar, Rajasthan',
  
  // Madhya Pradesh
  'Bhopal, Madhya Pradesh',
  'Indore, Madhya Pradesh',
  'Jabalpur, Madhya Pradesh',
  'Gwalior, Madhya Pradesh',
  'Ujjain, Madhya Pradesh',
  'Sagar, Madhya Pradesh',
  'Dewas, Madhya Pradesh',
  'Satna, Madhya Pradesh',
  
  // Other major cities
  'Chandigarh, Chandigarh',
  'Bhubaneswar, Odisha',
  'Guwahati, Assam',
  'Dehradun, Uttarakhand',
  'Shimla, Himachal Pradesh',
  'Jammu, Jammu and Kashmir',
  'Srinagar, Jammu and Kashmir',
  'Panaji, Goa',
  'Imphal, Manipur',
  'Aizawl, Mizoram',
  'Shillong, Meghalaya',
  'Agartala, Tripura',
  'Kohima, Nagaland',
  'Itanagar, Arunachal Pradesh',
  'Gangtok, Sikkim'
];

export function LocationAutocomplete({ 
  value, 
  onChange, 
  placeholder = "Enter city and state", 
  label,
  required = false,
  className = "",
  disabled = false
}: LocationAutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) {
      const filtered = INDIAN_LOCATIONS.filter(location =>
        location.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 8); // Limit to 8 suggestions
      setFilteredLocations(filtered);
    } else {
      setFilteredLocations([]);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    setIsOpen(true); // Always show dropdown when typing
  };

  const handleLocationSelect = (location: string) => {
    onChange(location);
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const handleInputFocus = () => {
    if (!disabled) {
      setIsOpen(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className={`relative ${className}`}>
      {label && (
        <Label className="flex items-center gap-2 mb-2">
          <MapPin className="h-4 w-4" />
          {label}
          {required && <span className="text-destructive">*</span>}
        </Label>
      )}
      
      <div className="relative">
        <Input
          ref={inputRef}
          value={value}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className="pr-8"
        />
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
      </div>

      {isOpen && !disabled && filteredLocations.length > 0 && (
        <div 
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 z-50 mt-1 bg-background border border-border rounded-md shadow-lg max-h-60 overflow-auto"
        >
          {filteredLocations.map((location, index) => (
            <div
              key={index}
              className="px-3 py-2 cursor-pointer hover:bg-accent hover:text-accent-foreground text-sm transition-colors"
              onClick={() => handleLocationSelect(location)}
            >
              <div className="flex items-center gap-2">
                <MapPin className="h-3 w-3 text-muted-foreground" />
                {location}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {value && !filteredLocations.some(loc => loc.toLowerCase() === value.toLowerCase()) && (
        <p className="text-xs text-muted-foreground mt-1">
          Custom location: {value}
        </p>
      )}
    </div>
  );
}
