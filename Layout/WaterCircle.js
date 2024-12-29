import React, { useEffect, useRef,useState } from 'react'
import { View, Text, StyleSheet, Animated ,Button, TouchableOpacity, Dimensions} from 'react-native'
import WaterTake from './WaterTake';
import Streak from './Streak';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function WaterCalculater() {
  const waterAnimation = useRef(new Animated.Value(0)).current;
  const waterTaken=AsyncStorage.getItem('waterTaken');
  
  const [water, setWater] = useState(Number(waterTaken._j));
  
  
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(waterAnimation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(waterAnimation, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const translateY = waterAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [20, -20],
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      // Update dimensions when screen orientation changes
      windowWidth = window.width;
      windowHeight = window.height;
    });

    return () => subscription?.remove();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Animated.View style={[styles.water, { transform: [{ translateY }] }]} />
        <Text style={styles.text}>
         <WaterTake waterTaken={water}/>
        </Text>
      </View>
      <Streak/>
      <TouchableOpacity onPress={() => {
        const newWater = water + 100;
        setWater(newWater);
       console.log(waterTaken._j)

        console.log(water)
        
              }}
              
              >
                <Text style={{backgroundColor:'lightblue',color:'blue',padding:10,borderRadius:10}}>Add 100Ml</Text>
              </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: windowHeight * 0.15,
  },
  circle: {
    width: windowWidth * 0.8,
    height: windowWidth * 0.8,
    borderRadius: windowWidth * 0.4,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  water: {
    position: 'absolute',
    bottom: -(windowWidth * 0.27),
    left: -(windowWidth * 0.27),
    right: -(windowWidth * 0.27),
    height: windowWidth * 0.53,
    backgroundColor: '#2980b9',
    borderRadius: windowWidth * 0.2,
  },
  text: {
    color: 'white',
    fontSize: windowWidth * 0.045,
  }
})