import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import testImage from '../assets/splash-icon.png';

export default function ImageTest() {
    //https://images.unsplash.com/photo-1762656669479-496d6291ef64?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D

  const someStateVariable = true;
  let someContent = <Text>Hello, Image Test!</Text>

  if(someStateVariable === false) {
    someContent = null;
  }

  return (
    <View>
      <Text testID="something">ImageTest</Text>
      <Image 
        source={{uri: 'https://images.unsplash.com/photo-1762656669479-496d6291ef64?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}}
        style={{width: 300, height: 200}}
      />
      <Text >Local image:</Text>
      <Image source={ testImage } style={{width: 200, height: 200}} />
      <Text>Conditional Rendering Examples:</Text>
      {someContent}
      { someStateVariable && <Text>Some state variable is true!</Text> }
      { someStateVariable ? <Text>Rendered via ternary operator!</Text> : null }
    </View>
  )
}

const styles = StyleSheet.create({})