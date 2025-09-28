
export interface Token {
  id: string;
  symbol: string;
  name: string;
  quantity: number;
  purchasePrice: number;
  currentPrice: number;
  purchaseDate: Date;
  imageUrl?: string;
  targetMultiplier?: number; // x2, x3, etc.
  notes?: string;
  x2Notified?: boolean; // Track if x2 goal notification was sent
  x3Notified?: boolean; // Track if x3 goal notification was sent
}

export interface Portfolio {
  id: string;
  name: string;
  tokens: Token[];
  totalValue: number;
  totalInvested: number;
  totalProfit: number;
  profitPercentage: number;
}

export interface PriceData {
  symbol: string;
  price: number;
  change24h: number;
  changePercentage24h: number;
  lastUpdated: Date;
}

export interface Goal {
  id: string;
  tokenId: string;
  targetPrice: number;
  targetMultiplier: number;
  isReached: boolean;
  createdAt: Date;
  reachedAt?: Date;
}

export interface AppSettings {
  currency: 'USD' | 'EUR' | 'UAH';
  notifications: boolean;
  biometricAuth: boolean;
  pinCode?: string;
  theme: 'light' | 'dark';
  autoRefresh: boolean;
  refreshInterval: number; // in minutes
}
