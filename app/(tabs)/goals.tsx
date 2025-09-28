
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles, colors } from '../../styles/commonStyles';
import { usePortfolio } from '../../hooks/usePortfolio';
import Icon from '../../components/Icon';

export default function GoalsScreen() {
  const { portfolio } = usePortfolio();

  const getGoalProgress = (token: any) => {
    if (!token.targetMultiplier) return 0;
    const targetPrice = token.purchasePrice * token.targetMultiplier;
    const progress = (token.currentPrice / targetPrice) * 100;
    return Math.min(progress, 100);
  };

  const tokensWithGoals = portfolio.tokens.filter(token => token.targetMultiplier);

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={commonStyles.content}>
        <Text style={commonStyles.title}>Price Goals</Text>
        <Text style={[commonStyles.textSecondary, { marginBottom: 24 }]}>
          Track your target multipliers
        </Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          {tokensWithGoals.length > 0 ? (
            tokensWithGoals.map(token => {
              const progress = getGoalProgress(token);
              const targetPrice = token.purchasePrice * token.targetMultiplier!;
              const isReached = token.currentPrice >= targetPrice;

              return (
                <View key={token.id} style={[commonStyles.card, styles.goalCard]}>
                  <View style={commonStyles.row}>
                    <View style={styles.tokenInfo}>
                      <Text style={styles.tokenSymbol}>{token.symbol}</Text>
                      <Text style={commonStyles.textSecondary}>
                        Target: x{token.targetMultiplier} (${targetPrice.toFixed(2)})
                      </Text>
                    </View>
                    
                    <View style={styles.goalStatus}>
                      {isReached ? (
                        <Icon name="checkmark-circle" size={24} color={colors.success} />
                      ) : (
                        <Text style={[styles.progressText, { color: colors.primary }]}>
                          {progress.toFixed(1)}%
                        </Text>
                      )}
                    </View>
                  </View>

                  <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                      <View 
                        style={[
                          styles.progressFill, 
                          { 
                            width: `${progress}%`,
                            backgroundColor: isReached ? colors.success : colors.primary
                          }
                        ]} 
                      />
                    </View>
                  </View>

                  <View style={commonStyles.row}>
                    <Text style={commonStyles.textSecondary}>
                      Current: ${token.currentPrice.toFixed(2)}
                    </Text>
                    <Text style={[
                      commonStyles.textSecondary,
                      isReached ? { color: colors.success } : {}
                    ]}>
                      {isReached ? 'Goal Reached! 🎉' : `$${(targetPrice - token.currentPrice).toFixed(2)} to go`}
                    </Text>
                  </View>
                </View>
              );
            })
          ) : (
            <View style={styles.emptyState}>
              <Icon name="flag" size={64} color={colors.textSecondary} />
              <Text style={[commonStyles.subtitle, { marginTop: 16, marginBottom: 8 }]}>
                No Goals Set
              </Text>
              <Text style={[commonStyles.textSecondary, { textAlign: 'center' }]}>
                Add target multipliers to your tokens to track price goals
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = {
  goalCard: {
    marginBottom: 16,
  },
  tokenInfo: {
    flex: 1,
  },
  tokenSymbol: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: colors.text,
    marginBottom: 4,
  },
  goalStatus: {
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  progressText: {
    fontSize: 16,
    fontWeight: '600' as const,
  },
  progressContainer: {
    marginVertical: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.backgroundAlt,
    borderRadius: 4,
    overflow: 'hidden' as const,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  emptyState: {
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
};
