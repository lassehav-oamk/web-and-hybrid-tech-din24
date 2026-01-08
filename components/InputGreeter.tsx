import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState } from 'react'

export default function InputGreeter() {
    const [text, setText] = useState('');

    return (
        <View>
            <Text>InputGreeter</Text>
            <TextInput placeholder="Type your name here to be greeted"
                onChangeText={text => setText(text)}
            />
            <Text>Hello, {text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({})