import { useState, useEffect } from 'react';

interface LocationData {
  city: string;
  borough: string;
  coordinates: {
    lat: number;
    lng: number;
  } | null;
  detected: boolean;
  error: string | null;
}

const NYC_BOROUGHS_MAP = {
  'manhattan': 'Manhattan',
  'brooklyn': 'Brooklyn', 
  'queens': 'Queens',
  'bronx': 'Bronx',
  'staten island': 'Staten Island',
};

export const useLocationDetection = () => {
  const [location, setLocation] = useState<LocationData>({
    city: 'New York',
    borough: 'all',
    coordinates: null,
    detected: false,
    error: null
  });

  const [isDetecting, setIsDetecting] = useState(false);

  // Get saved location from localStorage
  useEffect(() => {
    const savedLocation = localStorage.getItem('user_location');
    if (savedLocation) {
      try {
        const parsed = JSON.parse(savedLocation);
        setLocation(prev => ({ ...prev, ...parsed, detected: true }));
      } catch (e) {
        console.error('Error parsing saved location:', e);
      }
    }
  }, []);

  const detectLocation = async () => {
    setIsDetecting(true);
    setLocation(prev => ({ ...prev, error: null }));

    try {
      // Try browser geolocation first
      if (navigator.geolocation) {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            timeout: 10000,
            enableHighAccuracy: false
          });
        });

        const { latitude, longitude } = position.coords;
        
        // Use reverse geocoding to get city/borough
        try {
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          
          if (response.ok) {
            const data = await response.json();
            const detectedCity = data.city || data.locality || 'New York';
            const detectedBorough = detectNYCBorough(detectedCity, data.localityInfo?.administrative);
            
            const locationData = {
              city: detectedCity,
              borough: detectedBorough,
              coordinates: { lat: latitude, lng: longitude },
              detected: true,
              error: null
            };

            setLocation(locationData);
            localStorage.setItem('user_location', JSON.stringify(locationData));
            localStorage.setItem('preferred_location', detectedBorough);
            
            return locationData;
          }
        } catch (geoError) {
          console.error('Reverse geocoding failed:', geoError);
        }
      }

      // Fallback to IP-based detection
      const ipResponse = await fetch('https://ipapi.co/json/');
      if (ipResponse.ok) {
        const ipData = await ipResponse.json();
        const detectedCity = ipData.city || 'New York';
        const detectedBorough = detectNYCBorough(detectedCity, [ipData.region]);
        
        const locationData = {
          city: detectedCity,
          borough: detectedBorough,
          coordinates: ipData.latitude && ipData.longitude ? {
            lat: ipData.latitude,
            lng: ipData.longitude
          } : null,
          detected: true,
          error: null
        };

        setLocation(locationData);
        localStorage.setItem('user_location', JSON.stringify(locationData));
        localStorage.setItem('preferred_location', detectedBorough);
        
        return locationData;
      }

      throw new Error('Unable to detect location');

    } catch (error) {
      console.error('Location detection error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Location detection failed';
      
      setLocation(prev => ({ 
        ...prev, 
        error: errorMessage,
        detected: false 
      }));
      
      // Set default to NYC
      const defaultLocation = {
        city: 'New York',
        borough: 'all',
        coordinates: null,
        detected: false,
        error: errorMessage
      };
      
      localStorage.setItem('preferred_location', 'all');
      return defaultLocation;
    } finally {
      setIsDetecting(false);
    }
  };

  const detectNYCBorough = (city: string, administrativeAreas?: any[]): string => {
    const cityLower = city.toLowerCase();
    
    // Direct borough matches
    for (const [key, value] of Object.entries(NYC_BOROUGHS_MAP)) {
      if (cityLower.includes(key)) {
        return value;
      }
    }
    
    // Check administrative areas for NYC boroughs
    if (administrativeAreas) {
      for (const area of administrativeAreas) {
        const areaName = (area.name || area).toLowerCase();
        for (const [key, value] of Object.entries(NYC_BOROUGHS_MAP)) {
          if (areaName.includes(key)) {
            return value;
          }
        }
      }
    }
    
    // NYC neighborhoods to borough mapping
    const neighborhoodMap: { [key: string]: string } = {
      'williamsburg': 'Brooklyn',
      'astoria': 'Queens',
      'flushing': 'Queens',
      'harlem': 'Manhattan',
      'soho': 'Manhattan',
      'tribeca': 'Manhattan',
      'midtown': 'Manhattan',
      'downtown': 'Manhattan',
      'upper west side': 'Manhattan',
      'upper east side': 'Manhattan',
      'park slope': 'Brooklyn',
      'flatbush': 'Brooklyn',
      'bedstuy': 'Brooklyn',
      'crown heights': 'Brooklyn',
      'bushwick': 'Brooklyn',
      'long island city': 'Queens',
      'forest hills': 'Queens',
      'jackson heights': 'Queens',
      'mott haven': 'Bronx',
      'fordham': 'Bronx',
      'concourse': 'Bronx',
      'st. george': 'Staten Island',
      'stapleton': 'Staten Island'
    };
    
    for (const [neighborhood, borough] of Object.entries(neighborhoodMap)) {
      if (cityLower.includes(neighborhood)) {
        return borough;
      }
    }
    
    // Default to all if can't determine specific borough
    return 'all';
  };

  const saveUserLocation = (city: string, borough: string) => {
    const locationData = {
      city,
      borough,
      coordinates: location.coordinates,
      detected: true,
      error: null
    };
    
    setLocation(locationData);
    localStorage.setItem('user_location', JSON.stringify(locationData));
    localStorage.setItem('preferred_location', borough);
  };

  const getPopularCategoryForLocation = (borough: string): string => {
    const locationCategories: { [key: string]: string } = {
      'Manhattan': 'retail',
      'Brooklyn': 'childcare',
      'Queens': 'delivery',
      'Bronx': 'warehouse',
      'Staten Island': 'healthcare',
      'all': 'delivery'
    };
    
    return locationCategories[borough] || 'delivery';
  };

  return {
    location,
    isDetecting,
    detectLocation,
    saveUserLocation,
    getPopularCategoryForLocation
  };
};