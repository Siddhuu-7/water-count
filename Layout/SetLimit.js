import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import RocketLaunchAnimation from './RocketLaunchAnimation';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SetLimit( ) {
  const navigation = useNavigation();
  const [number, onChangeNumber] = useState('');
  const [Launch, setLaunch] = useState(false);
 const [warning,setWarning]=useState(false)
  const storeDailyLimit = async (value) => {
    try { 
      await AsyncStorage.setItem('dailyWaterLimit', value.toString());
      console.log('Daily limit stored:', value);
    } catch (error) {
      console.error('Error storing daily limit:', error);
    }
  };

  
  const handlePress = () => {
    if (warning) {
      
      setWarning(false);
    } else {
      
      Alert.alert(
        "Warning",
        "If you try to reset your limit again, your consumed water will be deleted",
        [{ text: "OK" }]
      );
      setWarning(true);
      return; 
    }

    if (!number || isNaN(number) || parseInt(number, 10) <= 0) {
      Alert.alert('Please enter a valid positive number');
      return;
    }
    
    storeDailyLimit(number);
    setLaunch(true);
    onChangeNumber('');
    
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <RocketLaunchAnimation shouldLaunch={Launch} />

      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Set Your Limit (ml)"
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Set Limit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 25,
    borderColor: 'gray',
  },
  button: {
    backgroundColor: 'red',
    borderRadius: 25,
    padding: 10,
    paddingHorizontal: 20,
    elevation: 2,
    width: 100,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});
