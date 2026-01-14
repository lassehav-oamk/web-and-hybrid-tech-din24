import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform
} from 'react-native';
import * as SMS from 'expo-sms';

export default function SMSComponent() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [isSMSAvailable, setIsSMSAvailable] = useState(false);

  // SMS character limits
  const SINGLE_SMS_LIMIT = 160;
  const MULTI_SMS_LIMIT = 153; // Character limit per segment for multi-part messages

  useEffect(() => {
    checkSMSAvailability();
  }, []);

  const checkSMSAvailability = async () => {
    const isAvailable = await SMS.isAvailableAsync();
    setIsSMSAvailable(isAvailable);

    if (!isAvailable) {
      Alert.alert(
        'SMS Not Available',
        'SMS messaging is not available on this device.',
        [{ text: 'OK' }]
      );
    }
  };

  const calculateSegmentCount = () => {
    const messageLength = message.length;

    if (messageLength === 0) return 0;
    if (messageLength <= SINGLE_SMS_LIMIT) return 1;

    return Math.ceil(messageLength / MULTI_SMS_LIMIT);
  };

  const handleSendSMS = async () => {
    // Validate phone number
    if (!phoneNumber.trim()) {
      Alert.alert('Error', 'Please enter a phone number');
      return;
    }

    // Validate message
    if (!message.trim()) {
      Alert.alert('Error', 'Please enter a message');
      return;
    }

    // Check if SMS is available
    if (!isSMSAvailable) {
      Alert.alert(
        'SMS Not Available',
        'SMS messaging is not available on this device.'
      );
      return;
    }

    try {
      const { result } = await SMS.sendSMSAsync(
        [phoneNumber],
        message
      );

      if (result === 'sent') {
        Alert.alert('Success', 'SMS sent successfully!');
        // Optional: Clear form after successful send
        // setPhoneNumber('');
        // setMessage('');
      } else if (result === 'cancelled') {
        Alert.alert('Cancelled', 'SMS sending was cancelled');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to send SMS: ' + error.message);
    }
  };

  const segmentCount = calculateSegmentCount();
  const messageLength = message.length;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Send SMS</Text>

      {/* SMS Availability Status */}
      <View style={styles.statusContainer}>
        <Text style={styles.statusLabel}>SMS Available:</Text>
        <Text style={[
          styles.statusValue,
          { color: isSMSAvailable ? '#4CAF50' : '#F44336' }
        ]}>
          {isSMSAvailable ? 'Yes' : 'No'}
        </Text>
      </View>

      {/* Phone Number Input */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter phone number"
          placeholderTextColor="#999"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          editable={isSMSAvailable}
        />
      </View>

      {/* Message Input */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Message</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Enter your message"
          placeholderTextColor="#999"
          value={message}
          onChangeText={setMessage}
          multiline
          numberOfLines={6}
          textAlignVertical="top"
          editable={isSMSAvailable}
        />
      </View>

      {/* Character Count and Segment Info */}
      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Character Count:</Text>
          <Text style={[
            styles.infoValue,
            messageLength > SINGLE_SMS_LIMIT && styles.warningText
          ]}>
            {messageLength}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>SMS Segments:</Text>
          <Text style={[
            styles.infoValue,
            segmentCount > 1 && styles.warningText
          ]}>
            {segmentCount}
          </Text>
        </View>

        {segmentCount > 1 && (
          <Text style={styles.warningNote}>
            Long messages will be sent as {segmentCount} separate SMS segments
          </Text>
        )}
      </View>

      {/* Send Button */}
      <TouchableOpacity
        style={[
          styles.sendButton,
          !isSMSAvailable && styles.sendButtonDisabled
        ]}
        onPress={handleSendSMS}
        disabled={!isSMSAvailable}
      >
        <Text style={styles.sendButtonText}>Send SMS</Text>
      </TouchableOpacity>

      {/* Platform Info */}
      <Text style={styles.platformInfo}>
        Platform: {Platform.OS}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
    color: '#333',
  },
  statusValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 120,
    color: '#333',
  },
  infoContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  warningText: {
    color: '#FF9800',
  },
  warningNote: {
    fontSize: 12,
    color: '#FF9800',
    fontStyle: 'italic',
    marginTop: 8,
  },
  sendButton: {
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  sendButtonDisabled: {
    backgroundColor: '#ccc',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  platformInfo: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 12,
    color: '#999',
  },
});
