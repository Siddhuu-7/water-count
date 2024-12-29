import React, { useState, useEffect } from 'react'
import { View, StyleSheet,Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AnimatedNumbers from 'react-native-animated-numbers'

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
        
        setStoredWaterTaken(parseInt(storedValue));
      }
    };

    getDailyLimit();
    initializeData();
  }, []);

  useEffect(() => {
    storeWaterTaken(waterTaken);
    setStoredWaterTaken(waterTaken);
  }, [waterTaken]);

  const getDailyLimit = async () => {
    try {
      const value = await AsyncStorage.getItem('dailyWaterLimit');
      if (value !== null) {
        setDailyLimit(parseInt(value));
      }
    } catch (error) {
      
      console.error('Error getting daily limit:', error);
    }
  };

  const storeWaterTaken = async (value) => {
    try {
      await AsyncStorage.setItem('waterTaken', value.toString());
    } catch (error) {
      console.error('Error storing water taken:', error);
    }
  };

  const DailyTakeCheck = () => {
    return storedWaterTaken >= dailyLimit;
  }

  return (
    <View style={styles.container}>
      {DailyTakeCheck() ? (
        <Text style={styles.text}>You Reached Your Limit</Text>
      ) : (
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
      )}
    </View>
  )
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
    color: "black"
  }
})
