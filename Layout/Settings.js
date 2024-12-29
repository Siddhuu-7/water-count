import React from 'react';
import { View } from 'react-native';
import { OutButton } from './Buttons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native';
import About from './About';
export default function Settings() {
  const navigation = useNavigation();
  
  return (
    
        <View style={{ flex: 1, justifyContent: 'flex-end', padding: 20 }}>
            <About style={{
                // paddingBottom:450,
                // fontFamily
            }
            }/>
      <OutButton 
        name="Logout" 
        callback={async () => {
          await AsyncStorage.removeItem('userData');
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }]
          });
        }} 
        style={{
          backgroundColor: 'red',
          padding: 10,
          borderRadius: 10,
          marginBottom: 20,
          width: '100%',
        }}
      /> 
    </View>
    
  )
}
