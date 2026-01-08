import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import HelloWorld from './components/HelloWorld';
import Greeter from './components/Greeter';
import InputGreeter from './components/InputGreeter';
import FlexDirection from './components/FlexDirection';

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
