
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import { Portfolio } from '../types';

interface PortfolioCardProps {
  portfolio: Portfolio;
}

export default function PortfolioCard({ portfolio }: PortfolioCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatPercentage = (percentage: number) => {
    return `${percentage >= 0 ? '+' : ''}${percentage.toFixed(2)}%`;
  };

  return (
    <View style={[commonStyles.card, styles.portfolioCard]}>
      <Text style={commonStyles.subtitle}>Portfolio Overview</Text>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={commonStyles.textSecondary}>Total Value</Text>
          <Text style={[commonStyles.title, styles.totalValue]}>
            {formatCurrency(portfolio.totalValue)}
          </Text>
        </View>
        
        <View style={commonStyles.row}>
          <View style={styles.statItem}>
            <Text style={commonStyles.textSecondary}>Invested</Text>
            <Text style={commonStyles.text}>
              {formatCurrency(portfolio.totalInvested)}
            </Text>
          </View>
          
          <View style={[styles.statItem, { alignItems: 'flex-end' }]}>
            <Text style={commonStyles.textSecondary}>Profit/Loss</Text>
            <Text style={[
              commonStyles.profitText,
              portfolio.totalProfit >= 0 ? commonStyles.profitPositive : commonStyles.profitNegative
            ]}>
              {formatCurrency(portfolio.totalProfit)}
            </Text>
            <Text style={[
              commonStyles.textSecondary,
              portfolio.totalProfit >= 0 ? commonStyles.profitPositive : commonStyles.profitNegative
            ]}>
              {formatPercentage(portfolio.profitPercentage)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  portfolioCard: {
    marginBottom: 20,
  },
  statsContainer: {
    marginTop: 16,
  },
  statItem: {
    flex: 1,
  },
  totalValue: {
    fontSize: 32,
    marginTop: 4,
    marginBottom: 16,
  },
});
