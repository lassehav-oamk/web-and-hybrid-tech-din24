import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export default function GeolocationDemo() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<string>('unknown');
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    const { status } = await Location.getForegroundPermissionsAsync();
    setPermissionStatus(status);
  };

  const requestPermissions = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    setPermissionStatus(status);

    if (status !== 'granted') {
      Alert.alert(
        'Permission Denied',
        'Location permission is required to use this feature. Please enable it in your device settings.',
        [{ text: 'OK' }]
      );
      setErrorMsg('Location permission denied');
      return false;
    }
    return true;
  };

  const getCurrentLocation = async () => {
    if (permissionStatus !== 'granted') {
      const granted = await requestPermissions();
      if (!granted) return;
    }

    try {
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setLocation(currentLocation);
      setLastUpdate(new Date());
      setErrorMsg(null);
    } catch (error) {
      setErrorMsg('Error getting current location');
      console.error(error);
    }
  };

  const formatTimestamp = (date: Date | null) => {
    if (!date) return 'N/A';
    return date.toLocaleTimeString();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Geolocation Demo</Text>
        <Text style={styles.headerSubtitle}>
          {permissionStatus === 'granted' ? 'Ready' : 'Permission Required'}
        </Text>
      </View>

      <View style={styles.content}>
        {errorMsg && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{errorMsg}</Text>
          </View>
        )}

        <View style={styles.valuesContainer}>
          <Text style={styles.sectionTitle}>Location Data</Text>

          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Latitude:</Text>
            <Text style={styles.dataValue}>
              {location ? location.coords.latitude.toFixed(6) : 'N/A'}
            </Text>
          </View>

          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Longitude:</Text>
            <Text style={styles.dataValue}>
              {location ? location.coords.longitude.toFixed(6) : 'N/A'}
            </Text>
          </View>

          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Accuracy:</Text>
            <Text style={styles.dataValue}>
              {location?.coords.accuracy
                ? `${location.coords.accuracy.toFixed(2)} m`
                : 'N/A'}
            </Text>
          </View>

          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Altitude:</Text>
            <Text style={styles.dataValue}>
              {location?.coords.altitude
                ? `${location.coords.altitude.toFixed(2)} m`
                : 'N/A'}
            </Text>
          </View>

          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Speed:</Text>
            <Text style={styles.dataValue}>
              {location?.coords.speed
                ? `${location.coords.speed.toFixed(2)} m/s`
                : 'N/A'}
            </Text>
          </View>

          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Last Update:</Text>
            <Text style={styles.dataValue}>{formatTimestamp(lastUpdate)}</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={getCurrentLocation}
          >
            <Text style={styles.buttonText}>Get Current Location</Text>
          </TouchableOpacity>
        </View>

        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#4CAF50',
    padding: 20,
    paddingTop: 40,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  errorContainer: {
    backgroundColor: '#FFEBEE',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#F44336',
  },
  errorText: {
    color: '#C62828',
    fontSize: 14,
    fontWeight: '600',
  },
  valuesContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dataLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  dataValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  buttonContainer: {
    marginBottom: 16,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});
