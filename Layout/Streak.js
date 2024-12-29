import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Streak() {
  const [streakArray, setStreakArray] = useState([]);
  const [storedLength, setStoredLength] = useState(0);
  const currentDate = new Date();
  const date = currentDate.getDate();

  useEffect(() => {
    const manageStreak = async () => {
      try {
        const storedStreak = await AsyncStorage.getItem('streakArray');
        const parsedStreak = storedStreak ? JSON.parse(storedStreak) : [];

      
        if (parsedStreak.includes(' ') || (parsedStreak.length > 0 && !parsedStreak.includes(date - 1))) {
          setStreakArray([date]); 
          await AsyncStorage.setItem('streakArray', JSON.stringify([date]));
          await AsyncStorage.setItem('StreakArrayLength', '1');
          setStoredLength(1);
        } else {
          
          if (!parsedStreak.includes(date)) {
            const updatedStreak = [...parsedStreak, date];
            setStreakArray(updatedStreak);
            await AsyncStorage.setItem('streakArray', JSON.stringify(updatedStreak));
            await AsyncStorage.setItem('StreakArrayLength', updatedStreak.length.toString());
            setStoredLength(updatedStreak.length);
          } else {
            setStoredLength(parsedStreak.length); 
          }
        }
      } catch (error) {
        console.error('Error managing streak:', error);
      }
    };

    manageStreak();
  }, [date]);

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Text style={styles.fireSymbol}>
          {storedLength || 0}🔥
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 15,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fireSymbol: {
    fontSize: 30,
  },
});
