
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { commonStyles, colors, buttonStyles } from '../styles/commonStyles';
import { Token } from '../types';
import SimpleBottomSheet from './BottomSheet';
import Button from './Button';

interface AddTokenSheetProps {
  isVisible: boolean;
  onClose: () => void;
  onAddToken: (token: Omit<Token, 'id'>) => void;
  editingToken?: Token;
}

export default function AddTokenSheet({ isVisible, onClose, onAddToken, editingToken }: AddTokenSheetProps) {
  const [symbol, setSymbol] = useState(editingToken?.symbol || '');
  const [name, setName] = useState(editingToken?.name || '');
  const [quantity, setQuantity] = useState(editingToken?.quantity?.toString() || '');
  const [purchasePrice, setPurchasePrice] = useState(editingToken?.purchasePrice?.toString() || '');
  const [currentPrice, setCurrentPrice] = useState(editingToken?.currentPrice?.toString() || '');
  const [targetMultiplier, setTargetMultiplier] = useState(editingToken?.targetMultiplier?.toString() || '');

  const resetForm = () => {
    setSymbol('');
    setName('');
    setQuantity('');
    setPurchasePrice('');
    setCurrentPrice('');
    setTargetMultiplier('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = () => {
    if (!symbol || !name || !quantity || !purchasePrice || !currentPrice) {
      console.log('Please fill all required fields');
      return;
    }

    const token: Omit<Token, 'id'> = {
      symbol: symbol.toUpperCase(),
      name,
      quantity: parseFloat(quantity),
      purchasePrice: parseFloat(purchasePrice),
      currentPrice: parseFloat(currentPrice),
      purchaseDate: editingToken?.purchaseDate || new Date(),
      targetMultiplier: targetMultiplier ? parseFloat(targetMultiplier) : undefined,
    };

    onAddToken(token);
    handleClose();
    console.log('Token submitted:', token);
  };

  return (
    <SimpleBottomSheet isVisible={isVisible} onClose={handleClose}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={[commonStyles.subtitle, styles.title]}>
          {editingToken ? 'Edit Token' : 'Add New Token'}
        </Text>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Symbol *</Text>
            <TextInput
              style={styles.input}
              value={symbol}
              onChangeText={setSymbol}
              placeholder="BTC, ETH, ADA..."
              placeholderTextColor={colors.textSecondary}
              autoCapitalize="characters"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name *</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Bitcoin, Ethereum, Cardano..."
              placeholderTextColor={colors.textSecondary}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.label}>Quantity *</Text>
              <TextInput
                style={styles.input}
                value={quantity}
                onChangeText={setQuantity}
                placeholder="0.00"
                placeholderTextColor={colors.textSecondary}
                keyboardType="numeric"
              />
            </View>

            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.label}>Purchase Price *</Text>
              <TextInput
                style={styles.input}
                value={purchasePrice}
                onChangeText={setPurchasePrice}
                placeholder="0.00"
                placeholderTextColor={colors.textSecondary}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.label}>Current Price *</Text>
              <TextInput
                style={styles.input}
                value={currentPrice}
                onChangeText={setCurrentPrice}
                placeholder="0.00"
                placeholderTextColor={colors.textSecondary}
                keyboardType="numeric"
              />
            </View>

            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.label}>Target (x2, x3...)</Text>
              <TextInput
                style={styles.input}
                value={targetMultiplier}
                onChangeText={setTargetMultiplier}
                placeholder="2"
                placeholderTextColor={colors.textSecondary}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              text={editingToken ? 'Update Token' : 'Add Token'}
              onPress={handleSubmit}
              style={buttonStyles.primary}
              textStyle={{ color: colors.background }}
            />
            
            <Button
              text="Cancel"
              onPress={handleClose}
              style={[buttonStyles.secondary, { marginTop: 12 }]}
              textStyle={{ color: colors.text }}
            />
          </View>
        </View>
      </ScrollView>
    </SimpleBottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
  },
  form: {
    paddingBottom: 40,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.background,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  buttonContainer: {
    marginTop: 20,
  },
});
