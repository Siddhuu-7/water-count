import React, { useState } from 'react'
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Alert } from 'react-native'
import RocketLaunchAnimation from './RocketLaunchAnimation';
import { useNavigation } from '@react-navigation/native';
// import RocketDescentAnimation from './RocketAddCrash';
// import WaterTake from './WaterTake'
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function SetLimit() {
    const navigation = useNavigation();
    const [number, onChangeNumber] = React.useState('');
    const [Launch,setLaunch]=useState(false);

    const storeDailyLimit = async (value) => {
        try {
          await AsyncStorage.setItem('dailyWaterLimit', value.toString());
        } catch (error) {
          console.error('Error storing daily limit:', error);
        }
      };



    return (
        <View style={styles.container}>
             
             <RocketLaunchAnimation shouldLaunch={Launch}/>
            
            <TextInput
                style={styles.input}
                onChangeText={onChangeNumber}
                value={number}
                placeholder="Set Your Limit"
                keyboardType='numeric'
            />
           <TouchableOpacity 
                style={styles.button} 
                onPress={() => {
                    if(number){
                        console.log(number);
                        storeDailyLimit(number)
                        setLaunch(true);
                        onChangeNumber('');
                        
                        setTimeout(() => {
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'Home' }],
                            });
                        }, 3000);
                        return;
                    }
                    else{
                        Alert.alert('please enter a valid limit')
                    }
                }}
            >
                <Text style={styles.buttonText}>Reset</Text>
           </TouchableOpacity>
          
          
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        height: 40,
        width: 200,
        margin: 12,
        borderWidth: 1,
        paddingLeft: 10,
        borderRadius: 25,
    },
    button: {
        backgroundColor: 'red', 
        borderRadius: 25,
        padding: 10,
        paddingHorizontal: 20,
        elevation: 2,
        width:100,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    }
  });



  