import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import HelloWorld from './components/HelloWorld';
import Greeter from './components/Greeter';
import InputGreeter from './components/InputGreeter';
import FlexDirection from './components/FlexDirection';
import ImageTest from './components/ImageTest';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function App() {

  const test = { fontSize: 60 };

  return (
    <View style={styles.container}>
      {/* <Text style={test}>Hello react native world!</Text>
      <Text>This kind of text is  allowed</Text>
      <HelloWorld />

      <Greeter username="Lasse" />

      <InputGreeter />

      <StatusBar style="auto" /> */}
      <FlexDirection />
      <ImageTest />
      <AntDesign name="api" size={24} color="black" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    backgroundColor: '#d9bbbbff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
