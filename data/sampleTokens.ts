
import { Token } from '../types';

export const sampleTokens: Omit<Token, 'id'>[] = [
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    quantity: 0.5,
    purchasePrice: 40000,
    currentPrice: 43250.50,
    purchaseDate: new Date('2024-01-15'),
    targetMultiplier: 2,
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    quantity: 2.5,
    purchasePrice: 2800,
    currentPrice: 2650.75,
    purchaseDate: new Date('2024-02-01'),
    targetMultiplier: 3,
  },
  {
    symbol: 'ADA',
    name: 'Cardano',
    quantity: 1000,
    purchasePrice: 0.45,
    currentPrice: 0.485,
    purchaseDate: new Date('2024-01-20'),
    targetMultiplier: 5,
  },
  {
    symbol: 'SOL',
    name: 'Solana',
    quantity: 10,
    purchasePrice: 85,
    currentPrice: 98.45,
    purchaseDate: new Date('2024-02-10'),
    targetMultiplier: 2,
  },
];
