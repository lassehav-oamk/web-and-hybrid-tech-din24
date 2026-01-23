import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useState } from 'react';

import HelloWorld from './components/HelloWorld';
import Greeter from './components/Greeter';
import InputGreeter from './components/InputGreeter';
import FlexDirection from './components/FlexDirection';
import ImageTest from './components/ImageTest';
import AntDesign from '@expo/vector-icons/AntDesign';
import ScrollViewDemo from './components/ScrollViewDemo';
import FlatListDemo from './components/FlatListDemo';
import PerformanceDemo from './components/PerformanceDemo';
import ShakeDetector from './components/ShakeDetector';
import { Accelerometer } from 'expo-sensors';
import AccelerometerDemo from './components/AccelerometerDemo';
import Compass from './components/Compass';
import TiltController from './components/TiltController';
import GeolocationDemo from './components/GeolocationDemo';
import SMSComponent from './components/SMSComponent';
import StackNavigatorDemo from './components/navigationDemo1/StackNavigatorDemo';
import TabNavigatorDemo from './components/navigationDemo1/TabNavigatorDemo';
import SimpleStackNavDemo from './components/navigationDemo1/SimpleStackNavDemo';
import TabNavContextDemo from './components/navigationDemo2/TabNavContextDemo';

export default function App() {
  const [useFlatList, setUseFlatList] = useState(true);

  const test = { fontSize: 60 };

  return (
   <StackNavigatorDemo />
    // <TabNavigatorDemo />
    // <SimpleStackNavDemo />
    // <TabNavContextDemo />
  )
    
  
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    backgroundColor: '#d9bbbbff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  toggleButton: {
    backgroundColor: '#1976D2',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  toggleText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
