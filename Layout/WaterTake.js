import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AnimatedNumbers from 'react-native-animated-numbers';

export default function WaterTake({ waterTaken }) {
  const [dailyLimit, setDailyLimit] = useState(0);
  const [storedWaterTaken, setStoredWaterTaken] = useState(0);

  useEffect(() => {
    const initializeData = async () => {
      const storedValue = await AsyncStorage.getItem('waterTaken');
      const lastUpdateDate = await AsyncStorage.getItem('lastUpdateDate');
      const today = new Date().toDateString();

      if (lastUpdateDate !== today) {
        await AsyncStorage.setItem('waterTaken', '0');
        setStoredWaterTaken(0);
        await AsyncStorage.setItem('lastUpdateDate', today);
      } else if (storedValue !== null) {
        setStoredWaterTaken(parseInt(storedValue, 10));
      }
    };

    getDailyLimit();
    initializeData();
  }, []);

  useEffect(() => {
    const validWaterTaken = waterTaken || 0;
    storeWaterTaken(validWaterTaken);
    setStoredWaterTaken(validWaterTaken);
  }, [waterTaken]);

  const getDailyLimit = async () => {
    try {
      const value = await AsyncStorage.getItem('dailyWaterLimit');
      
      setDailyLimit(parseInt(value, 10));
    } catch (error) {
      console.error('Error getting daily limit:', error);
    }
  };

  const storeWaterTaken = async (value) => {
    try {
      await AsyncStorage.setItem('waterTaken', value.toString());
      const savedValue = await AsyncStorage.getItem('waterTaken');
      // console.log(savedValue,"know debuging this ","this value is",value.toString())
    } catch (error) {
      console.error('Error storing water taken:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.numberContainer}>
        <AnimatedNumbers
          animateToNumber={parseInt(storedWaterTaken || 0)}
          fontStyle={styles.text}
          duration={1000}
        />
        <Text style={styles.text}>/</Text>
        <AnimatedNumbers
          animateToNumber={dailyLimit}
          fontStyle={styles.text}
          duration={1000}
        />
        <Text style={styles.text}>ml</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  text: {
    fontSize: 25,
    fontFamily: 'Italic',
    color: 'black',
  },
});
