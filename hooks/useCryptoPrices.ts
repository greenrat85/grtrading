
import { useState, useEffect } from 'react';
import { PriceData } from '../types';

// Mock price data - in real app this would fetch from CoinGecko/CoinMarketCap API
const mockPrices: Record<string, PriceData> = {
  'BTC': {
    symbol: 'BTC',
    price: 43250.50,
    change24h: 1250.30,
    changePercentage24h: 2.98,
    lastUpdated: new Date(),
  },
  'ETH': {
    symbol: 'ETH',
    price: 2650.75,
    change24h: -85.25,
    changePercentage24h: -3.11,
    lastUpdated: new Date(),
  },
  'ADA': {
    symbol: 'ADA',
    price: 0.485,
    change24h: 0.025,
    changePercentage24h: 5.43,
    lastUpdated: new Date(),
  },
  'SOL': {
    symbol: 'SOL',
    price: 98.45,
    change24h: 4.32,
    changePercentage24h: 4.58,
    lastUpdated: new Date(),
  },
};

export const useCryptoPrices = () => {
  const [prices, setPrices] = useState<Record<string, PriceData>>(mockPrices);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const fetchPrices = async (symbols: string[]) => {
    setIsLoading(true);
    console.log('Fetching prices for:', symbols);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In real app, this would be an actual API call
      // const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${symbols.join(',')}&vs_currencies=usd&include_24hr_change=true`);
      // const data = await response.json();
      
      // For now, just update the mock data with slight variations
      const updatedPrices = { ...prices };
      symbols.forEach(symbol => {
        if (updatedPrices[symbol]) {
          const variation = (Math.random() - 0.5) * 0.1; // ±5% variation
          updatedPrices[symbol] = {
            ...updatedPrices[symbol],
            price: updatedPrices[symbol].price * (1 + variation),
            lastUpdated: new Date(),
          };
        }
      });
      
      setPrices(updatedPrices);
      setLastUpdated(new Date());
      console.log('Prices updated successfully');
      
    } catch (error) {
      console.error('Error fetching prices:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getPrice = (symbol: string): PriceData | null => {
    return prices[symbol] || null;
  };

  return {
    prices,
    isLoading,
    lastUpdated,
    fetchPrices,
    getPrice,
  };
};
