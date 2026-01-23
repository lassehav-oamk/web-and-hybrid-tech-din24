import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Screen1 from './demoScreens/Test';
import Test from './demoScreens/Test';
import NavDestination from './demoScreens/NavDestination';


const Stack = createNativeStackNavigator();

export default function SimpleStackNavDemo() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Test'>
            <Stack.Screen name="Test" component={ Test } />
            <Stack.Screen name="NavDestination" component={ NavDestination } />
        </Stack.Navigator>
    </NavigationContainer>
  )
}