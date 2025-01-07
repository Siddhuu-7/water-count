import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import FirstPage from './Layout/Starting/FirstPage';
import Gender from './Layout/Starting/Gender';
import Weight from './Layout/Starting/Weight';
import Home from './Layout/Home';
import Start from './Layout/Starting/Start';
import Preparation from './Layout/Starting/Preparation';
import History from './Layout/History/History';
import Set from './Layout/Settings/Set';
import { RemoveOutDatedData } from './Layout/Logic/StoredValues';
import { StatusBar } from 'react-native'; // Optional: To customize the status bar
import AgeCalculator from './Layout/Starting/AgeCalculator';

const Stack = createNativeStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState('FirstPage');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkIsThere();
    RemoveOutDatedData();
  }, []);

  const checkIsThere = async () => {
    try {
      const data = await AsyncStorage.getItem('weight');
      if (data) {
        setInitialRoute('Home');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" /> 
      <Stack.Navigator 
        initialRouteName={initialRoute}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="FirstPage" component={FirstPage} />
        <Stack.Screen name='AgeCalculator' component={AgeCalculator}/>
         <Stack.Screen name="Gender" component={Gender} />
        <Stack.Screen name="Weight" component={Weight} />
        <Stack.Screen name="Preparation" component={Preparation} />
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen 
          name="History" 
          component={History} 
          options={{ headerShown: true }} 
        />
        <Stack.Screen 
          name="Settings" 
          component={Set} 
          options={{ headerShown: true }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
