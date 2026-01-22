import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

function TabA() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tab A</Text>
    </View>
  );
}

function TabB() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tab B</Text>
    </View>
  );
}

function TabC() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tab C</Text>
    </View>
  );
}

export default function TabNavigatorDemo() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="A" component={TabA} />
          <Tab.Screen name="B" component={TabB} />
          <Tab.Screen name="C" component={TabC} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
});
