import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

function View1({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>View 1</Text>
      <Button
        title="Go to View 2"
        onPress={() => navigation.navigate('View2')}
      />
    </View>
  );
}

function View2({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>View 2</Text>
      <Button
        title="Go to View 3"
        onPress={() => navigation.navigate('View3', {
          itemId: 42,
          message: 'Hello from View 2',
        })}
      />
    </View>
  );
}

function View3({ navigation, route }) {
  const { itemId, message } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>View 3</Text>
      <Text style={styles.param}>Item ID: {itemId}</Text>
      <Text style={styles.param}>Message: {message}</Text>
      <Button
        title="Go to View 1"
        onPress={() => navigation.navigate('View1')}
      />
      <Button title="Go to View 4" onPress={() => navigation.navigate('View4')} />
    </View>
  );
}

function View4(
  { navigation, counter, setCounter, route, extraData }:
  { navigation: any; counter: number; setCounter: React.Dispatch<React.SetStateAction<number>>; route: any; extraData: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>View 4</Text>
      <Text style={styles.param}>Extra Data: {extraData}</Text>      
      <Text style={styles.param}>Counter: {counter}</Text>
      <Button
        title="Increment Counter"
        onPress={() => setCounter(counter + 1)}
      />
      <Button
        title="Go to View 1"
        onPress={() => navigation.navigate('View1')}
      />
    </View>
  );
}

export default function StackNavigatorDemo() {

  const [counter, setCounter] = React.useState<number>(0);

  return (
      <SafeAreaProvider>
       <NavigationContainer>
         <Stack.Navigator>
           <Stack.Screen name="View1" component={View1} options={{ title: 'View 1' }} />
           <Stack.Screen name="View2" component={View2} options={{ title: 'View 2' }} />
           <Stack.Screen name="View3" component={View3} options={{ title: 'View 3' }} initialParams={{ itemId: 0, message: 'No message' }} />
           <Stack.Screen name="View4">
              {props => (<View4 {...props} extraData="Some extra data" counter={counter} setCounter={setCounter} />)}
           </Stack.Screen>
         </Stack.Navigator>
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
    marginBottom: 20,
  },
  param: {
    fontSize: 16,
    marginBottom: 10,
  },
});
