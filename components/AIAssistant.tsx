
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles, colors } from '../styles/commonStyles';
import Icon from './Icon';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.card,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600' as const,
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
  },
  messageWrapper: {
    marginBottom: 16,
  },
  userMessage: {
    alignSelf: 'flex-end' as const,
    backgroundColor: colors.primary,
    borderRadius: 16,
    borderBottomRightRadius: 4,
    padding: 12,
    maxWidth: '80%',
  },
  aiMessage: {
    alignSelf: 'flex-start' as const,
    backgroundColor: colors.card,
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    padding: 12,
    maxWidth: '80%',
    borderWidth: 1,
    borderColor: colors.border,
  },
  userMessageText: {
    color: 'white',
    fontSize: 16,
  },
  aiMessageText: {
    color: colors.text,
    fontSize: 16,
  },
  timestamp: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
    alignSelf: 'flex-end' as const,
  },
  inputContainer: {
    flexDirection: 'row' as const,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.card,
    alignItems: 'flex-end' as const,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    maxHeight: 100,
    backgroundColor: colors.background,
    color: colors.text,
  },
  sendButton: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    padding: 32,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: colors.text,
    textAlign: 'center' as const,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center' as const,
    lineHeight: 20,
  },
  suggestionContainer: {
    marginTop: 24,
  },
  suggestion: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  suggestionText: {
    color: colors.text,
    fontSize: 14,
  },
};

const SAMPLE_RESPONSES = [
  "Привіт! Я GreenRat AI, ваш персональний криптоаналітик. Як можу допомогти з вашим портфелем?",
  "На основі поточних трендів, рекомендую розглянути диверсифікацію портфеля.",
  "Bitcoin показує сильну підтримку на рівні $40,000. Це може бути хорошою точкою входу.",
  "Ethereum готується до важливих оновлень. Варто стежити за новинами.",
  "Ваш портфель показує хороший ріст. Розгляньте фіксацію частини прибутку.",
];

const SUGGESTIONS = [
  "Проаналізуй мій портфель",
  "Які токени рекомендуєш?",
  "Коли продавати Bitcoin?",
  "Стратегія на ведмежий ринок",
];

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: SAMPLE_RESPONSES[Math.floor(Math.random() * SAMPLE_RESPONSES.length)],
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const sendSuggestion = (suggestion: string) => {
    setInputText(suggestion);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('uk-UA', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>GreenRat AI Assistant</Text>
        <Text style={styles.headerSubtitle}>
          Ваш персональний криптоаналітик
        </Text>
      </View>

      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          style={styles.messagesContainer}
          showsVerticalScrollIndicator={false}
        >
          {messages.length === 0 ? (
            <View style={styles.emptyState}>
              <Icon name="chatbubble-ellipses" size={48} color={colors.primary} />
              <Text style={styles.emptyStateText}>
                Привіт! Я ваш AI помічник
              </Text>
              <Text style={styles.emptyStateSubtext}>
                Запитайте мене про криптовалюти, аналіз ринку або стратегії торгівлі
              </Text>
              
              <View style={styles.suggestionContainer}>
                {SUGGESTIONS.map((suggestion, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.suggestion}
                    onPress={() => sendSuggestion(suggestion)}
                  >
                    <Text style={styles.suggestionText}>{suggestion}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ) : (
            <>
              {messages.map((message) => (
                <View key={message.id} style={styles.messageWrapper}>
                  <View style={message.isUser ? styles.userMessage : styles.aiMessage}>
                    <Text style={message.isUser ? styles.userMessageText : styles.aiMessageText}>
                      {message.text}
                    </Text>
                  </View>
                  <Text style={styles.timestamp}>
                    {formatTime(message.timestamp)}
                  </Text>
                </View>
              ))}
              
              {isTyping && (
                <View style={styles.messageWrapper}>
                  <View style={styles.aiMessage}>
                    <Text style={styles.aiMessageText}>
                      GreenRat друкує...
                    </Text>
                  </View>
                </View>
              )}
            </>
          )}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder="Напишіть ваше запитання..."
            placeholderTextColor={colors.textSecondary}
            multiline
            maxLength={500}
            onSubmitEditing={sendMessage}
            blurOnSubmit={false}
          />
          <TouchableOpacity 
            style={styles.sendButton} 
            onPress={sendMessage}
            disabled={!inputText.trim() || isTyping}
          >
            <Icon 
              name="send" 
              size={20} 
              color="white" 
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
