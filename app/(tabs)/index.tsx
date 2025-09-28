
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles, colors, buttonStyles } from '../../styles/commonStyles';
import { usePortfolio } from '../../hooks/usePortfolio';
import { useCryptoPrices } from '../../hooks/useCryptoPrices';
import PortfolioCard from '../../components/PortfolioCard';
import TokenCard from '../../components/TokenCard';
import AddTokenSheet from '../../components/AddTokenSheet';
import Icon from '../../components/Icon';
import Button from '../../components/Button';
import { sampleTokens } from '../../data/sampleTokens';

export default function PortfolioScreen() {
  const { portfolio, addToken, updateToken, removeToken } = usePortfolio();
  const { fetchPrices, getPrice, isLoading } = useCryptoPrices();
  const [isAddTokenVisible, setIsAddTokenVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Update token prices when component mounts
  useEffect(() => {
    if (portfolio.tokens.length > 0) {
      const symbols = portfolio.tokens.map(token => token.symbol);
      fetchPrices(symbols);
    }
  }, [portfolio.tokens.length]);

  // Update current prices in portfolio when prices change
  useEffect(() => {
    portfolio.tokens.forEach(token => {
      const priceData = getPrice(token.symbol);
      if (priceData && priceData.price !== token.currentPrice) {
        updateToken(token.id, { currentPrice: priceData.price });
      }
    });
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    if (portfolio.tokens.length > 0) {
      const symbols = portfolio.tokens.map(token => token.symbol);
      await fetchPrices(symbols);
    }
    setRefreshing(false);
  };

  const handleAddToken = () => {
    setIsAddTokenVisible(true);
  };

  const handleDeleteToken = (tokenId: string) => {
    Alert.alert(
      'Delete Token',
      'Are you sure you want to remove this token from your portfolio?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => removeToken(tokenId)
        }
      ]
    );
  };

  const handleLoadSampleData = () => {
    Alert.alert(
      'Load Sample Data',
      'This will add sample cryptocurrency tokens to your portfolio. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Load Sample Data', 
          onPress: () => {
            sampleTokens.forEach(token => addToken(token));
            console.log('Sample data loaded');
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={commonStyles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={commonStyles.title}>GreenRat Trading</Text>
            <Text style={commonStyles.textSecondary}>
              Personal Crypto Tracker
            </Text>
          </View>
          <TouchableOpacity onPress={handleAddToken} style={styles.addButton}>
            <Icon name="add" size={24} color={colors.background} />
          </TouchableOpacity>
        </View>

        <ScrollView 
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor={colors.primary}
              colors={[colors.primary]}
            />
          }
        >
          {/* Portfolio Overview */}
          <PortfolioCard portfolio={portfolio} />

          {/* Tokens List */}
          {portfolio.tokens.length > 0 ? (
            <View>
              <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>
                Your Tokens ({portfolio.tokens.length})
              </Text>
              
              {portfolio.tokens.map(token => (
                <TokenCard
                  key={token.id}
                  token={token}
                  onDelete={() => handleDeleteToken(token.id)}
                />
              ))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Icon name="wallet" size={64} color={colors.textSecondary} />
              <Text style={[commonStyles.subtitle, { marginTop: 16, marginBottom: 8 }]}>
                No Tokens Yet
              </Text>
              <Text style={[commonStyles.textSecondary, { textAlign: 'center', marginBottom: 24 }]}>
                Add your first cryptocurrency to start tracking your portfolio
              </Text>
              
              <View style={styles.buttonGroup}>
                <Button
                  text="Add Your First Token"
                  onPress={handleAddToken}
                  style={buttonStyles.primary}
                  textStyle={{ color: colors.background }}
                />
                
                <Button
                  text="Load Sample Data"
                  onPress={handleLoadSampleData}
                  style={[buttonStyles.secondary, { marginTop: 12 }]}
                  textStyle={{ color: colors.text }}
                />
              </View>
            </View>
          )}
        </ScrollView>
      </View>

      {/* Add Token Bottom Sheet */}
      <AddTokenSheet
        isVisible={isAddTokenVisible}
        onClose={() => setIsAddTokenVisible(false)}
        onAddToken={addToken}
      />
    </SafeAreaView>
  );
}

const styles = {
  header: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'flex-start' as const,
    marginBottom: 24,
  },
  addButton: {
    backgroundColor: colors.primary,
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    boxShadow: `0px 4px 12px ${colors.shadow}`,
    elevation: 4,
  },
  emptyState: {
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  buttonGroup: {
    width: '100%',
    alignItems: 'center' as const,
  },
};
