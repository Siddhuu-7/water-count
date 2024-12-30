import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'

export default function Streak(callback) {
  const [streak, setStreak] = useState(0);

  const loadStreak = async () => {
    try {
      const savedStreak = await AsyncStorage.getItem('currentStreak');
      const lastUpdate = await AsyncStorage.getItem('lastStreakUpdate');
      
      if (savedStreak) {
        setStreak(parseInt(savedStreak));
      }
      return { savedStreak, lastUpdate };
    } catch (error) {
      console.error("Error loading streak:", error);
    }
  };

  const checkDayTask = async () => {
    try {
      const waterTaken = await AsyncStorage.getItem('waterTaken');
      const limit = await AsyncStorage.getItem('dailyWaterLimit');
      
      if (!waterTaken || !limit) {
        console.log("Water taken or limit is null");
        return false;
      }

      return parseInt(waterTaken) >= parseInt(limit);
    } catch (error) {
      console.error("Error checking day task:", error);
      return false;
    }
  }

  useEffect(() => {
    const updateStreak = async () => {
      const { lastUpdate } = await loadStreak();
      const today = new Date().toDateString();
      const storedStreak=await AsyncStorage.getItem('SavedStreak')
      console.log(storedStreak,"this from streak Component")
      if (lastUpdate !== today) {
        const completed = await checkDayTask();
        if (completed) {
          const newStreak = streak + 1;
          
          setStreak(newStreak);
          
          await AsyncStorage.setItem('currentStreak', newStreak.toString());
          await AsyncStorage.setItem('lastStreakUpdate', today);
        } else {
          setStreak(0);
          await AsyncStorage.setItem('currentStreak', '0');
        }
      }
    };

    updateStreak();
  }, [callback]); 

  return (
    <View>
      <Text>
        {streak + ' 🔥'}
      </Text>
    </View>
  )
}
