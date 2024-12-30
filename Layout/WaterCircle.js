import React, { useEffect, useRef,useState } from 'react'
import { View, Text, StyleSheet, Animated ,Button, TouchableOpacity, Dimensions} from 'react-native'
import WaterTake from './WaterTake';
import Streak from './Streak';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function WaterCalculater() {
  const waterAnimation = useRef(new Animated.Value(0)).current;
  const [water, setWater] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    const getInitialWater = async () => {
      const waterTaken = await AsyncStorage.getItem('waterTaken');
      if (waterTaken) {
        setWater(Number(waterTaken));
      }
    };
    getInitialWater();
  }, []);

  const limitCheck = async () => {
    const limit = await AsyncStorage.getItem('dailyWaterLimit');
    // console.log(limit, "this is default limit");
    return limit !== null;
  };

  const renderWaterContent = async () => {
    const hasLimit = await limitCheck();
    return hasLimit ? (
      <WaterTake waterTaken={water} />
    ) : (
      <TouchableOpacity
        onPress={() => navigation.navigate('Profile')}
        >
<Text style={{color:'red',fontSize:20,fontWeight:'bold'}}>
  Set Limit
</Text>
        </TouchableOpacity>
      
    );
  };

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

  const HandelAddWater=async () => {
    const newWater = water + 100;
    setWater(newWater);
    await AsyncStorage.setItem('waterTaken', String(newWater));
  }
  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Animated.View style={[styles.water, { transform: [{ translateY }] }]} />
        <Text style={styles.text}>
          {renderWaterContent()}
        </Text>
      </View>
      <Streak  callback={HandelAddWater}/>
      <TouchableOpacity 
        onPress={HandelAddWater}
      >
        <Text style={{backgroundColor:'lightblue', color:'blue', padding:10, borderRadius:10}}>
          Add 100Ml
        </Text>
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