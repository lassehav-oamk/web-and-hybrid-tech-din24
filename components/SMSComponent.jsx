import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
  ScrollView
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
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Send SMS</Text>

      {/* SMS Availability Status */}
      <View style={styles.statusContainer}>
        <Text style={styles.statusLabel}>SMS Available:</Text>
        <Text style={[
          styles.statusValue,
          { color: isSMSAvailable ? '#000' : '#888' }
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
          placeholderTextColor="#888"
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
          placeholderTextColor="#888"
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
    textAlign: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 20,
  },
  statusLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 8,
    color: '#000',
  },
  statusValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
    color: '#000',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    fontSize: 14,
    color: '#000',
  },
  textArea: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    fontSize: 14,
    minHeight: 100,
    color: '#000',
  },
  infoContainer: {
    backgroundColor: '#fff',
    padding: 12,
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  infoLabel: {
    fontSize: 12,
    color: '#000',
  },
  infoValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000',
  },
  warningText: {
    color: '#000',
    textDecorationLine: 'underline',
  },
  warningNote: {
    fontSize: 11,
    color: '#000',
    fontStyle: 'italic',
    marginTop: 6,
  },
  sendButton: {
    backgroundColor: '#000',
    padding: 14,
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#888',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  platformInfo: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 11,
    color: '#888',
  },
});
