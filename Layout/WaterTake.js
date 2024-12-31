import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AnimatedNumbers from 'react-native-animated-numbers';

export default function WaterTake({ waterTaken }) {
  const [dailyLimit, setDailyLimit] = useState(0);
 

  useEffect(() => {
    const checkAndResetWater = async () => {
      try {
        
        const lastDate = await AsyncStorage.getItem('lastWaterDate');
        const today = new Date().toDateString();

        
        if (!lastDate || lastDate !== today) {
          await AsyncStorage.multiSet([
            ['waterTaken', '0'],
            ['lastWaterDate', today]
          ]);
        }

        
        const dLimit = await AsyncStorage.getItem('dailyWaterLimit');
        setDailyLimit(dLimit ? parseInt(dLimit) : 0);
      } catch (error) {
        console.error('Error checking water reset:', error);
      }
    };

    checkAndResetWater();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.numberContainer}>
        <AnimatedNumbers
          animateToNumber={parseInt(waterTaken || 0)}
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
