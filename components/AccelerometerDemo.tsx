import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { Accelerometer } from 'expo-sensors';

export default function AccelerometerDemo() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [z, setZ] = useState(0);
  const [isMonitoring, setIsMonitoring] = useState(false);

  const subscription = useRef<any>(null);

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
    Accelerometer.setUpdateInterval(100);

    subscription.current = Accelerometer.addListener(accelerometerData => {
      const { x, y, z } = accelerometerData;
      setX(x);
      setY(y);
      setZ(z);

      //console.log(x)
      if(x > 5) {
        console.log("SHAKE")
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Accelerometer Demo</Text>
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
              <Text style={styles.valueText}>{x.toFixed(3)}</Text>
            </View>
            <View style={styles.valueBox}>
              <Text style={styles.valueLabel}>Y</Text>
              <Text style={styles.valueText}>{y.toFixed(3)}</Text>
            </View>
            <View style={styles.valueBox}>
              <Text style={styles.valueLabel}>Z</Text>
              <Text style={styles.valueText}>{z.toFixed(3)}</Text>
            </View>
          </View>
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
        </View>

        <View>
          <Text style={styles.infoTitle}>About:</Text>
          <Text style={styles.infoText}>
            X: Left/Right tilt{'\n'}
            Y: Forward/Backward tilt{'\n'}
            Z: Up/Down movement{'\n'}
            Values are in g-force (1g ≈ 9.81 m/s²)
          </Text>
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
    backgroundColor: '#2196F3',
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
    padding: 5,
  },
  valuesContainer: {
    backgroundColor: '#fff',
    paddingBottom: 16,
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
  },
  valueBox: {
    alignItems: 'center',
    backgroundColor: '#BBDEFB',
    padding: 1,
    flex: 1,
  },
  valueLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1565C0',
    marginBottom: 8,
  },
  valueText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0D47A1',
  },
  buttonContainer: {
    marginBottom: 16,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#4CAF50',
  },
  stopButton: {
    backgroundColor: '#F44336',
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
