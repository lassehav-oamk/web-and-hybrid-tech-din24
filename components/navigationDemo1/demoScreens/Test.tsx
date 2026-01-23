import { View, Text, Button } from 'react-native'
import React from 'react'

export default function Test({ navigation }) {
  return (
    <View>
      <Text>Test</Text>
      <Button title="Go to NavDest" onPress={() => {
        navigation.navigate('NavDestination');
      }} />
    </View>
  )
}