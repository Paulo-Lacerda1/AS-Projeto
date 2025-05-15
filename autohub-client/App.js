import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import RegisterOptionsScreen from './screens/RegisterOptionsScreen';
import RegisterUserScreen from './screens/RegisterUserScreen';
import RegisterProviderScreen from './screens/RegisterProviderScreen';
import EmailConfirmationScreen from './screens/EmailConfirmationScreen';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterOptions"
          component={RegisterOptionsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterUser"
          component={RegisterUserScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterProvider"
          component={RegisterProviderScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EmailConfirmation"
          component={EmailConfirmationScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}