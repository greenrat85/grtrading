
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import { Token } from '../types';
import Icon from './Icon';

interface TokenCardProps {
  token: Token;
  onPress?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function TokenCard({ token, onPress, onEdit, onDelete }: TokenCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatNumber = (num: number, decimals: number = 4) => {
    return num.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: decimals,
    });
  };

  const currentValue = token.currentPrice * token.quantity;
  const investedValue = token.purchasePrice * token.quantity;
  const profit = currentValue - investedValue;
  const profitPercentage = investedValue > 0 ? (profit / investedValue) * 100 : 0;

  return (
    <TouchableOpacity 
      style={[commonStyles.card, styles.tokenCard]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={commonStyles.row}>
        <View style={styles.tokenInfo}>
          <View style={styles.tokenHeader}>
            <Text style={styles.tokenSymbol}>{token.symbol}</Text>
            <Text style={commonStyles.textSecondary}>{token.name}</Text>
          </View>
          
          <View style={styles.tokenStats}>
            <Text style={commonStyles.textSecondary}>
              {formatNumber(token.quantity)} × {formatCurrency(token.currentPrice)}
            </Text>
            <Text style={commonStyles.text}>
              {formatCurrency(currentValue)}
            </Text>
          </View>
        </View>
        
        <View style={styles.profitSection}>
          <Text style={[
            commonStyles.profitText,
            profit >= 0 ? commonStyles.profitPositive : commonStyles.profitNegative
          ]}>
            {formatCurrency(profit)}
          </Text>
          <Text style={[
            commonStyles.textSecondary,
            profit >= 0 ? commonStyles.profitPositive : commonStyles.profitNegative
          ]}>
            {profitPercentage >= 0 ? '+' : ''}{profitPercentage.toFixed(2)}%
          </Text>
          
          {token.targetMultiplier && (
            <View style={styles.targetBadge}>
              <Text style={styles.targetText}>x{token.targetMultiplier}</Text>
            </View>
          )}
        </View>
      </View>
      
      {(onEdit || onDelete) && (
        <View style={styles.actionButtons}>
          {onEdit && (
            <TouchableOpacity onPress={onEdit} style={styles.actionButton}>
              <Icon name="pencil" size={16} color={colors.textSecondary} />
            </TouchableOpacity>
          )}
          {onDelete && (
            <TouchableOpacity onPress={onDelete} style={styles.actionButton}>
              <Icon name="trash" size={16} color={colors.danger} />
            </TouchableOpacity>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tokenCard: {
    marginBottom: 12,
  },
  tokenInfo: {
    flex: 1,
  },
  tokenHeader: {
    marginBottom: 8,
  },
  tokenSymbol: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 2,
  },
  tokenStats: {
    gap: 4,
  },
  profitSection: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  targetBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
  },
  targetText: {
    color: colors.background,
    fontSize: 12,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
    gap: 12,
  },
  actionButton: {
    padding: 8,
  },
});
