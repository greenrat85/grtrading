
import { useState, useEffect } from 'react';
import { Token, Portfolio } from '../types';
import { useAsyncStorage } from './useAsyncStorage';
import { notificationService } from '../services/notificationService';

const initialPortfolio: Portfolio = {
  id: 'default',
  name: 'My Portfolio',
  tokens: [],
  totalValue: 0,
  totalInvested: 0,
  totalProfit: 0,
  profitPercentage: 0,
};

export const usePortfolio = () => {
  const [portfolio, setPortfolio, isStorageLoading] = useAsyncStorage<Portfolio>('portfolio', initialPortfolio);
  const [isLoading, setIsLoading] = useState(false);

  const addToken = (token: Omit<Token, 'id'>) => {
    const newToken: Token = {
      ...token,
      id: Date.now().toString(),
    };
    
    const updatedPortfolio = {
      ...portfolio,
      tokens: [...portfolio.tokens, newToken],
    };
    
    setPortfolio(updatedPortfolio);
    console.log('Token added:', newToken);
  };

  const updateToken = (tokenId: string, updates: Partial<Token>) => {
    const updatedPortfolio = {
      ...portfolio,
      tokens: portfolio.tokens.map(token =>
        token.id === tokenId ? { ...token, ...updates } : token
      ),
    };
    
    setPortfolio(updatedPortfolio);
    console.log('Token updated:', tokenId, updates);
  };

  const removeToken = (tokenId: string) => {
    const updatedPortfolio = {
      ...portfolio,
      tokens: portfolio.tokens.filter(token => token.id !== tokenId),
    };
    
    setPortfolio(updatedPortfolio);
    console.log('Token removed:', tokenId);
  };

  const calculatePortfolioStats = () => {
    const totalValue = portfolio.tokens.reduce((sum, token) => 
      sum + (token.currentPrice * token.quantity), 0
    );
    
    const totalInvested = portfolio.tokens.reduce((sum, token) => 
      sum + (token.purchasePrice * token.quantity), 0
    );
    
    const totalProfit = totalValue - totalInvested;
    const profitPercentage = totalInvested > 0 ? (totalProfit / totalInvested) * 100 : 0;

    const updatedPortfolio = {
      ...portfolio,
      totalValue,
      totalInvested,
      totalProfit,
      profitPercentage,
    };

    setPortfolio(updatedPortfolio);
  };

  const checkPriceGoals = (token: Token) => {
    if (!token.currentPrice || !token.purchasePrice) return;

    const priceMultiplier = token.currentPrice / token.purchasePrice;
    
    // Check for x2 goal
    if (priceMultiplier >= 2.0 && !token.x2Notified) {
      console.log(`${token.name} reached x2 goal!`);
      notificationService.scheduleGoalNotification({
        tokenId: token.id,
        tokenName: token.name,
        targetPrice: token.purchasePrice * 2,
        currentPrice: token.currentPrice,
        goalType: 'x2',
      });
      
      updateToken(token.id, { x2Notified: true });
    }
    
    // Check for x3 goal
    if (priceMultiplier >= 3.0 && !token.x3Notified) {
      console.log(`${token.name} reached x3 goal!`);
      notificationService.scheduleGoalNotification({
        tokenId: token.id,
        tokenName: token.name,
        targetPrice: token.purchasePrice * 3,
        currentPrice: token.currentPrice,
        goalType: 'x3',
      });
      
      updateToken(token.id, { x3Notified: true });
    }
  };

  useEffect(() => {
    if (!isStorageLoading && portfolio.tokens.length > 0) {
      calculatePortfolioStats();
      
      // Check price goals for all tokens
      portfolio.tokens.forEach(token => {
        if (token.currentPrice) {
          checkPriceGoals(token);
        }
      });
    }
  }, [portfolio.tokens, isStorageLoading]);

  return {
    portfolio,
    isLoading: isLoading || isStorageLoading,
    addToken,
    updateToken,
    removeToken,
    setIsLoading,
  };
};
