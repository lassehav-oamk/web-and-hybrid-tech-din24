import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { Accelerometer } from 'expo-sensors';


export default function ShakeDetector() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [z, setZ] = useState(0);
  const [shakeCount, setShakeCount] = useState(0);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [shakeDetected, setShakeDetected] = useState(false);

  const subscription = useRef<any>(null); //React Hook that lets you reference a value that’s not needed for rendering. Changing this will not lead to a re-render.
  const lastShakeTime = useRef<number>(0);


  const SHAKE_THRESHOLD = 5;
  const SHAKE_COOLDOWN = 500; // milliseconds

  useEffect(() => {
    if (isMonitoring) {
      startMonitoring();
    } else {
      stopMonitoring();
    }

    return () => {
      stopMonitoring();
    };
  }, [isMonitoring]);

  const startMonitoring = () => {
    // Set accelerometer update interval
    Accelerometer.setUpdateInterval(100);

    subscription.current = Accelerometer.addListener(accelerometerData => {
      const { x, y, z } = accelerometerData;

      setX(x);
      setY(y);
      setZ(z);

      // Calculate magnitude: sqrt(x² + y² + z²)
      const magnitude = Math.sqrt(x * x + y * y + z * z);
      console.log(magnitude);

      // Detect shake when magnitude exceeds threshold
      const currentTime = Date.now();
      if (magnitude > SHAKE_THRESHOLD && currentTime - lastShakeTime.current > SHAKE_COOLDOWN) {
        lastShakeTime.current = currentTime;
        setShakeCount(prev => prev + 1);
      }
    });
  };

  const stopMonitoring = () => {
    if (subscription.current) {
      subscription.current.remove();
      subscription.current = null;
    }
  };


  const handleStartStop = () => {
    setIsMonitoring(!isMonitoring);
  };

  const handleReset = () => {
    setShakeCount(0);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shake Detector</Text>
        <Text style={styles.headerSubtitle}>
          {isMonitoring ? 'Monitoring Active' : 'Monitoring Paused'}
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.valuesContainer}>
          <Text style={styles.sectionTitle}>Accelerometer Values</Text>

          <View style={styles.valueRow}>
            <View style={styles.valueBox}>
              <Text style={styles.valueLabel}>X</Text>
              <Text style={styles.valueText}>{x.toFixed(2)}</Text>
            </View>
            <View style={styles.valueBox}>
              <Text style={styles.valueLabel}>Y</Text>
              <Text style={styles.valueText}>{y.toFixed(2)}</Text>
            </View>
            <View style={styles.valueBox}>
              <Text style={styles.valueLabel}>Z</Text>
              <Text style={styles.valueText}>{z.toFixed(2)}</Text>
            </View>
          </View>

          <View style={styles.magnitudeBox}>
            <Text style={styles.magnitudeLabel}>Magnitude</Text>
            <Text style={styles.magnitudeText}>
              {Math.sqrt(x * x + y * y + z * z).toFixed(2)}
            </Text>
            <Text style={styles.thresholdText}>Threshold: {SHAKE_THRESHOLD}</Text>
          </View>
        </View>

        <View style={styles.counterContainer}>
          <Text style={styles.counterLabel}>Shake Count</Text>
          <Text style={styles.counterValue}>{shakeCount}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, isMonitoring ? styles.stopButton : styles.startButton]}
            onPress={handleStartStop}
          >
            <Text style={styles.buttonText}>
              {isMonitoring ? 'Stop Monitoring' : 'Start Monitoring'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.resetButton]}
            onPress={handleReset}
          >
            <Text style={styles.buttonText}>Reset Counter</Text>
          </TouchableOpacity>
        </View>

        <View >
          <Text style={styles.infoTitle}>How it works:</Text>
          <Text style={styles.infoText}>
            • Subscribes to accelerometer updates every 100ms{'\n'}
            • Calculates magnitude from x, y, z values{'\n'}
            • Detects shake when magnitude {'>'} {SHAKE_THRESHOLD}{'\n'}
            • Prevents multiple detections with {SHAKE_COOLDOWN}ms cooldown{'\n'}
            • Cleans up subscription on unmount
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    paddingTop: 40,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    opacity: 0.9,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  valuesContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
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
    marginBottom: 12,
  },
  valueRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  valueBox: {
    alignItems: 'center',
    backgroundColor: '#E1BEE7',
    padding: 12,
    borderRadius: 8,
    minWidth: 90,
  },
  valueLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6A1B9A',
    marginBottom: 4,
  },
  valueText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A148C',
  },
  magnitudeBox: {
    alignItems: 'center',
    backgroundColor: '#F3E5F5',
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#9C27B0',
  },
  magnitudeLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6A1B9A',
    marginBottom: 4,
  },
  magnitudeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4A148C',
    marginBottom: 4,
  },
  thresholdText: {
    fontSize: 12,
    color: '#7B1FA2',
    fontStyle: 'italic',
  },
  counterContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  counterLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  counterValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#9C27B0',
  },
  shakeMessage: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  shakeMessageText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  buttonContainer: {
    marginBottom: 16,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  startButton: {
    backgroundColor: '#4CAF50',
  },
  stopButton: {
    backgroundColor: '#F44336',
  },
  resetButton: {
    backgroundColor: '#FF9800',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  infoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 12,
    color: '#555',
    lineHeight: 18,
  },
});
