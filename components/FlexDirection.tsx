import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function FlexDirection() {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: '100%' }}>
      <View style={styles.box}></View>
      <View style={{...styles.box, backgroundColor: 'green'}}></View>
      <View style={{...styles.box, backgroundColor: 'red'}}></View>
    </View>
  )
}

const styles = StyleSheet.create({
    box: {
        height: 80,
        width: 80,
        backgroundColor: 'blue',
    },
})