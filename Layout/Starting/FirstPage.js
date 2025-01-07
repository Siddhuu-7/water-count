import React from 'react'
import {View,Text, TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native'
// import { setDefualtVAlues } from '../Logic/StoredValues';
export default function FirstPage() {
// setDefualtVAlues();
  const navigation=useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.headerText}>Hi,</Text>
          <Text style={styles.headerText}>I'm your personal</Text>
          <Text style={styles.headerText}>hydration companion</Text>
          <Text style={styles.subText}>In order to provide tailored hydration advice,</Text>
          <Text style={styles.subText}>I need to get some basic information, and</Text>
          <Text style={styles.subText}>I'll keep this a secret</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button} 
      onPress={()=>navigation.navigate('AgeCalculator')}>
        <Text style={styles.buttonText}>LET'S GO</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '5%',
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  textContainer: {
    width: '100%',
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#666',
    lineHeight: 22,
  },
  button: {
    width: "100%",
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 40,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
}