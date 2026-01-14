import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Accelerometer } from 'expo-sensors';

export default function TiltController() {
  const [isActive, setIsActive] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let subscription: any;

    if (isActive) {
      Accelerometer.setUpdateInterval(100);

      subscription = Accelerometer.addListener(data => {
        setPosition(prev => ({
          x: prev.x + data.x * 10,
          y: prev.y - data.y * 10
        }));
      });
    }

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [isActive]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tilt Controller</Text>

      <View style={styles.playArea}>
        <View
          style={[
            styles.ball,
            {
              transform: [
                { translateX: position.x },
                { translateY: position.y }
              ],
            },
          ]}
        />
      </View>

      <TouchableOpacity
        style={[styles.button, isActive && styles.activeButton]}
        onPress={() => setIsActive(!isActive)}
      >
        <Text style={styles.buttonText}>
          {isActive ? 'Stop' : 'Start'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  playArea: {
    width: 300,
    height: 300,
    backgroundColor: '#fff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  ball: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#9C27B0',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 8,
  },
  activeButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
