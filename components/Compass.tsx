import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { Magnetometer } from 'expo-sensors';

export default function Compass() {
  const [heading, setHeading] = useState(0);
  const [magnetometerData, setMagnetometerData] = useState({ x: 0, y: 0, z: 0 });
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [accuracy, setAccuracy] = useState<number | null>(null);

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

  const calculateHeading = (x: number, y: number) => {
    // Calculate heading in degrees from magnetometer data
    let angle = Math.atan2(y, x) * (180 / Math.PI);

    // Normalize to 0-360 range
    if (angle < 0) {
      angle += 360;
    }

    return angle;
  };

  const getCardinalDirection = (degrees: number) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  };

  const startMonitoring = () => {
    Magnetometer.setUpdateInterval(100);

    subscription.current = Magnetometer.addListener(data => {
      const { x, y, z, accuracy } = data;
      setMagnetometerData({ x, y, z });

      // Calculate heading from magnetic field
      const calculatedHeading = calculateHeading(x, y);
      setHeading(calculatedHeading);

      // Set accuracy if available (iOS specific)
      if (accuracy !== undefined) {
        setAccuracy(accuracy);
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

  const cardinalDirection = getCardinalDirection(heading);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Digital Compass</Text>
        <Text style={styles.headerSubtitle}>
          {isMonitoring ? 'Monitoring Active' : 'Monitoring Paused'}
        </Text>
      </View>

      <View style={styles.content}>
        {/* Compass Display */}
        <View style={styles.compassContainer}>
          <View style={styles.compassCircle}>
            {/* Cardinal directions around the circle */}
            <Text style={[styles.cardinalLabel, styles.northLabel]}>N</Text>
            <Text style={[styles.cardinalLabel, styles.eastLabel]}>E</Text>
            <Text style={[styles.cardinalLabel, styles.southLabel]}>S</Text>
            <Text style={[styles.cardinalLabel, styles.westLabel]}>W</Text>

            {/* Compass needle */}
            <View
              style={[
                styles.needle,
                { transform: [{ rotate: `${heading}deg` }] }
              ]}
            >
              <View style={styles.needleNorth} />
              <View style={styles.needleSouth} />
            </View>

            {/* Center dot */}
            <View style={styles.centerDot} />
          </View>
        </View>

        {/* Heading Information */}
        <View style={styles.headingContainer}>
          <View style={styles.headingBox}>
            <Text style={styles.headingLabel}>Heading</Text>
            <Text style={styles.headingValue}>{Math.round(heading)}°</Text>
          </View>
          <View style={styles.headingBox}>
            <Text style={styles.headingLabel}>Direction</Text>
            <Text style={styles.headingValue}>{cardinalDirection}</Text>
          </View>
        </View>

        {/* Magnetometer Data */}
        <View style={styles.dataContainer}>
          <Text style={styles.sectionTitle}>Magnetometer Data (μT)</Text>
          <View style={styles.valueRow}>
            <View style={styles.valueBox}>
              <Text style={styles.valueLabel}>X</Text>
              <Text style={styles.valueText}>{magnetometerData.x.toFixed(2)}</Text>
            </View>
            <View style={styles.valueBox}>
              <Text style={styles.valueLabel}>Y</Text>
              <Text style={styles.valueText}>{magnetometerData.y.toFixed(2)}</Text>
            </View>
            <View style={styles.valueBox}>
              <Text style={styles.valueLabel}>Z</Text>
              <Text style={styles.valueText}>{magnetometerData.z.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {/* Control Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, isMonitoring ? styles.stopButton : styles.startButton]}
            onPress={handleStartStop}
          >
            <Text style={styles.buttonText}>
              {isMonitoring ? 'Stop Compass' : 'Start Compass'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Info Section */}
        <View>
          <Text style={styles.infoTitle}>About:</Text>
          <Text style={styles.infoText}>
            The compass uses the device's magnetometer to detect Earth's magnetic field.{'\n\n'}
            Heading: 0° = North, 90° = East, 180° = South, 270° = West{'\n\n'}
            {accuracy !== null && `Accuracy: ${accuracy} (iOS only)\n\n`}
            Note: Keep away from magnetic objects for accurate readings.
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
    backgroundColor: '#FF5722',
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
  compassContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  compassCircle: {
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: '#fff',
    borderWidth: 4,
    borderColor: '#FF5722',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    position: 'relative',
  },
  cardinalLabel: {
    position: 'absolute',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF5722',
  },
  northLabel: {
    top: 15,
  },
  eastLabel: {
    right: 20,
  },
  southLabel: {
    bottom: 15,
  },
  westLabel: {
    left: 20,
  },
  needle: {
    position: 'absolute',
    width: 4,
    height: 100,
    top: 75,
  },
  needleNorth: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 50,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#D32F2F',
    position: 'absolute',
    left: -6,
    top: 0,
  },
  needleSouth: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 50,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#757575',
    position: 'absolute',
    left: -6,
    top: 50,
  },
  centerDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FF5722',
    position: 'absolute',
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  headingBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headingLabel: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 8,
  },
  headingValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF5722',
  },
  dataContainer: {
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
    marginBottom: 12,
  },
  valueRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  valueBox: {
    alignItems: 'center',
    backgroundColor: '#FFCCBC',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
  },
  valueLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#D84315',
    marginBottom: 8,
  },
  valueText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#BF360C',
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
