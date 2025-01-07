import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import {View, Image, StyleSheet, TouchableOpacity, Text} from 'react-native'
import AnimatedGraph from './AnimatedGraph';

export default function Start() {
const navigation=useNavigation();
const [gender, setGender] = React.useState(null);
const genderImages = {
  male: require('../../assets/male.jpg'),
  female: require('../../assets/female.jpg')
};
useEffect(() => {
  const getGender = async () => {
    const savedGender = await AsyncStorage.getItem('Gender');
    console.log(savedGender);
    setGender(savedGender);
  };
  getGender();
}, []);
  return (
    <View style={styles.container}>
      {gender && (
        <View style={styles.headerContainer}>
          <Image source={genderImages[gender]} style={styles.profileImage} />
          <Text style={styles.headerText}>Personal Hydration Plan</Text>
        </View>
      )}

      <View style={styles.subcontainer}>
        
        <AnimatedGraph/>
        <Text style={styles.motivationalText}>Let Be Hydrated</Text>
      </View>
      <TouchableOpacity onPress={()=>navigation.navigate('Home')} style={styles.button}>
        <Text style={styles.buttonText}>
          START
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'space-between',
        padding: 20,
        backgroundColor:'#fff'
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 40,
        paddingTop:20,
        paddingLeft:30
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    subcontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop:20,
        textAlign:'center'
    },
    image: {
        width: 300,
        height: 200,
        resizeMode: 'contain'
    },
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        marginBottom: 20,
        alignSelf:'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    motivationalText: {
        fontSize: 24,
        fontStyle: 'italic',
        marginTop: 20,
        textAlign: 'center',
    },
})