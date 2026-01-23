import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { UserProvider } from './UserContext';
import UserProfile from './screens/UserProfile';
import Dashboard from './screens/Dashboard';

const Tab = createBottomTabNavigator();

export default function TabNavContextDemo() {
  return (
    <SafeAreaProvider>
      <UserProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName: keyof typeof Ionicons.glyphMap;

                if (route.name === 'UserProfile') {
                  iconName = focused ? 'person' : 'person-outline';
                } else if (route.name === 'Dashboard') {
                  iconName = focused ? 'grid' : 'grid-outline';
                } else {
                  iconName = 'help';
                }

                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: '#007AFF',
              tabBarInactiveTintColor: 'gray',
            })}
          >
            <Tab.Screen
              name="UserProfile"
              component={UserProfile}
              options={{ title: 'User Profile' }}
            />
            <Tab.Screen
              name="Dashboard"
              component={Dashboard}
              options={{ title: 'Dashboard' }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </UserProvider>
    </SafeAreaProvider>
  );
}
